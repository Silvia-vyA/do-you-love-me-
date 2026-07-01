// ============================================================
//  script.js — Gen Z edition 💅
// ============================================================

const noMessages = [
  { btn: "wait noo 😭",             msg: "ouch that actually hurts 💀" },
  { btn: "u sure tho?? 🥺",          msg: "this is giving heartbreak era fr 😭" },
  { btn: "pls don't do this 🙏",     msg: "i'm literally not okay rn 😮‍💨" },
  { btn: "that's so cruel 💔",      msg: "sending me straight to my sad era 💔" },
  { btn: "i'm gonna cry 😿",        msg: "the cat is judging u rn 😿" },
  { btn: "last chance!! 😤",          msg: "this is ur FINAL warning 🚨" },
  { btn: "i'm sobbing rn 😭😭",      msg: "waterworks activated... ty so much 💀😭" },
  { btn: "PLEASEEEEE 🥺👉👈",        msg: "i literally can't take this... just say yes 🥺" },
];

let noClickCount  = 0;
let catSize       = 300;
let hoverState    = null;
let justClickedNo = false;

// Start sama besar
let yesFSize = 1.35;
let yesPad   = 16;
let yesPadH  = 48;

let noFSize  = 1.35;
let noPad    = 16;
let noPadH   = 48;

const btnYes = document.getElementById("btnYes");
const btnNo  = document.getElementById("btnNo");
const sadMsg = document.getElementById("sadMessage");
const catImg = document.getElementById("catImage");

btnYes.style.fontSize = yesFSize + "rem";
btnYes.style.padding  = `${yesPad}px ${yesPadH}px`;
btnNo.style.fontSize  = noFSize  + "rem";
btnNo.style.padding   = `${noPad}px ${noPadH}px`;

// ── GIF ──────────────────────────────────────────────────────
function setGif(name) { if (catImg) catImg.src = name + ".gif"; }
setGif("hm");

function resolveGif() {
  if (justClickedNo)        { setGif("nno");  return; }
  if (hoverState === "yes") { setGif("yyes"); return; }
  if (hoverState === "no")  { setGif("nno");  return; }
  setGif("hm");
}

btnYes.addEventListener("mouseover", () => { hoverState = "yes"; resolveGif(); });
btnYes.addEventListener("mouseout",  () => { hoverState = null;  resolveGif(); });
btnNo.addEventListener("mouseover",  () => { hoverState = "no";  resolveGif(); });
btnNo.addEventListener("mouseout",   () => { hoverState = null;  resolveGif(); });

document.addEventListener("mousemove", (e) => {
  const el = document.elementFromPoint(e.clientX, e.clientY);
  if (el !== btnYes && !btnYes.contains(el) && el !== btnNo && !btnNo.contains(el)) {
    if (hoverState !== null) { hoverState = null; resolveGif(); }
  }
});

// ── Klik YES ─────────────────────────────────────────────────
function clickYes() {
  setGif("llove");
  if (catImg) { catImg.style.width = "240px"; catImg.style.height = "240px"; }
  btnYes.textContent = "YAY!! 💕";
  setTimeout(showEnding, 1400);
}

// ── Klik NO ──────────────────────────────────────────────────
function clickNo() {
  if (noClickCount >= noMessages.length) { forceYes(); return; }

  justClickedNo = true;
  hoverState = null;
  resolveGif();

  const clearNo = () => {
    justClickedNo = false;
    resolveGif();
    document.removeEventListener("mousemove", clearNo);
  };
  document.addEventListener("mousemove", clearNo);

  const current = noMessages[noClickCount];
  noClickCount++;
  btnNo.textContent = current.btn;

  sadMsg.style.opacity = "0";
  setTimeout(() => {
    sadMsg.textContent   = current.msg;
    sadMsg.style.opacity = "1";
  }, 150);

  // YES tumbuh BESAR banget
  yesFSize = Math.min(yesFSize + 0.42, 4.8);
  yesPad   = Math.min(yesPad   + 9,    80);
  yesPadH  = Math.min(yesPadH  + 22,   190);
  btnYes.style.fontSize = yesFSize + "rem";
  btnYes.style.padding  = `${yesPad}px ${yesPadH}px`;

  // NO makin kecil & turun
  noFSize = Math.max(noFSize - 0.18, 0.38);
  noPad   = Math.max(noPad   - 2,    2);
  noPadH  = Math.max(noPadH  - 6,    6);
  btnNo.style.fontSize  = noFSize + "rem";
  btnNo.style.padding   = `${noPad}px ${noPadH}px`;
  btnNo.style.opacity   = Math.max(1 - noClickCount * 0.11, 0.12).toString();
  btnNo.style.marginTop = (noClickCount * 20) + "px";

  // Kucing tumbuh dikit
  catSize = Math.min(catSize + 14, 420);
  if (catImg) {
    catImg.style.width  = catSize + "px";
    catImg.style.height = catSize + "px";
  }

  if (noClickCount >= noMessages.length - 1) makeYesFullscreen();
}

function makeYesFullscreen() {
  btnYes.style.cssText = `
    position:fixed;inset:0;width:100vw;height:100vh;
    font-size:3.8rem;border-radius:0;z-index:9999;
    background:linear-gradient(135deg,#ff4d94,#e91e8c,#c2185b);
    color:white;border:none;cursor:pointer;
    font-weight:900;letter-spacing:3px;
    transition:all 0.5s ease;
    animation:pulseBtn 1.2s ease-in-out infinite;
  `;
  btnYes.textContent = "💖 just say yes omg 💖";
  btnNo.style.display = "none";
  sadMsg.textContent  = "";
}

function forceYes() { makeYesFullscreen(); clickYes(); }

// ── Global styles ─────────────────────────────────────────────
const gs = document.createElement("style");
gs.textContent = `
  @keyframes pulseBtn {
    0%,100% { filter:brightness(1) saturate(1); }
    50%     { filter:brightness(1.18) saturate(1.2); }
  }
  @keyframes floatUp {
    0%   { transform:translateY(110vh) rotate(0deg);   opacity:0.7; }
    100% { transform:translateY(-10vh) rotate(360deg); opacity:0;   }
  }
`;
document.head.appendChild(gs);

// ── Floating hearts ───────────────────────────────────────────
(function(){
  const bg = document.createElement("div");
  bg.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;";
  document.body.appendChild(bg);
  const syms = ["💖","💕","💗","❤️","🩷","💝","💓","💞"];
  function h() {
    const el = document.createElement("span");
    el.textContent = syms[Math.floor(Math.random() * syms.length)];
    el.style.cssText = `position:absolute;user-select:none;left:${Math.random()*100}vw;font-size:${1+Math.random()*2}rem;animation:floatUp ${4+Math.random()*7}s ${Math.random()*2}s linear forwards;opacity:0.65;`;
    bg.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
  setInterval(h, 500);
  for (let i = 0; i < 10; i++) h();
})();

// ── ENDING ────────────────────────────────────────────────────
function showEnding() {
  document.body.innerHTML = "";
  document.body.style.cssText = `
    margin:0;overflow:hidden;min-height:100vh;
    display:flex;align-items:center;justify-content:center;
    background:linear-gradient(135deg,#ffb6c1 0%,#ff8fab 40%,#ffc2d1 100%);
    font-family:'Segoe UI','Comic Sans MS',cursive,sans-serif;
  `;

  const style = document.createElement("style");
  style.textContent = `
    @keyframes floatUp {
      0%   { transform:translateY(110vh) rotate(0deg);   opacity:0.8; }
      100% { transform:translateY(-10vh) rotate(360deg); opacity:0;   }
    }
    @keyframes fadeSlide {
      0%   { opacity:0; transform:translateY(40px) scale(0.85); }
      100% { opacity:1; transform:translateY(0) scale(1); }
    }
    @keyframes heartbeat {
      0%,100% { transform:scale(1); }
      14%     { transform:scale(1.18); }
      28%     { transform:scale(1); }
      42%     { transform:scale(1.12); }
      56%     { transform:scale(1); }
    }
    @keyframes shimmer {
      0%   { background-position:-500px 0; }
      100% { background-position: 500px 0; }
    }
    @keyframes sparkle {
      0%,100% { opacity:0; transform:scale(0) rotate(0deg); }
      50%     { opacity:1; transform:scale(1) rotate(180deg); }
    }
    @keyframes glow {
      0%,100% { filter:drop-shadow(0 0 18px #ff69b4) drop-shadow(0 0 36px #ff1493); }
      50%     { filter:drop-shadow(0 0 36px #ff69b4) drop-shadow(0 0 70px #ff1493) drop-shadow(0 0 8px #fff); }
    }
    @keyframes spin  { to { transform:rotate(360deg); } }
    @keyframes floatRing {
      0%,100% { transform:translateY(0); }
      50%     { transform:translateY(-14px); }
    }
    .end-wrap {
      position:relative;z-index:10;
      display:flex;flex-direction:column;align-items:center;gap:18px;
      padding:32px 24px;text-align:center;
      animation:fadeSlide 0.9s cubic-bezier(0.175,0.885,0.32,1.275) both;
    }
    .gif-ring {
      position:relative;width:320px;height:320px;
      display:flex;align-items:center;justify-content:center;
      animation:floatRing 2.5s ease-in-out infinite;
    }
    .gif-ring::before {
      content:"";position:absolute;inset:-12px;border-radius:50%;
      background:conic-gradient(#ff69b4,#ff1493,#ffb3d9,#ff4dac,#ff69b4);
      animation:spin 2.5s linear infinite;z-index:0;
    }
    .gif-ring::after {
      content:"";position:absolute;inset:-5px;border-radius:50%;
      background:linear-gradient(135deg,#ffb6c1,#ffc2d1);z-index:1;
    }
    .end-gif {
      width:290px;height:290px;object-fit:contain;border-radius:50%;
      position:relative;z-index:2;
      animation:heartbeat 1.8s ease-in-out infinite, glow 2s ease-in-out infinite;
    }
    .sparkle-wrap { position:absolute;inset:0;z-index:3;pointer-events:none; }
    .sp { position:absolute;font-size:1.5rem;animation:sparkle 1.8s ease-in-out infinite; }
    .title-end {
      font-size:clamp(1.5rem,5vw,2.7rem);font-weight:900;line-height:1.3;
      background:linear-gradient(90deg,#d63384,#ff1493,#ff69b4,#e91e8c,#d63384);
      background-size:300% auto;
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
      animation:shimmer 2.5s linear infinite;
    }
    .sub-end { color:#ad1457;font-size:1.1rem;font-style:italic;font-weight:700;text-shadow:1px 1px 0 rgba(255,255,255,0.7); }
    .heart-row { font-size:2rem;letter-spacing:8px;animation:heartbeat 1.5s ease-in-out infinite; }
    .end-btn {
      padding:15px 44px;
      background:linear-gradient(145deg,#ff6aaa,#e91e8c,#ad1457);
      color:#fff;border:none;border-radius:60px;
      font-size:1rem;font-weight:800;cursor:pointer;letter-spacing:1.5px;
      box-shadow:0 8px 30px rgba(233,30,140,0.55),inset 0 2px 0 rgba(255,255,255,0.35);
      transition:transform 0.2s ease,box-shadow 0.2s ease;
      position:relative;overflow:hidden;
    }
    .end-btn::before {
      content:"";position:absolute;inset:2px 6px auto;height:38%;
      background:linear-gradient(to bottom,rgba(255,255,255,0.38),transparent);
      border-radius:60px 60px 40% 40%;pointer-events:none;
    }
    .end-btn:hover { transform:scale(1.08) translateY(-3px);box-shadow:0 16px 40px rgba(233,30,140,0.75); }
  `;
  document.head.appendChild(style);

  const bg = document.createElement("div");
  bg.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;";
  document.body.appendChild(bg);
  const syms = ["💖","💕","💗","❤️","🩷","💝","💓","💞","🌸","✨","🌺","⭐"];
  function heart() {
    const h = document.createElement("span");
    h.textContent = syms[Math.floor(Math.random() * syms.length)];
    h.style.cssText = `position:absolute;user-select:none;left:${Math.random()*100}vw;font-size:${1.2+Math.random()*2.5}rem;animation:floatUp ${2.5+Math.random()*5}s ${Math.random()}s linear forwards;opacity:0.85;`;
    bg.appendChild(h);
    h.addEventListener("animationend", () => h.remove());
  }
  setInterval(heart, 300);
  for (let i = 0; i < 20; i++) heart();

  const wrap = document.createElement("div"); wrap.className = "end-wrap";
  const ring = document.createElement("div"); ring.className = "gif-ring";

  const img = document.createElement("img");
  img.src = "llove.gif"; img.className = "end-gif";
  img.onerror = () => {
    const fb = document.createElement("div");
    fb.textContent = "💖";
    fb.style.cssText = "font-size:10rem;animation:heartbeat 1.8s ease-in-out infinite,glow 2s ease-in-out infinite;z-index:2;position:relative;";
    img.replaceWith(fb);
  };

  const spWrap = document.createElement("div"); spWrap.className = "sparkle-wrap";
  ["✨","💫","⭐","🌟","✨","💫","⭐","🌟"].forEach((s, i) => {
    const sp = document.createElement("span"); sp.className = "sp"; sp.textContent = s;
    const angle = (i / 8) * 360, rad = angle * Math.PI / 180;
    sp.style.left  = (50 + 46 * Math.cos(rad)) + "%";
    sp.style.top   = (50 + 46 * Math.sin(rad)) + "%";
    sp.style.animationDelay = (i * 0.22) + "s";
    spWrap.appendChild(sp);
  });

  ring.appendChild(img); ring.appendChild(spWrap);

  const h1  = document.createElement("h1");  h1.className  = "title-end"; h1.textContent  = "i knew you would say yes!! 🎉";
  const p   = document.createElement("p");   p.className   = "sub-end";   p.innerHTML     = "u literally just made my whole life 💕<br>i'm so in love with u omg 🌸";
  const hr  = document.createElement("div"); hr.className  = "heart-row"; hr.textContent  = "💖 💕 💗 💓 💞";
  const btn = document.createElement("button"); btn.className = "end-btn"; btn.textContent = "do it again? 😄"; btn.onclick = () => location.reload();

  wrap.append(ring, h1, p, hr, btn);
  document.body.appendChild(wrap);
}