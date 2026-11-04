/* Victor landing page: content rendering, language switch, running rows,
   category scroll-spy and the contact pop-up. */
(function () {
  "use strict";

  // Where the contact form sends messages. Set this to the sales inbox.
  const CONTACT_EMAIL = "";

  const CATS = window.VICTOR_CATEGORIES;
  const FEATURES = window.VICTOR_FEATURES;

  const STRINGS = {
    en: {
      "skip": "Skip to content",
      "nav.home": "Home", "nav.designs": "Designs", "nav.features": "Features", "nav.contact": "Contact",
      "cta.contact": "Contact us", "cta.features": "View features",
      "hero.eyebrow": "iGaming solutions provider",
      "hero.title": "Everything you<br>need to win.",
      "hero.sub": "Sportsbook, live casino, slots, e-sports, mini games and jackpots on one platform, custom-built in your brand.",
      "designs.title": "Choose your style",
      "designs.sub": "Ready-made looks we tailor to every client.",
      "products.eyebrow": "Products",
      "products.title": "One platform. Every product.",
      "features.title": "All features",
      "features.sub": "56 features in 7 categories. New features added every month, or built on request.",
      "points.caps": "Key capabilities", "points.widgets": "Widgets on the page", "points.how": "How it works",
      "value": "Business value",
      "providers": "Providers",
      "tbc": "Detail to come",
      "contact.title": "Ready to launch your platform?",
      "contact.sub": "Tell us about your project and our team will get back to you.",
      "footer.rights": "All rights reserved.", "footer.menu": "Menu", "footer.contact": "Contact", "footer.legal": "Legal",
      "footer.email": "Email", "footer.kakao": "KakaoTalk", "footer.privacy": "Privacy", "footer.terms": "Terms",
      "form.name": "Name", "form.company": "Company", "form.email": "Email",
      "form.messenger": "Telegram / WhatsApp / KakaoTalk (optional)", "form.message": "Message", "form.send": "Send message",
      "form.invalid": "Please fill in your name, a valid email and a message.",
      "form.opened": "Your email app should open with the message ready to send.",
      "form.subject": "Victor enquiry",
      "screen": "Mobile screen of",
      "products": {
        sports: { title: "Sports", list: ["Pre-match & live", "Over 8 sports", "1,000+ leagues", "User-customizable view", "Live TV", "Live info"] },
        casino: { title: "Casino", providers: ["Eeze (?)", "Pragmatic", "Ezugi", "Skywind", "Evolution", "CreedRoomz", "PlayAce"] },
        esports: { title: "E-sports" }, slots: { title: "Slots" }, promotions: { title: "Promotions" }
      }
    },
    ko: {
      "skip": "본문으로 건너뛰기",
      "nav.home": "홈", "nav.designs": "디자인", "nav.features": "기능", "nav.contact": "문의",
      "cta.contact": "문의하기", "cta.features": "기능 보기",
      "hero.eyebrow": "아이게이밍 솔루션 제공사",
      "hero.title": "승리에 필요한<br>모든 것.",
      "hero.sub": "스포츠북, 라이브 카지노, 슬롯, e스포츠, 미니게임, 잭팟을 하나의 플랫폼에. 귀사의 브랜드로 맞춤 제작합니다.",
      "designs.title": "스타일을 고르세요",
      "designs.sub": "고객사마다 맞춰 다듬는 완성형 디자인.",
      "products.eyebrow": "상품",
      "products.title": "하나의 플랫폼. 모든 상품.",
      "features.title": "전체 기능",
      "features.sub": "7개 카테고리, 56개 기능. 매달 새 기능이 추가되고, 요청 시 제작합니다.",
      "points.caps": "주요 기능", "points.widgets": "페이지 위젯", "points.how": "참여 방법",
      "value": "비즈니스 가치",
      "providers": "게임 제공사",
      "tbc": "상세 내용 준비 중",
      "contact.title": "플랫폼을 시작할 준비가 되셨나요?",
      "contact.sub": "프로젝트를 알려 주시면 담당 팀이 연락드립니다.",
      "footer.rights": "All rights reserved.", "footer.menu": "메뉴", "footer.contact": "연락처", "footer.legal": "약관",
      "footer.email": "이메일", "footer.kakao": "카카오톡", "footer.privacy": "개인정보처리방침", "footer.terms": "이용약관",
      "form.name": "이름", "form.company": "회사", "form.email": "이메일",
      "form.messenger": "텔레그램 / 왓츠앱 / 카카오톡 (선택)", "form.message": "메시지", "form.send": "메시지 보내기",
      "form.invalid": "이름, 올바른 이메일, 메시지를 입력해 주세요.",
      "form.opened": "메일 앱이 열리면 작성된 메시지를 보내 주세요.",
      "form.subject": "Victor 문의",
      "screen": "모바일 화면:",
      "products": {
        sports: { title: "스포츠", list: ["경기 전 & 라이브", "8개 이상 종목", "1,000개 이상 리그", "사용자 맞춤 화면", "라이브 TV", "라이브 정보"] },
        casino: { title: "카지노", providers: ["Eeze (?)", "Pragmatic", "Ezugi", "Skywind", "Evolution", "CreedRoomz", "PlayAce"] },
        esports: { title: "e스포츠" }, slots: { title: "슬롯" }, promotions: { title: "프로모션" }
      }
    }
  };

  const PRODUCTS = ["sports", "casino", "esports", "slots", "promotions"];

  let lang = pickLanguage();

  function pickLanguage() {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "ko" || q === "en") return q;
    try { const s = localStorage.getItem("victor-lang"); if (s === "ko" || s === "en") return s; } catch (e) {}
    return "en";
  }

  const t = (key) => STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const catName = (id) => { const c = CATS.find((x) => x.id === id); return c ? c[lang] : ""; };

  /* ---------- Static text ---------- */
  function applyStrings() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
    document.querySelectorAll(".lang-toggle [data-lang]").forEach((el) => {
      el.classList.toggle("is-current", el.dataset.lang === lang);
    });
    document.querySelector(".lang-toggle").setAttribute("aria-label", lang === "en" ? "한국어로 보기" : "View in English");
  }

  /* ---------- Products ---------- */
  function renderProducts() {
    const P = t("products");
    document.getElementById("product-grid").innerHTML = PRODUCTS.map((id) => {
      const p = P[id];
      let body;
      if (p.list) {
        body = '<ul class="dash-list">' + p.list.map((x) => "<li>" + esc(x) + "</li>").join("") + "</ul>";
      } else if (p.providers) {
        body = '<p class="list-label">' + esc(t("providers")) + '</p><ul class="dash-list">' +
          p.providers.map((x) => "<li>" + esc(x) + "</li>").join("") + "</ul>";
      } else {
        body = '<ul class="dash-list is-placeholder">' + ("<li>" + esc(t("tbc")) + "</li>").repeat(4) + "</ul>";
      }
      return '<article class="product">' +
        '<img class="product-img" src="assets/img/product-' + id + '.jpg" alt="" width="1146" height="780" loading="lazy">' +
        '<div class="product-body"><div class="product-title"><span class="icon-tile">' + VictorIcon("product-" + id) + "</span>" +
        "<h3>" + esc(p.title) + "</h3></div>" + body + "</div></article>";
    }).join("");
  }

  /* ---------- Running rows ---------- */
  function chipHTML(f) {
    return '<a class="chip" href="#feature-' + pad(f.n) + '" data-feature="' + f.n + '">' +
      '<span class="icon-tile">' + VictorIcon("f" + pad(f.n)) + "</span>" + esc(f[lang].name) + "</a>";
  }
  function renderMarquee() {
    // All 56 features across the two rows, alternating so each row mixes categories.
    const rows = [[], []];
    FEATURES.forEach((f, i) => rows[i % 2].push(f));
    document.querySelectorAll(".marquee-row").forEach((row, r) => {
      const set = rows[r].map(chipHTML).join("");
      const track = row.querySelector(".marquee-track");
      // Two copies so the loop is seamless; the copy is hidden from screen readers.
      track.innerHTML = set + '<span class="marquee-copy" aria-hidden="true" style="display:contents">' + set + "</span>";
      track.querySelectorAll(".marquee-copy a").forEach((a) => a.setAttribute("tabindex", "-1"));
      track.style.animationDuration = Math.round(rows[r].length * 4.2) + "s";
    });
  }

  /* ---------- Features ---------- */
  function featureHTML(f) {
    const c = f[lang];
    const shots = f.screens;
    const a = shots[0], b = shots[1] || shots[0];
    const alt = esc(t("screen") + " " + c.name);
    // Korean pages show the Korean version of each phone screen.
    const dir = lang === "ko" ? "assets/screens-ko/" : "assets/screens/";
    return '<article class="feature" id="feature-' + pad(f.n) + '">' +
      '<div class="feature-text">' +
        '<div class="feature-meta"><p class="eyebrow">' + esc(catName(f.cat)) + "</p>" +
          (c.tag ? '<span class="feature-tag">' + esc(c.tag) + "</span>" : "") + "</div>" +
        '<h3 class="feature-title">' + esc(c.name) + "</h3>" +
        '<p class="feature-desc">' + esc(c.desc) + "</p>" +
        '<div class="points"><p class="points-label">' + esc(t("points." + f.points)) + "</p><ol>" +
          c.list.map((x) => "<li>" + esc(x) + "</li>").join("") + "</ol></div>" +
        '<div class="value-box"><p class="points-label">' + esc(t("value")) + "</p>" +
          c.value.map((x) => "<p>" + esc(x) + "</p>").join("") + "</div>" +
      "</div>" +
      '<div class="feature-preview">' +
        '<div class="phone phone--a"><img src="' + dir + a + '.jpg" alt="' + alt + '" width="720" height="1600" loading="lazy" decoding="async"></div>' +
        '<div class="phone phone--b' + (b === a ? " is-same" : "") + '"><img src="' + dir + b + '.jpg" alt="' + (b === a ? "" : alt) + '" width="720" height="1600" loading="lazy" decoding="async"></div>' +
      "</div></article>";
  }
  function renderFeatures() {
    document.getElementById("cat-chips").innerHTML = CATS.map((c, i) =>
      '<a class="cat-chip' + (i === 0 ? " is-active" : "") + '" href="#cat-' + c.id + '" data-cat="' + c.id + '">' + esc(c[lang]) + "</a>"
    ).join("");
    document.getElementById("feature-list").innerHTML = CATS.map((c, i) => {
      const items = FEATURES.filter((f) => f.cat === c.id);
      return '<section class="cat-group" id="cat-' + c.id + '" data-cat="' + c.id + '" aria-label="' + esc(c[lang]) + '">' +
        '<h3 class="cat-heading"><span class="num">' + pad(i + 1) + "</span>" + esc(c[lang]) + "</h3>" +
        '<div class="feature-stack">' + items.map(featureHTML).join("") + "</div></section>";
    }).join("");
    setupCategorySpy();
  }

  /* ---------- Category chips follow the scroll ---------- */
  let catObserver;
  function setActiveCat(id) {
    document.querySelectorAll(".cat-chip").forEach((chip) => {
      const on = chip.dataset.cat === id;
      chip.classList.toggle("is-active", on);
      if (on) chip.setAttribute("aria-current", "true"); else chip.removeAttribute("aria-current");
      if (on) {
        const bar = chip.parentElement;
        const left = chip.offsetLeft - (bar.clientWidth - chip.offsetWidth) / 2;
        bar.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
      }
    });
  }
  function setupCategorySpy() {
    if (catObserver) catObserver.disconnect();
    const groups = [...document.querySelectorAll(".cat-group")];
    const visible = new Map();
    catObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => visible.set(e.target.dataset.cat, e.isIntersecting));
      const first = groups.find((g) => visible.get(g.dataset.cat));
      if (first) setActiveCat(first.dataset.cat);
    }, { rootMargin: "-160px 0px -55% 0px" });
    groups.forEach((g) => catObserver.observe(g));
  }

  /* ---------- Header nav follows the scroll ---------- */
  function setupNavSpy() {
    const links = [...document.querySelectorAll(".nav-link")];
    const ids = ["home", "designs", "features", "contact"];
    const map = { products: "designs" };
    const sections = [...document.querySelectorAll("main > section[id]")];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = map[e.target.id] || e.target.id;
        if (!ids.includes(id)) return;
        links.forEach((l) => l.classList.toggle("is-active", l.dataset.section === id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => io.observe(s));
  }

  /* ---------- Chip click: jump to the feature and highlight it ---------- */
  document.addEventListener("click", (e) => {
    const chip = e.target.closest("a.chip[data-feature]");
    if (!chip) return;
    const card = document.getElementById("feature-" + pad(chip.dataset.feature));
    if (!card) return;
    e.preventDefault();
    card.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", "#feature-" + pad(chip.dataset.feature));
    card.classList.remove("is-flash"); void card.offsetWidth; card.classList.add("is-flash");
  });

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobile-menu");
  function setMenu(open) {
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
  }
  menuBtn.addEventListener("click", () => setMenu(menu.hidden));
  menu.addEventListener("click", (e) => { if (e.target.closest("a, button")) setMenu(false); });
  matchMedia("(min-width: 1280px)").addEventListener("change", (m) => { if (m.matches) setMenu(false); });

  /* ---------- Language ---------- */
  document.querySelector(".lang-toggle").addEventListener("click", () => {
    lang = lang === "en" ? "ko" : "en";
    try { localStorage.setItem("victor-lang", lang); } catch (e) {}
    const url = new URL(location.href);
    if (lang === "ko") url.searchParams.set("lang", "ko"); else url.searchParams.delete("lang");
    history.replaceState(null, "", url);
    render();
  });

  /* ---------- Contact pop-up ---------- */
  const modal = document.getElementById("contact-modal");
  const form = document.getElementById("contact-form");
  const note = document.getElementById("form-note");
  let lastFocus = null;

  function openModal() {
    lastFocus = document.activeElement;
    setMenu(false);
    modal.hidden = false;
    document.body.classList.add("no-scroll");
    note.textContent = "";
    setTimeout(() => form.querySelector("input").focus(), 30);
  }
  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-open-contact]")) { e.preventDefault(); openModal(); }
    else if (e.target.closest("[data-close-contact]")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") {
      const f = [...modal.querySelectorAll("input, textarea, button")];
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll("[required]").forEach((el) => {
      const bad = !el.value.trim() || (el.type === "email" && !/^\S+@\S+\.\S+$/.test(el.value.trim()));
      el.closest(".field").classList.toggle("is-invalid", bad);
      if (bad) ok = false;
    });
    if (!ok) { note.textContent = t("form.invalid"); return; }
    const d = new FormData(form);
    const body = [
      t("form.name") + ": " + d.get("name"),
      t("form.company") + ": " + d.get("company"),
      t("form.email") + ": " + d.get("email"),
      t("form.messenger") + ": " + d.get("messenger"),
      "",
      d.get("message")
    ].join("\n");
    location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(t("form.subject")) + "&body=" + encodeURIComponent(body);
    note.textContent = t("form.opened");
  });
  form.addEventListener("input", (e) => {
    const field = e.target.closest(".field");
    if (field) field.classList.remove("is-invalid");
  });

  /* ---------- Go ---------- */
  function render() {
    applyStrings();
    renderProducts();
    renderMarquee();
    renderFeatures();
  }
  // Hero video: hold still for people who prefer reduced motion.
  const heroVideo = document.querySelector("video.hero-bg");
  if (heroVideo) {
    const still = matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => { if (still.matches) heroVideo.pause(); else heroVideo.play().catch(() => {}); };
    apply(); still.addEventListener("change", apply);
  }

  document.getElementById("year").textContent = new Date().getFullYear();
  render();
  setupNavSpy();

  // Open a feature link (e.g. #feature-13) after the cards exist.
  if (/^#(feature-\d\d|cat-\w+)$/.test(location.hash)) {
    const el = document.querySelector(location.hash);
    if (el) requestAnimationFrame(() => el.scrollIntoView());
  }
})();
