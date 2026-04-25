# AI Fashion Analyzer

Course: UYG414 – Special Topics in Software Development

---

## Project Overview

AI Fashion Analyzer is a cloud-ready microservice-based system that analyzes users’ Pinterest fashion boards and generates personalized outfit recommendations. It processes visual and metadata features from fashion images to understand user preferences and suggest outfit combinations or purchasable fashion items.


---

## Team Members

| Name | Student Number | Role |
|------|----------------|------|
| Mabruka Taher Elmasri | B2280.060169 | Frontend / Backend Development |
| Noon Aamir Elagail | B2280.060168 | Documentation / Testing |

---

## Features

| Feature | Description |
|----------|-------------|
| Pinterest Board Analysis | Processes user Pinterest boards and extracts fashion data |
| Style Preference Detection | Identifies user aesthetic based on image features |
| Outfit Recommendation Engine | Generates personalized outfit suggestions |
| Style Profile (Style DNA) | Builds a long-term user fashion profile |
| Saved Items System | Allows users to save recommended fashion items |
| User Authentication | Secure login and registration system |
| Results Visualization | Displays analysis outcomes and style breakdown |

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React (JSX) | 18.x | UI development |
| React Router DOM | 6.x | Routing |
| CSS (Custom) | - | Styling |
| Vite / CRA | Latest | Frontend runtime |

---

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime environment |
| Express.js | 4.x | API framework |
| CORS | 2.x | Cross-origin handling |
| MySQL2 | 3.x | Database connector |
| bcryptjs | 2.x | Password hashing |

---

### Database

| System | Version |
|--------|---------|
| MySQL | 8.x |

---

### Security

| Feature | Description |
|----------|-------------|
| Password Hashing | Uses bcrypt for secure password storage |
| Input Validation | Ensures safe and structured API requests |
| CORS Protection | Controls frontend-backend access |
| SQL Safety | Uses parameterized queries to prevent injection |

---

## Database Schema

### `users`

| Field | Description |
|------|-------------|
| id | User ID |
| username | User name |
| email | Login email |
| password | Hashed password |
| created_at | Account creation timestamp |

---

### `uploads`

| Field | Description |
|------|-------------|
| id | Upload ID |
| user_id | Owner of upload |
| type | image or pinterest |
| pinterest_url | Pinterest link (optional) |
| created_at | Upload timestamp |

---

### `results`

| Field | Description |
|------|-------------|
| id | Result ID |
| user_id | Owner |
| upload_id | Related upload |
| aesthetic | Detected style |
| score | Confidence score (0–100) |
| description | AI explanation |
| created_at | Timestamp |

---

### `saved_items`

| Field | Description |
|------|-------------|
| id | Item ID |
| user_id | Owner |
| title | Item name |
| image_url | Image link |
| brand | Brand name |
| created_at | Timestamp |

---

### `style_dna`

| Field | Description |
|------|-------------|
| id | Record ID |
| user_id | Owner |
| minimalism | Style score |
| classic | Style score |
| modern | Style score |
| sustainable | Style score |
| updated_at | Last update time |

---

## API Endpoints

The system exposes RESTful APIs grouped by functionality.

---

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Creates a new user account |

**Request Body**
- username  
- email  
- password  

**Response**
- Success message or error message  

---

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/login` | Authenticates an existing user |

**Request Body**
- email  
- password  

**Response**
- User data and success message or error  

---

## Analysis

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/analyze` | Generates AI fashion analysis from uploaded data |

**Request Body**
- mode (image or pinterest)  
- images (array)  
- url (Pinterest link, optional)  
- myStyle (boolean)  
- inspo (boolean)  

**Response**
- aesthetic (style name)  
- score (0–100)  
- description (AI explanation)  

---

## Results

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/results` | Retrieves saved analysis results |

**Response**
- List of results (newest first)  

---

## Profile

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/profile/:id` | Retrieves user profile and history |

**Response**
- User information  
- Analysis history  
