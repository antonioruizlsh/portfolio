// ================= ANTONIO RUIZ — VIDEO PORTFOLIO =================
// HOW TO ADD YOUR VIDEOS — edit ONLY this list:
//
// type: "youtube"  -> put the YouTube ID in `videoId`
//                     Example: for https://youtube.com/watch?v=ABC123xyz  -> videoId: "ABC123xyz"
//                     For a Short: https://youtube.com/shorts/ABC123xyz -> same ID
// type: "local"    -> copy your .mp4 into assets/videos/ and put its path in `src`
//                     Example: src: "assets/videos/my-video.mp4"
// type: "link"     -> for TikTok / Instagram: put the full URL in `url`
//                     The card will open the video on that platform (TikTok/IG block some embeds)
//
// thumbnail: (optional) image path, e.g. "assets/thumbnails/musk.jpg"
//            If you leave it empty, YouTube thumbnails load automatically,
//            and local/link videos get a branded placeholder.
// category: "short-form" | "clients" | "personal" | "ads" | "motion"
// ===================================================================

const videos = [
  {
    title: "Elon Musk 2008 — About to Lose Everything",
    category: "personal",
    label: "Personal Project · Short-Form",
    desc: "Faceless storytelling video. Voiceover, B-roll and animated text.",
    meta: "Script, editing & motion · Premiere Pro, Photopea",
    duration: "0:55",
    type: "link", // <-- CHANGE THIS: replace with your real video (see instructions above)
    url: "https://www.tiktok.com/",
    videoId: "",
    src: "",
    thumbnail: ""
  },
  {
    title: "Mark Zuckerberg — Success Story",
    category: "personal",
    label: "Personal Project · Short-Form",
    desc: "Short storytelling video built to hold attention to the end.",
    meta: "Script & editing · Premiere Pro, Photopea",
    duration: "0:55",
    type: "link",
    url: "https://www.tiktok.com/",
    videoId: "",
    src: "",
    thumbnail: ""
  },
  {
    title: "Content for Sales Professionals",
    category: "clients",
    label: "For Clients · Sales",
    desc: "Short videos that present, persuade and generate leads.",
    meta: "Strategy, editing & publishing",
    duration: "--:--",
    type: "link",
    url: "#videos",
    videoId: "",
    src: "",
    thumbnail: ""
  },
  {
    title: "Content for Lawyers",
    category: "clients",
    label: "For Clients · Legal",
    desc: "Professional, trustworthy content for legal services.",
    meta: "Strategy, editing & publishing",
    duration: "--:--",
    type: "link",
    url: "#videos",
    videoId: "",
    src: "",
    thumbnail: ""
  },
  {
    title: "Ad Campaign Video",
    category: "ads",
    label: "Advertising",
    desc: "Ad creative made to convert views into qualified leads.",
    meta: "Meta Ads · Facebook & Instagram",
    duration: "--:--",
    type: "link",
    url: "#videos",
    videoId: "",
    src: "",
    thumbnail: ""
  },
  {
    title: "Motion Graphics & Animated Text",
    category: "motion",
    label: "Motion Graphics",
    desc: "Animated titles, dynamic subtitles and subtle camera movement.",
    meta: "Motion design · Premiere Pro",
    duration: "--:--",
    type: "link",
    url: "#videos",
    videoId: "",
    src: "",
    thumbnail: ""
  },
];

// ---------- Skills (bars animate on scroll) ----------
const skillBars = [
  ["Video Editing — Premiere Pro / Adobe", 95],
  ["Content Creation & Short-Form", 95],
  ["Digital Marketing & Meta Ads", 90],
  ["Motion Graphics & Design", 88],
  ["Data Analysis", 85],
  ["Web Design & AI Tools", 85],
];
const skillTags = [
  "Storytelling", "Scriptwriting", "Lead Generation", "Social Media Strategy",
  "Public Speaking", "Teamwork", "Problem Solving", "English B2 / Spanish Native",
];

const barsBox = document.querySelector("#skillsBars");
skillBars.forEach(([name, level]) => {
  const wrap = document.createElement("div");
  wrap.className = "bar-item";
  wrap.innerHTML = `<div class="bar-head">${name}<span>${level}%</span></div><div class="bar-track"><div class="bar-fill" data-level="${level}"></div></div>`;
  barsBox.appendChild(wrap);
});
const tagsBox = document.querySelector("#skillsTags");
skillTags.forEach(tag => {
  const el = document.createElement("span");
  el.className = "skill"; el.textContent = tag; tagsBox.appendChild(el);
});

// Animate bars when visible
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.width = e.target.dataset.level + "%"; barObserver.unobserve(e.target); }
  });
}, { threshold: 0.4 });
document.querySelectorAll(".bar-fill").forEach(b => barObserver.observe(b));

// ---------- Video gallery + filters ----------
const grid = document.querySelector("#videosGrid");
const emptyMsg = document.querySelector("#emptyMsg");

function thumbFor(v) {
  if (v.thumbnail) return v.thumbnail;
  if (v.type === "youtube" && v.videoId) return `https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`;
  return "";
}
function renderVideos(filter = "all") {
  grid.innerHTML = "";
  const filtered = videos.filter(v => filter === "all" || v.category === filter);
  emptyMsg.hidden = filtered.length > 0;
  filtered.forEach(v => {
    const thumb = thumbFor(v);
    const card = document.createElement("article");
    card.className = "project";
    card.innerHTML = `
      <div class="thumb">${thumb ? `<img src="${thumb}" alt="${v.title}" loading="lazy">` : ""}<span class="play">▶</span><span class="duration">${v.duration}</span></div>
      <span class="tag">${v.label}</span><h3>${v.title}</h3><p>${v.desc}</p>
      <p style="margin-top:12px;color:var(--brand);font-weight:700">Watch video →</p>`;
    card.addEventListener("click", () => openPlayer(v));
    grid.appendChild(card);
  });
}
renderVideos();

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderVideos(btn.dataset.filter);
  });
});

// ---------- Video player modal ----------
const modal = document.querySelector("#videoModal");
const playerBox = document.querySelector("#playerBox");
function openPlayer(v) {
  document.querySelector("#modalCategory").textContent = v.label;
  document.querySelector("#modalTitle").textContent = v.title;
  document.querySelector("#modalDesc").textContent = v.desc;
  document.querySelector("#modalMeta").textContent = v.meta;

  if (v.type === "youtube" && v.videoId) {
    playerBox.innerHTML = `<iframe src="https://www.youtube.com/embed/${v.videoId}?autoplay=1&rel=0" title="${v.title}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  } else if (v.type === "local" && v.src) {
    playerBox.innerHTML = `<video controls autoplay src="${v.src}"></video>`;
  } else {
    playerBox.innerHTML = `<div><p style="font-size:2rem">▶</p><p style="color:var(--muted);margin:10px 0 16px">This video is hosted on TikTok / Instagram.</p><a class="btn btn-primary" href="${v.url}" target="_blank" rel="noopener">Watch on the platform ↗</a></div>`;
  }
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}
function closePlayer() { modal.hidden = true; playerBox.innerHTML = ""; document.body.style.overflow = ""; }
modal.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closePlayer));
document.addEventListener("keydown", e => { if (e.key === "Escape") closePlayer(); });

// ---------- Mobile menu ----------
const navToggle = document.querySelector("#navToggle");
const navMenu = document.querySelector("#navMenu");
navToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});
navMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navMenu.classList.remove("open")));

// ---------- Reveal on scroll ----------
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ---------- Animated counters ----------
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target, target = +el.dataset.target;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { el.textContent = target; clearInterval(timer); } else el.textContent = current;
    }, 30);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll(".counter").forEach(el => counterObserver.observe(el));

// ---------- Active nav on scroll ----------
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  const y = window.scrollY + 120;
  sections.forEach(sec => {
    if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll(".nav-link").forEach(l => l.classList.toggle("active", l.getAttribute("href") === `#${sec.id}`));
    }
  });
});

// ---------- Contact form validation ----------
const form = document.querySelector("#contactForm");
form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const message = document.querySelector("#message").value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const error = document.querySelector("#formError");
  const success = document.querySelector("#formSuccess");
  if (!name || !emailOk || !message) { error.hidden = false; success.hidden = true; return; }
  error.hidden = true; success.hidden = false; form.reset();
});

// ---------- Auto year ----------
document.querySelector("#year").textContent = new Date().getFullYear();
