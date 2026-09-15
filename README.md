# Nexaro V7 — Accounts + AI Sensitivity

## Included
- User Log in
- Create Nexaro Account
- Admin Login UI
- Supabase Auth password authentication
- Nexaro username profile table/trigger
- Existing Nexaro V7 sensitivity generator
- Better backend error display instead of a generic network error

## Important Supabase setting
Nexaro uses username/password accounts backed by Supabase Auth. The username is mapped internally to a non-mailbox identity such as `username@accounts.nexaro.local`.

For this username-only flow, turn **Confirm Email** off in Supabase Authentication settings. Otherwise Supabase will create the account but wait for an email confirmation that the synthetic address cannot receive.

## Admin
The Admin Login screen is implemented. An account must have `role = 'admin'` in `public.nexaro_accounts` to use it. New accounts are created as `user`.

After creating the first Nexaro account, promote the intended account to admin from the Supabase SQL Editor/Table Editor. Do not put an admin password in GitHub or frontend JavaScript.

## Security
Passwords are handled by Supabase Auth rather than stored in this repository. The project uses the public publishable key in the browser; secret/service keys must remain in Supabase server-side secrets.
