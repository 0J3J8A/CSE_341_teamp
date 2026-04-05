# Vacation API

APIs for managing vacation **packages** and **reviews**.  
Built with Node.js, Express, MongoDB, and documented using Swagger.

---

## 📖 Overview
This project provides a RESTful API with two main collections:
- **Packages** → Vacation packages with details like name, type, price, duration, description, and availability.
- **Reviews** → User reviews linked to destinations/packages, including rating, comment, and author.

The API supports full CRUD operations and custom queries for filtering.

---

## 🚀 Workflow

This API supports two collections: **Packages** and **Reviews**.  
Here’s the typical flow for using them:

### 1. Create a Package
- **Endpoint:** `POST /packages/`
- **Body Example:**
```json
{
  "name": "Highlands Adventure",
  "type": "Tour",
  "price": 1200,
  "duration": "7 days",
  "description": "Explore the Highlands with guided hikes and cultural visits.",
  "availability": true
}

### 2. Get All Packages
- **Endpoint:** `GET /packages/`
- Returns all packages in the database.

### 3. Add a Review
- **Endpoint:** `POST /reviews/`
- **Body Example:**
```json
{
  "destination": "Highlands Adventure",
  "rating": 5,
  "comment": "Amazing trip! Guides were very knowledgeable.",
  "author": "Traveler Joe"
}

### 4. Query Packages by Type
- **Endpoint:** `GET /packages/findByType?type=Tour`
- Returns packages filtered by type.

### 5. Query Reviews by Keyword
- **Endpoint:** `GET /reviews/findByReview?q=Amazing`
- Returns reviews containing the keyword.

### 6. Update or Delete
- **Update Package:** `PUT /packages/{id}`
- **Delete Package:** `DELETE /packages/{id}`
- **Update Review:** `PUT /reviews/{id}`
- **Delete Review:** `DELETE /reviews/{id}`

---

### ✅ End-to-End Example
1. Create a package (`Highlands Adventure`).  
2. Add a review for that package.  
3. Query packages by type (`Tour`).  
4. Query reviews by keyword (`Amazing`).  
5. Update or delete entries as needed.

---

## 📌 Notes
- **Base URL:** `https://cse-341-team-app.onrender.com/`
- **Swagger Docs:** Available at `/api-docs`
- **Database:** MongoDB stores raw values (e.g., `price` as number, `availability` as boolean).
- **Error Handling:** Endpoints return appropriate status codes (`200`, `201`, `400`, `404`, `500`).

## 🛠 Getting Started
1. Clone the repo: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Run the server: `npm start`
4. Visit Swagger docs at: `http://localhost:3000/api-docs`

## ⚙️ Technologies
- Node.js
- Express.js
- MongoDB
- Swagger (OpenAPI)

## 🔗 Entity Relationship
Package
 ├── id
 ├── name
 ├── type
 ├── price
 ├── duration
 ├── description
 └── availability

Review
 ├── id
 ├── destination (linked to Package.name)
 ├── rating
 ├── comment
 └── author

➝ One Package can have many Reviews

## 🌐 Deployment
Live API: https://cse-341-team-app.onrender.com/
Swagger Docs: https://cse-341-team-app.onrender.com/api-docs

