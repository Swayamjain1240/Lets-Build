# Startup Collaboration Platform

A privacy-focused full-stack collaboration platform that helps students and developers find suitable teammates based on skills and private project requirements.

The platform solves a common problem: one student may have a strong project idea but lack the required team, while another student may have the right technical skills but no suitable project to join. Instead of publicly exposing complete project ideas, the system focuses on developer discovery, controlled recruitment, and AI-assisted skill matching.

## Core Idea

```text
Project Owner
    ↓
Creates Private Project
    ↓
Defines Required Skills
    ↓
AI Recommendation
    ↓
Recommended Developers
    ↓
Invitation / Join Request
    ↓
Team Collaboration
    ↓
Chat + Video
```

## Key Features

- User signup, login and logout using a single JWT authentication flow
- User onboarding and editable developer profiles
- Dynamic technical skills
- Skill normalization for variations such as `Node.js`, `NodeJS`, and `Node JS`
- Developer/user discovery through skill-based profiles
- Private project creation and management
- Recruitment requirements without publicly exposing the complete project idea
- Join requests and project invitations through a unified Request module
- AI-assisted collaborator recommendation
- Semantic skill matching and candidate ranking
- Team/member management
- Real-time notifications
- Real-time chat and video communication
- Profile/media upload using Cloudinary
- User report submission

## Privacy-First Project Discovery

Project ideas are **not displayed publicly on the Home feed**.

The public discovery experience focuses on users and their skills. A project owner can privately define the project and required skills, then use recruitment and AI recommendations to find suitable collaborators.

## AI Recommendation Flow

```text
Required Skills
      ↓
Skill Normalization
      ↓
Candidate Retrieval
      ↓
Semantic Matching
      ↓
Skill Similarity
      ↓
Candidate Ranking
      ↓
Recommended Developers
```

The AI layer is separated from the main application backend so that recommendation logic can evolve independently.

## Technology Stack

### Frontend

- React
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Socket.IO
- Cloudinary

### AI Services

- Python
- FastAPI
- Skill normalization
- Embeddings
- Semantic similarity
- Recommendation ranking

## Project Architecture

```text
startup-collaboration-platform/
│
├── frontend/       # React user interface
├── backend/        # Node.js application backend
├── aiServices/     # Python AI recommendation service
├── docs/           # Internal design/development documents
├── .gitignore
└── README.md
```

### System Flow

```text
                 Frontend
              React + Vite
                    │
                    │ REST / Socket.IO
                    ▼
                 Backend
            Node.js + Express
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
     MongoDB    Cloudinary   Socket.IO
        │
        └───────────────┐
                        ▼
                   AI Services
                Python + FastAPI
                        │
                        ▼
                  Normalization
                        ↓
                    Embeddings
                        ↓
                Semantic Matching
                        ↓
                     Ranking
                        ↓
               Recommended Users
```

## Backend Structure

```text
backend/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── project.controller.js
│   │   ├── recruitment.controller.js
│   │   ├── request.controller.js
│   │   ├── recommendation.controller.js
│   │   ├── team.controller.js
│   │   ├── notification.controller.js
│   │   ├── communication.controller.js
│   │   └── report.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── upload.middleware.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   ├── skill.model.js
│   │   ├── project.model.js
│   │   ├── recruitment.model.js
│   │   ├── request.model.js
│   │   ├── conversation.model.js
│   │   ├── message.model.js
│   │   ├── notification.model.js
│   │   └── report.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── project.routes.js
│   │   ├── recruitment.routes.js
│   │   ├── request.routes.js
│   │   ├── recommendation.routes.js
│   │   ├── team.routes.js
│   │   ├── notification.routes.js
│   │   ├── communication.routes.js
│   │   └── report.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── user.service.js
│   │   ├── project.service.js
│   │   ├── recruitment.service.js
│   │   ├── request.service.js
│   │   ├── recommendation.service.js
│   │   ├── team.service.js
│   │   ├── notification.service.js
│   │   ├── communication.service.js
│   │   └── report.service.js
│   │
│   ├── sockets/
│   │   └── socket.js
│   │
│   ├── utils/
│   │   ├── normalizeSkill.js
│   │   └── generateToken.js
│   │
│   └── index.js
│
├── .env
├── .env.example
└── package.json
```

## AI Services Structure

```text
aiServices/
│
├── app/
│   ├── api/
│   │   ├── recommendation.py
│   │   └── health.py
│   │
│   ├── services/
│   │   ├── normalization_service.py
│   │   ├── embedding_service.py
│   │   ├── semantic_service.py
│   │   ├── matching_service.py
│   │   └── ranking_service.py
│   │
│   ├── schemas/
│   │   └── recommendation_schema.py
│   │
│   ├── utils/
│   │   ├── text_cleaner.py
│   │   └── similarity.py
│   │
│   ├── config/
│   │   └── settings.py
│   │
│   └── main.py
│
├── .env
├── .env.example
├── requirements.txt
└── README.md
```

## Backend Design Pattern

The backend follows a simple layered flow:

```text
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Model / AI Service / External Service
  ↓
Response
```

Controllers coordinate HTTP requests and responses, while services contain the main business logic.

## Authentication

The project uses a **single JWT token** rather than separate access and refresh tokens.

```text
Login / Signup
      ↓
Generate JWT
      ↓
Client sends token
      ↓
Authorization: Bearer <token>
      ↓
auth.middleware.js
      ↓
Protected API
```

Passwords are hashed using bcrypt before being stored in MongoDB.

## Skill System

Skills are dynamic. Users are not restricted to a small manually defined list.

For example:

```text
Node.js
NodeJS
Node JS
nodejs
```

The normalization layer converts formatting differences into a common representation. Semantic matching in the AI service handles meaning-based relationships that simple string normalization cannot reliably solve.

The `skill.model.js` remains shared between user profiles, project requirements, and recommendation logic.

## Request System

Join requests and invitations use one Request module.

```text
Join Request:
User → Project Owner

Invitation:
Project Owner → User
```

A request can maintain states such as:

```text
pending
accepted
rejected
```

## Communication

Chat and video calling are grouped into one Communication module.

Socket.IO handles real-time behavior through a single backend `socket.js` entry point, including messaging and other required live events.

Conversation and Message remain separate database models so message history does not make individual conversation documents unnecessarily large.

## Development Strategy

The project should be implemented in this order:

```text
1. Project Setup
2. Database Connection
3. Authentication
4. User + Onboarding + Profile
5. Skills
6. Private Projects
7. Recruitment
8. Requests / Invitations
9. Team Management
10. Notifications
11. Communication
12. Reports
13. AI Service Setup
14. Skill Normalization
15. Semantic Matching
16. Recommendation Ranking
17. Full Integration
18. Deployment
```

The core application should work reliably before integrating the advanced AI recommendation layer.

## Environment Variables

Example backend `.env`:

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
CLIENT_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

AI_SERVICE_URL=
```

Never commit real `.env` secrets to GitHub.

## Current Scope Decisions

The current version intentionally does **not** include:

- Admin panel
- Public project-idea feed
- Access + refresh token architecture
- Separate chat and video modules
- Separate join-request and invitation modules
- Separate skill controller/service/routes
- Multiple Socket.IO files
- Rate-limit middleware
- Validation middleware layer
- Constants folder
- Complex enterprise architecture

These decisions keep the application manageable while preserving the core collaboration and AI functionality.

## Goal

The final goal is to create a platform where a student can:

**Create a private idea → specify required skills → discover suitable developers → receive AI recommendations → invite collaborators → form a team → communicate and build together.**

---

**Project Type:** College Minor Project  
**Architecture:** Frontend + Node Backend + Independent AI Service  
**Primary Focus:** Skill-Based Collaboration + Private Project Recruitment + AI Recommendations
