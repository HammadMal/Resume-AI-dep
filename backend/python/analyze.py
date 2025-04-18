import google.generativeai as genai
import PyPDF2
import io
import json
import os
import base64
import sys
from dotenv import load_dotenv

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
    # Updated to use the current model naming convention
    generation_config = {
        "temperature": 0.7,
        "top_p": 0.85,
        "max_output_tokens": 1024,
    }
    
    # Use the updated model name format. As of April 2025, this should be the correct format.
    model = genai.GenerativeModel(
        model_name="gemini-1.5-pro",  # Updated from gemini-pro to gemini-1.5-pro
        generation_config=generation_config
    )
except Exception as e:
    print(f"Error configuring Gemini AI: {str(e)}", file=sys.stderr)
    sys.exit(1)

def generate_ai_response(prompt):
    try:
        response = model.generate_content(prompt)
        response_text = response.text.strip()
        
        # Remove markdown code blocks if present
        if response_text.startswith("```json\n") and response_text.endswith("\n```"):
            response_text = response_text[8:-4]  # Remove ```json\n and \n```
        elif response_text.startswith("```") and response_text.endswith("```"):
            response_text = response_text[3:-3]  # Remove ``` and ```

        # Parse the cleaned JSON response
        try:
            return json.loads(response_text)
        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {str(e)}", file=sys.stderr)
            print(f"Raw response text: {response_text}", file=sys.stderr)
            return {
                "error": "Failed to parse AI response as JSON",
                "raw_response": response_text
            }
    except Exception as e:
        print(f"Error generating AI response: {str(e)}", file=sys.stderr)
        raise

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

        # Grammar Analysis with structured prompt
        grammar_prompt = f"""
        Analyze the following resume for grammar and writing quality. 
        Return ONLY a JSON object with this exact structure:
        {{
            "score": <number between 0-100>,
            "errors": [<list of grammar/spelling errors found>],
            "suggestions": [<list of writing improvement suggestions>]
        }}

        Resume Text:
        {resume_text}
        """
        grammar_analysis = generate_ai_response(grammar_prompt)

        # ATS Analysis with structured prompt
        ats_prompt = f"""
        Analyze this resume against the job description as an ATS system.
        Return ONLY a JSON object with this exact structure:
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
        ats_analysis = generate_ai_response(ats_prompt)

        # Improvement Suggestions with structured prompt
        suggestions_prompt = f"""
        Provide professional suggestions to improve this resume for the job.
        Return ONLY a JSON object with this exact structure:
        {{
            "content_improvements": [<list of content improvement suggestions>],
            "format_improvements": [<list of format improvement suggestions>],
            "skills_to_highlight": [<list of key skills that should be emphasized>]
        }}

        Job Description:
        {job_description}

        Resume:
        {resume_text}
        """
        suggestions = generate_ai_response(suggestions_prompt)

        # Print debug information
        print(f"Grammar Analysis Result: {json.dumps(grammar_analysis, indent=2)}", file=sys.stderr)
        print(f"ATS Analysis Result: {json.dumps(ats_analysis, indent=2)}", file=sys.stderr)
        print(f"Suggestions Result: {json.dumps(suggestions, indent=2)}", file=sys.stderr)

        final_result = {
            "grammar_analysis": grammar_analysis,
            "ats_analysis": ats_analysis,
            "suggestions": suggestions
        }

        return final_result

    except Exception as e:
        print(f"Error in analyze_resume: {str(e)}", file=sys.stderr)
        raise

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
        sys.exit(1)