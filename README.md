# FreeFire AI Sensitivity

A GitHub Pages-ready static website using a Supabase Edge Function and Gemini API.

## Features
- Smooth ENTER intro animation
- Loading screen
- Device / player-style / graphics inputs
- Language-aware Gemini recommendation
- Supabase database storage
- Gemini API key stays on the backend, not in GitHub

## Supabase already configured
Project URL:
`https://cvwkvwvdtvmhlqpdyojn.supabase.co`

Edge Function:
`freefire-sensitivity`

Database table:
`sensitivity_requests`

## GitHub Pages
1. Create a repository named `FreeFire-AI-Sensitivity`.
2. Upload `index.html`, `style.css`, `app.js`, and `README.md`.
3. GitHub -> Settings -> Pages.
4. Deploy from the `main` branch, root folder.
5. Open the generated Pages URL.

## Important
Do NOT put your Gemini API key in `app.js` or any public GitHub file.
Set the `GEMINI_API_KEY` secret for the Supabase Edge Function.

The generated values are starting-point recommendations, not guaranteed gameplay results.
