# Saree Inventory Manager

A mobile-first, minimalist inventory management application for saree businesses.

## Tech Stack
- **Frontend**: React 18 + Vite (TypeScript)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Vanilla CSS (Mobile-First)

## Setup Instructions

### 1. Database
Run the SQL script in `supabase_schema.sql` in your Supabase SQL Editor.

### 2. Local Development
1. Create a `.env` file and add:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```
2. Run `npm install`
3. Run `npm run dev`

### 3. Deployment
Deploy to Vercel and add the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables.
