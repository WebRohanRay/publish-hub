# REST API Documentation

The Atlas Journal platform provides a secure API suite built on Next.js 16 App Router route handlers.

## Authentication Endpoints

### `POST /api/auth/login`
Authenticates an administrator with credentials and issues a secure HTTP-only session cookie.
- **Payload**:
  ```json
  {
    "email": "user@example.com",
    "password": "secure_password"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "user": {
      "id": "u100...",
      "name": "Maya Patel",
      "email": "user@example.com",
      "role": "editor_in_chief"
    }
  }
  ```

### `POST /api/auth/logout`
Terminates the active session and clears the session cookie.

### `GET /api/auth/me`
Returns the currently authenticated user's profile metadata.

---

## Public Content Endpoints

### `GET /api/posts`
Fetches published articles with pagination, category filtering, and tag search.
- **Query Parameters**:
  - `limit`: number (default: 10)
  - `page`: number (default: 1)
  - `category`: string (category slug)
  - `tag`: string (tag slug)

### `GET /api/posts/[id]`
Fetches a single post by UUID or slug, including author, tags, and approved comments.

### `GET /api/categories`
Lists all active publication categories with post counts.

### `POST /api/comments`
Submits a reader comment for moderation review.

---

## Admin Endpoints (Session Required)
- `GET /api/admin/stats` — Metrics overview (posts, views, subscribers, comments)
- `GET/POST /api/admin/posts` — Article management
- `GET/POST /api/admin/categories` — Taxonomy controls
- `GET/POST /api/admin/comments` — Comment moderation queue
- `GET/POST /api/admin/media` — Supabase Storage asset registry
