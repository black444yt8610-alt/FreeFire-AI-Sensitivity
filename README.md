# FreeFire AI Sensitivity v2

Updated for the current Free Fire sensitivity scale.

## Critical AI rule
Free Fire sensitivity has a maximum of **200**, not 100. The Gemini backend prompt explicitly enforces this:
- Every sensitivity value must be an integer from 0 to 200.
- Never recommend or describe 100 as the maximum.
- Check every generated value before returning it.
- Fire button size is handled separately as a percentage.

Garena's official patch notes state that the sensitivity cap was increased to 200. The official Free Fire site also lists current 2026 updates.

## Backend
Supabase Edge Function:
`freefire-sensitivity`

The Gemini API key must remain in the Supabase backend secret:
`GEMINI_API_KEY`

Never put the Gemini API key in this repository.

## GitHub Pages
Upload `index.html`, `style.css`, `app.js`, and `README.md` to a GitHub repository and enable GitHub Pages from the `main` branch/root.
