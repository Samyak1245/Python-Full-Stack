# Contact Manager

A full-stack contact manager built with React, Vite, Flask, and SQLite. It lets you create, view, update, and delete contacts.

## Project structure

```text
Python Full Stack/
├── backend/                 # Flask API and SQLAlchemy model
│   ├── config.py
│   ├── main.py
│   ├── models.py
│   └── requirements.txt
├── frontend/                # React + Vite user interface
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Requirements

- Python 3.10 or newer
- Node.js 18 or newer
- npm

## Run the backend

Open a terminal in the `backend` folder and create a virtual environment:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
py main.py
```

The API starts at `http://127.0.0.1:5000`. The SQLite database is created automatically in `backend/instance/` when the server first runs.

## Run the frontend

Open a second terminal in the `frontend` folder:

```powershell
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Available API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/contacts` | Get all contacts |
| POST | `/create_contact` | Create a contact |
| PATCH | `/update_contact/:id` | Update a contact |
| DELETE | `/delete_contact/:id` | Delete a contact |

