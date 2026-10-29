/* =============================================================
   main.js — JavaScript dùng chung cho mọi trang LernLeap
   Gồm: tiện ích, lưu trữ, giao diện sáng/tối, đa ngôn ngữ (DE/EN),
   popover cài đặt, menu mobile, đánh dấu mục nav hiện tại.
   Mọi thứ nằm trong window.LL. JS riêng của từng trang đặt ở
   scripts/pages/<tên>.js và gọi LL.* từ đó.
   ============================================================= */
(function () {
  'use strict';
  var D = document, R = D.documentElement;
  var $ = function (s, c) { return (c || D).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || D).querySelectorAll(s)); };
  R.classList.add('js');

  /* ---------- localStorage an toàn (không lỗi khi bị chặn) ---------- */
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- Giảm chuyển động ---------- */
  var mq = matchMedia('(prefers-reduced-motion: reduce)');
  var reducedMotion = function () { return mq.matches; };

  /* ---------- Ảnh trong assets/ ----------
     Dùng: <img data-asset="sit" width=".." height=".." alt="">
     Thêm ảnh mới: bỏ file vào assets/meo/ rồi thêm tên vào danh sách. */
  var ASSETS = { sit: 'assets/meo/sit.webp', run: 'assets/meo/run.webp', yarn: 'assets/meo/yarn.webp',
    scat: 'assets/meo/scat.webp', zzz: 'assets/meo/zzz.webp', sleep: 'assets/meo/sleep.webp', ball: 'assets/meo/ball.webp' };
  function fillAssets(root) {
    $$('img[data-asset]', root).forEach(function (i) {
      if (!i.getAttribute('src') && ASSETS[i.dataset.asset]) i.src = ASSETS[i.dataset.asset];
    });
  }

  /* ---------- Đa ngôn ngữ ----------
     HTML:  <h1 data-i18n="nav.lab">LernLab</h1>
            <img data-i18n-alt="alt.sit">   <button data-i18n-label="set.btn">  (aria-label)
     JS:    LL.i18n.add({ de: { 'x.y': '…' }, en: { 'x.y': '…' } })
     Chữ "MEo" trong bản dịch tự thành wordmark có cuộn len. */
  var MEO = '<span class="meo-w">M<span class="meo-e">E<svg class="yb" viewBox="0 0 10 10" aria-hidden="true">' +
    '<circle cx="5" cy="5" r="4.3" fill="#B3261E"/><path d="M2.3 3.5c2-1.3 4.1-1 5.6.4M1.6 5.5c2.3-1 4.8-.8 6.8.6M2.7 7.5c1.6-.7 3.4-.6 4.8.2" fill="none" stroke="#7E1410" stroke-width=".8" stroke-linecap="round"/>' +
    '<path d="M8.3 8.3c.7.6 1.3.4 1.7-.3" fill="none" stroke="#B3261E" stroke-width=".9" stroke-linecap="round"/></svg></span>o</span>';
  var T = {
    de: { skip: 'Zum Inhalt', 'nav.label': 'Hauptnavigation', 'nav.start': 'Start', 'nav.lab': 'LernLab', 'nav.check': 'LernCheck',
      'nav.about': 'Über LernLeap', menu: 'Menü', 'set.btn': 'Einstellungen', 'set.theme': 'Darstellung', 'theme.light': 'Hell',
      'theme.dark': 'Dunkel', 'set.lang': 'Sprache' },
    en: { skip: 'Skip to content', 'nav.label': 'Main navigation', 'nav.start': 'Start', 'nav.lab': 'LernLab', 'nav.check': 'LernCheck',
      'nav.about': 'About LernLeap', menu: 'Menu', 'set.btn': 'Settings', 'set.theme': 'Appearance', 'theme.light': 'Light',
      'theme.dark': 'Dark', 'set.lang': 'Language' }
  };
  var lang = store.get('ll-lang') === 'en' ? 'en' : 'de';
  var i18n = {
    add: function (dict) { Object.keys(dict).forEach(function (l) { T[l] = Object.assign(T[l] || {}, dict[l]); }); i18n.apply(); },
    t: function (key) { var v = (T[lang] || {})[key]; return v == null ? key : v; },
    get lang() { return lang; },
    apply: function (root) {
      var t = T[lang] || {};
      R.lang = lang;
      $$('[data-i18n]', root).forEach(function (e) { if (t[e.dataset.i18n] != null) e.innerHTML = t[e.dataset.i18n].replace(/MEo/g, MEO); });
      $$('[data-i18n-alt]', root).forEach(function (e) { if (t[e.dataset.i18nAlt] != null) e.alt = t[e.dataset.i18nAlt]; });
      $$('[data-i18n-label]', root).forEach(function (e) { if (t[e.dataset.i18nLabel] != null) e.setAttribute('aria-label', t[e.dataset.i18nLabel]); });
      $$('input[name=lang]').forEach(function (i) { i.checked = i.value === lang; });
      D.dispatchEvent(new CustomEvent('ll:langchange', { detail: { lang: lang } }));
    },
    set: function (l) { lang = l === 'en' ? 'en' : 'de'; store.set('ll-lang', lang); i18n.apply(); }
  };

  /* ---------- Giao diện sáng / tối ---------- */
  var theme = R.dataset.theme || 'light';
  function applyTheme(th) {
    if (th) theme = th;
    R.dataset.theme = theme;
    $$('input[name=theme]').forEach(function (i) { i.checked = i.value === theme; });
    D.dispatchEvent(new CustomEvent('ll:themechange', { detail: { theme: theme } }));
  }

  /* ---------- Nav: đánh dấu mục hiện tại ----------
     <a href="…" data-r="lab">  →  LL.nav.setCurrent('lab') */
  var nav = {
    setCurrent: function (key) {
      $$('.nav a').forEach(function (a) {
        if (a.dataset.r === key) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    }
  };

  /* ---------- Popover cài đặt + menu mobile ---------- */
  function initHeader() {
    var setBtn = $('#setBtn'), pop = $('#setPop'), menuBtn = $('#menuBtn'), navEl = $('#nav');
    if (!setBtn || !pop) return;
    function popOpen(o) { pop.hidden = !o; setBtn.setAttribute('aria-expanded', o); }
    function menuClose() { if (!navEl) return; navEl.classList.remove('open'); if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false'); }
    setBtn.addEventListener('click', function () { popOpen(pop.hidden); if (!pop.hidden) { var c = $('input:checked', pop); if (c) c.focus(); } });
    D.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (!pop.hidden) { popOpen(false); setBtn.focus(); }
      menuClose();
    });
    D.addEventListener('click', function (e) { if (!pop.hidden && !pop.contains(e.target) && !setBtn.contains(e.target)) popOpen(false); });
    if (menuBtn && navEl) {
      menuBtn.addEventListener('click', function () { menuBtn.setAttribute('aria-expanded', navEl.classList.toggle('open')); });
      navEl.addEventListener('click', function (e) { if (e.target.closest('a')) menuClose(); });
    }
    $$('input[name=theme]').forEach(function (i) { i.addEventListener('change', function () { store.set('ll-theme', i.value); applyTheme(i.value); }); });
    $$('input[name=lang]').forEach(function (i) { i.addEventListener('change', function () { i18n.set(i.value); }); });
  }

  /* ---------- Khởi động ---------- */
  window.LL = { $: $, $$: $$, store: store, reducedMotion: reducedMotion, motionQuery: mq,
    assets: ASSETS, fillAssets: fillAssets, i18n: i18n, applyTheme: applyTheme, nav: nav, MEO: MEO };
  function boot() { initHeader(); applyTheme(); fillAssets(); i18n.apply(); }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', boot); else boot();
})();
