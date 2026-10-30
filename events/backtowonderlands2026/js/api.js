/* Gọi Apps Script. Không có API_URL hoặc có ?demo=1 thì dùng backend giả trong trình duyệt,
   mô phỏng đúng logic của Code.gs để thử toàn bộ luồng trước khi deploy. */
(function (g) {
  var C = g.RH_CONFIG || {};
  var DEMO = !C.API_URL || /[?&]demo=1/.test(location.search);

  function real(method, payload) {
    if (method === 'GET') {
      var q = Object.keys(payload).map(function (k) { return k + '=' + encodeURIComponent(payload[k]); }).join('&');
      return fetch(C.API_URL + '?' + q, { redirect: 'follow' }).then(function (r) { return r.json(); });
    }
    // text/plain để tránh preflight CORS với Apps Script
    return fetch(C.API_URL, { method: 'POST', redirect: 'follow', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json(); });
  }

  // ───────────── Backend giả ─────────────
  var KEY = 'rh_demo_db_v1';
  var CFG = { GIA_ONLINE: 250000, GIA_TAI_CUA: 300000, GIA_EAT_ME: 100000, TRAN: { do: 40, trang: 40 }, MAX: 6, HOLD_H: 24,
    LOCK: '2026-10-31T00:00:00+07:00', CUT: '2026-10-31T12:00:00+07:00', PIN: '2026', ADMIN_PIN: '9999',
    BANK: { name: 'VPBank', bin: '970432', account: '112469834', holder: '' } };
  function db() {
    try { var d = JSON.parse(localStorage.getItem(KEY)); if (d) return d; } catch (e) { }
    var d0 = { orders: {}, keys: [] };
    // vài đơn có sẵn cho sinh động
    seed(d0, 'Nguyễn Minh Anh', [['Minh Anh', 'do', 1], ['Hoàng Long', 'do', 0], ['Thu Trang', 'trang', 1]], 'Đã xác nhận');
    seed(d0, 'Trần Bảo Ngọc', [['Bảo Ngọc', 'trang', 0], ['Khánh Linh', 'trang', 0]], 'Đã xác nhận');
    seed(d0, 'Lê Quang Huy', [['Quang Huy', 'do', 1]], 'Khách báo đã chuyển');
    save(d0); return d0;
  }
  function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) { } }
  function rid() { var A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', s = 'RH-'; for (var i = 0; i < 6; i++) s += A[Math.floor(Math.random() * A.length)]; return s; }
  function tok() { var s = ''; for (var i = 0; i < 40; i++) s += 'abcdef0123456789'[Math.floor(Math.random() * 16)]; return s; }
  function seed(d, buyer, keys, status) {
    var id = rid(), now = Date.now();
    d.orders[id] = { id: id, at: now, kenh: 'Online', name: buyer, phone: '0912345678', email: 'demo@example.com', status: status,
      hold: now + 864e5, total: keys.length * CFG.GIA_ONLINE + keys.filter(function (k) { return k[2]; }).length * CFG.GIA_EAT_ME };
    keys.forEach(function (k, i) { d.keys.push({ id: id + '-' + (i + 1), order: id, name: k[0], phe: k[1], eatMe: !!k[2], status: status === 'Đã xác nhận' ? 'Hợp lệ' : 'Chờ', token: tok(), checkinAt: '', kenh: 'Online' }); });
  }
  function holds(k, d) {
    if (k.status === 'Hợp lệ' || k.status === 'Đã dùng') return true;
    if (k.status !== 'Chờ') return false;
    var o = d.orders[k.order]; if (!o) return false;
    return o.status === 'Khách báo đã chuyển' || (o.status === 'Chờ chuyển khoản' && o.hold > Date.now());
  }
  function stats(d) {
    var s = { do: { taken: 0, cap: CFG.TRAN.do }, trang: { taken: 0, cap: CFG.TRAN.trang } };
    d.keys.forEach(function (k) { if (holds(k, d)) s[k.phe].taken++; });
    s.do.left = Math.max(0, s.do.cap - s.do.taken); s.trang.left = Math.max(0, s.trang.cap - s.trang.taken);
    return s;
  }
  function online() { return Date.now() < new Date(CFG.LOCK).getTime() && !/[?&]closed=1/.test(location.search); }
  function info(d) {
    return { ok: true, stats: stats(d), online: online(), closesAt: new Date(CFG.LOCK).toISOString(), price: { online: CFG.GIA_ONLINE, door: CFG.GIA_TAI_CUA, eatMe: CFG.GIA_EAT_ME },
      maxPerOrder: CFG.MAX, bank: CFG.BANK, serverTime: new Date().toISOString(), demo: true };
  }
  function fmt(d) { var t = new Date(d); return ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2) + ' ' + ('0' + t.getDate()).slice(-2) + '/' + ('0' + (t.getMonth() + 1)).slice(-2) + '/' + t.getFullYear(); }
  function passOut(x, tok) { var o = { kind: 'pass', id: x.id, name: x.name, role: x.role, note: x.note || '', status: x.status, scans: x.scans || 0, lastScan: x.lastScan ? fmt(x.lastScan) : '', drink: !!x.drink }; if (tok) o.token = x.token; return o; }
  function keyOut(k) { return { id: k.id, order: k.order, name: k.name, phe: k.phe, eatMe: k.eatMe, status: k.status, checkinAt: k.checkinAt ? fmt(k.checkinAt) : '', token: k.token }; }
  function plain(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[đĐ]/g, 'd').toLowerCase(); }

  function mock(method, p) {
    var d = db(), r;
    var act = p.action || 'stats';
    if (act === 'stats') r = info(d);
    else if (act === 'create') {
      if (!online()) r = { ok: false, code: 'CLOSED', error: 'Cửa online đã khoá. Hẹn bạn ở cửa hang.' };
      else {
        var s = stats(d), need = { do: 0, trang: 0 };
        p.keys.forEach(function (k) { need[k.phe]++; });
        var short = ['do', 'trang'].filter(function (x) { return need[x] > s[x].left; });
        if (short.length) r = { ok: false, code: 'FULL', short: short, stats: s, error: 'Phe ' + short.map(function (x) { return x === 'do' ? 'Đỏ' : 'Trắng'; }).join(' và ') + ' không còn đủ chỗ. Bạn đổi phe giúp nhé.' };
        else {
          var id = rid(), now = Date.now(), hold = Math.min(now + CFG.HOLD_H * 36e5, new Date(CFG.CUT).getTime());
          var eat = p.keys.filter(function (k) { return k.eatMe; }).length, total = p.keys.length * CFG.GIA_ONLINE + eat * CFG.GIA_EAT_ME;
          d.orders[id] = { id: id, at: now, kenh: 'Online', name: p.buyer.name, phone: p.buyer.phone, email: p.buyer.email, status: 'Chờ chuyển khoản', hold: hold, total: total };
          p.keys.forEach(function (k, i) { d.keys.push({ id: id + '-' + (i + 1), order: id, name: k.name, phe: k.phe, eatMe: !!k.eatMe, status: 'Chờ', token: tok(), checkinAt: '', kenh: 'Online' }); });
          save(d);
          r = { ok: true, orderId: id, amount: total, transferNote: id.replace('-', ''), holdUntil: new Date(hold).toISOString(), keys: p.keys, bank: CFG.BANK };
        }
      }
    } else if (act === 'paid') {
      var o = d.orders[p.orderId];
      if (!o) r = { ok: false, error: 'Không tìm thấy đơn' };
      else {
        o.status = 'Khách báo đã chuyển'; save(d);
        // chế độ thử: tự "xác nhận" sau 8 giây như thể admin đã tích ô
        setTimeout(function () { var d2 = db(), o2 = d2.orders[p.orderId]; if (o2 && o2.status === 'Khách báo đã chuyển') { o2.status = 'Đã xác nhận'; d2.keys.forEach(function (k) { if (k.order === o2.id) k.status = 'Hợp lệ'; }); save(d2); } }, 8000);
        r = { ok: true, status: o.status };
      }
    } else if (act === 'status') {
      var o3 = d.orders[p.orderId];
      r = o3 ? { ok: true, orderId: o3.id, status: (o3.status === 'Chờ chuyển khoản' && o3.hold < Date.now()) ? 'Đã huỷ' : o3.status, holdUntil: new Date(o3.hold).toISOString(), amount: o3.total,
        keys: o3.status === 'Đã xác nhận' ? d.keys.filter(function (k) { return k.order === o3.id; }).map(keyOut) : undefined } : { ok: false, error: 'Không tìm thấy đơn' };
    } else if (act === 'key') {
      var ap = (d.passes || []).filter(function (x) { return x.token === (p.token || p.t); })[0];
      var k = d.keys.filter(function (x) { return x.token === (p.token || p.t); })[0];
      if (ap) k = null;
      r = ap ? { ok: true, pass: passOut(ap, true), event: { when: 'Thứ Bảy 31.10.2026 · Cửa hang mở 20:30', where: 'Sincerely, Hanoi Neighbors · Tầng 6, 131 Hoàng Cầu, Hà Nội' } } : k ? { ok: true, key: keyOut(k), event: { name: 'Back to the Rabbit Hole', when: 'Thứ Bảy 31.10.2026 · Cửa hang mở 20:30', where: 'Sincerely, Hanoi Neighbors · Tầng 6, 131 Hoàng Cầu, Hà Nội', dress: 'Đỏ · Đen · Trắng' } } : { ok: false, error: 'Không tìm thấy chìa' };
    } else if (act === 'staff') {
      var adm = String(p.pin) === CFG.ADMIN_PIN; d.passes = d.passes || [];
      if (String(p.pin) !== CFG.PIN && !adm) r = { ok: false, code: 'PIN', error: 'Sai mã PIN (bản thử: 2026, quản lý 9999)' };
      else if (p.op === 'login') r = { ok: true, admin: adm };
      else if (/^pass(Create|List|Cancel)$/.test(p.op) && !adm) r = { ok: false, code: 'ADMIN', error: 'Chỉ người giữ PIN quản lý mới làm được việc này' };
      else if (p.op === 'passCreate') {
        if (!String(p.name || '').trim()) r = { ok: false, error: 'Nhập tên artist' };
        else { var np = { id: 'AP-' + rid().slice(3, 7), name: String(p.name).trim(), role: p.role || 'Artist', note: p.note || '', status: 'Hợp lệ', token: tok(), scans: 0 }; d.passes.push(np); save(d); r = { ok: true, pass: passOut(np, true) }; }
      } else if (p.op === 'passList') r = { ok: true, items: d.passes.slice().reverse().map(function (x) { return passOut(x, true); }) };
      else if (p.op === 'passCancel') { var pc = d.passes.filter(function (x) { return x.id === p.id; })[0]; if (pc) { pc.status = 'Huỷ'; save(d); } r = pc ? { ok: true, pass: passOut(pc) } : { ok: false, error: 'Không thấy pass' }; }
      else if (p.op === 'passScan') {
        var ps = d.passes.filter(function (x) { return x.id === p.id; })[0];
        if (!ps) r = { ok: true, result: 'notfound' };
        else if (ps.status === 'Huỷ') r = { ok: true, result: 'cancelled', pass: passOut(ps) };
        else { var dr = !ps.drink; ps.scans = (ps.scans || 0) + 1; ps.lastScan = Date.now(); if (dr) ps.drink = Date.now(); save(d); r = { ok: true, result: 'ok', pass: passOut(ps), drink: dr }; }
      }
      else if (p.op === 'scan' || p.op === 'checkin') {
        var t = String(p.code || '').replace(/^RH1:/, ''), kk = d.keys.filter(function (x) { return p.op === 'scan' ? x.token === t : x.id === p.id; })[0];
        if (!kk) r = { ok: true, result: 'notfound' };
        else if (kk.status === 'Đã dùng') r = { ok: true, result: 'used', key: keyOut(kk) };
        else if (kk.status === 'Huỷ') r = { ok: true, result: 'cancelled', key: keyOut(kk) };
        else if (kk.status === 'Chờ') r = { ok: true, result: 'pending', key: keyOut(kk), orderStatus: (d.orders[kk.order] || {}).status };
        else { kk.status = 'Đã dùng'; kk.checkinAt = Date.now(); save(d); r = { ok: true, result: 'ok', key: keyOut(kk) }; }
      } else if (p.op === 'search') {
        var q = plain(p.q);
        r = { ok: true, items: q.length < 2 ? [] : d.keys.filter(function (x) { var o4 = d.orders[x.order] || {}; return plain([x.id, x.name, o4.name, o4.phone, o4.email].join(' ')).indexOf(q) >= 0; })
          .slice(0, 30).map(function (x) { var ko = keyOut(x); delete ko.token; ko.buyer = (d.orders[x.order] || {}).name; ko.phone = (d.orders[x.order] || {}).phone; return ko; })
          .concat(q.length < 2 ? [] : d.passes.filter(function (x) { return plain([x.id, x.name, x.role].join(' ')).indexOf(q) >= 0; }).map(function (x) { return passOut(x); })) };
      } else if (p.op === 'door') {
        var s2 = stats(d), nd = { do: 0, trang: 0 }; p.keys.forEach(function (k) { nd[k.phe]++; });
        if (nd.do > s2.do.left || nd.trang > s2.trang.left) r = { ok: false, code: 'FULL', stats: s2, error: 'Phe ' + (nd.do > s2.do.left ? 'Đỏ' : 'Trắng') + ' đã đủ quân. Mời khách chọn phe còn lại.' };
        else {
          var id2 = rid(), eat2 = p.keys.filter(function (k) { return k.eatMe; }).length, tot = p.keys.length * CFG.GIA_TAI_CUA + eat2 * CFG.GIA_EAT_ME;
          d.orders[id2] = { id: id2, at: Date.now(), kenh: 'Tại cửa', name: p.keys[0].name, phone: p.phone || '', email: '', status: 'Bán tại cửa', hold: 0, total: tot };
          var out = p.keys.map(function (k, i) { var o5 = { id: id2 + '-' + (i + 1), order: id2, name: k.name || ('Khách tại cửa ' + (i + 1)), phe: k.phe, eatMe: !!k.eatMe, status: 'Đã dùng', token: tok(), checkinAt: Date.now(), kenh: 'Tại cửa' }; d.keys.push(o5); return { id: o5.id, name: o5.name, phe: o5.phe, eatMe: o5.eatMe }; });
          save(d); r = { ok: true, orderId: id2, total: tot, keys: out };
        }
      } else if (p.op === 'stats') {
        var det = { do: { sold: 0, inside: 0, eat: 0 }, trang: { sold: 0, inside: 0, eat: 0 }, door: 0, pending: 0 };
        d.keys.forEach(function (x) {
          if (x.status === 'Hợp lệ' || x.status === 'Đã dùng') { det[x.phe].sold++; if (x.eatMe) det[x.phe].eat++; }
          if (x.status === 'Đã dùng') det[x.phe].inside++;
          if (x.kenh === 'Tại cửa') det.door++;
          if (x.status === 'Chờ' && holds(x, d)) det.pending++;
        });
        det.artist = { total: d.passes.filter(function (x) { return x.status !== 'Huỷ'; }).length, inside: d.passes.filter(function (x) { return x.status !== 'Huỷ' && x.scans; }).length };
        r = { ok: true, stats: stats(d), detail: det };
      } else r = { ok: false, error: 'Không rõ thao tác' };
    } else r = { ok: false, error: 'Không rõ yêu cầu' };
    return new Promise(function (res) { setTimeout(function () { res(JSON.parse(JSON.stringify(r))); }, 350 + Math.random() * 400); });
  }

  g.RH_API = {
    demo: DEMO,
    get: function (p) { return DEMO ? mock('GET', p) : real('GET', p); },
    post: function (p) { return DEMO ? mock('POST', p) : real('POST', p); },
    resetDemo: function () { localStorage.removeItem(KEY); },
    demoKeys: function () { return db().keys; }
  };
})(window);
