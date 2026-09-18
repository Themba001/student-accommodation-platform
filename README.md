# Student Accommodation Management Platform

A web-based platform for digitising the student accommodation lifecycle for accommodation providers serving students at North-West University (NWU) and the Vaal University of Technology (VUT).

The platform is intended to support the full accommodation workflow:

> Discover, apply, review, allocate, onboard, and manage.

## Project status

This project is in active early development. The frontend foundation, backend service dependencies, and Supabase integration structure are being established.

## Core objectives

- Provide students with a clear way to discover suitable accommodation.
- Support online accommodation applications and application tracking.
- Help accommodation providers review and manage applications.
- Support allocation, onboarding, and ongoing accommodation administration.
- Protect application and accommodation data through role-based access controls and database security policies.

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
- Vitest and Testing Library
- Oxlint

### Backend

- FastAPI
- Python
- Uvicorn
- Pydantic
- Python Dotenv

### Data and platform services

- PostgreSQL through Supabase
- Supabase Auth for authentication
- Supabase Storage for file storage
- PostgreSQL Row Level Security (RLS) for data access protection

## Repository structure

```text
.
├── backend/       Backend API and Python dependencies
├── frontend/      React and TypeScript application
└── README.md      Project documentation
```

## Prerequisites

Install the following before setting up the project:

- Node.js 20 or later
- npm
- Python 3.11 or later
- A Supabase project for database, authentication, and storage services

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/Themba001/student-accommodation-platform.git
cd student-accommodation-platform
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

Start the frontend development server with:

```bash
npm run dev
```

The frontend will be available at the local URL shown by Vite.

### 3. Set up the backend

From the repository root, create and activate a virtual environment:

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

Install the backend dependencies:

```bash
pip install -r requirements.txt
```

Copy the project environment template when one is available, then add the required Supabase and application settings to your local environment. Never commit credentials, service-role keys, or other secrets to the repository.

Run the API with:

```bash
uvicorn main:app --reload
```

The exact application module may change as the backend implementation is completed.

## Available frontend commands

Run these commands from the `frontend` directory:

```bash
npm run dev       # Start the development server
npm run build     # Type-check and build for production
npm run lint      # Run Oxlint
npm test          # Run tests in watch mode
npm run test:run  # Run tests once
npm run preview   # Preview the production build locally
```

## Security considerations

- Use Supabase Row Level Security policies to restrict access to sensitive records.
- Keep service-role keys on the server and out of frontend code.
- Validate user input at both the frontend and backend boundaries.
- Store uploaded documents in protected storage buckets with appropriate access policies.
- Keep local environment files out of version control.

## Contributing

Before submitting a change:

1. Install the relevant dependencies.
2. Run the frontend build and lint checks.
3. Run the available test suite.
4. Document any configuration or database changes.
5. Do not include secrets or personal student data in commits, issues, or pull requests.

## License

A license has not yet been selected for this project.
