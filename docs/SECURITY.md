# Security Policy & Guidelines

## Core Principles
1. **Zero Secret Leaks**:
   - Never commit API keys, service role keys, database passwords, or JWT secrets to Git.
   - All runtime secrets must reside exclusively in `.env.local` or host environment variables (e.g. Vercel dashboard).

2. **Supabase Row-Level Security (RLS)**:
   - All tables enforce RLS enabled by default.
   - Public read access is granted only to published posts, approved comments, categories, and tags.
   - Write operations (INSERT, UPDATE, DELETE) require authenticated role or backend service role.

3. **Input Sanitization & CSRF**:
   - All API endpoints validate request payloads before database upsertion.
   - Comments and user-submitted inputs are sanitized against XSS payloads.

4. **Reporting Vulnerabilities**:
   - If you identify a security issue, please email security@atlasjournal.io instead of opening public issues.
