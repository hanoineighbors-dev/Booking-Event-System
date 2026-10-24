/* Chiếc chìa khoá Back to the Rabbit Hole, dựng theo KV Hallo 26.
   keyArt(phe, opts) trả về chuỗi SVG. phe: 'do' | 'trang'.
   Phe Đỏ: đầu chìa chất Cơ, vòng vàng. Phe Trắng: đầu chìa chất Bích, vòng bạc. */
(function (g) {
  var SUIT = {
    co: 'M50 90 C 12 62, 0 38, 14 19 C 27 3, 45 7, 50 25 C 55 7, 73 3, 86 19 C 100 38, 88 62, 50 90 Z',
    bich: 'M50 6 C 62 30, 95 44, 92 67 C 90 84, 70 88, 56 75 C 58 86, 62 93, 69 98 L 31 98 C 38 93, 42 86, 44 75 C 30 88, 10 84, 8 67 C 5 44, 38 30, 50 6 Z'
  };
  var THEME = {
    do: { suit: 'co', suitFill: '#B52025', suitStroke: '#7a0f16', metal: ['#fff3c4', '#f2c75c', '#b98a2b', '#fbe3a0', '#8a5e17'], cellA: '#B52025', cellB: '#121214', inner: '#0b0b0d' },
    trang: { suit: 'bich', suitFill: '#FFFFFF', suitStroke: '#088380', metal: ['#ffffff', '#d9dde1', '#8f969c', '#f4f6f7', '#5d646a'], cellA: '#FFFFFF', cellB: '#088380', inner: '#0b0b0d' }
  };
  var n = 0;
  function keyArt(phe, opts) {
    opts = opts || {};
    var t = THEME[phe] || THEME.do, id = 'k' + (++n) + Math.random().toString(36).slice(2, 6);
    var m = t.metal;
    var cells = '', cw = 22, x0 = 432, y0 = 122;
    // răng chìa: lưới kẻ ô 5 cột x 3 hàng, cắt bậc như răng thật
    var depth = [3, 2, 3, 1, 2];
    for (var c = 0; c < 5; c++) for (var r = 0; r < depth[c]; r++)
      cells += '<rect x="' + (x0 + c * cw) + '" y="' + (y0 + r * cw) + '" width="' + cw + '" height="' + cw + '" fill="' + ((c + r) % 2 ? t.cellB : t.cellA) + '"/>';
    var outline = 'M' + x0 + ' ' + y0;
    for (var c2 = 0; c2 < 5; c2++) outline += ' V' + (y0 + depth[c2] * cw) + ' H' + (x0 + (c2 + 1) * cw);
    outline += ' V' + y0 + ' Z';
    var dots = '';
    for (var i = 0; i < 12; i++) {
      var a = i * Math.PI / 6, cx = 110 + Math.cos(a) * 101, cy = 110 + Math.sin(a) * 101;
      dots += '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + (i % 3 === 0 ? 7 : 4.5) + '" fill="url(#' + id + 'm)"/>';
    }
    var w = opts.width ? ' width="' + opts.width + '"' : '';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220"' + w + ' role="img" aria-label="Chìa khoá phe ' + (phe === 'trang' ? 'Trắng' : 'Đỏ') + '">' +
      '<defs><linearGradient id="' + id + 'm" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + m[0] + '"/><stop offset=".28" stop-color="' + m[1] + '"/><stop offset=".55" stop-color="' + m[2] + '"/>' +
      '<stop offset=".78" stop-color="' + m[3] + '"/><stop offset="1" stop-color="' + m[4] + '"/></linearGradient>' +
      '<linearGradient id="' + id + 's" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + m[0] + '"/><stop offset=".45" stop-color="' + m[2] + '"/><stop offset="1" stop-color="' + m[4] + '"/></linearGradient>' +
      '<radialGradient id="' + id + 'g" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="' + t.suitFill + '" stop-opacity=".28"/><stop offset="1" stop-color="' + t.suitFill + '" stop-opacity="0"/></radialGradient></defs>' +
      // thân chìa
      '<rect x="196" y="98" width="370" height="24" rx="6" fill="url(#' + id + 's)"/>' +
      '<rect x="196" y="98" width="370" height="5" rx="2.5" fill="#fff" opacity=".35"/>' +
      // cổ chìa
      '<rect x="200" y="84" width="14" height="52" rx="4" fill="url(#' + id + 'm)"/>' +
      '<rect x="222" y="90" width="9" height="40" rx="3" fill="url(#' + id + 'm)"/>' +
      // răng kẻ ô
      cells + '<path d="' + outline + '" fill="none" stroke="url(#' + id + 'm)" stroke-width="4" stroke-linejoin="round"/>' +
      '<circle cx="572" cy="110" r="10" fill="url(#' + id + 'm)"/>' +
      // đầu chìa
      dots + '<circle cx="110" cy="110" r="96" fill="url(#' + id + 'm)"/>' +
      '<circle cx="110" cy="110" r="82" fill="' + t.inner + '"/>' +
      '<circle cx="110" cy="110" r="82" fill="url(#' + id + 'g)"/>' +
      '<circle cx="110" cy="110" r="74" fill="none" stroke="url(#' + id + 'm)" stroke-width="1.5" stroke-dasharray="3 5" opacity=".7"/>' +
      '<g transform="translate(66 64) scale(.88)"><path d="' + SUIT[t.suit] + '" fill="' + t.suitFill + '" stroke="' + t.suitStroke + '" stroke-width="3" stroke-linejoin="round"/></g>' +
      '</svg>';
  }
  g.keyArt = keyArt;
})(typeof window !== 'undefined' ? window : this);
