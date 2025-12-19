from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(10), nullable=False)  # "student", "teacher", "admin"

class StudentProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    student_id = db.Column(db.String(50), unique=True, nullable=False)
    class_name = db.Column(db.String(50), nullable=False)
    total_subjects = db.Column(db.Integer, nullable=False)
    exams_taken = db.Column(db.Integer, default=0)
    total_marks = db.Column(db.Integer, default=0)

class TeacherProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    teacher_id = db.Column(db.String(50), unique=True, nullable=False)
    subjects_taught = db.Column(db.String(200), nullable=False)
    exams_conducted = db.Column(db.Integer, default=0)
