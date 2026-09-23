# NoxWire REST API Reference

This document outlines the public and administrative HTTP endpoints provided by the Next.js API router.

---

## 1. Geo-IP Resolution

- **Endpoint**: `GET /api/geo`
- **Description**: Inspects incoming edge headers (`x-vercel-ip-country`, `cf-ipcountry`, `accept-language`) and resolves visitor locale (`en`, `es`, `de`, `fr`).
- **Response**:
  ```json
  {
    "country": "ES",
    "locale": "es",
    "source": "x-vercel-ip-country"
  }
  ```

---

## 2. Comments API

- **Endpoint**: `POST /api/comments`
- **Description**: Submits a guest comment for moderation. All comments are initially set to `pending`.
- **Payload**:
  ```json
  {
    "postId": "uuid-v4",
    "authorName": "Jane Doe",
    "authorEmail": "jane@example.com",
    "body": "Insightful breakdown of RTP payout curves."
  }
  ```

---

## 3. Likes & Engagement

- **Endpoint**: `POST /api/likes`
- **Description**: Increments or records an anonymous like event deduplicated by client token hash.
- **Payload**:
  ```json
  {
    "postId": "uuid-v4",
    "tokenHash": "sha256-anonymous-fingerprint"
  }
  ```

---

## 4. Newsletter Subscriptions

- **Endpoint**: `POST /api/newsletter`
- **Description**: Adds an email to the weekly Sunday dispatch queue with normalized lowercase deduplication.
- **Payload**:
  ```json
  {
    "email": "reader@domain.com"
  }
  ```

---

## 5. View Events Analytics

- **Endpoint**: `POST /api/views`
- **Description**: Records privacy-safe article impressions without persistent third-party cookies.
