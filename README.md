install dependencies :
npm install

run server locally :
nodemon server.js

server starts at : http://localhost:3000

## 🧪 API Endpoints & Example Requests

### 📘 User Authentication

#### Sign Up

POST `/signup`

```bash
curl -X POST http://localhost:5000/signup \
-H "Content-Type: application/json" \
-d '{"username": "vedanti", "email": "vedanti@example.com", "password": "securepass"}'
```

#### Login

POST `/login`

```bash
curl -X POST http://localhost:5000/login \
-H "Content-Type: application/json" \
-d '{"email": "vedanti@example.com", "password": "securepass"}'
```

---

### Book Management

#### Add Book (requires token)

POST `/books`

```bash
curl -X POST http://localhost:5000/books \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{"title": "Deep Work", "author": "Cal Newport", "genre": "Productivity", "publishedYear": 2016}'
```

#### Get All Books

GET `/books`

```bash
curl http://localhost:5000/books
```

#### Get Book by ID

GET `/books/:id`

```bash
curl http://localhost:5000/books/<book_id>
```

#### Update Book

PUT `/books/:id`

```bash
curl -X PUT http://localhost:5000/books/<book_id> \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{"genre": "Self-help"}'
```

#### Delete Book

DELETE `/books/:id`

```bash
curl -X DELETE http://localhost:5000/books/<book_id> \
-H "Authorization: Bearer <your_token>"
```

---

### Reviews

#### Add Review to a Book

POST `/:id/review` (book_id required)

```bash
curl -X POST http://localhost:5000/<book_id>/review \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{"rating": 5, "comment": "Excellent read!"}'
```

#### Get Average Rating

GET `/:id/average-rating`

```bash
curl http://localhost:5000/<book_id>/average-rating
```

#### Update a Review

PUT `/update-review/:review_id`

```bash
curl -X PUT http://localhost:5000/update-review/<review_id> \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{"rating": 4, "comment": "Updated my review"}'
```

#### Delete a Review

DELETE `/reviews/:review_id`

```bash
curl -X DELETE http://localhost:5000/reviews/<review_id> \
-H "Authorization: Bearer <your_token>"
```

---

### Note on Authentication

All endpoints marked with `Bearer <your_token>` require the JWT token returned from the `/login` response.
