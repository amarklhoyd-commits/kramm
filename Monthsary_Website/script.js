/* =========================================================
   PERSONALIZE YOUR MONTHSARY WEBSITE HERE
   Change the names to the exact spelling you want her to enter.
   Name checks are playful only — this is NOT secure authentication.
   ========================================================= */
const websiteTitle = "Our Monthsary Surprise";
const girlfriendName = "Jecery Zabate";
const boyfriendName = "Mark Lhoyd Alemorin";
const monthsaryDate = "2026-11-10"; // Your monthsary: November 10, 2026.
const monthsaryMessage = "MY PERSONAL LOVE LETTER";
const finalMessage = "MY FINAL MONTHSARY MESSAGE";
const ultimateMessage = "MY SWEETEST MONTHSARY MESSAGE";

/* -------------------- Website logic -------------------- */
const pages = [...document.querySelectorAll(".page")];
const progress = document.getElementById("progress");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let currentPage = 1;
let girlfriendAnswer = "";
let boyfriendAnswer = "";
let chosenDate = "";
let photoData = "";
let soundEnabled = false;
let audioContext = null;

document.title = websiteTitle;

function normalize(value) {
  return value.trim().toLocaleLowerCase().replace(/\s+/g, " ");
}
function showPage(number) {
  currentPage = number;
  pages.forEach(page => page.classList.toggle("active", Number(page.dataset.page) === number));
  progress.style.width = `${number * 12.5}%`;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  if (number === 8) startUltimate();
}
function feedback(id, message, success = false) {
  const el = document.getElementById(id);
  el.textContent = message;
  el.classList.toggle("success", success);
}
function burstSound(frequency = 520) {
  if (!soundEnabled) return;
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(.045, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + .22);
    oscillator.connect(gain); gain.connect(audioContext.destination);
    oscillator.start(); oscillator.stop(audioContext.currentTime + .23);
  } catch (error) { console.warn("Sound is unavailable in this browser.", error); }
}
document.getElementById("soundToggle").addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  document.querySelector("#soundToggle span").textContent = soundEnabled ? "Sound on" : "Sound off";
  if (soundEnabled) burstSound(660);
});

/* Welcome → name checks */
document.getElementById("openSurprise").addEventListener("click", () => {
  bloomFlowers();
  burstSound(660);
  setTimeout(() => showPage(2), reduceMotion ? 100 : 950);
});
document.getElementById("girlfriendForm").addEventListener("submit", event => {
  event.preventDefault();
  const value = document.getElementById("girlfriendInput").value;
  if (!value.trim()) return feedback("girlfriendFeedback", "Please enter your name first, sweetheart. 💗");
  if (girlfriendName === "HER FULL NAME" || !girlfriendName.trim()) {
    return feedback("girlfriendFeedback", "The website owner needs to customize girlfriendName in script.js first. ❤️");
  }
  if (normalize(value) !== normalize(girlfriendName)) {
    return feedback("girlfriendFeedback", "Oops, my love! That's not quite your name. Try again, beautiful. Hehehe. ❤️");
  }
  girlfriendAnswer = value.trim();
  feedback("girlfriendFeedback", "YAYYY! Welcome, my beautiful girl! This surprise is specially made for you! 💗", true);
  burstSound(740);
  setTimeout(() => showPage(3), 900);
});
document.getElementById("boyfriendForm").addEventListener("submit", event => {
  event.preventDefault();
  const value = document.getElementById("boyfriendInput").value;
  if (!value.trim()) return feedback("boyfriendFeedback", "Don't leave this one blank, baby. ❤️");
  if (boyfriendName === "BOYFRIEND FULL NAME" || !boyfriendName.trim()) {
    return feedback("boyfriendFeedback", "The website owner needs to customize boyfriendName in script.js first. ❤️");
  }
  if (normalize(value) !== normalize(boyfriendName)) {
    return feedback("boyfriendFeedback", "HAHAHA! Are you sure, baby? Think carefully! Who's the lucky boy who loves you so much? 😂❤️");
  }
  boyfriendAnswer = value.trim();
  feedback("boyfriendFeedback", "CORRECT! That's your favorite boy! And he loves you more than you know! ❤️", true);
  bloomFlowers(); burstSound(800);
  setTimeout(() => showPage(4), 900);
});

/* Date selection */
const dateInput = document.getElementById("specialDate");
if (monthsaryDate && monthsaryDate !== "YYYY-MM-DD" && /^\d{4}-\d{2}-\d{2}$/.test(monthsaryDate)) {
  dateInput.value = monthsaryDate;
}
function prettyDate(value) {
  if (!value) return "Our special date";
  const date = new Date(`${value}T12:00:00`);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}
dateInput.addEventListener("change", () => {
  document.getElementById("datePreview").textContent = dateInput.value ? `Our special day: ${prettyDate(dateInput.value)} ♡` : "Our special date will appear here ♡";
});
document.getElementById("dateForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!dateInput.value) return;
  chosenDate = dateInput.value;
  document.getElementById("finalDate").textContent = prettyDate(chosenDate);
  showPage(5);
});

/* Couple photo upload — held in memory for this browser session */
const photoInput = document.getElementById("photoInput");
photoInput.addEventListener("change", () => {
  const file = photoInput.files && photoInput.files[0];
  if (!file) return;
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.type)) {
    feedback("photoFeedback", "Please choose a JPG, PNG, or WEBP image.");
    photoInput.value = ""; return;
  }
  if (file.size > 10 * 1024 * 1024) {
    feedback("photoFeedback", "That image is larger than 10 MB. Please choose a smaller one.");
    photoInput.value = ""; return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    photoData = reader.result;
    document.getElementById("photoPreview").src = photoData;
    document.getElementById("finalPhoto").src = photoData;
    document.getElementById("photoPreviewFrame").classList.remove("hidden");
    document.getElementById("photoContinue").disabled = false;
    feedback("photoFeedback", "Your beautiful memory is ready. ❤️", true);
  };
  reader.onerror = () => feedback("photoFeedback", "Sorry, this image could not be opened. Please try another.");
  reader.readAsDataURL(file);
});
document.getElementById("photoContinue").addEventListener("click", () => {
  if (!photoData) return feedback("photoFeedback", "Please choose a photo before continuing.");
  showPage(6);
});

/* Envelope and love letter */
const envelope = document.getElementById("envelope");
envelope.addEventListener("click", () => {
  if (envelope.classList.contains("open")) return;
  envelope.classList.add("open");
  document.getElementById("envelopeHint").textContent = "A little message, from my heart ♡";
  burstSound(580);
  setTimeout(() => {
    document.getElementById("letterContent").classList.remove("hidden");
    document.getElementById("letterContinue").classList.remove("hidden");
    document.getElementById("letterContent").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  }, reduceMotion ? 50 : 850);
});
document.getElementById("letterContinue").addEventListener("click", () => {
  document.getElementById("finalGirlfriend").textContent = girlfriendAnswer || girlfriendName;
  document.getElementById("finalBoyfriend").textContent = boyfriendAnswer || boyfriendName;
  document.getElementById("finalDate").textContent = prettyDate(chosenDate);
  if (photoData) document.getElementById("finalPhoto").src = photoData;
  showPage(7);
});

/* Grand final */
document.getElementById("lastSurprise").addEventListener("click", () => {
  showPage(8);
});
function startUltimate() {
  document.body.classList.add("ultimate");
  document.getElementById("ultimateLetter").classList.remove("hidden");
  document.getElementById("foreverReveal").classList.add("hidden");
  bloomFlowers();
  makePetals(85);
  burstSound(880);
  setTimeout(() => {
    document.getElementById("foreverReveal").classList.remove("hidden");
    document.getElementById("foreverReveal").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  }, reduceMotion ? 100 : 9000);
}
document.getElementById("replayFlowers").addEventListener("click", () => {
  bloomFlowers(); makePetals(60); burstSound(740);
});
document.getElementById("readAgain").addEventListener("click", () => {
  document.getElementById("ultimateLetter").classList.remove("hidden");
  document.getElementById("foreverReveal").classList.add("hidden");
  document.getElementById("ultimateLetter").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  setTimeout(() => document.getElementById("foreverReveal").classList.remove("hidden"), 500);
});
document.getElementById("restart").addEventListener("click", () => {
  girlfriendAnswer = ""; boyfriendAnswer = ""; chosenDate = ""; photoData = "";
  document.getElementById("girlfriendInput").value = "";
  document.getElementById("boyfriendInput").value = "";
  document.getElementById("photoInput").value = "";
  document.getElementById("photoPreviewFrame").classList.add("hidden");
  document.getElementById("photoContinue").disabled = true;
  document.getElementById("letterContent").classList.add("hidden");
  document.getElementById("letterContinue").classList.add("hidden");
  envelope.classList.remove("open");
  dateInput.value = monthsaryDate !== "YYYY-MM-DD" ? monthsaryDate : "";
  document.getElementById("datePreview").textContent = "Our special date will appear here ♡";
  ["girlfriendFeedback","boyfriendFeedback","photoFeedback"].forEach(id => feedback(id, ""));
  document.body.classList.remove("ultimate");
  showPage(1);
});

/* Flower and falling-petal animations */
function bloomFlowers() {
  if (reduceMotion) return;
  const layer = document.getElementById("petalLayer");
  const blooms = ["🌹","🌸","🌷","💐","🦋","♥"];
  for (let i=0; i<16; i++) {
    const flower = document.createElement("span");
    flower.className = "petal";
    flower.textContent = blooms[Math.floor(Math.random()*blooms.length)];
    flower.style.left = `${Math.random()*100}%`;
    flower.style.fontSize = `${18+Math.random()*22}px`;
    flower.style.animationDuration = `${5+Math.random()*6}s`;
    flower.style.setProperty("--drift", `${Math.random()*150-75}px`);
    layer.appendChild(flower);
    setTimeout(() => flower.remove(), 12000);
  }
}
function makePetals(count) {
  if (reduceMotion) return;
  const layer = document.getElementById("petalLayer");
  for (let i=0; i<count; i++) {
    setTimeout(() => {
      const petal = document.createElement("span");
      petal.className = "petal"; petal.textContent = Math.random() < .65 ? "❀" : "♥";
      petal.style.left = `${Math.random()*100}%`;
      petal.style.fontSize = `${10+Math.random()*17}px`;
      petal.style.animationDuration = `${5+Math.random()*7}s`;
      petal.style.setProperty("--drift", `${Math.random()*180-90}px`);
      layer.appendChild(petal); setTimeout(() => petal.remove(), 13000);
    }, i*55);
  }
}
