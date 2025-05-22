# Book-Review

📝 Mini Assignment: Book Review API (Node.js)
Objective:
Build a RESTful API using Node.js (with Express) for a basic Book Review system. This assignment is designed to assess your understanding of backend fundamentals, authentication, and clean API design.

🔧 Requirements:

1. Tech Stack:
   Node.js with Express.js
   Any database (e.g., MongoDB, PostgreSQL, or SQLite)
   Use JWT for authentication
2. Authentication:
   Implement JWT-based user authentication
   Endpoints:
   POST /signup – register a new user
   POST /login – authenticate and return a token
3. Core Features:
   POST /books – Add a new book (Authenticated users only)
   GET /books – Get all books (with pagination and optional filters by author and genre)
   GET /books/:id – Get book details by ID, including:
   Average rating
   Reviews (with pagination)
   POST /books/:id/reviews – Submit a review (Authenticated users only, one review per user per book)
   PUT /reviews/:id – Update your own review
   DELETE /reviews/:id – Delete your own review
4. Additional Feature:
   GET /search – Search books by title or author (partial and case-insensitive)

📦 Deliverables:
Source Code:
Well-structured project with modular code
Use of environment variables (.env) for config
Clear and meaningful comments wherever helpful
README.md with:
Project setup instructions
How to run locally
Example API requests (with curl or Postman)
Any design decisions or assumptions made
Database Schema:
Brief schema design in the README or separate file (ER diagram optional)

📤 Submission Instructions:
Push your code to a GitHub repository
Share the public repo link by pasting the link on the Airtable Form.
