# Shandilya Home Decor — Professional Flask Website

A premium responsive frontend plus a Python Flask backend.

## Tech stack
- HTML5
- CSS3
- JavaScript
- Python
- Flask
- SQLite

## Project structure

Shandilya_Home_Decor_Python_Flask/
├── app.py
├── requirements.txt
├── templates/
│   └── index.html
├── static/
│   ├── css/style.css
│   ├── js/script.js
│   └── assets/shandilya-logo.jpeg
└── shandilya.db  (created automatically after first run)

## Run in VS Code

### 1. Open terminal
Open this project folder in VS Code.

### 2. Create virtual environment
Windows:
python -m venv venv

### 3. Activate it
Windows PowerShell:
venv\Scripts\Activate.ps1

Windows CMD:
venv\Scripts\activate

### 4. Install Flask
pip install -r requirements.txt

### 5. Run
python app.py

### 6. Open
http://127.0.0.1:5000

The enquiry form now sends data to Flask and stores it in SQLite.

## Important
Before publishing, replace placeholder business contact information and add the real product photos, phone/WhatsApp, email, address and social links.
For production hosting, turn off Flask debug mode and use a production WSGI server.
