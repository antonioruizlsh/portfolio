// ================= ANTONIO RUIZ — VIDEO PORTFOLIO =================
// YOUR VIDEOS LIVE ON YOUTUBE — edit ONLY the `videoFolders` list below.
//
// How it works:
// 1. Upload each video to YouTube (visibility: "Unlisted" is perfect —
//    only people with the link can find it, and the portfolio still plays it).
// 2. Copy the video link and paste it in its folder's `videos` list below,
//    between the quotes. Full links, Shorts links and plain IDs all work.
// 3. Done — the card appears with the name "Video 1", "Video 2", "Video 3"…
//    by position in the list. Each folder = one filter in "Video Portfolio".
//
// - An empty slot "" shows nothing — paste the link and the video appears.
// - To ADD a video: add one more "" to the list and paste its link in it.
// - To REMOVE one: delete its slot.
// - No MP4 files are uploaded to GitHub anymore — no size problems.
// ===================================================================

const videoFolders = [
  {
    folder: "Asesora de ventas",
    desc: "Short-form content for a sales advisor — videos that present, persuade and generate leads.",
    videos: ["https://youtube.com/shorts/tw7KvS6IxT8?feature=share", "https://youtube.com/shorts/C806QMInvfc?feature=share", "https://youtube.com/shorts/VeUXP5ckuXE?feature=share"],
    covers: ["assets/thumbnails/asesora-de-ventas-video-1.jpg", "assets/thumbnails/asesora-de-ventas-video-2.jpg", "assets/thumbnails/asesora-de-ventas-video-3.jpg"]
     // Video 1, Video 2, Video 3 — paste the YouTube links here
  },
  {
    folder: "Asesores Legales",
    desc: "Professional video content for legal advisors — clear, trustworthy and client-ready.",
    videos: ["https://youtube.com/shorts/8qp2ZYH63uw?feature=share", "https://youtube.com/shorts/9oyNLGG_q_w?feature=share"],
    covers: ["assets/thumbnails/asesores-legales-video-1.jpg", "assets/thumbnails/asesores-legales-video-2.jpg"]
     // Video 1, Video 2, Video 3 — paste the YouTube links here
  },
  {
    folder: "Personal",
    desc: "My own projects — storytelling, editing and motion experiments.",
    videos: ["https://youtube.com/shorts/UrIZnYJ_ges?feature=share", "https://youtube.com/shorts/EZHLak2rVXk?feature=share", "https://youtube.com/shorts/OBqkF15Jo6Q?feature=share"],
    covers: ["assets/thumbnails/personal-video-1.jpg", "assets/thumbnails/personal-video-2.jpg", "assets/thumbnails/personal-video-3.jpg"]
     // Video 1, Video 2, Video 3 — paste the YouTube links here
  },
];

// The `videos` list is built automatically from the folders above.
// The hero carousel and the gallery both use it — don't edit this part.
function slugify(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function youtubeId(input) {
  const s = String(input || "").trim();
  if (!s) return "";
  const m = s.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{6,})/);
  if (m) return m[1];
  return /^[\w-]{6,}$/.test(s) ? s : ""; // already a plain ID
}
const videos = [];
videoFolders.forEach(group => {
  group.videos.forEach((link, i) => {
    const id = youtubeId(link);
    if (!id) return; // empty slot — hidden until a link is pasted
    videos.push({
      title: `Video ${i + 1}`,            // name by position: Video 1, Video 2…
      category: slugify(group.folder),     // filter key, e.g. "asesora-de-ventas"
      label: group.folder,                // shown on the card
      desc: group.desc,
      duration: "",
      type: "youtube",
      url: "",
      videoId: id,
      src: "",
      thumbnail: (group.covers && group.covers[i]) || ""

    });
  });
});

// Stable ID for every video — used by the hero carousel to jump to its card
videos.forEach((v, i) => { v.id = i + 1; });

// ---------- Skills ----------
const skillPoints = [
  "Video Editing — Premiere Pro / Adobe",
  "Content Creation & Short-Form",
  "Digital Marketing & Meta Ads",
  "Motion Graphics & Design",
  "Data Analysis",
  "Web Design & AI Tools",
];
const skillTags = [
  "Storytelling", "Scriptwriting", "Lead Generation", "Social Media Strategy",
  "Public Speaking", "Teamwork", "Problem Solving", "English B2 / Spanish Native",
];

const listBox = document.querySelector("#skillsList");
skillPoints.forEach(name => {
  const li = document.createElement("li");
  li.textContent = name;
  listBox.appendChild(li);
});
const tagsBox = document.querySelector("#skillsTags");
skillTags.forEach(tag => {
  const el = document.createElement("span");
  el.className = "skill"; el.textContent = tag; tagsBox.appendChild(el);
});

// ---------- Video gallery + filters ----------
const grid = document.querySelector("#videosGrid");
const emptyMsg = document.querySelector("#emptyMsg");

function thumbHTML(v) {
  if (v.thumbnail) return `<img class="cover-img" src="${v.thumbnail}" alt="${v.title}" loading="lazy">`;
  if (v.type === "youtube" && v.videoId) return `<img src="https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg" alt="${v.title}" loading="lazy">`;
  if (v.type === "local" && v.src) return `<video src="${v.src}#t=0.1" preload="metadata" muted playsinline oncontextmenu="return false" aria-hidden="true"></video>`;
  return "";
}
function durationBadge(v) {
  return v.duration ? `<span class="duration">${v.duration}</span>` : "";
}
function renderVideos(filter = "all") {
  grid.innerHTML = "";
  const filtered = videos.filter(v => filter === "all" || v.category === filter);
  emptyMsg.hidden = filtered.length > 0;
  filtered.forEach(v => {
    const card = document.createElement("article");
    card.className = "project";
    card.id = `video-${v.id}`;
    card.innerHTML = `
      <div class="thumb">${thumbHTML(v)}<span class="play">▶</span>${durationBadge(v)}</div>
      <span class="tag">${v.label}</span><h3>${v.title}</h3><p>${v.desc}</p>
      <p style="margin-top:12px;color:var(--brand);font-weight:700">Watch video →</p>`;
    card.addEventListener("click", () => openPlayer(v));
    grid.appendChild(card);
  });
}
// ---------- Filters: one button per folder, generated from videoFolders ----------
// Tony's folders ARE the categories, so the buttons must match them exactly.
const filtersBox = document.querySelector(".filters");
filtersBox.innerHTML =
  `<button class="filter-btn active" data-filter="all">All</button>` +
  videoFolders.map(g => `<button class="filter-btn" data-filter="${slugify(g.folder)}">${g.folder}</button>`).join("");

renderVideos();

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderVideos(btn.dataset.filter);
  });
});

// ---------- Jump from hero to one exact video card ----------
function goToVideo(v) {
  // Reset the filter to "All" first, so the target card is guaranteed to exist
  document.querySelectorAll(".filter-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.filter === "all"));
  renderVideos("all");

  // Wait one frame so the re-rendered card is in the page, then scroll to it
  requestAnimationFrame(() => {
    setTimeout(() => {
      const card = document.querySelector(`#video-${v.id}`);
      if (!card) return;
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.remove("highlight");
      void card.offsetWidth; // restart the animation if clicked again
      card.classList.add("highlight");
      setTimeout(() => card.classList.remove("highlight"), 2200);
    }, 60);
  });
}

// ---------- Hero carousel (same `videos` list as the portfolio) ----------
const track = document.querySelector("#carouselTrack");
const dotsBox = document.querySelector("#carouselDots");
let carIndex = 0, carTimer = null;
const AUTOPLAY_MS = 3500;

videos.forEach((v, i) => {
  const slide = document.createElement("article");
  slide.className = "slide";
  slide.setAttribute("role", "button");
  slide.setAttribute("aria-label", `Go to video: ${v.title}`);
  slide.innerHTML = `
    <div class="thumb">${thumbHTML(v)}<span class="play">▶</span>${durationBadge(v)}</div>
    <div class="slide-info"><span class="tag">${v.label}</span><h3>${v.title}</h3></div>`;
  slide.addEventListener("click", () => goToVideo(v));
  track.appendChild(slide);

  const dot = document.createElement("button");
  dot.className = "dot" + (i === 0 ? " active" : "");
  dot.setAttribute("aria-label", `Show video ${i + 1}: ${v.title}`);
  dot.addEventListener("click", () => { showSlide(i); restartAutoplay(); });
  dotsBox.appendChild(dot);
});

function showSlide(i) {
  carIndex = (i + videos.length) % videos.length;
  track.style.transform = `translateY(-${carIndex * 100}%)`;
  dotsBox.querySelectorAll(".dot").forEach((d, j) => d.classList.toggle("active", j === carIndex));
}
function startAutoplay() {
  if (!videos.length) return; // no YouTube links pasted yet
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  carTimer = setInterval(() => showSlide(carIndex + 1), AUTOPLAY_MS);
}
function restartAutoplay() { clearInterval(carTimer); startAutoplay(); }

document.querySelector("#carPrev").addEventListener("click", () => { showSlide(carIndex - 1); restartAutoplay(); });
document.querySelector("#carNext").addEventListener("click", () => { showSlide(carIndex + 1); restartAutoplay(); });
const carouselEl = document.querySelector("#heroCarousel");
carouselEl.addEventListener("mouseenter", () => clearInterval(carTimer));
carouselEl.addEventListener("mouseleave", restartAutoplay);
carouselEl.addEventListener("focusin", () => clearInterval(carTimer));
carouselEl.addEventListener("focusout", restartAutoplay);
startAutoplay();

// ---------- Video player modal ----------
const modal = document.querySelector("#videoModal");
const playerBox = document.querySelector("#playerBox");
function openPlayer(v) {
  document.querySelector("#modalCategory").textContent = v.label;
  document.querySelector("#modalTitle").textContent = v.title;
  document.querySelector("#modalDesc").textContent = v.desc;

  if (v.type === "youtube" && v.videoId) {
    playerBox.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${v.videoId}?autoplay=1&rel=0" title="${v.title}" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  } else if (v.type === "local" && v.src) {
    playerBox.innerHTML = `<video controls controlsList="nodownload" disablepictureinpicture oncontextmenu="return false" autoplay src="${v.src}"></video>`;
  } else {
    playerBox.innerHTML = `<div><p style="font-size:2rem">▶</p><p style="color:var(--muted);margin:10px 0 16px">This video is hosted on TikTok / Instagram.</p><a class="btn btn-primary" href="${v.url}" target="_blank" rel="noopener">Watch on the platform ↗</a></div>`;
  }
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}
function closePlayer() { modal.hidden = true; playerBox.innerHTML = ""; document.body.style.overflow = ""; }
modal.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closePlayer));
document.addEventListener("keydown", e => { if (e.key === "Escape") closePlayer(); });

// ---------- Documents / web designs ----------
// HOW TO ADD A DOCUMENT — put the PDF in assets/documents/, put a full-page
// .jpg of the design with the SAME name next to it, and add ONE block here.
// View-only: visitors see the design inside the site; there are NO open or
// download buttons (the `file` field stays in case they're ever wanted back).
const webDesigns = [
  {
    title: "Baja AT — Website Design",
    client: "Baja AT · Mexicali",
    desc: "Landing page for an automatic transmission shop: services, repair process, testimonials and contact.",
    file: "assets/documents/baja-at-website.pdf",
    image: "assets/documents/baja-at-website.jpg"
  },
  {
    title: "Mitsubishi L200 2025 — Landing Page",
    client: "Mitsubishi Mexicali",
    desc: "Landing page design for the L200 2025 pickup: exterior, interior, comfort and technology.",
    file: "assets/documents/mitsubishi-mexicali-l200.pdf",
    image: "assets/documents/mitsubishi-mexicali-l200.jpg"
  },
];

const docsGrid = document.querySelector("#docsGrid");
webDesigns.forEach(d => {
  const card = document.createElement("article");
  card.className = "project";
  card.innerHTML = `
    <div class="thumb thumb-doc"><img src="${d.image}" alt="${d.title}" loading="lazy"><span class="play">⤢</span></div>
    <span class="tag">${d.client}</span><h3>${d.title}</h3><p>${d.desc}</p>
    <p style="margin-top:12px;color:var(--brand);font-weight:700">View design →</p>`;
  card.addEventListener("click", () => openDoc(d));
  docsGrid.appendChild(card);
});

const docModal = document.querySelector("#docModal");
const docViewer = document.querySelector("#docViewer");
function openDoc(d) {
  document.querySelector("#docClient").textContent = d.client;
  document.querySelector("#docTitle").textContent = d.title;
  document.querySelector("#docDesc").textContent = d.desc;
  const img = document.querySelector("#docImage");
  img.src = d.image; img.alt = d.title;
  docModal.hidden = false;
  document.body.style.overflow = "hidden";
  docViewer.scrollTop = 0;
}
function closeDoc() { docModal.hidden = true; document.body.style.overflow = ""; }
docModal.querySelectorAll("[data-close-doc]").forEach(el => el.addEventListener("click", closeDoc));
document.addEventListener("keydown", e => { if (e.key === "Escape") closeDoc(); });

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

// ---------- Auto year ----------
document.querySelector("#year").textContent = new Date().getFullYear();
