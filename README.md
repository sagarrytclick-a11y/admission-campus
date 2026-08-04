# Admission Campus

Admission Campus is an education and admission guidance platform built to help students discover colleges, explore courses, understand entrance examinations, and navigate the admission process with greater clarity.

The platform brings college information, course discovery, entrance exam resources, counselling guidance, admission information, and educational content together in one place.

## Overview

Finding the right college and course often requires students to search across multiple websites and sources. Admission Campus is designed to make this process simpler by organizing important education and admission information into a structured and accessible platform.

The platform covers multiple academic categories, including engineering, medical education, management, professional courses, commerce, science, arts, humanities, design, and architecture.

## Core Features

### College Discovery

Explore colleges and universities with structured information covering courses, admissions, facilities, location, fees, and other relevant academic details.

### Course Discovery

Discover undergraduate, postgraduate, professional, and specialized programs across different academic disciplines.

### Entrance Exam Information

Access information and resources related to major entrance examinations such as:

* JEE Main
* NEET
* CAT
* Other national, state, and university-level entrance examinations

### College Comparison

Compare colleges and academic options using relevant information to make the college selection process easier.

### Admission Guidance

Understand admission requirements, eligibility criteria, application procedures, counselling processes, entrance examinations, and other important admission-related information.

### Counselling Support

Admission Campus provides guidance and resources related to different counselling processes, including:

* NEET Counselling
* Engineering Counselling
* State-level Counselling
* College Selection
* Admission Planning

### Educational Resources

The platform provides educational content covering admission updates, examination information, preparation resources, college information, and career guidance.

## Academic Categories

Admission Campus covers a broad range of academic categories:

* Engineering
* Medical
* Management
* Professional Courses
* Commerce
* Science & Research
* Arts & Humanities
* Design & Architecture

## Platform Structure

```text
Admission Campus
│
├── Colleges
│   ├── All Colleges
│   ├── College Details
│   ├── Top Colleges
│   └── College Comparison
│
├── Exams
│   ├── Entrance Exams
│   ├── Exam Information
│   ├── Exam Dates
│   └── Preparation Resources
│
├── Courses
│   ├── Engineering
│   ├── Medical
│   ├── Management
│   ├── Professional Courses
│   ├── Commerce
│   ├── Science
│   ├── Arts & Humanities
│   └── Design & Architecture
│
├── Admissions
│   ├── Admission Guidance
│   ├── Counselling
│   ├── Eligibility
│   └── Application Support
│
└── Resources
    ├── Blogs
    ├── Admission Updates
    ├── Exam Guides
    └── Career Guidance
```

## Technology Stack

Admission Campus is built using a modern web stack focused on maintainability, performance, responsive design, and scalable content management.

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend & Data

* Next.js API Routes
* Prisma ORM
* PostgreSQL
* REST APIs

### Authentication & Services

* Clerk Authentication
* External APIs and third-party services where required

### Development Tools

* Git
* GitHub
* VS Code
* ESLint
* Prettier

## Project Goals

Admission Campus is designed to:

1. Simplify college discovery.
2. Organize admission information in one place.
3. Help students understand entrance examinations.
4. Make course and college comparison easier.
5. Provide useful admission and counselling resources.
6. Publish structured education and career information.
7. Provide a scalable foundation for future education services.

## Getting Started

### Prerequisites

Make sure the following are installed on your system:

* Node.js
* npm
* Git
* PostgreSQL

### Clone the Repository

```bash
git clone <repository-url>
```

### Navigate to the Project

```bash
cd admission-campus
```

### Install Dependencies

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the environment variables required by your local setup.

Example:

```env
MONGODB_URI=
ADMIN_USERNAME=
ADMIN_PASSWORD=
JWT_SECRET=
RESEND_API_KEY=
ADMIN_EMAIL=
```

Do not commit `.env` or any file containing private credentials, API keys, passwords, tokens, or other sensitive configuration.

### Start Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

## Production

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Run linting:

```bash
npm run lint
```

## Environment Variables

The application uses environment variables for database connectivity, authentication, email services, and other private configuration.

The exact variables required may vary depending on the deployment environment.

Keep production credentials outside the repository and configure them through the deployment platform or secure environment configuration.

## Data & Content

Admission Campus provides structured information about colleges, courses, examinations, fees, admissions, counselling, and related educational topics.

Students should verify important admission, fee, eligibility, examination, and counselling information with the relevant college, university, examination authority, or official counselling authority before making academic or financial decisions.

## Development Workflow

Create a feature branch:

```bash
git checkout -b feature/your-feature
```

Make your changes and verify the application locally.

Then commit your changes:

```bash
git add .
git commit -m "Describe your changes"
```

Push the branch:

```bash
git push origin feature/your-feature
```

For collaborative development, open a pull request with a clear description of the changes.

## Project Status

Admission Campus is under active development.

The platform continues to evolve with improvements to college data, course discovery, admission resources, counselling information, educational content, performance, and user experience.

## License

This project is currently maintained as a private/proprietary project.

Unless explicitly authorized by the project owner, the source code, design, content, database structure, and other project assets should not be copied, redistributed, modified, or used commercially.

## Website

https://www.admissioncampus.in/

```
```
