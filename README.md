# AI-Powered Resume Checker

## 📌 Project Overview
The **AI-Powered Resume Checker** is a web application that leverages **Natural Language Processing (NLP)** and **Machine Learning (ML)** to analyze resumes for quality, structure, and relevance to specific job descriptions. It provides actionable feedback to help users optimize their resumes for better job applications.

## 🌟 Features
- 📂 **Supports multiple formats**: Upload resumes in **PDF, Word, or plain text**.
- 🏗 **Analyzes resume structure**: Checks for essential sections like **Contact Info, Experience, and Skills**.
- 📝 **Content quality evaluation**: Assesses relevant **skills, education, and experience**.
- 🏷 **Keyword matching**: Compares resume content with job descriptions using **TF-IDF and embeddings**.
- ✅ **Grammar and readability check**: Provides suggestions for **improving clarity and correctness**.
- 📊 **Scoring system**: Generates a **resume quality score** based on structure, keywords, and grammar.

## 🚀 Technologies Used
### Tech Stack
| Component       | Technology  |
|---------------|------------|
| **Programming Language** | Python |
| **NLP Frameworks** | Hugging Face Transformers |
| **ML Algorithms** | BERT, RoBERTa, TF-IDF |
| **Backend** | Flask, Node.js |
| **Frontend** | React.js |
| **File Handling** | PyPDF2, python-docx |
| **Database** | MongoDB |
| **Deployment** | Heroku (backend), Vercel (frontend) |
| **Version Control** | GitHub |

## 🏗 System Workflow
1️⃣ **User Uploads Resume**
   - Upload PDF, Word, or plain text resume.
   - (Optional) Paste a job description for matching.

2️⃣ **Preprocessing**
   - Extract text from uploaded resume.
   - Tokenize and clean the text (remove stopwords, lowercase conversion).

3️⃣ **Analysis**
   - **Structure Check**: Validates required sections.
   - **Keyword Matching**: Compares resume and job description.
   - **Grammar & Readability**: Uses NLP-based tools.

4️⃣ **Scoring & Feedback**
   - Assigns **quality scores**.
   - Displays **strengths and improvement suggestions**.

## 🔗 Project Resources
- **GitHub Repository**: [Link Here](https://github.com/HammadMal)
- **Live Demo**: [Vercel Deployment](https://sched-u-track-web-and-app-dev.vercel.app/)
- **Backend Hosted on**: Heroku
- **Trello Board**: [Project Management](https://trello.com/invite/b/67a7a430b2ad17790e1ffa3d/ATTIeef9d0b0d9afe6be4ad13b670b3239e89FA9FAD5/se-project)

## 🛠 How to Run Locally
1. **Clone the repository**
   ```bash
   git clone https://github.com/HammadMal/AI-Resume-Checker.git
   ```
2. **Navigate to the directory**
   ```bash
   cd AI-Resume-Checker
   ```
3. **Install dependencies**
   ```bash
   pip install -r requirements.txt  # For Backend
   cd frontend && npm install       # For Frontend
   ```
4. **Run the backend**
   ```bash
   python app.py
   ```
5. **Run the frontend**
   ```bash
   cd frontend && npm start
   ```
6. **Access the application** in the browser at `http://localhost:3000`

## 👥 Team Members
- **Hammad Malik**
- **Ahtisham Uddin**
- **Azkaa Nasir**
- **Fatima Faisal**

## 💡 Future Enhancements
- 🌍 **Multilingual support** for resumes in different languages.
- 🤖 **AI-driven job recommendation system** based on resume content.
- 📄 **Cover Letter analysis** alongside resumes.
- 🎨 **Enhanced UI/UX improvements** for better user experience.

## 📢 Contact & Contributions
- If you have **suggestions or want to contribute**, feel free to fork the repo and submit a pull request!
- Reach out via GitHub or email for any queries.

---
🛠 Developed by **Group 2** for the **Software Engineering Project** at **Habib University** 🎓🚀
