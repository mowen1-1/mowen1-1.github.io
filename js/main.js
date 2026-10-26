(function () {
  var STORAGE_KEY = "wenyi-theme";
  var root = document.documentElement;

  function applyTheme(theme) { root.setAttribute("data-theme", theme); }
  function currentTheme() { return root.getAttribute("data-theme") || "light"; }

  function toggle() {
    var next = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  if (saved === "dark" || saved === "light") {
    applyTheme(saved);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector(".theme-toggle");
    if (btn) btn.addEventListener("click", toggle);
    var covers = document.querySelectorAll("[data-cover]");
    covers.forEach(function (el) {
      var c = el.getAttribute("data-cover");
      if (c) el.style.background = c;
    });
    initLeaves();
    initCat();
  });

  // ===== 秋叶飘落 =====
  function initLeaves() {
    var layer = document.getElementById("leafLayer");
    if (!layer) return;
    var shapes = [
      '<svg width="100%" height="100%" viewBox="0 0 40 40"><path d="M20 2 L24 10 L32 8 L28 16 L36 18 L28 22 L30 30 L22 26 L20 36 L18 26 L10 30 L12 22 L4 18 L12 16 L8 8 L16 10 Z" fill="C" opacity="0.85"/></svg>',
      '<svg width="100%" height="100%" viewBox="0 0 40 40"><path d="M20 38 Q20 30 12 22 Q6 16 10 10 Q15 4 20 8 Q25 4 30 10 Q34 16 28 22 Q20 30 20 38 Z" fill="C" opacity="0.85"/></svg>',
      '<svg width="100%" height="100%" viewBox="0 0 40 40"><ellipse cx="20" cy="20" rx="8" ry="16" fill="C" opacity="0.8" transform="rotate(20 20 20)"/><line x1="20" y1="6" x2="20" y2="36" stroke="C" stroke-width="0.5" opacity="0.4"/></svg>'
    ];
    var colors = ["#d4915c","#c97b4a","#b8743f","#e0a040","#d4a040","#8b4513","#cd853f","#e8b04a","#a0522d","#deb442","#cc7722","#b8860b"];
    for (var i = 0; i < 22; i++) {
      var leaf = document.createElement("div");
      leaf.className = "leaf";
      var size = 18 + Math.random() * 26;
      leaf.style.left = (Math.random() * 100) + "%";
      leaf.style.width = size + "px";
      leaf.style.height = size + "px";
      leaf.style.animationDuration = (8 + Math.random() * 10) + "s";
      leaf.style.animationDelay = (-Math.random() * 12) + "s";
      leaf.style.setProperty("--sway", ((40 + Math.random() * 80) * (Math.random() > 0.5 ? 1 : -1)) + "px");
      leaf.innerHTML = shapes[Math.floor(Math.random() * shapes.length)].replace("C", colors[Math.floor(Math.random() * colors.length)]);
      layer.appendChild(leaf);
    }
  }

  // ===== 黑猫跟随鼠标 =====
  function initCat() {
    var pupilL = document.getElementById("pupilL");
    var pupilR = document.getElementById("pupilR");
    var shineL = document.getElementById("shineL");
    var shineR = document.getElementById("shineR");
    var catHead = document.getElementById("catHead");
    var catStage = document.querySelector(".cat-stage");
    if (!pupilL || !catStage) return;

    var eyeL = { x: 82, y: 88 }, eyeR = { x: 118, y: 88 };
    var MAX = 5;
    var targetX = window.innerWidth / 2, targetY = window.innerHeight / 2;
    var curX = targetX, curY = targetY;

    document.addEventListener("mousemove", function (e) { targetX = e.clientX; targetY = e.clientY; });
    document.addEventListener("touchmove", function (e) { if (e.touches[0]) { targetX = e.touches[0].clientX; targetY = e.touches[0].clientY; } });

    function tick() {
      curX += (targetX - curX) * 0.12;
      curY += (targetY - curY) * 0.12;
      var rect = catStage.getBoundingClientRect();
      var scale = rect.width / 200;
      var cx = rect.left + 100 * scale, cy = rect.top + 90 * scale;
      var dx = curX - cx, dy = curY - cy;
      var dist = Math.sqrt(dx * dx + dy * dy) || 1;
      var off = Math.min(MAX, dist / 28);
      var mx = (dx / dist) * off, my = (dy / dist) * off;
      pupilL.setAttribute("cx", eyeL.x + mx); pupilL.setAttribute("cy", eyeL.y + my);
      pupilR.setAttribute("cx", eyeR.x + mx); pupilR.setAttribute("cy", eyeR.y + my);
      shineL.setAttribute("cx", eyeL.x + mx + 2); shineL.setAttribute("cy", eyeL.y + my - 3);
      shineR.setAttribute("cx", eyeR.x + mx + 2); shineR.setAttribute("cy", eyeR.y + my - 3);
      if (catHead) {
        var rot = Math.max(-12, Math.min(12, dx / 40));
        catHead.setAttribute("transform", "rotate(" + rot + " 100 130)");
      }
      requestAnimationFrame(tick);
    }
    tick();
  }
})();