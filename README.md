# tools.drwan.com

Routes (no /tools prefix):
- / (All tools)
- /bmi
- /bmr
- /tdee
- /heart-rate
- /glucose
- /a1c

Language:
- English default
- Chinese via `?lang=zh`

## Add a new tool (fast)
1) Create a folder under `app/(tools)/YOUR-SLUG/`
2) Add `page.tsx` (and optional `*.client.tsx`)
3) Update the nav links in `app/(tools)/layout.tsx` (optional but recommended)
4) Add the card on the homepage `app/(tools)/page.tsx`

All pages automatically share global styles from `app/globals.css` and the topbar layout.

## Local
```bash
npm install
npm run dev
```

## Deploy (Vercel)
Push to GitHub → Import to Vercel → add domain `tools.drwan.com`.
