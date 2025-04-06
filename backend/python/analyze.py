import sys
import json
import re

def extract_text_from_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def analyze_resume(resume_text, job_description):
    # Convert to lowercase for easier matching
    resume_lower = resume_text.lower()
    job_lower = job_description.lower()
    
    # Extract keywords (simple approach for MVP)
    job_words = set(re.findall(r'\b[a-zA-Z][a-zA-Z]{2,}\b', job_lower))
    resume_words = set(re.findall(r'\b[a-zA-Z][a-zA-Z]{2,}\b', resume_lower))
    
    # Find matches
    matches = job_words.intersection(resume_words)
    missing = job_words - resume_words
    
    # Calculate score
    if len(job_words) > 0:
        match_percentage = (len(matches) / len(job_words)) * 100
    else:
        match_percentage = 0
    
    # Basic grammar check
    grammar_issues = []
    sentences = re.split(r'[.!?]+', resume_text)
    for sentence in sentences:
        sentence = sentence.strip()
        if sentence and len(sentence) > 5 and not sentence[0].isupper():
            grammar_issues.append(f"Sentence doesn't start with capital letter: '{sentence[:30]}...'")
    
    # Check for formatting issues
    formatting_issues = []
    if resume_text.count('@') == 0:
        formatting_issues.append("No email address found")
    if not re.search(r'\d{3}[-.\s]?\d{3}[-.\s]?\d{4}', resume_text):
        formatting_issues.append("No phone number found")
    
    return {
        "ats_score": round(match_percentage, 1),
        "matched_keywords": sorted(list(matches)),
        "missing_keywords": sorted(list(missing)),
        "grammar_issues": grammar_issues[:5],  # Limit to top 5 issues
        "formatting_issues": formatting_issues,
        "improvement_suggestions": [
            "Add more industry-specific keywords",
            "Quantify achievements with numbers",
            "Use action verbs at the beginning of bullet points"
        ]
    }

if __name__ == "__main__":
    # Get file paths from command line arguments
    resume_path = sys.argv[1]
    job_desc_path = sys.argv[2]
    output_path = sys.argv[3]
    
    # Extract text
    resume_text = extract_text_from_file(resume_path)
    job_description = extract_text_from_file(job_desc_path)
    
    # Analyze
    results = analyze_resume(resume_text, job_description)
    
    # Write results to output file
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)