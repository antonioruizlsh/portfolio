# Antonio Ruiz — Video & Marketing Portfolio

Static website (HTML + CSS + JavaScript), fully in English, built from Antonio's CV.
Designed to show his videos and to present him as a Computer Science Engineer with a
marketing development who is enthusiastic about marketing projects and teamwork.
Colors: black + `#66DDFF` · Fonts: Inter / Helvetica + Instrument Serif

## Structure
```
portfolio/
├── index.html
├── css/styles.css
├── js/script.js          ← ⭐ the `videoFolders` list at the top controls the videos
├── assets/
│   ├── CV-ANTONIO_RUIZ.pdf   ← downloadable from the Contact section
│   ├── photo-antonio.jpg     ← profile photo (About section)
│   ├── documents/            ← ⭐ website designs (PDF + full-page JPG)
│   │   ├── baja-at-website.pdf / .jpg
│   │   └── mitsubishi-mexicali-l200.pdf / .jpg
│   └── videos/               ← ⭐ your video files live here, in folders:
│       ├── Asesora de ventas/    Video 1.mp4 · Video 2.mp4 · Video 3.mp4
│       ├── Asesores Legales/     Video 1.mp4 · Video 2.mp4 · Video 3.mp4
│       └── Personal/             Video 1.mp4 · Video 2.mp4 · Video 3.mp4
├── netlify.toml
└── README.md
```

## ⭐ How the videos work — FOLDERS
The gallery reads your videos from folders, exactly how you keep them:

- Each **folder** inside `assets/videos/` = one filter in *Video Portfolio*
  (Asesora de ventas · Asesores Legales · Personal).
- Each **file** inside a folder = one video card, shown with its own name
  (a file called `Video 1.mp4` shows as **Video 1**).
- The card shows the video's own first frame as its cover, and clicking it
  plays the video inside the site (9:16 player).
- The hero carousel uses the same list automatically.

**To add a video:** upload the file into its folder and add ONE line with its
exact file name to that folder's `files` list at the top of `js/script.js`:
```js
files: ["Video 1.mp4", "Video 2.mp4", "Video 3.mp4", "Video 4.mp4"]
```
**To remove one:** delete its line (and the file).
⚠️ Names must match EXACTLY — capitals and spaces included — or the site
won't find the file.

**To add a whole new folder/category:** create the folder in `assets/videos/`
and add a block to `videoFolders` in `js/script.js` — the filter button for it
appears automatically, no HTML editing needed.

> GitHub note: the web uploader accepts files up to 25 MB each. If a video is
> heavier, compress it first (or ask Muse to switch that slot to a
> YouTube/TikTok link instead).

## ⭐ How the documents work — WEB DESIGN section
The *Web Design* section shows your website designs (the PDFs) **inside**
the site — visitors scroll through the full design without downloading:

- Each design = one block in the `webDesigns` list in `js/script.js`:
  `title`, `client`, `desc`, `file` (the PDF) and `image` (the full-page JPG).
- The **JPG** is what renders inside the site (fast, works on phones).
  The section is **view-only**: no open/download buttons for the PDFs, and
  the video player has its download option disabled too. The PDF file stays
  in `assets/documents/` in case you ever want the buttons back.
- **To add one:** upload `name.pdf` + `name.jpg` (full-page image of the
  design, same name) into `assets/documents/` and add one block to the list.
  Ask Muse to generate the JPG from your PDF if you don't have one.

Your photo lives at `assets/photo-antonio.jpg` (extracted from your CV).
Replace that file — same name — to change it.

## Hero carousel
The carousel on the right side of the hero is **vertical and automatic**: slides
use the exact **9:16 aspect ratio (1080×1920 — the social media / Reels format,
same as Antonio's videos)**, capped at 352px wide so it looks like a phone, and
move **upwards** every 3.5 seconds, looping back to the first one (pauses on
hover). The video player modal is also 9:16, so vertical videos play full-frame.
It is built from the same video list as the gallery — you never edit it
separately: add a video and it appears in the carousel too. The ↑ / ↓ buttons
and the dots let visitors navigate manually. Clicking a slide scrolls to that
exact video card in Video Portfolio and highlights it.

## Publish on GitHub
**Web (no terminal):** open your repo → go into your site folder → *Add file →
Upload files* → drag the files → Commit.
Replace `index.html`, `css/styles.css` and `js/script.js` with the new versions,
and upload your videos into `assets/videos/<folder name>/`.

## Publish on Netlify
Connected to the GitHub repo — every push republishes automatically.
(Publish directory: `portfolio-antonio-ruizV2` — already configured, don't touch.)

## Before sharing it with employers
- [ ] Upload your real videos into their folders in `assets/videos/`
- [ ] Check the file names in `js/script.js` match your uploaded files exactly
- [ ] Check your email / LinkedIn / phone in the Contact section of `index.html`
