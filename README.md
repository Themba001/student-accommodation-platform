# Student Accommodation Platform

A web-based platform that digitizes the student accommodation lifecycle for accommodation providers serving NWU and VUT students.

## Overview

This project is designed to streamline the student accommodation process across the full lifecycle, from discovery and application through allocation, onboarding, and ongoing management.

The platform supports:

- Student accommodation discovery and search
- Online applications and status tracking
- Provider review and management of applications
- Allocation and onboarding workflows
- Ongoing accommodation administration and records management
- Secure access to student and accommodation data

## Current status

The project is in active development. The frontend has been established as a React + TypeScript + Vite application with a branded login experience, while the backend is being structured around FastAPI and Supabase services for authentication, storage, and data management.

## Technology stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- React Hook Form
- Zod
- Tailwind CSS
- Vitest
- Testing Library
- Oxlint

### Backend

- Python
- FastAPI
- Uvicorn
- Pydantic
- Pydantic Settings
- Python Dotenv
- Supabase client

### Data and platform services

- PostgreSQL via Supabase
- Supabase Auth
- Supabase Storage
- Row Level Security (RLS)

## Repository structure

```text
.
├── backend/        Backend API and Python service setup
├── frontend/       React and TypeScript application
├── README.md       Project documentation
└── .gitignore      Git ignore rules
```

## Prerequisites

Before you begin, make sure you have:

- Node.js 20 or later
- npm
- Python 3.11 or later
- A Supabase project for authentication, database, and storage
- A local environment setup for app configuration values

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/Themba001/student-accommodation-platform.git
cd student-accommodation-platform
```

### 2. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite development server will start and provide a local URL for the frontend application.

### 3. Set up the backend

```bash
cd backend
python -m venv .venv
```

On macOS or Linux:

```bash
source .venv/bin/activate
```

On Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

Create a local environment file and add the required Supabase and application configuration values. Do not commit secrets, service-role keys, or sensitive student data to the repository.

Start the API:

```bash
uvicorn main:app --reload
```

## Available frontend commands

Run the following commands from the `frontend` directory:

```bash
npm run dev       # Start the development server
npm run build     # Build the production bundle
npm run lint      # Run lint checks
npm test          # Run tests in watch mode
npm run test:run  # Run the test suite once
npm run preview   # Preview the production build locally
```

## Security considerations

- Use Supabase Row Level Security policies to protect access to records.
- Keep service-role and privileged keys on the server side only.
- Validate input on both the frontend and backend boundaries.
- Store uploaded documents in restricted storage buckets with appropriate access policies.
- Keep local environment files out of version control.

## Contribution guidelines

Before submitting a change:

1. Create or work from a feature branch.
2. Install the relevant dependencies.
3. Run linting and tests for the affected area.
4. Document environment or data model changes.
5. Do not include secrets, personal identifiers, or student records in commits or pull requests.

## License

A project license has not been selected yet.
