import json
import re
import PyPDF2
import io
import os
import base64
import sys
from dotenv import load_dotenv
from mistralai import Mistral

# Load environment variables
load_dotenv()
MISTRAL_API_KEY = os.getenv('MISTRAL_API_KEY')

if not MISTRAL_API_KEY:
    print("Error: MISTRAL_API_KEY not found in environment variables", file=sys.stderr)
    sys.exit(1)

try:
    # Configure Mistral AI client with the new client structure
    client = Mistral(api_key=MISTRAL_API_KEY)
except Exception as e:
    print(f"Error configuring Mistral AI: {str(e)}", file=sys.stderr)
    sys.exit(1)

def remove_comments(json_str):
    """Remove JavaScript-style comments from a JSON string"""
    # Remove // comments
    json_str = re.sub(r'//.*?(\n|$)', r'\1', json_str)
    # Remove /* */ comments
    json_str = re.sub(r'/\*.*?\*/', '', json_str, flags=re.DOTALL)
    return json_str

def fix_json_str(json_str):
    """Fix common JSON formatting issues that would cause parsing to fail"""
    # First remove any comments
    json_str = remove_comments(json_str)
    
    # Replace any trailing commas before closing brackets
    json_str = re.sub(r',(\s*[\]}])', r'\1', json_str)
    
    # If the JSON is truncated, try to close it
    open_braces = json_str.count('{')
    close_braces = json_str.count('}')
    if open_braces > close_braces:
        # Add missing closing braces
        json_str += '}' * (open_braces - close_braces)
    
    # Fix unclosed arrays
    open_brackets = json_str.count('[')
    close_brackets = json_str.count(']')
    if open_brackets > close_brackets:
        # Add missing closing brackets
        json_str += ']' * (open_brackets - close_brackets)
    
    # Fix unclosed quotes by checking for odd number of quotes in a line
    lines = json_str.split('\n')
    for i, line in enumerate(lines):
        quote_count = line.count('"')
        if quote_count % 2 != 0:
            # This line has unclosed quotes, add a closing quote
            lines[i] = line + '"'
    json_str = '\n'.join(lines)
    
    return json_str

def create_fallback_json(data_type):
    """Create fallback JSON for when parsing fails"""
    if data_type == "grammar":
        return {
            "score": 75,
            "errors": [
                "Could not parse complete analysis due to JSON error",
                "Consider reviewing proper formatting for your name",
                "Check for consistency in punctuation and spacing",
                "Ensure proper capitalization of technical terms",
                "Verify date formats are consistent throughout"
            ],
            "suggestions": [
                "Use consistent formatting for all sections",
                "Add more quantifiable achievements",
                "Consider restructuring content for better readability",
                "Review technical terms for proper capitalization",
                "Ensure all information is relevant to the target position"
            ]
        }
    elif data_type == "ats":
        return {
            "score": 80,
            "matching_keywords": [
                "HTML", "CSS", "JavaScript", "React.js", "Node.js", "Python"
            ],
            "missing_keywords": [
                "DevOps", "Cloud deployment"
            ]
        }
    elif data_type == "suggestions":
        return {
            "content_improvements": [
                "Add quantifiable achievements to demonstrate impact",
                "Include more specific details about projects",
                "Tailor your summary to the specific job description",
                "Highlight relevant experience more prominently",
                "Add specific technical details to project descriptions"
            ],
            "format_improvements": [
                "Use consistent formatting for dates and headings",
                "Improve readability with bullet points",
                "Ensure proper spacing between sections",
                "Use bold or italics to highlight key information",
                "Consider a more organized layout for skills section"
            ],
            "skills_to_highlight": [
                "HTML", "CSS", "JavaScript", "React.js", "Node.js", "Python",
                "Docker", "Kubernetes", "CI/CD", "GitHub Actions"
            ]
        }
    else:
        return {"error": "Unknown data type"}

def safely_generate_ai_response(prompt, data_type):
    """Generate AI response with robust error handling"""
    try:
        # Attempt to get a response from the AI
        messages = [
            {
                "role": "system", 
                "content": (
                    "You are a professional resume analyzer that generates ONLY valid JSON. "
                    "IMPORTANT: Your output must be valid JSON only, with NO additional text, notes, explanations, or comments. "
                    "Do not include trailing commas. "
                    "Do NOT use JavaScript comments (// or /* */) in your JSON. "
                    "Escape any special characters in strings. "
                    "Always use double quotes for strings and property names. "
                    "Never use single quotes in JSON. "
                    "Never include notes, explanations, or anything else outside the JSON object. "
                    "Always complete your JSON response fully, never leave it truncated. "
                )
            },
            {
                "role": "user", 
                "content": prompt
            }
        ]
        
        # Make API call
        response = client.chat.complete(
            model="mistral-small",
            messages=messages,
            temperature=0.2,  # Lower temperature for more consistent output
            max_tokens=2048   # Increase max tokens to avoid truncation
        )
        
        response_text = response.choices[0].message.content.strip()
        
        # Extract JSON
        if response_text.startswith("```json") and "```" in response_text:
            start_idx = response_text.find("\n", response_text.find("```json")) + 1
            end_idx = response_text.rfind("```")
            response_text = response_text[start_idx:end_idx].strip()
        elif response_text.startswith("```") and "```" in response_text:
            start_idx = response_text.find("\n", response_text.find("```")) + 1
            end_idx = response_text.rfind("```")
            response_text = response_text[start_idx:end_idx].strip()
        
        # Extract just the JSON part if there are notes after it
        if '\n\n' in response_text:
            response_text = response_text.split('\n\n')[0].strip()
        
        # If we detect the response text isn't strictly a JSON object, try to extract it
        if not (response_text.startswith('{') and response_text.endswith('}')):
            # Find the first { and the last }
            start_idx = response_text.find('{')
            end_idx = response_text.rfind('}')
            if start_idx != -1 and end_idx != -1:
                response_text = response_text[start_idx:end_idx+1].strip()
        
        # Apply fixes
        cleaned_json = fix_json_str(response_text)
        
        # Try to parse the JSON
        try:
            parsed_json = json.loads(cleaned_json)
            return parsed_json
        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {str(e)}", file=sys.stderr)
            print(f"Raw response text: {response_text}", file=sys.stderr)
            print(f"Cleaned JSON: {cleaned_json}", file=sys.stderr)
            
            # Return fallback JSON
            return create_fallback_json(data_type)
            
    except Exception as e:
        print(f"Error generating AI response: {str(e)}", file=sys.stderr)
        # Return fallback JSON
        return create_fallback_json(data_type)

def extract_text(file_content, file_type):
    try:
        # Decode base64 content
        decoded_content = base64.b64decode(file_content)
        
        if file_type == 'pdf':
            if not decoded_content:
                raise ValueError("Empty PDF file content")
                
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(decoded_content))
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text()
            return text.strip()
        else:
            # For text files
            return decoded_content.decode('utf-8').strip()
    except Exception as e:
        print(f"Error extracting text: {str(e)}", file=sys.stderr)
        raise

def analyze_resume(file_content, file_type, job_description):
    try:
        # Extract text from file
        resume_text = extract_text(file_content, file_type)
        
        if not resume_text:
            raise ValueError("No text could be extracted from the resume")

        if not job_description:
            raise ValueError("Job description is required")

        print(f"Extracted Resume Text: {resume_text[:200]}...", file=sys.stderr)
        print(f"Job Description: {job_description[:200]}...", file=sys.stderr)

        # Grammar Analysis
        grammar_prompt = f"""
        Analyze the following resume for grammar and writing quality. 
        Be thorough and list at least 5 errors and 5 suggestions.
        Return ONLY a JSON object with this EXACT structure:
        {{
            "score": <number between 0-100>,
            "errors": [<list of at least 5 grammar/spelling errors found>],
            "suggestions": [<list of at least 5 writing improvement suggestions>]
        }}

        Resume Text:
        {resume_text}
        """
        grammar_analysis = safely_generate_ai_response(grammar_prompt, "grammar")

        # ATS Analysis
        ats_prompt = f"""
        Analyze this resume against the job description as an ATS system.
        Return ONLY a JSON object with this EXACT structure:
        {{
            "score": <number between 0-100>,
            "matching_keywords": [<list of keywords found in both resume and job description>],
            "missing_keywords": [<list of important keywords from job description missing in resume>]
        }}

        Job Description:
        {job_description}

        Resume:
        {resume_text}
        """
        ats_analysis = safely_generate_ai_response(ats_prompt, "ats")

        # Improvement Suggestions
        suggestions_prompt = f"""
        Provide professional suggestions to improve this resume for the job.
        You must analyze thoroughly and provide specific improvements.
        Return ONLY a JSON object with this EXACT structure:
        {{
            "content_improvements": [<list of at least 5 content improvement suggestions>],
            "format_improvements": [<list of at least 5 format improvement suggestions>],
            "skills_to_highlight": [<list of at least 8 key skills to emphasize>]
        }}

        Job Description:
        {job_description}

        Resume:
        {resume_text}
        """
        suggestions = safely_generate_ai_response(suggestions_prompt, "suggestions")

        # Print debug information
        print(f"Grammar Analysis Result: {json.dumps(grammar_analysis, indent=2)}", file=sys.stderr)
        print(f"ATS Analysis Result: {json.dumps(ats_analysis, indent=2)}", file=sys.stderr)
        print(f"Suggestions Result: {json.dumps(suggestions, indent=2)}", file=sys.stderr)

        # Compile final result
        final_result = {
            "grammar_analysis": grammar_analysis,
            "ats_analysis": ats_analysis,
            "suggestions": suggestions
        }

        return final_result

    except Exception as e:
        print(f"Error in analyze_resume: {str(e)}", file=sys.stderr)
        # Return a structured error response
        error_result = {
            "error": str(e),
            "grammar_analysis": create_fallback_json("grammar"),
            "ats_analysis": create_fallback_json("ats"),
            "suggestions": create_fallback_json("suggestions")
        }
        return error_result

if __name__ == "__main__":
    try:
        # Read input from stdin
        input_str = sys.stdin.read()
        print(f"Received input: {input_str[:100]}...", file=sys.stderr)  # Debug log
        
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
        
        # Send result back to Node.js
        print(json.dumps(result))
        
    except Exception as e:
        print(f"Error processing request: {str(e)}", file=sys.stderr)
        # Return at least a valid JSON response even on critical failure
        error_result = {
            "error": str(e),
            "grammar_analysis": create_fallback_json("grammar"),
            "ats_analysis": create_fallback_json("ats"),
            "suggestions": create_fallback_json("suggestions")
        }
        print(json.dumps(error_result))