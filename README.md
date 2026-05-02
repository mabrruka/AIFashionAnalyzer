# AI Fashion Analyzer




## Project Overview

AI Fashion Analyzer is a cloud-ready, microservice-based system designed to analyze users’ Pinterest fashion boards and generate personalized outfit recommendations. By processing both visual and metadata features from fashion images, the system identifies user style preferences and suggests curated outfit combinations or purchasable items.


---

## Features

- **Pinterest Board Analysis** – Extracts and processes fashion data from user boards  
- **Style Preference Detection** – Identifies user aesthetics using image analysis  
- **Outfit Recommendation Engine** – Generates personalized outfit suggestions  
- **Style DNA Profile** – Builds a long-term representation of user style  
- **Saved Items System** – Allows users to store recommended items  
- **User Authentication** – Secure registration and login functionality  
- **Results Visualization** – Clear display of analysis insights and breakdowns  

---


## Instructions to Run (Docker)

This project can be containerized and run using Docker for consistent development and deployment environments.

### Prerequisites

- Docker installed on your machine  
- Docker Compose installed (if using multi-container setup)  
- Git installed  

### Build Docker Containers

```bash
docker compose up --build
```
---

### Containers

| Service   | Description           | Port |
|----------|----------------------|------|
| Frontend | React/Vite UI         | 5173 |
| Backend  | Node.js + Express API | 3003 |
| Database | MySQL 8               | 3307 |

Accessing the Application

| Service     | URL                                            |
| ----------- | ---------------------------------------------- |
| Frontend    | [http://localhost:5173](http://localhost:5173) |
| Health check | [http://localhost:3003](http://localhost:3003) |

---

## Tech Stack

### Frontend
- **React (JSX)** – User interface development  
- **React Router DOM** – Client-side routing  
- **CSS (Custom)** – Styling  
- **Vite / Create React App** – Development environment  

### Backend
- **Node.js** – Runtime environment  
- **Express.js** – API framework  
- **MySQL2** – Database connectivity  
- **bcryptjs** – Password hashing  
- **CORS** – Cross-origin request handling  

### Database
- **MySQL (8.x)** – Relational database system  

### Security
- **Password Hashing** – Secure credential storage using bcrypt  
- **Input Validation** – Ensures structured and safe requests  
- **CORS Protection** – Controlled frontend-backend communication  
- **Parameterized Queries** – Prevents SQL injection  

---

## Database Schema

- **users** – Stores user account information and credentials  
- **uploads** – Tracks user-uploaded images or Pinterest links  
- **results** – Contains AI-generated analysis results and scores  
- **saved_items** – Stores user-saved fashion items  
- **style_dna** – Maintains long-term user style profile metrics
  

---
## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|------------|
| POST | `/signup` | Register a new user |
| POST | `/login` | Authenticate user |

### Analysis
| Method | Endpoint | Description |
|--------|----------|------------|
| POST | `/analyze` | Analyze fashion input and generate results |
| GET | `/results` | Retrieve all analysis results |

### Profile
| Method | Endpoint | Description |
|--------|----------|------------|
| GET | `/profile/:id` | Get user profile and analysis history |
| PUT | `/profile/:id` | Update user profile |
---

## Team Members

| Name | Role |
|------|------|
| Mabruka Taher Elmasri | Frontend / Backend Development |
| Noon Aamir Elagail | Documentation / Testing |
