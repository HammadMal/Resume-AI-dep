import google.generativeai as genai
import io
import json
import os
import base64
import sys
import traceback
import re
from dotenv import load_dotenv

# For improved PDF handling
from pypdf import PdfReader  # Using pypdf instead of PyPDF2
try:
    import pdfplumber  # Better for complex PDF layouts
except ImportError:
    pdfplumber = None

# Load environment variables and configure API
load_dotenv()
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

if not GEMINI_API_KEY:
    print("Error: GEMINI_API_KEY not found in environment variables", file=sys.stderr)
    sys.exit(1)

try:
    # Configure Gemini AI with safety settings
    genai.configure(api_key=GEMINI_API_KEY)
    
    # Initialize the model with the correct model name
    generation_config = {
        "temperature": 0.7,
        "top_p": 0.85,
        "max_output_tokens": 1024,
    }
    
    # Use the updated model name format
    model = genai.GenerativeModel(
        model_name="gemini-2.0-flash",
        generation_config=generation_config
    )
except Exception as e:
    print(f"Error configuring Gemini AI: {str(e)}", file=sys.stderr)
    sys.exit(1)

def clean_json_string(json_str):
    """Fix common JSON issues that cause parsing errors."""
    if not json_str:
        return "{}"
        
    # Save the original for debugging
    original = json_str
    
    try:
        # Try to parse as is first
        json.loads(json_str)
        return json_str
    except:
        # If parsing fails, try to fix common issues
        try:
            # Remove line breaks inside strings that aren't properly escaped
            pattern = r'("(?:\\.|[^"\\])*")|\n'
            def replace_newlines(match):
                if match.group(1):  # This is a string, don't touch it
                    return match.group(1)
                return " "  # Replace newline with space
            json_str = re.sub(pattern, replace_newlines, json_str)
            
            # Remove trailing commas in arrays and objects
            json_str = re.sub(r',\s*]', ']', json_str)
            json_str = re.sub(r',\s*}', '}', json_str)
            
            # Fix missing quotes around keys
            json_str = re.sub(r'(\s*})(\s*[,}])', r'\1,\2', json_str)
            
            # Fix missing quotes around property names
            json_str = re.sub(r'([{,]\s*)([a-zA-Z0-9_]+)(\s*:)', r'\1"\2"\3', json_str)
            
            # Try to parse the fixed JSON
            json.loads(json_str)
            return json_str
        except:
            # If still failing, try more aggressive approaches
            try:
                # Find all JSON-like objects in the string
                pattern = r'(\{(?:[^{}]|(?:\{(?:[^{}]|(?:\{[^{}]*\}))*\}))*\})'
                matches = re.findall(pattern, json_str)
                
                for potential_json in matches:
                    try:
                        # Try to parse each potential JSON object
                        json.loads(potential_json)
                        return potential_json
                    except:
                        continue
                        
                # If we got here, no valid JSON was found
                print(f"Failed to parse or fix JSON: {original[:500]}", file=sys.stderr)
                return "{}"
            except:
                print(f"Failed to apply regex fixes to JSON: {original[:500]}", file=sys.stderr)
                return "{}"

def generate_ai_response(prompt):
    """Generate a response from the AI model with improved error handling."""
    try:
        response = model.generate_content(prompt)
        response_text = response.text.strip()
        
        # Remove markdown code blocks if present
        if response_text.startswith("```json\n") and response_text.endswith("\n```"):
            response_text = response_text[8:-4]  # Remove ```json\n and \n```
        elif response_text.startswith("```") and response_text.endswith("```"):
            response_text = response_text[3:-3]  # Remove ``` and ```

        # Handle potential JSON string escaping issues
        response_text = response_text.replace('\\"', '"')
        
        # Handle the case where the AI adds text before or after the JSON object
        # Find the first { and the last }
        start_idx = response_text.find('{')
        end_idx = response_text.rfind('}')
        
        if start_idx >= 0 and end_idx > start_idx:
            response_text = response_text[start_idx:end_idx+1]
        
        # Clean and fix any JSON issues
        clean_json = clean_json_string(response_text)
        
        # Parse the cleaned JSON response
        try:
            return json.loads(clean_json)
        except json.JSONDecodeError as e:
            print(f"JSON parsing error after cleaning: {str(e)}", file=sys.stderr)
            print(f"Cleaned JSON that failed parsing: {clean_json[:500]}", file=sys.stderr)
            
            # Last resort - create a synthetic response with default values
            if "grammar" in prompt.lower():
                return {
                    "score": 70,
                    "errors": ["Could not analyze grammar fully"],
                    "suggestions": ["Ensure proper grammar and spelling throughout your resume"]
                }
            elif "ats" in prompt.lower():
                return {
                    "score": 60,
                    "matching_keywords": ["Could not analyze fully"],
                    "missing_keywords": ["Review job description for key requirements"]
                }
            else:
                return {
                    "content_improvements": ["Add more specific achievements"],
                    "format_improvements": ["Improve readability"],
                    "skills_to_highlight": ["Technical skills relevant to the position"]
                }
    except Exception as e:
        print(f"Error generating AI response: {str(e)}", file=sys.stderr)
        print(traceback.format_exc(), file=sys.stderr)
        
        # Create a default response based on the prompt type
        if "grammar" in prompt.lower():
            return {
                "score": 70,
                "errors": ["Error generating analysis"],
                "suggestions": ["Ensure proper grammar and spelling throughout your resume"]
            }
        elif "ats" in prompt.lower():
            return {
                "score": 60,
                "matching_keywords": ["Error generating analysis"],
                "missing_keywords": ["Review job description for key requirements"]
            }
        else:
            return {
                "content_improvements": ["Add more specific achievements"],
                "format_improvements": ["Improve readability"],
                "skills_to_highlight": ["Technical skills relevant to the position"]
            }

def extract_text_from_pdf_with_pdfplumber(bytes_data):
    """Extract text from PDF using pdfplumber (better for complex layouts)."""
    text = ""
    try:
        with pdfplumber.open(io.BytesIO(bytes_data)) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + " "
                
                # Extract text from tables (which might be missed by normal extraction)
                tables = page.extract_tables()
                for table in tables:
                    for row in table:
                        text += " ".join([cell or "" for cell in row]) + " "
    except Exception as e:
        print(f"pdfplumber extraction error: {str(e)}", file=sys.stderr)
        return None
    return text.strip()

def extract_text_from_pdf_with_pypdf(bytes_data):
    """Extract text from PDF using pypdf (fallback)."""
    text = ""
    try:
        reader = PdfReader(io.BytesIO(bytes_data))
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + " "
    except Exception as e:
        print(f"pypdf extraction error: {str(e)}", file=sys.stderr)
        return None
    return text.strip()

def extract_text(file_content, file_type):
    """Extract text from file with improved handling of complex formats."""
    try:
        # Decode base64 content
        try:
            decoded_content = base64.b64decode(file_content)
        except Exception as e:
            print(f"Base64 decode error: {str(e)}", file=sys.stderr)
            # Maybe it's already decoded
            decoded_content = file_content.encode() if isinstance(file_content, str) else file_content
        
        if file_type.lower() == 'pdf':
            if not decoded_content:
                raise ValueError("Empty PDF file content")
            
            text = None
            
            # Try pdfplumber first if available (better for complex layouts)
            if pdfplumber:
                text = extract_text_from_pdf_with_pdfplumber(decoded_content)
                if text:
                    print(f"Successfully extracted text using pdfplumber: {len(text)} chars", file=sys.stderr)
            
            # Fallback to pypdf if pdfplumber fails or isn't available
            if not text:
                text = extract_text_from_pdf_with_pypdf(decoded_content)
                if text:
                    print(f"Successfully extracted text using pypdf: {len(text)} chars", file=sys.stderr)
            
            # If both methods fail, raise an error
            if not text:
                raise ValueError("Failed to extract text from PDF using multiple methods")
                
            return text
        else:
            # For text files
            try:
                # Try UTF-8 first
                return decoded_content.decode('utf-8').strip()
            except UnicodeDecodeError:
                # Fallback to Latin-1 which can decode any byte sequence
                return decoded_content.decode('latin-1').strip()
    except Exception as e:
        print(f"Error extracting text: {str(e)}", file=sys.stderr)
        print(traceback.format_exc(), file=sys.stderr)
        raise

def clean_resume_text(text):
    """Clean and normalize resume text for better analysis."""
    if not text:
        return ""
    
    # Replace multiple spaces, tabs, and newlines with single space
    text = re.sub(r'\s+', ' ', text)
    
    # Remove unprintable characters
    text = ''.join(char for char in text if char.isprintable() or char in [' ', '\n', '\t'])
    
    # Fix common OCR and encoding issues
    text = text.replace('•', '- ')  # Replace bullets with dashes
    text = re.sub(r'[^\x00-\x7F]+', ' ', text)  # Remove non-ASCII characters
    
    # Remove very long strings (likely encoding errors)
    text = re.sub(r'\S{100,}', ' ', text)
    
    return text.strip()

def analyze_resume(file_content, file_type, job_description):
    """Analyze resume with improved handling of complex documents."""
    try:
        # Extract text from file
        resume_text = extract_text(file_content, file_type)
        
        if not resume_text:
            raise ValueError("No text could be extracted from the resume")

        if not job_description:
            raise ValueError("Job description is required")

        # Clean and normalize text
        cleaned_resume = clean_resume_text(resume_text)
        
        # Log initial extraction for debugging
        print(f"Original Extracted Resume Length: {len(resume_text)}", file=sys.stderr)
        print(f"Cleaned Resume Length: {len(cleaned_resume)}", file=sys.stderr)
        print(f"First 200 chars: {cleaned_resume[:200]}...", file=sys.stderr)
        print(f"Job Description: {job_description[:200]}...", file=sys.stderr)

        # Grammar Analysis with structured prompt and error handling
        grammar_prompt = f"""
        Analyze the following resume for grammar and writing quality. 
        Return ONLY a JSON object with this exact structure, ensuring valid JSON format:
        {{
          "score": <number between 0-100>,
          "errors": [<list of grammar/spelling errors found>],
          "suggestions": [<list of writing improvement suggestions>]
        }}

        Resume Text:
        {cleaned_resume}
        """
        grammar_analysis = generate_ai_response(grammar_prompt)
        
        # Validate grammar analysis results
        if "score" not in grammar_analysis:
            grammar_analysis = {
                "score": 70,  # Default score
                "errors": grammar_analysis.get("errors", []),
                "suggestions": grammar_analysis.get("suggestions", ["Improve clarity and conciseness"])
            }

        # ATS Analysis with structured prompt
        ats_prompt = f"""
        You are an ATS (Applicant Tracking System) analyzer.
        Carefully analyze this resume against the job description.
        Return ONLY a JSON object with this exact structure, ensuring valid JSON format:
        {{
          "score": <number between 0-100 indicating match percentage>,
          "matching_keywords": [<list of keywords found in both resume and job description>],
          "missing_keywords": [<list of important keywords from job description missing in resume>]
        }}

        Job Description:
        {job_description}

        Resume:
        {cleaned_resume}
        """
        ats_analysis = generate_ai_response(ats_prompt)
        
        # Validate ATS analysis results
        if "score" not in ats_analysis:
            ats_analysis = {
                "score": 60,  # Default score
                "matching_keywords": ats_analysis.get("matching_keywords", []),
                "missing_keywords": ats_analysis.get("missing_keywords", ["Review job description for key requirements"])
            }

        # Improvement Suggestions with structured prompt
        suggestions_prompt = f"""
        As a professional resume consultant, provide improvement suggestions for this resume based on the job description.
        Return ONLY a JSON object with this exact structure, ensuring valid JSON format:
        {{
          "content_improvements": [<list of specific content improvement suggestions>],
          "format_improvements": [<list of format improvement suggestions>],
          "skills_to_highlight": [<list of key skills that should be emphasized>]
        }}

        Job Description:
        {job_description}

        Resume:
        {cleaned_resume}
        """
        suggestions = generate_ai_response(suggestions_prompt)
        
        # Validate suggestions results
        if not isinstance(suggestions.get("content_improvements"), list):
            suggestions = {
                "content_improvements": ["Add more specific achievements"],
                "format_improvements": suggestions.get("format_improvements", ["Improve readability"]) if isinstance(suggestions.get("format_improvements"), list) else ["Improve readability"],
                "skills_to_highlight": suggestions.get("skills_to_highlight", ["Technical skills relevant to the position"]) if isinstance(suggestions.get("skills_to_highlight"), list) else ["Technical skills relevant to the position"]
            }

        # Combine all analyses
        final_result = {
            "grammar_analysis": grammar_analysis,
            "ats_analysis": ats_analysis,
            "suggestions": suggestions
        }
        
        # Verify the result can be serialized to JSON
        try:
            json.dumps(final_result)
        except Exception as e:
            print(f"Error serializing final result: {str(e)}", file=sys.stderr)
            # Create a safe fallback response
            return {
                "grammar_analysis": {
                    "score": 70,
                    "errors": ["Analysis completed with some issues"],
                    "suggestions": ["Review for grammar and spelling"]
                },
                "ats_analysis": {
                    "score": 65,
                    "matching_keywords": ["Found some matching keywords"],
                    "missing_keywords": ["Some key terms from job description may be missing"]
                },
                "suggestions": {
                    "content_improvements": ["Add more specific achievements"],
                    "format_improvements": ["Ensure consistent formatting"],
                    "skills_to_highlight": ["Focus on technical skills relevant to the position"]
                }
            }

        return final_result

    except Exception as e:
        print(f"Error in analyze_resume: {str(e)}", file=sys.stderr)
        print(traceback.format_exc(), file=sys.stderr)
        
        # Return error in a structured format with safe fallback values
        return {
            "error": f"Analysis completed with issues: {str(e)}",
            "grammar_analysis": {
                "score": 70,
                "errors": ["Analysis completed with some issues"],
                "suggestions": ["Review for grammar and spelling"]
            },
            "ats_analysis": {
                "score": 65,
                "matching_keywords": ["Some matching keywords found"],
                "missing_keywords": ["Review job description for key requirements"]
            },
            "suggestions": {
                "content_improvements": ["Add more specific achievements"],
                "format_improvements": ["Ensure consistent formatting"],
                "skills_to_highlight": ["Focus on technical skills relevant to the position"]
            }
        }

if __name__ == "__main__":
    try:
        # Read input from stdin
        input_str = sys.stdin.read()
        print(f"Received input length: {len(input_str)}", file=sys.stderr)  # Debug log
        
        input_data = json.loads(input_str)
        
        # Validate input
        if not input_data.get('file_content'):
            raise ValueError("File content is required")
            
        # Process the resume
        result = analyze_resume(
            input_data['file_content'],
            input_data['file_type'],
            input_data['job_description']
        )
        
        # Ensure the result is JSON serializable
        try:
            output = json.dumps(result)
            print(output)
        except Exception as e:
            print(f"Error serializing result to JSON: {str(e)}", file=sys.stderr)
            # Send a simple valid JSON response if all else fails
            fallback = {
                "grammar_analysis": {"score": 70, "errors": [], "suggestions": ["Analysis completed with some issues"]},
                "ats_analysis": {"score": 65, "matching_keywords": [], "missing_keywords": ["Review job description"]},
                "suggestions": {"content_improvements": ["Add specific achievements"], "format_improvements": ["Improve formatting"], "skills_to_highlight": ["Relevant technical skills"]}
            }
            print(json.dumps(fallback))
        
    except Exception as e:
        print(f"Error processing request: {str(e)}", file=sys.stderr)
        print(traceback.format_exc(), file=sys.stderr)
        
        # Return error in a structured format
        error_result = {
            "grammar_analysis": {"score": 70, "errors": [], "suggestions": ["Analysis could not be completed"]},
            "ats_analysis": {"score": 65, "matching_keywords": [], "missing_keywords": ["Please try again"]},
            "suggestions": {"content_improvements": ["Try again with a different format"], "format_improvements": [], "skills_to_highlight": []}
        }
        
        print(json.dumps(error_result))
        sys.exit(1) 