let studentAnswers = {};  // Store student responses
let currentIndex = 0;     // Track current question index
let questions = [];       // Store questions globally

window.onload = function () {
    let storedExamData = localStorage.getItem("finalizedExam");

    if (!storedExamData) {
        alert("No test found! Please check with the teacher.");
        return;
    }

    let examData = JSON.parse(storedExamData);
    let currentDate = new Date();
    let examDate = new Date(examData.examDate); // The date the teacher has set for the exam
    
    // Check if the exam is not yet available
    if (currentDate < examDate) {
        // Show Upcoming Exam status
        document.getElementById("examStatusText").innerText = "Upcoming Exam";
        document.getElementById("examDateText").innerText = "Exam Date: " + examDate.toLocaleString();
        document.getElementById("startExamBtn").disabled = true;
    } else {
        // Exam has started
        document.getElementById("examStatusText").innerText = "Exam Available";
        document.getElementById("startExamBtn").disabled = false;
    }
};

function startExam() {
    let storedExamData = localStorage.getItem("finalizedExam");

    if (!storedExamData) {
        alert("No test found! Please ask the teacher to finalize the test.");
        return;
    }

    try {
        let examData = JSON.parse(storedExamData);
        if (!examData || !Array.isArray(examData.questions) || examData.questions.length === 0) {
            alert("No valid questions found in the exam!");
            return;
        }

        questions = examData.questions;

        // Restore previous answers if they exist
        let storedAnswers = localStorage.getItem("studentAnswers");
        if (storedAnswers) {
            studentAnswers = JSON.parse(storedAnswers);
        }

        document.getElementById("examContainer").style.display = "block";
        document.getElementById("submitBtn").style.display = "block";

        loadExamQuestion(); // Load the first question or resume from last question
    } catch (error) {
        alert("Error loading exam data. Please try again.");
        console.error("Parsing error:", error);
    }
}

if (isNaN(examDate.getTime())) {
    alert("Invalid exam date set. Please check with the teacher.");
    return;
}
