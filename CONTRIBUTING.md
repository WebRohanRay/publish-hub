# Contributing to Publish Hub

Thank you for your interest in contributing to **Publish Hub (Atlas Journal)**!

## Local Development Workflow

1. **Clone and Install**:
   ```bash
   git clone https://github.com/WebRohanRay/publish-hub.git
   cd publish-hub
   npm install
   ```

2. **Environment Configuration**:
   ```bash
   cp .env.example .env.local
   # Fill in NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
   ```

3. **Database Setup**:
   - Execute `supabase/schema.sql` in your Supabase SQL Editor.
   - Run `npm run seed` to populate tables with initial editorial articles.

4. **Running Locally**:
   ```bash
   npm run dev
   ```

5. **Code Standards**:
   - Run `npm run lint` before committing.
   - Verify production build with `npm run build`.
   - Write commit messages following [Conventional Commits](https://www.conventionalcommits.org/).
