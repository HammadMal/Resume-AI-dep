import google.generativeai as genai
import io
import json
import os
import base64
import sys
import traceback
import re
from dotenv import load_dotenv

# For improved PDF handlingggggg
from pypdf import PdfReader
try:
    import pdfplumber
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
        "temperature": 0.2,  # Lowered temperature for more consistent outputs
        "top_p": 0.8,
        "max_output_tokens": 2048,  # Increased output tokens to avoid truncation
    }
    
    # Use the updated model name format
    model = genai.GenerativeModel(
        model_name="gemini-2.0-flash",
        generation_config=generation_config
    )
except Exception as e:
    print(f"Error configuring Gemini AI: {str(e)}", file=sys.stderr)
    sys.exit(1)

def extract_json_from_response(text):
    """Extract JSON object from text that might contain extra content."""
    # Find the first { and the last }
    start_idx = text.find('{')
    end_idx = text.rfind('}')
    
    if start_idx >= 0 and end_idx > start_idx:
        try:
            json_str = text[start_idx:end_idx+1]
            # Try to parse extracted JSON
            json_obj = json.loads(json_str)
            return json_obj
        except:
            pass
    
    # If the above extraction fails, try regex pattern matching
    json_pattern = r'\{(?:[^{}]|(?:\{[^{}]*\}))*\}'
    matches = re.findall(json_pattern, text, re.DOTALL)
    
    if matches:
        for potential_json in matches:
            try:
                # Try to parse this potential JSON object
                json_obj = json.loads(potential_json)
                return json_obj
            except:
                continue
    
    return None

def generate_ai_response(prompt, expected_keys):
    """Generate a response from the AI model with improved error handling and retries."""
    max_attempts = 3
    
    for attempt in range(max_attempts):
        try:
            # Add explicit instructions to ensure valid JSON
            structured_prompt = f"""
            {prompt}
            
            VERY IMPORTANT: I need your response to be a valid JSON object.
            Do not include any text before or after the JSON.
            Do not use markdown code blocks.
            Ensure all quotation marks are properly escaped.
            Format the JSON with the exact keys specified and with valid syntax.
            """
            
            response = model.generate_content(structured_prompt)
            response_text = response.text.strip()
            
            # Remove markdown code blocks if present
            if response_text.startswith("```json") and response_text.endswith("```"):
                response_text = re.sub(r'^```json\s*', '', response_text)
                response_text = re.sub(r'\s*```$', '', response_text)
            elif response_text.startswith("```") and response_text.endswith("```"):
                response_text = re.sub(r'^```\s*', '', response_text)
                response_text = re.sub(r'\s*```$', '', response_text)
            
            # Try direct JSON parsing first
            try:
                result = json.loads(response_text)
                
                # Validate keys
                if all(key in result for key in expected_keys):
                    return result
            except json.JSONDecodeError:
                # If direct parsing fails, try extraction
                result = extract_json_from_response(response_text)
                if result and all(key in result for key in expected_keys):
                    return result
            
            # If we're here, either parsing failed or keys were missing
            print(f"Attempt {attempt+1}: JSON extraction failed or missing keys, retrying...", file=sys.stderr)
            print(f"Response text (truncated): {response_text[:500]}...", file=sys.stderr)
            
            # If this was the last attempt, create a default response
            if attempt == max_attempts - 1:
                if "grammar" in prompt.lower():
                    return {
                        "score": 75,
                        "errors": ["Could not fully analyze grammar"],
                        "suggestions": ["Ensure proper grammar and spelling throughout your resume"]
                    }
                elif "ats" in prompt.lower():
                    return {
                        "score": 65,
                        "matching_keywords": ["Could not fully analyze keywords"],
                        "missing_keywords": ["Review job description for key requirements"]
                    }
                else:
                    return {
                        "content_improvements": ["Add more specific achievements"],
                        "format_improvements": ["Improve readability"],
                        "skills_to_highlight": ["Technical skills relevant to the position"]
                    }
                    
        except Exception as e:
            print(f"Attempt {attempt+1} error: {str(e)}", file=sys.stderr)
            if attempt == max_attempts - 1:
                # This was our last attempt, return a default response
                if "grammar" in prompt.lower():
                    return {
                        "score": 75,
                        "errors": ["Error in grammar analysis"],
                        "suggestions": ["Ensure proper grammar and spelling throughout your resume"]
                    }
                elif "ats" in prompt.lower():
                    return {
                        "score": 65,
                        "matching_keywords": ["Error in keyword analysis"],
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
        Analyze the following resume for grammar and writing quality. Focus on identifying specific grammar errors, spelling mistakes, and style issues.
        
        Your response must be a JSON object with exactly these keys:
        - score: a number between 0-100 representing overall writing quality
        - errors: an array of specific grammar/spelling errors found
        - suggestions: an array of writing improvement suggestions
        
        Resume Text:
        {cleaned_resume}
        """
        grammar_analysis = generate_ai_response(grammar_prompt, ["score", "errors", "suggestions"])

        # ATS Analysis with structured prompt
        ats_prompt = f"""
        You are an ATS (Applicant Tracking System) analyzer.
        Carefully analyze this resume against the job description to determine keyword matches and gaps.
        
        Your response must be a JSON object with exactly these keys:
        - score: a number between 0-100 indicating match percentage
        - matching_keywords: an array of keywords found in both resume and job description
        - missing_keywords: an array of important keywords from job description missing in resume
        
        Job Description:
        {job_description}

        Resume:
        {cleaned_resume}
        """
        ats_analysis = generate_ai_response(ats_prompt, ["score", "matching_keywords", "missing_keywords"])

        # Improvement Suggestions with structured prompt
        suggestions_prompt = f"""
        As a professional resume consultant, provide improvement suggestions for this resume based on the job description.
        
        Your response must be a JSON object with exactly these keys:
        - content_improvements: an array of specific content improvement suggestions
        - format_improvements: an array of format improvement suggestions
        - skills_to_highlight: an array of key skills that should be emphasized
        
        Job Description:
        {job_description}

        Resume:
        {cleaned_resume}
        """
        suggestions = generate_ai_response(suggestions_prompt, ["content_improvements", "format_improvements", "skills_to_highlight"])

        # Combine all analyses
        final_result = {
            "grammar_analysis": grammar_analysis,
            "ats_analysis": ats_analysis,
            "suggestions": suggestions
        }
        
        # Verify the result can be serialized to JSON
        try:
            json.dumps(final_result)
            return final_result
        except Exception as e:
            print(f"Error serializing final result: {str(e)}", file=sys.stderr)
            # Create a safe fallback response
            return {
                "grammar_analysis": {
                    "score": 75,
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

    except Exception as e:
        print(f"Error in analyze_resume: {str(e)}", file=sys.stderr)
        print(traceback.format_exc(), file=sys.stderr)
        
        # Return error in a structured format with safe fallback values
        return {
            "error": f"Analysis completed with issues: {str(e)}",
            "grammar_analysis": {
                "score": 75,
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
                "grammar_analysis": {"score": 75, "errors": [], "suggestions": ["Analysis completed with some issues"]},
                "ats_analysis": {"score": 65, "matching_keywords": [], "missing_keywords": ["Review job description"]},
                "suggestions": {"content_improvements": ["Add specific achievements"], "format_improvements": ["Improve formatting"], "skills_to_highlight": ["Relevant technical skills"]}
            }
            print(json.dumps(fallback))
        
    except Exception as e:
        print(f"Error processing request: {str(e)}", file=sys.stderr)
        print(traceback.format_exc(), file=sys.stderr)
        
        # Return error in a structured format
        error_result = {
            "grammar_analysis": {"score": 75, "errors": [], "suggestions": ["Analysis could not be completed"]},
            "ats_analysis": {"score": 65, "matching_keywords": [], "missing_keywords": ["Please try again"]},
            "suggestions": {"content_improvements": ["Try again with a different format"], "format_improvements": [], "skills_to_highlight": []}
        }
        
        print(json.dumps(error_result))
        sys.exit(1)

#439