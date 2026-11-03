/* =====================================================================
   Intro điện ảnh trang Drag Brunch.

   Kịch bản (~13 giây):
     1. Máy ảnh lấy liền hiện ra trong phòng tối
     2. Đèn flash nháy
     3. Ảnh Hero được in ra từ khe máy, hiện màu dần như phim thật
     4. Máy nhấc lên, ảnh rơi xuống tấm thảm có sẵn các ảnh khác
     5. Camera lùi và lướt chậm nhìn từ trên xuống cả tấm thảm
     6. Hiện tên chương trình và nút "Đặt chỗ ngay"

   Không chạy khi: khách mở link tra cứu mã (?code=...), đã xem trong phiên này,
   hoặc máy bật chế độ giảm chuyển động. Thêm ?intro=1 vào địa chỉ để xem lại.

   Đổi ảnh: sửa danh sách PHOTOS bên dưới (ảnh nằm ở intro/photos/).
   ===================================================================== */
(function () {
  "use strict";

  var ROOT = "/events/dragbrunch/intro/photos/";
  var HERO = { f: "hero.jpg", cap: "Áaa!" };
  var PHOTOS = [
    { f: "p01.jpg", cap: "brunch time" }, { f: "p02.jpg", cap: "bếp nhà Áaa" }, { f: "p03.jpg" },
    { f: "p04.jpg" }, { f: "p05.jpg", cap: "ăn ngon" }, { f: "p06.jpg", cap: "cheers!" },
    { f: "p07.jpg" }, { f: "p08.jpg" }, { f: "p09.jpg", cap: "hàng xóm" },
    { f: "p10.jpg" }, { f: "p11.jpg" }, { f: "p12.jpg" },
    { f: "p13.jpg" }, { f: "p14.jpg", cap: "♡" }, { f: "p15.jpg" }
  ];

  var html = document.documentElement;
  var q = location.search;
  var force = /[?&]intro=1/.test(q);
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var seen = false;
  try { seen = sessionStorage.getItem("dbi_seen") === "1"; } catch (e) { }
  var canAnimate = typeof Element !== "undefined" && "animate" in Element.prototype;

  if (!force && (reduce || seen || /[?&]code=/.test(q) || location.hash) || !canAnimate) {
    html.classList.add("dbi-ready");
    return;
  }
  try { sessionStorage.setItem("dbi_seen", "1"); } catch (e) { }

  var LANG = "vi";
  try { LANG = localStorage.getItem("dd_lang") === "en" ? "en" : "vi"; } catch (e) { }
  var T = LANG === "en"
    ? { skip: "Skip ›", cta: "Book a table", sub: "Drag Brunch · 8 Nguyễn Thiếp, Hanoi", aria: "Drag Brunch intro" }
    : { skip: "Bỏ qua ›", cta: "Đặt chỗ ngay", sub: "Drag Brunch · 8 Nguyễn Thiếp, Hà Nội", aria: "Intro Drag Brunch" };

  /* ---------- tiện ích ---------- */
  function el(tag, cls, parent, htmlStr) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (htmlStr != null) e.innerHTML = htmlStr;
    if (parent) parent.appendChild(e);
    return e;
  }
  function rng(seed) { // số ngẫu nhiên cố định, để bố cục thảm lần nào cũng giống nhau
    return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  var stopped = false;
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function play(node, frames, opts) {
    if (stopped) return Promise.resolve();
    opts.fill = opts.fill || "forwards";
    var a = node.animate(frames, opts);
    return a.finished.catch(function () { });
  }
  function photo(p, parent) {
    var f = el("figure", "dbi-photo", parent);
    var img = el("img", "", f);
    img.src = ROOT + p.f; img.alt = ""; img.decoding = "async";
    if (p.cap) el("figcaption", "", f).textContent = p.cap;
    return f;
  }

  /* ---------- dựng khung ---------- */
  html.classList.add("dbi-lock", "dbi-ready");
  var root = el("div", "dbi");
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-label", T.aria);
  document.body.insertBefore(root, document.body.firstChild);

  var skip = el("button", "dbi-skip", root); skip.type = "button"; skip.textContent = T.skip;
  var presents = el("div", "dbi-presents", root, "Hanoi Neighbors &nbsp;×&nbsp; Dập Dìu Drag Haus");

  // Màn 2: thảm
  var scene2 = el("div", "dbi-scene2", root);
  var rig = el("div", "dbi-rig", scene2);
  var world = el("div", "dbi-world", rig);
  el("div", "dbi-floor", world);
  var rug = el("div", "dbi-rug", world);
  el("div", "dbi-fringe top", rug); el("div", "dbi-fringe bottom", rug);
  el("div", "dbi-light", scene2);

  // Màn 1: máy ảnh
  var scene1 = el("div", "dbi-scene1", root);
  var camWrap = el("div", "dbi-cam-wrap", scene1);
  var eject = el("div", "dbi-eject", camWrap);
  var heroPrint = photo(HERO, eject); heroPrint.classList.add("dbi-develop");
  var cam = el("div", "dbi-cam", camWrap,
    '<div class="dbi-cam-top"><div class="dbi-flash"></div><div class="dbi-vf"></div></div>' +
    '<div class="dbi-cam-body"><div class="dbi-stripe"></div><div class="dbi-shutter"></div>' +
    '<div class="dbi-brand">Áaa</div><div class="dbi-lens"></div><div class="dbi-slot"></div>' +
    '<div class="dbi-cam-label">Instant · Drag Brunch</div></div>');
  var flashLamp = cam.querySelector(".dbi-flash");
  var flashFx = el("div", "dbi-flashfx", root);

  var end = el("div", "dbi-end", root,
    '<h2>Những bà nội trợ kiểu</h2><span class="dbi-script">Áaa</span><p></p>');
  end.querySelector("p").textContent = T.sub;
  var cta = el("button", "dbi-cta", end); cta.type = "button";
  cta.innerHTML = T.cta + ' <span aria-hidden="true">→</span>';

  /* ---------- bố cục thảm ---------- */
  var vw, vh, W, H, rugBox, slots = [], heroSlot, heroBox;
  function layout() {
    vw = root.clientWidth; vh = root.clientHeight;
    var portrait = vh > vw * 1.1;
    W = portrait ? 1200 : 2100; H = portrait ? 2050 : 1300;
    var cols = portrait ? 3 : 6, rows = portrait ? 6 : 3;
    rugBox = { x: 110, y: 150, w: W - 220, h: H - 300 };
    world.style.width = W + "px"; world.style.height = H + "px";
    Object.assign(rug.style, { left: rugBox.x + "px", top: rugBox.y + "px", width: rugBox.w + "px", height: rugBox.h + "px" });

    var pad = 110, cw = (rugBox.w - pad * 2) / cols, ch = (rugBox.h - pad * 2) / rows;
    var heroCell = portrait ? 7 : 8; // ô gần giữa thảm
    var r = rng(20260606), cells = [];
    for (var i = 0; i < cols * rows; i++) cells.push(i);
    // bỏ bớt ô thừa (xa ô Hero) cho bố cục thoáng
    var spare = cols * rows - PHOTOS.length - 1;
    var drop = portrait ? [0, 17] : [5, 12];
    cells = cells.filter(function (c) { return drop.slice(0, spare).indexOf(c) < 0; });

    slots.forEach(function (s) { s.remove(); }); slots = [];
    world.querySelectorAll(".dbi-sequin").forEach(function (s) { s.remove(); });

    var k = 0;
    cells.forEach(function (c) {
      var col = c % cols, row = Math.floor(c / cols), isHero = c === heroCell;
      var p = isHero ? HERO : PHOTOS[k++];
      if (!p) return;
      var w = Math.min(cw, ch / 1.165) * (isHero ? 0.86 : 0.66) * (0.92 + r() * 0.16);
      var cx = rugBox.x + pad + cw * (col + 0.5) + (r() - 0.5) * cw * 0.3;
      var cy = rugBox.y + pad + ch * (row + 0.5) + (r() - 0.5) * ch * 0.26;
      var rot = isHero ? -4 : (r() - 0.5) * 30;
      var f = photo(p, world);
      f.classList.add("dbi-rug-photo");
      f.style.cssText = "width:" + w + "px;left:" + (cx - w / 2) + "px;top:" + (cy - w * 1.165 / 2) +
        "px;transform:rotate(" + rot + "deg);--pw:" + w + "px;z-index:" + (isHero ? 5 : 1 + Math.floor(r() * 3));
      if (isHero) { f.classList.add("dbi-hero-slot"); heroSlot = f; heroBox = { cx: cx, cy: cy, w: w, rot: rot }; }
      slots.push(f);
    });
    // kim sa rơi vãi
    var colors = ["#e5ae00", "#1feab0", "#ffebb8", "#ff8fb1", "#e5ae00"];
    for (var s = 0; s < 46; s++) {
      var d = el("div", "dbi-sequin", world);
      var sz = 6 + r() * 8;
      d.style.cssText = "left:" + (rugBox.x + 70 + r() * (rugBox.w - 140)) + "px;top:" + (rugBox.y + 70 + r() * (rugBox.h - 140)) +
        "px;width:" + sz + "px;height:" + sz + "px;--c:" + colors[s % colors.length];
    }
  }

  // Camera nhìn vào điểm (px, py) của thảm, với độ phóng s, điểm đó nằm ở (sx, sy) trên màn hình
  function cam2(s, px, py, sx, sy) {
    sx = sx == null ? vw / 2 : sx; sy = sy == null ? vh / 2 : sy;
    return "translate(" + (sx - px * s).toFixed(1) + "px," + (sy - py * s).toFixed(1) + "px) scale(" + s.toFixed(4) + ")";
  }
  function overview() { // cả tấm thảm, chừa chỗ cho chữ kết ở dưới
    var areaH = vh * (vh > vw ? 0.64 : 0.58);
    var s = Math.min(vw / (rugBox.w + 90), areaH / (rugBox.h + 120));
    return cam2(s, rugBox.x + rugBox.w / 2, rugBox.y + rugBox.h / 2, vw / 2, areaH / 2 + 8);
  }

  /* ---------- đóng intro ---------- */
  var closed = false;
  function close() {
    if (closed) return; closed = true; stopped = true;
    if (root.getAnimations) root.getAnimations({ subtree: true }).forEach(function (a) { a.pause(); });
    root.classList.add("is-leaving");
    html.classList.remove("dbi-lock");
    setTimeout(function () { root.remove(); }, 850);
  }
  skip.addEventListener("click", close);
  cta.addEventListener("click", close);
  document.addEventListener("keydown", function onKey(e) {
    if (closed) { document.removeEventListener("keydown", onKey); return; }
    if (e.key === "Escape") close();
  });
  window.addEventListener("resize", function () {
    if (closed || !end.classList.contains("is-on")) return;
    layout(); heroSlot.style.opacity = 1;
    world.getAnimations().forEach(function (a) { a.cancel(); });
    rig.getAnimations().forEach(function (a) { a.cancel(); });
    rig.style.transform = "none";
    world.style.transform = overview();
  });

  /* ---------- kịch bản ---------- */
  layout();
  heroPrint.style.setProperty("--pw", eject.clientWidth + "px");
  var heroImg = heroPrint.querySelector("img");
  var ready = new Promise(function (res) {
    if (heroImg.complete && heroImg.naturalWidth) return res();
    heroImg.addEventListener("load", res); heroImg.addEventListener("error", res);
    setTimeout(res, 2500);
  });
  var EASE = "cubic-bezier(.2,.8,.2,1)";

  ready.then(async function () {
    // 1. Mở màn: máy ảnh hiện ra
    play(presents, [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { duration: 900, delay: 200, easing: EASE });
    await play(camWrap, [
      { opacity: 0, transform: "translateY(40px) scale(.86)", filter: "blur(10px)" },
      { opacity: 1, transform: "none", filter: "blur(0)" }
    ], { duration: 1600, delay: 300, easing: EASE });
    if (stopped) return;
    flashLamp.classList.add("is-charged");
    play(presents, [{ opacity: 1 }, { opacity: 0 }], { duration: 600, delay: 300 });
    await wait(650);

    // 2. Flash
    play(flashFx, [{ opacity: 0 }, { opacity: 1, offset: 0.08 }, { opacity: 0.9, offset: 0.2 }, { opacity: 0 }], { duration: 950, easing: "ease-out" });
    play(camWrap, [{ transform: "none" }, { transform: "translate(-3px,2px) scale(1.025)", offset: 0.25 }, { transform: "translate(2px,-1px)", offset: 0.6 }, { transform: "none" }], { duration: 380 });
    await wait(240);
    flashLamp.classList.remove("is-charged");
    await wait(500);

    // 3. In ảnh: trượt ra từng nấc như mô-tơ kéo phim, ảnh hiện màu dần
    play(heroImg, [
      { filter: "brightness(.12) sepia(.7) contrast(.5) blur(1.5px)" },
      { filter: "brightness(.55) sepia(.45) contrast(.75) blur(.6px)", offset: 0.45 },
      { filter: "none" }
    ], { duration: 4600, easing: "ease-in-out" });
    await play(heroPrint, [
      { transform: "translateY(-101%)" }, { transform: "translateY(-86%)", offset: 0.14 },
      { transform: "translateY(-84%)", offset: 0.2 }, { transform: "translateY(-60%)", offset: 0.42 },
      { transform: "translateY(-58%)", offset: 0.48 }, { transform: "translateY(-30%)", offset: 0.72 },
      { transform: "translateY(-28%)", offset: 0.78 }, { transform: "translateY(0)" }
    ], { duration: 2300, easing: "linear" });
    if (stopped) return;
    await wait(350);

    // 4. Ảnh rời máy và rơi xuống thảm
    var RIG0 = { rot: -5, s: 1.06 };   // camera hơi nghiêng lúc đầu, lùi dần về thẳng
    rig.style.transform = "rotate(" + RIG0.rot + "deg) scale(" + RIG0.s + ")";
    var s0 = Math.min(vw, vh) * 0.42 / heroBox.w;
    var startW = world.style.transform = cam2(s0, heroBox.cx, heroBox.cy);
    var from = heroPrint.getBoundingClientRect();
    var to = heroSlot.getBoundingClientRect(); // khung ảnh Hero trên thảm (đang ẩn) ở góc nhìn đầu tiên
    var fall = photo(HERO, root);
    fall.classList.add("dbi-falling");
    var fallImg = fall.querySelector("img");
    fallImg.style.filter = getComputedStyle(heroImg).filter;
    fall.style.width = from.width + "px";
    fall.style.setProperty("--pw", from.width + "px");
    heroPrint.style.visibility = "hidden";

    // `to` là hộp bao của ảnh đã xoay: lấy tâm của nó, còn độ phóng/góc tính từ thông số thật
    var toCx = to.left + to.width / 2, toCy = to.top + to.height / 2;
    var scaleTo = heroBox.w * s0 * RIG0.s / from.width;
    var rotTo = heroBox.rot + RIG0.rot;
    var fromCx = from.left + from.width / 2, fromCy = from.top + from.height / 2;
    function at(cx, cy, s, r) { return "translate(" + (cx - from.width / 2) + "px," + (cy - from.height / 2) + "px) rotate(" + r + "deg) scale(" + s + ")"; }

    play(camWrap, [{ transform: "none", opacity: 1 }, { transform: "translateY(-75vh) rotate(-10deg)", opacity: 0 }], { duration: 1100, easing: "cubic-bezier(.5,0,.75,0)" });
    play(scene1, [{ opacity: 1 }, { opacity: 0 }], { duration: 1000, delay: 250 });
    play(scene2, [{ opacity: 0 }, { opacity: 1 }], { duration: 1000, delay: 250 });
    play(fallImg, [{ filter: fallImg.style.filter }, { filter: "none" }], { duration: 1500 });
    await play(fall, [
      { transform: at(fromCx, fromCy, 1, 0), boxShadow: "0 30px 50px -10px rgba(0,0,0,.35)" },
      { transform: at(fromCx + (toCx - fromCx) * 0.1, fromCy - vh * 0.05, 1.18, -9), offset: 0.28, boxShadow: "0 60px 80px -20px rgba(0,0,0,.35)" },
      { transform: at(toCx, toCy, scaleTo * 0.97, rotTo + 2), offset: 0.88, boxShadow: "0 6px 10px -4px rgba(0,0,0,.7)" },
      { transform: at(toCx, toCy, scaleTo * 1.012, rotTo - 0.5), offset: 0.95 },
      { transform: at(toCx, toCy, scaleTo, rotTo), boxShadow: "0 3px 6px -2px rgba(0,0,0,.65)" }
    ], { duration: 1650, easing: "cubic-bezier(.45,0,.35,1)" });
    if (stopped) return;
    heroSlot.style.opacity = 1;
    fall.remove();
    scene1.style.display = "none";

    // 5. Camera lùi lại, lướt chậm qua tấm thảm từ trên xuống, rồi dừng ở toàn cảnh
    var sMid = Math.max(s0 * 0.45, Math.min(vw, vh) * 0.55 / (heroBox.w * 1.9));
    var portrait = vh > vw * 1.1;
    var p1 = portrait ? { x: rugBox.x + rugBox.w * 0.62, y: rugBox.y + rugBox.h * 0.2 } : { x: rugBox.x + rugBox.w * 0.22, y: rugBox.y + rugBox.h * 0.35 };
    var p2 = portrait ? { x: rugBox.x + rugBox.w * 0.38, y: rugBox.y + rugBox.h * 0.78 } : { x: rugBox.x + rugBox.w * 0.8, y: rugBox.y + rugBox.h * 0.62 };
    var endW = overview();
    play(rig, [{ transform: "rotate(-5deg) scale(1.06)" }, { transform: "rotate(-2deg) scale(1.03)", offset: 0.55 }, { transform: "none" }], { duration: 7600, easing: "ease-in-out" });
    play(world, [
      { transform: startW },
      { transform: cam2(s0 * 0.92, heroBox.cx, heroBox.cy), offset: 0.08 },
      { transform: cam2(sMid, p1.x, p1.y), offset: 0.38 },
      { transform: cam2(sMid * 0.9, p2.x, p2.y), offset: 0.7 },
      { transform: endW }
    ], { duration: 7600, easing: "cubic-bezier(.45,.05,.35,1)" });
    await wait(6400);
    if (stopped) return;

    // 6. Chữ kết
    end.classList.add("is-on");
    try { cta.focus({ preventScroll: true }); } catch (e) { }
  });
})();
