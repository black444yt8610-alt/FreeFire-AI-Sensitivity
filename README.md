# FreeFire AI Sensitivity Lab — Full Prompt v3

## Backend

Supabase Edge Function:

`freefire-sensitivity-v3`

Endpoint:

`https://cvwkvwvdtvmhlqpdyojn.supabase.co/functions/v1/freefire-sensitivity-v3`

The function is deployed and active.

## AI failover

The backend NEVER returns immediately just because Gemini fails.

Order:

1. Gemini API 1
2. Groq API 2
3. Groq API 3

Every provider has its own try/catch. If Gemini is rate-limited, out of quota, unavailable, or returns an HTTP error, Groq API 2 is attempted. If Groq API 2 fails, Groq API 3 is attempted.

## Required Supabase Edge Function secrets

Add these in Supabase Edge Function Secrets:

- GEMINI_API_KEY
- GROQ_API_KEY_2
- GROQ_API_KEY_3

The website contains NONE of these API keys.

## Full AI prompt

The backend contains a detailed master system prompt covering:

- Free Fire sensitivity range is 0–200, NOT 0–100.
- General, Red Dot, 2x Scope, 4x Scope, Sniper Scope and Free Look must be integers from 0–200.
- Fire Button Size is a separate percentage.
- Device, player style, graphics and language are analyzed.
- Low sensitivity means controlled/stable recommendations.
- High sensitivity means faster recommendations while remaining practical.
- Graphics are treated only as context; the AI must not invent exact FPS or hardware specifications.
- Sensitivity values should remain internally consistent.
- No guaranteed headshots or guaranteed competitive results.
- No cheating tools, scripts, exploits, modified clients or macros.
- Output has exactly four sections:
  1. DEVICE ANALYSIS
  2. RECOMMENDED SETTINGS
  3. WHY THESE SETTINGS
  4. FINE-TUNING
- Recommended fields:
  General
  Red Dot
  2x Scope
  4x Scope
  Sniper Scope
  Free Look
  Fire Button Size
- The model silently verifies every sensitivity number before answering.

## GitHub

Upload these files to your GitHub Pages repository:

- index.html
- style.css
- app.js
- README.md

Do not upload API keys.

## Important

If Gemini quota is exhausted, the website should still work as long as at least one Groq secret is correctly configured in Supabase.
