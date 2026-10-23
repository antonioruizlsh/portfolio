# Antonio Ruiz — Video & Marketing Portfolio

Static website (HTML + CSS + JavaScript), fully in English, built from Antonio's CV.
Designed to show his videos and to present him as a Computer Science Engineer with a
marketing development who is enthusiastic about marketing projects and teamwork.
Colors: black + `#66DDFF` · Fonts: Inter / Helvetica + Instrument Serif

## Structure
```
portfolio-up-next/
├── index.html
├── css/styles.css
├── js/script.js          ← ⭐ EDIT THIS FILE to add your videos
├── assets/
│   ├── CV-ANTONIO_RUIZ.pdf   ← downloadable from the Contact section
│   ├── videos/               ← put your .mp4 files here (type: "local")
│   └── thumbnails/           ← put your video cover images here
├── netlify.toml
└── README.md
```

## ⭐ How to add / change a video
Open `js/script.js`, find the `videos` list at the top, and copy one block.
You have 3 options per video:

**1. YouTube (easiest — recommended)**
```js
type: "youtube",
videoId: "ABC123xyz",   // the part after watch?v= or shorts/
```
The thumbnail loads automatically and the video plays inside the site.

**2. Your own .mp4 file**
```js
type: "local",
src: "assets/videos/my-video.mp4",   // copy the file into assets/videos/
```

**3. TikTok / Instagram link**
```js
type: "link",
url: "https://www.tiktok.com/@you/video/123456",
```
The visitor clicks and watches it on that platform.

Also set: `title`, `desc`, `duration` (e.g. "0:55") and `category`:
`short-form` · `clients` · `personal` · `ads` · `motion`

Your photo lives at `assets/photo-antonio.jpg` (extracted from your CV).
Replace that file — same name — to change it.

Optional cover image: `thumbnail: "assets/thumbnails/my-video.jpg"`

## Publish on GitHub
**Web (no terminal):** github.com → `+` → New repository → name it `portfolio`
→ *uploading an existing file* → drag the **contents** of this folder
(so `index.html` sits at the root) → Commit.

**Terminal:**
```bash
git init && git add . && git commit -m "Antonio Ruiz - Video Portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USER/portfolio.git
git push -u origin main
```

## Publish on Netlify
netlify.com → Add new site → Import an existing project → GitHub → pick the repo.
Build command: *(empty)* · Publish directory: `.` (already in `netlify.toml`) → Deploy.
Every `git push` republishes automatically.
Rename your site under Site configuration → Site details (e.g. `antonio-ruiz`).

## Before sharing it with employers
- [ ] Replace the 6 video slots in `js/script.js` with your real videos
- [ ] Check your email / LinkedIn / phone in the Contact section of `index.html`
- [ ] Optional: make the contact form real with Netlify Forms —
      add `name="contact" data-netlify="true"` to the `<form>` tag in `index.html`
