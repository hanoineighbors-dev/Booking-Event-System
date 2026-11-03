/* =====================================================================
   site.js: phần dùng chung cho mọi trang chính.
   1. Hiện dần các khối .rv khi cuộn tới
   2. Danh sách sự kiện: tự chuyển thẻ đã qua giờ kết thúc (data-ends)
   3. Trạng thái "live" của sự kiện đặt chỗ theo buổi (data-live)
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- 1. Hiện dần khi cuộn ---------- */
  var rv = document.querySelectorAll(".rv");
  if (!("IntersectionObserver" in window)) {
    rv.forEach(function (e) { e.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.08 });
    rv.forEach(function (e, k) {
      e.style.transitionDelay = Math.min((k % 4) * 80, 240) + "ms";
      io.observe(e);
    });
  }

  /* ---------- 2. Sự kiện đã qua ----------
     Trang được build lúc có thay đổi, nên sự kiện kết thúc sau lần build cuối
     vẫn nằm ở "Sắp diễn ra". Đoạn này sửa lại theo giờ thật của khách.
     <div data-ev-list="upcoming" data-on-past="move|mark">  danh sách sắp diễn ra
                                     (move: chuyển sang danh sách đã diễn ra; mark: đánh dấu, để nguyên chỗ)
     <div data-ev-list="past">                               danh sách đã diễn ra
     <p data-ev-empty>                                        hiện khi hết sự kiện sắp diễn ra */
  function markPast(card) {
    card.classList.add("is-past");
    card.removeAttribute("data-live");
    var tag = card.querySelector('[data-role="tag"]');
    if (tag) { tag.className = "ev-tag done"; tag.textContent = "Đã diễn ra"; }
    var cta = card.querySelector('[data-role="cta"]');
    if (cta) cta.textContent = "Xem lại";
  }

  var now = Date.now();
  document.querySelectorAll('[data-ev-list="upcoming"]').forEach(function (list) {
    var mode = list.getAttribute("data-on-past") || "move";
    var pastList = document.querySelector('[data-ev-list="past"]');
    list.querySelectorAll(".ev[data-ends]:not(.is-past)").forEach(function (card) {
      var end = Date.parse(card.getAttribute("data-ends"));
      if (isNaN(end) || end > now) return;
      markPast(card);
      if (mode === "move" && pastList) pastList.insertBefore(card, pastList.firstChild);
    });
    var empty = list.parentNode.querySelector("[data-ev-empty]");
    if (empty) empty.hidden = !!list.querySelector(".ev:not(.is-past)");
  });
  document.querySelectorAll("[data-ev-section]").forEach(function (sec) {
    sec.hidden = !sec.querySelector(".ev");
  });

  /* ---------- 3. Trạng thái live ----------
     Mỗi nguồn trả về danh sách buổi { iso: "YYYY-MM-DD", open: true/false }.
     Thêm nguồn mới: thêm một mục vào LIVE, rồi đặt `live: <tên>` cho sự kiện trong _data/events.yml. */
  var LIVE = {
    dragbrunch: {
      url: "https://script.google.com/macros/s/AKfycbxFRpS-6EYa1KXFCIzGk5kS311b3jS5J7nF-qTgAx2E_TYsQDW8LJoiXwJQ5S34orVvpw/exec?action=getAll",
      parse: function (d) {
        return (d && d.events || []).map(function (e) {
          var m = String(e.date || e.id || "").match(/\d{4}-\d{2}-\d{2}/);
          var st = String(e.status || "open").toLowerCase();
          return { iso: m ? m[0] : "", open: st === "open", visible: st === "open" || st === "coming_soon" };
        }).filter(function (s) { return s.iso && s.visible; });
      },
      emptyWhen: "Brunch cuối tuần · hẹn bạn mùa tới"
    }
  };

  var DOW = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  var todayHanoi = new Date(Date.now() + 7 * 3600e3).toISOString().slice(0, 10);

  function applyLive(card, sessions, src) {
    var q = function (r) { return card.querySelector('[data-role="' + r + '"]'); };
    var tag = q("tag"), when = q("when"), cta = q("cta");
    var next = sessions.filter(function (s) { return s.iso >= todayHanoi; })
      .sort(function (a, b) { return a.iso < b.iso ? -1 : 1; });
    if (!next.length) {
      tag.className = "ev-tag"; tag.textContent = "Lịch mới sắp mở";
      when.textContent = src.emptyWhen;
      if (cta) cta.textContent = "Xem chi tiết";
      return;
    }
    var n = next[0], p = n.iso.split("-").map(Number);
    var open = next.some(function (s) { return s.open; });
    tag.className = "ev-tag" + (open ? " live" : "");
    tag.textContent = open ? "Đang mở đặt chỗ" : "Sắp mở đặt chỗ";
    when.textContent = "Buổi gần nhất: " + DOW[new Date(p[0], p[1] - 1, p[2]).getDay()] + " " +
      p[2] + "/" + p[1] + "/" + p[0] + (next.length > 1 ? " · còn " + next.length + " buổi" : "");
  }

  var groups = {};
  document.querySelectorAll(".ev[data-live]").forEach(function (card) {
    var k = card.getAttribute("data-live");
    if (LIVE[k]) (groups[k] = groups[k] || []).push(card);
  });
  Object.keys(groups).forEach(function (k) {
    if (!window.fetch) return;
    fetch(LIVE[k].url)
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var sessions = LIVE[k].parse(d);
        groups[k].forEach(function (card) { applyLive(card, sessions, LIVE[k]); });
      })
      .catch(function () { /* lỗi mạng: giữ nội dung tĩnh */ });
  });
})();
