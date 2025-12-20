# SmartEval – Online Examination & Evaluation System (Phase 1)

SmartEval is a web-based online examination system prototype developed as part of an academic project. The main goal of this project is to understand and implement the end-to-end workflow of digital examination systems, which includes creating exams, scheduling, student participation, and handling responses.

This repository represents Version 1 (Phase 1) of the project. In this phase, the focus is mainly on frontend development, user interface flow, and simulating exam logic using browser-based storage. The system is designed to mimic how a real online exam platform works, without full backend integration.

## Key Features (Implemented in Phase 1)

### Teacher Module
The teacher dashboard allows teachers to:
- Create and manage online exams
- Add different types of questions:
  - MCQ (Single correct answer)
  - MSQ (Multiple correct answers)
  - Text-based questions
- Set the exam date and time for controlled availability
- Dynamically add and manage question options 

Once finalized, the complete exam structure is stored using browser localStorage for prototype testing.

### Student Module
The student dashboard enables students to:
- View the exam status (Upcoming / Available)
- Start the exam only after the scheduled date and time
- Attempt questions loaded dynamically from stored exam data
- Resume the exam with previously saved responses to maintain continuity

Student responses are saved locally to prevent accidental data loss during the exam session.

### Exam Logic
- Supports MCQ, MSQ, and text-based questions
- Question navigation uses index-based tracking
- Basic validation prevents empty or invalid submissions
- Error handling addresses missing or incorrect exam data

## Tech Stack Used

### Frontend
- HTML5  
- CSS3  
- JavaScript (Vanilla JS)

### Storage
- Browser localStorage (used for prototyping and learning purposes)

### Backend (Planned for Future Phases)
- Python (Flask)
- Node.js
- SQLite / Database integration

## Project Structure

```text
SmartEval/
├── .gitignore                    # Git ignore configuration
│
├── app.py                        # Flask application entry (planned backend)
├── config.py                     # Application configuration
├── models.py                     # Database models (planned)
├── database.db                   # SQLite database (prototype)
│
├── server.js                     # Node.js server (partial / planned)
├── package.json                  # Node.js project configuration
├── package-lock.json             # Dependency lock file
│
├── login.html                    # User login page
├── signup.html                   # User registration page
├── forget-password.html          # Password recovery page
│
├── admin_dashboard.html           # Admin dashboard
│
├── teacher.html                  # Teacher main page
├── teacher_dashboard.html        # Teacher dashboard
├── teacher.js                    # Teacher-side logic
│
├── student.html                  # Student main page
├── student_dashboard.html        # Student dashboard
├── student.js                    # Student-side logic
│
├── set_exam.html                 # Exam creation interface
├── give_exam.html                # Student exam interface
│
├── overalltemp.html              # Shared / temporary layout
├── cssavatar.html                # UI / avatar experiment
│
├── style.css                     # Global styling

```
#### Note: Backend and database-related files are included for planning and learning purposes but are not fully integrated in Phase 1.
## ⚠️ Current Limitations (Phase 1)

- Data is stored only in browser localStorage 
- No real-time database connectivity
- No authentication token or session-based security
This version functions as a learning-focused prototype

## 🔮 Future Scope (Planned Versions) 
 ### 🔹 Phase 2 
- Backend API development and integration
- Database connectivity (MongoDB / MySQL / SQLite)
-  Role-based authentication (Student / Teacher / Admin)
-  Secure exam data handling
 ### 🔹 Phase 3 
  - AI-based evaluation for subjective answers
  - Performance analytics and result visualization
  - Scalable and secure exam architecture

## 👩‍💻 Contributors
- Minal Maurya
- Siddhi Gaikar

## 🎥 SmartEval Phase 1 – Prototype Demo

▶️ **Watch Demo Video (3 min)**  
This video demonstrates:
- Teacher login and exam creation
- MCQ, MSQ, and text-based questions
- Student login and exam attempt flow

🔗 Demo Link: https://github.com/user-attachments/assets/f8208d81-8a37-4805-9df2-ba1ffd7f2466


