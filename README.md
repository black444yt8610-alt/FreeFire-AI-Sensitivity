# FreeFire AI Sensitivity — Gemini + Groq Fallback

Flow:
1. Gemini API 1 (`GEMINI_API_KEY`)
2. If Gemini fails, Groq API 2 (`GROQ_API_KEY_2`)
3. If Groq API 2 fails, Groq API 3 (`GROQ_API_KEY_3`)

The website never contains API keys. It calls the Supabase Edge Function, which reads the keys from Supabase secrets.

## Important Free Fire rule
The AI prompt permanently states that sensitivity uses a **0–200** scale, not 0–100.

## Supabase
Project URL:
https://cvwkvwvdtvmhlqpdyojn.supabase.co

Function:
freefire-sensitivity

## GitHub Pages
Upload `index.html`, `style.css`, `app.js`, and `README.md` to your repository and enable Pages from `main` / root.
