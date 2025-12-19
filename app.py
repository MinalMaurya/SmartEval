from flask import Flask, render_template, request, redirect, url_for, flash, session

app = Flask(__name__)
app.secret_key = "your_secret_key"  # Change this to a secure key

# Dummy user data (Replace with database later)
users = {
    "student@example.com": {"password": "student123", "role": "student"},
    "teacher@example.com": {"password": "teacher123", "role": "teacher"},
    "admin@example.com": {"password": "admin123", "role": "admin"},
}

@app.route("/", methods=["GET", "POST"])
@app.route("/login", methods=["GET", "POST"])
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        role = request.form["role"]

        user = users.get(email)
        if user and user["password"] == password and user["role"] == role:
            session["user"] = email
            session["role"] = role
            
            # Redirect based on role
            if role == "student":
                return redirect(url_for("student_dashboard"))
            elif role == "teacher":
                return redirect(url_for("teacher_dashboard"))
            elif role == "admin":
                return redirect(url_for("admin_dashboard"))
        
        flash("Invalid credentials!", "error")
    
    return render_template("login.html")


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))

@app.route("/student_dashboard")
def student_dashboard():
    if "user" not in session or session["role"] != "student":
        flash("Access Denied. Please login as a student.", "error")
        return redirect(url_for("login"))
    
    return render_template("student_dashboard.html")

@app.route("/teacher_dashboard")
def teacher_dashboard():
    if "user" not in session or session["role"] != "teacher":
        flash("Access Denied. Please login as a teacher.", "error")
        return redirect(url_for("login"))
    
    return "<h2>Welcome to Teacher Dashboard</h2>"

@app.route("/admin_dashboard")
def admin_dashboard():
    if "user" not in session or session["role"] != "admin":
        flash("Access Denied. Please login as an admin.", "error")
        return redirect(url_for("login"))
    
    return "<h2>Welcome to Admin Dashboard</h2>"

if __name__ == "__main__":
    app.run(debug=True)
