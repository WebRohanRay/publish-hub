# Changelog

All notable changes to the **Atlas Journal / Publish Hub** platform are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-10-10

### Added
- **Supabase Cloud Database Integration**: Full relational data persistence layer for posts, authors, categories, tags, comments, and media assets.
- **Dynamic Admin Dashboard**: Real-time admin views connected to live Supabase backend with zero mock data dependency.
- **Storage Asset Pipeline**: Automated Supabase Storage bucket synchronization script for local-to-cloud media hosting.
- **Deep Editorial Content**: High-intent, fact-checked editorial posts including 2,100+ word deep-dive investigations with comparison matrices.
- **Standalone Admin Login**: Full-screen authentication interface with Supabase Cloud status telemetry and custom session management.

### Changed
- Converted primary and foreign keys in database migrations and seed scripts to standard hexadecimal UUID v4 formats.
- Modernized styling with dark obsidian palette, emerald telemetry badges, and glassmorphism cards.
- Refactored category routing and post filtering to support both dynamic cloud queries and resilient fallback modes.

### Fixed
- Fixed PostgreSQL UUID parsing error in seed generator by standardizing hex identifier padding.
- Enhanced API authentication error logging to capture explicit message traces.

---

## [1.0.0] - 2026-09-01

### Added
- Initial release of Publish Hub platform built on Next.js 16 (Turbopack) and React 19.
- Responsive reader view with reading time estimates, author cards, and newsletter capture.
- RSS 2.0 and Atom XML feeds with automated dynamic generation.
- Dynamic XML sitemap and robots.txt generation.
- Modern Tailwind CSS v4 styling system.
