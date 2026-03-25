const SUPABASE_URL = "https://wtcbwpwgicshmflhgwiw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0Y2J3cHdnaWNzaG1mbGhnd2l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNjIyNjksImV4cCI6MjA4ODgzODI2OX0.T1loq9XF6VUNFStXpFiJZ9p7R8bn4ulisJUxGx34TYY";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── State ────────────────────────────────────────────────
let allPerfumes = [];
let activeIdx   = -1;

// ─── DOM refs ─────────────────────────────────────────────
const viewHeader  = document.getElementById("view-header");
const mainContent = document.getElementById("main-content");
const navLeft     = document.getElementById("nav-left");
const navRight    = document.getElementById("nav-right");

// ─── Boot ─────────────────────────────────────────────────
async function init() {
  const PAGE = 1000;
  let from = 0, all = [];

  while (true) {
    const { data, error } = await client
      .from("original_perfume")
      .select("id, name, sex, image_url, brand:brand_id(name)")
      .order("name")
      .range(from, from + PAGE - 1);

    if (error) {
      mainContent.innerHTML = `<div class="state-msg"><span class="state-icon">◈</span><span>Erreur de chargement. Veuillez rafraîchir.</span></div>`;
      return;
    }

    all = all.concat(data);
    if (data.length < PAGE) break;
    from += PAGE;
  }

  allPerfumes = all;
  window.allPerfumes = allPerfumes; // exposed for testing
  handleRoute();
}

// ─── Slug ─────────────────────────────────────────────────
function toSlug(brand, name) {
  return [brand, name]
    .join(" ")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")   // supprimer accents
    .replace(/[°№&']/g, "")            // supprimer symboles spéciaux
    .replace(/[^a-z0-9]+/g, "-")       // tout le reste → tiret
    .replace(/^-+|-+$/g, "");          // trim tirets
}

function findBySlug(slug) {
  // Fallback : ID numérique (anciens liens)
  if (/^\d+$/.test(slug)) return allPerfumes.find(p => p.id === parseInt(slug)) || null;
  return allPerfumes.find(p => toSlug(p.brand?.name || "", p.name) === slug) || null;
}

// ─── Routing ──────────────────────────────────────────────
function handleRoute() {
  const match = window.location.pathname.match(/^\/parfum\/(.+)$/);
  if (match) {
    const perfume = findBySlug(match[1]);
    if (perfume) {
      loadDetail(perfume.id);
    } else {
      showSearchView();
    }
  } else {
    showSearchView();
  }
}

window.addEventListener("popstate", handleRoute);

// ─── Search view ──────────────────────────────────────────
function showSearchView() {
  document.title = "Aroma Matches — L'Atelier Digital";
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = "Trouvez des alternatives abordables aux parfums de luxe. Même sillage, jusqu'à 90% moins cher. Parcourez 1 000+ alternatives.";
  }

  // Restore mobile nav
  if (navLeft) {
    navLeft.innerHTML = `<span class="material-symbols-outlined">menu</span>`;
    navLeft.onclick = null;
    navLeft.setAttribute("aria-label", "Menu");
  }

  // Restore nav-right search button
  if (navRight) {
    navRight.innerHTML = `
      <button class="nav-icon-btn" aria-label="Rechercher" onclick="focusSearch()">
        <span class="material-symbols-outlined">search</span>
      </button>
    `;
  }

  // Update active nav link
  document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("nav-link--active"));
  const discoverLink = document.querySelector('.nav-link[data-page="discover"]');
  if (discoverLink) discoverLink.classList.add("nav-link--active");

  // Hero
  viewHeader.innerHTML = `
    <section class="hero">
      <div class="hero-bg">
        <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1400&q=85" alt="" class="hero-bg-img" />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">Trouver l'alternative parfaite</h1>
        <div class="hero-search-wrap">
          <input
            type="search"
            id="search"
            class="hero-search-input"
            placeholder="Entrez le nom d'un parfum de luxe..."
            autocomplete="off"
            spellcheck="false"
            aria-autocomplete="list"
            aria-controls="ac-list"
            aria-label="Rechercher un parfum"
          />
          <button class="hero-search-btn" onclick="triggerFirstMatch()">
            Trouver <span class="material-symbols-outlined">arrow_forward</span>
          </button>
          <ul id="ac-list" class="ac-list hidden" role="listbox" aria-label="Suggestions"></ul>
        </div>
        <div class="hero-suggestions">
          <span class="suggestion-label">Suggestions :</span>
          <button class="suggestion-pill" onclick="setSearch('Baccarat Rouge')">Baccarat Rouge</button>
          <button class="suggestion-pill" onclick="setSearch('Aventus')">Aventus</button>
          <button class="suggestion-pill" onclick="setSearch('Sauvage')">Sauvage</button>
        </div>
      </div>
    </section>
  `;

  // Main content: trending + promo + educational
  mainContent.innerHTML = `
    <!-- Trending section -->
    <section class="trending-section">
      <div class="section-container">
        <div class="trending-header">
          <div>
            <h2 class="trending-title">Tendances du moment</h2>
            <p class="trending-desc">Découvrez les correspondances les plus populaires de notre communauté d'experts et passionnés.</p>
          </div>
          <button class="trending-all-btn">Voir tout le catalogue</button>
        </div>
        <div class="trending-grid" id="trending-grid">
          ${renderTrendingSkeleton()}
        </div>
      </div>
    </section>

    <!-- Promotional section -->
    <section class="promo-section">
      <div class="promo-deco" aria-hidden="true">
        <span class="material-symbols-outlined">spa</span>
      </div>
      <div class="promo-inner">
        <h2 class="promo-title">Aidez-nous à grandir</h2>
        <p class="promo-text">
          Notre bibliothèque s'enrichit grâce à votre expertise. Vous avez découvert une alternative bluffante ?
          Partagez-la avec la communauté et devenez un contributeur de l'Atelier Aroma Matches.
        </p>
        <div class="promo-btns">
          <button class="btn-gold">Soumettre un dupe</button>
          <button class="btn-outline">En savoir plus</button>
        </div>
      </div>
    </section>

    <!-- Educational section -->
    <section class="edu-section">
      <div class="section-container edu-grid">
        <div class="edu-text">
          <span class="edu-label">L'Art de la Parfumerie</span>
          <h2 class="edu-title">Comprendre la pyramide olfactive</h2>
          <div class="edu-steps">
            <div class="edu-step">
              <div class="edu-step-num edu-step-num--1">1</div>
              <div>
                <h4 class="edu-step-title">Notes de Tête</h4>
                <p class="edu-step-desc">L'envolée du parfum. Ce sont les senteurs volatiles que l'on perçoit immédiatement : agrumes, herbes aromatiques, notes aquatiques.</p>
              </div>
            </div>
            <div class="edu-step">
              <div class="edu-step-num edu-step-num--2">2</div>
              <div>
                <h4 class="edu-step-title">Notes de Cœur</h4>
                <p class="edu-step-desc">Le caractère du parfum. Elles se développent après quelques minutes et constituent la signature olfactive : floral, fruité ou épicé.</p>
              </div>
            </div>
            <div class="edu-step">
              <div class="edu-step-num edu-step-num--3">3</div>
              <div>
                <h4 class="edu-step-title">Notes de Fond</h4>
                <p class="edu-step-desc">Le sillage. Elles assurent la tenue du parfum pendant plusieurs heures : bois précieux, muscs, ambre, vanille.</p>
              </div>
            </div>
          </div>
          <div class="note-pills">
            <span class="note-pill">Boisé</span>
            <span class="note-pill">Floral</span>
            <span class="note-pill">Musqué</span>
            <span class="note-pill">Ambré</span>
            <span class="note-pill">Hespéridé</span>
          </div>
        </div>

        <div class="edu-image-wrap">
          <div class="edu-image-container">
            <img
              src="https://images.unsplash.com/photo-1608181831718-e2a6a399e8f1?w=800&q=85"
              class="edu-img"
              alt="Ingrédients botaniques"
              loading="lazy"
            />
            <div class="edu-img-overlay"></div>
            <div class="edu-quote">
              <p class="edu-quote-text">"Le parfum est le frère de la respiration."</p>
              <p class="edu-quote-author">— Yves Saint Laurent</p>
            </div>
          </div>
          <div class="edu-deco-rings" aria-hidden="true">
            <div class="edu-ring edu-ring--1"></div>
            <div class="edu-ring edu-ring--2"></div>
            <div class="edu-ring edu-ring--3"></div>
          </div>
        </div>
      </div>
    </section>
  `;

  bindSearch();
  renderTrending();
}

// ─── Trending ─────────────────────────────────────────────
function renderTrendingSkeleton() {
  return Array(4).fill(0).map(() => `
    <div class="trend-card">
      <div class="trend-img-wrap skeleton" style="aspect-ratio:1;border-radius:var(--r-lg)"></div>
      <div class="trend-body" style="margin-top:1.5rem">
        <div class="skeleton" style="height:10px;width:60px;margin-bottom:.5rem"></div>
        <div class="skeleton" style="height:22px;width:140px;margin-bottom:.375rem"></div>
        <div class="skeleton" style="height:14px;width:90px"></div>
      </div>
    </div>
  `).join("");
}

function renderTrending() {
  const grid = document.getElementById("trending-grid");
  if (!grid || allPerfumes.length === 0) return;

  const targetNames = ["baccarat rouge", "sauvage", "aventus", "black opium"];
  const badgeScores = ["94%", "92%", "89%", "96%"];
  const found       = [];

  for (const target of targetNames) {
    const p = allPerfumes.find(p =>
      normalize((p.brand?.name || "") + " " + p.name).includes(target)
    );
    if (p && !found.includes(p)) found.push(p);
  }

  // Fallback: perfumes with images
  if (found.length < 4) {
    for (const p of allPerfumes) {
      if (p.image_url && !found.includes(p)) {
        found.push(p);
        if (found.length >= 4) break;
      }
    }
  }

  grid.innerHTML = found.slice(0, 4).map((p, i) => `
    <div class="trend-card" onclick="navigate(${p.id})" role="button" tabindex="0">
      <div class="trend-img-wrap">
        ${p.image_url
          ? `<img src="${esc(p.image_url)}" class="trend-img" alt="${esc(p.name)}" loading="lazy" referrerpolicy="no-referrer" />`
          : `<div class="trend-img trend-img--empty"></div>`}
        <div class="trend-badge">${badgeScores[i]} Match</div>
      </div>
      <div class="trend-body">
        <p class="trend-label">Alternatives inspirées par</p>
        <h3 class="trend-name">${esc(p.name)}</h3>
        <p class="trend-brand">${esc(p.brand?.name || "")}</p>
        <div class="trend-divider"></div>
        <p class="trend-alt-label">L'Alternative</p>
        <p class="trend-alt-name">Voir les alternatives →</p>
        <button class="trend-btn" onclick="event.stopPropagation(); navigate(${p.id})">Découvrir l'accord</button>
      </div>
    </div>
  `).join("");
}

// ─── Search helpers ───────────────────────────────────────
function focusSearch() {
  const input = document.getElementById("search");
  if (input) {
    input.focus();
    input.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function setSearch(term) {
  const input = document.getElementById("search");
  if (!input) return;
  input.value = term;
  input.dispatchEvent(new Event("input"));
  input.focus();
}

function triggerFirstMatch() {
  const input = document.getElementById("search");
  if (!input || !input.value.trim()) return;
  const matches = getMatches(input.value);
  if (matches.length > 0) navigate(matches[0].id);
}

// ─── Detail view ──────────────────────────────────────────
async function loadDetail(id) {
  // Mobile nav: back button
  if (navLeft) {
    navLeft.innerHTML = `<span class="material-symbols-outlined">arrow_back</span>`;
    navLeft.onclick = goBack;
    navLeft.setAttribute("aria-label", "Retour");
  }
  if (navRight) navRight.innerHTML = "";

  // Loading skeleton header
  viewHeader.innerHTML = `
    <div class="results-page-header">
      <div class="section-container">
        <a href="/" class="back-link" onclick="goBack(); return false;">
          <span class="material-symbols-outlined">arrow_back</span> Retour
        </a>
        <div class="skeleton skeleton-h1"></div>
        <div class="skeleton skeleton-subtitle"></div>
      </div>
    </div>
  `;

  mainContent.innerHTML = `
    <div class="state-msg">
      <span class="state-icon state-icon--spin">◈</span>
    </div>
  `;

  const { data, error } = await client
    .from("original_perfume")
    .select(`
      id, name, sex, image_url,
      brand:brand_id(name),
      dupe_mapping(
        dupe_product:dupe_product_id(
          id, name, price, currency, link, image_url,
          dupe_brand:dupe_brand_id(name, website)
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error || !data) {
    viewHeader.innerHTML = `
      <div class="results-page-header">
        <div class="section-container">
          <a href="/" class="back-link" onclick="goBack(); return false;">
            <span class="material-symbols-outlined">arrow_back</span> Retour
          </a>
          <p style="color:var(--outline)">Parfum introuvable.</p>
        </div>
      </div>
    `;
    mainContent.innerHTML = `<div class="state-msg"><span class="state-icon">◈</span><span>Impossible de charger ce parfum.</span></div>`;
    return;
  }

  renderDetail(data);
}

function renderDetail(perfume) {
  const brandName = perfume.brand?.name || "";
  const sexLabel  = { M: "Homme", F: "Femme", U: "Mixte" }[perfume.sex] || null;

  // SEO: dynamic title + meta description
  document.title = `Alternatives ${perfume.name} ${brandName} — Aroma Matches`.trim();
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = `Trouvez des dupes et alternatives abordables pour ${perfume.name} de ${brandName}. Même sillage, jusqu'à 90% moins cher.`;
  }

  const dupes = perfume.dupe_mapping
    .map(m => m.dupe_product)
    .filter(d => d && d.image_url && !(d.dupe_brand?.name === "Zara" && !d.link))
    .sort((a, b) => {
      if (a.link && !b.link) return -1;
      if (!a.link && b.link) return 1;
      if (a.price != null && b.price != null) return a.price - b.price;
      if (a.price != null) return -1;
      if (b.price != null) return 1;
      return 0;
    });

  const count = dupes.length;

  // Results page header
  viewHeader.innerHTML = `
    <div class="results-page-header">
      <div class="section-container">
        <a href="/" class="back-link" onclick="goBack(); return false;">
          <span class="material-symbols-outlined">arrow_back</span> Retour
        </a>
        <h1 class="results-title">Résultats : ${esc(perfume.name)}</h1>
        <p class="results-subtitle">
          ${count} correspondance${count !== 1 ? "s" : ""} trouvée${count !== 1 ? "s" : ""} dans notre Atelier Digital
        </p>
      </div>
    </div>
  `;

  if (count === 0) {
    mainContent.innerHTML = `
      <div class="results-container section-container">
        <div class="state-msg" style="min-height:320px">
          <span class="state-icon">◈</span>
          <span>Aucune correspondance pour le moment. Revenez bientôt !</span>
        </div>
      </div>
    `;
    return;
  }

  // Original card image
  const origImgHtml = perfume.image_url
    ? `<img src="${esc(perfume.image_url)}" class="original-img" alt="${esc(perfume.name)}" loading="lazy" referrerpolicy="no-referrer" />`
    : `<div class="original-img original-img--empty"></div>`;

  // "Shop Original" button (link to first dupe that has a link, or disabled)
  const shopLink = dupes.find(d => d.link)?.link;
  const shopBtn  = shopLink
    ? `<a class="original-shop-btn" href="${esc(shopLink)}" target="_blank" rel="noopener noreferrer">
         Shop Original <span class="material-symbols-outlined">open_in_new</span>
       </a>`
    : `<button class="original-shop-btn" disabled>
         Shop Original <span class="material-symbols-outlined">open_in_new</span>
       </button>`;

  mainContent.innerHTML = `
    <div class="results-container section-container">
      <div class="results-layout">

        <!-- Left: Original perfume -->
        <aside class="results-original">
          <div class="original-card">
            <div class="original-img-wrap">
              ${origImgHtml}
              <div class="original-badge">Reference Fragrance</div>
            </div>
            <div class="original-meta">
              <h2 class="original-name">${esc(perfume.name)}</h2>
              <p class="original-brand">${esc(brandName)}</p>
              <p class="original-quote">"Une fragrance iconique qui a redéfini les codes de la parfumerie contemporaine."</p>
              <div class="original-pills">
                ${sexLabel ? `<span class="note-pill">${esc(sexLabel)}</span>` : ""}
                <span class="note-pill">Luxe</span>
                <span class="note-pill">Signature</span>
              </div>
              ${shopBtn}
            </div>
          </div>
        </aside>

        <!-- Right: Match cards -->
        <section class="results-matches">
          <div class="matches-grid">
            ${dupes.map((d, i) => renderDupeCard(d, i)).join("")}
          </div>
        </section>

      </div>
    </div>
  `;
}

function renderDupeCard(d, i) {
  const score    = getScore(i);
  const priceStr = d.price != null
    ? `${formatPrice(d.price)}\u202f${d.currency || "EUR"}`
    : null;

  const segs = getAccordSegments(i);

  const imgHtml = d.image_url
    ? `<img src="${esc(d.image_url)}" class="match-img" alt="${esc(d.name)}" loading="lazy" referrerpolicy="no-referrer" />`
    : `<div class="match-img match-img--empty"></div>`;

  const detailBtn = d.link
    ? `<a class="match-details-btn" href="${esc(d.link)}" target="_blank" rel="noopener noreferrer">See Details</a>`
    : `<span class="match-unavailable">Indisponible</span>`;

  return `
    <article class="match-card" style="--delay:${Math.min(i * 0.06, 0.54)}s">
      <div class="match-img-wrap">
        ${imgHtml}
        <div class="match-score-badge">${score}% Match</div>
      </div>
      <div class="match-body">
        <p class="match-brand-label">${esc(d.dupe_brand?.name || "")}</p>
        <h3 class="match-name">${esc(d.name)}</h3>
        <div class="accord-wrap">
          <span class="accord-label">Accord Balance</span>
          <div class="accord-bar">
            <div class="accord-seg accord-seg--1" style="width:${segs[0]}%"></div>
            <div class="accord-seg accord-seg--2" style="width:${segs[1]}%"></div>
            <div class="accord-seg accord-seg--3" style="width:${segs[2]}%"></div>
          </div>
          <div class="accord-legend">
            <span class="accord-legend-item"><span class="legend-dot legend-dot--1"></span> Boisé</span>
            <span class="accord-legend-item"><span class="legend-dot legend-dot--2"></span> Floral</span>
            <span class="accord-legend-item"><span class="legend-dot legend-dot--3"></span> Musqué</span>
          </div>
        </div>
        <div class="match-footer">
          <span class="match-price">${priceStr || "—"}</span>
          ${detailBtn}
        </div>
      </div>
    </article>
  `;
}

// ─── Score & accord helpers ────────────────────────────────
function getScore(i) {
  const scores = [98, 92, 85, 79, 74, 69, 65, 61, 58, 55];
  return scores[i] !== undefined ? scores[i] : Math.max(50, 55 - (i - 9) * 4);
}

function getAccordSegments(i) {
  const table = [
    [50, 30, 20], [45, 30, 25], [40, 35, 25], [35, 40, 25],
    [55, 25, 20], [48, 32, 20], [42, 38, 20], [38, 35, 27],
  ];
  return table[i % table.length];
}

// ─── Navigation ───────────────────────────────────────────
function goBack() {
  history.pushState(null, "", "/");
  showSearchView();
}

// ─── Autocomplete ─────────────────────────────────────────
function normalize(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getMatches(q) {
  const words = normalize(q.trim()).split(/\s+/).filter(w => w.length > 0);
  if (words.length === 0 || words.join("").length < 2) return [];

  return allPerfumes
    .filter(p => {
      const haystack = normalize((p.brand?.name || "") + " " + p.name);
      return words.every(w => haystack.includes(w));
    })
    .slice(0, 9);
}

function openAutocomplete(matches) {
  const list = document.getElementById("ac-list");
  if (!list) return;
  if (matches.length === 0) { closeAutocomplete(); return; }
  const suggestions = document.querySelector(".hero-suggestions");
  if (suggestions) suggestions.style.visibility = "hidden";

  activeIdx = -1;
  const sexSymbol = { M: "♂", F: "♀", U: "⚲" };

  list.innerHTML = matches.map((p, i) => `
    <li class="ac-item" data-id="${p.id}" data-idx="${i}" role="option" tabindex="-1">
      ${p.image_url
        ? `<img class="ac-thumb" src="${esc(p.image_url)}" alt="" loading="lazy" referrerpolicy="no-referrer" />`
        : `<span class="ac-thumb ac-thumb--empty"></span>`}
      <span class="ac-text">
        <span class="ac-brand">${esc(p.brand?.name || "")}</span>
        <span class="ac-name">${esc(p.name)}</span>
      </span>
      ${p.sex ? `<span class="ac-sex">${sexSymbol[p.sex] || ""}</span>` : ""}
    </li>
  `).join("");

  list.classList.remove("hidden");

  list.querySelectorAll(".ac-item").forEach(el => {
    el.addEventListener("mousedown", e => {
      e.preventDefault();
      navigate(parseInt(el.dataset.id));
    });
  });
}

function closeAutocomplete() {
  const list = document.getElementById("ac-list");
  if (!list) return;
  list.classList.add("hidden");
  list.innerHTML = "";
  activeIdx = -1;
  const suggestions = document.querySelector(".hero-suggestions");
  if (suggestions) suggestions.style.visibility = "visible";
}

function updateActive() {
  const list = document.getElementById("ac-list");
  if (!list) return;
  list.querySelectorAll(".ac-item").forEach((el, i) =>
    el.classList.toggle("ac-item--active", i === activeIdx)
  );
}

function navigate(id) {
  closeAutocomplete();
  const input = document.getElementById("search");
  if (input) input.blur();
  const perfume = allPerfumes.find(p => p.id === id);
  const slug = perfume ? toSlug(perfume.brand?.name || "", perfume.name) : String(id);
  history.pushState({ id }, "", "/parfum/" + slug);
  loadDetail(id);
}

// ─── Search binding ────────────────────────────────────────
function bindSearch() {
  const input = document.getElementById("search");
  if (!input) return;

  let blurTimer;

  input.addEventListener("input", e => {
    openAutocomplete(getMatches(e.target.value));
  });

  input.addEventListener("keydown", e => {
    const list  = document.getElementById("ac-list");
    const items = list ? list.querySelectorAll(".ac-item") : [];

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIdx = Math.min(activeIdx + 1, items.length - 1);
      updateActive();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIdx = Math.max(activeIdx - 1, -1);
      updateActive();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIdx >= 0 && items[activeIdx]) {
        navigate(parseInt(items[activeIdx].dataset.id));
      } else {
        triggerFirstMatch();
      }
    } else if (e.key === "Escape") {
      closeAutocomplete();
    }
  });

  input.addEventListener("focus", e => {
    clearTimeout(blurTimer);
    if (e.target.value.length >= 2) openAutocomplete(getMatches(e.target.value));
  });

  input.addEventListener("blur", () => {
    blurTimer = setTimeout(closeAutocomplete, 200);
  });

  // Fermer en cliquant hors de la barre de recherche
  document.addEventListener("click", e => {
    if (!input.closest(".hero-search-wrap")?.contains(e.target)) {
      closeAutocomplete();
    }
  }, { capture: true });
}

// ─── Helpers ──────────────────────────────────────────────
function setMainContent(html) {
  mainContent.innerHTML = html;
}

function formatPrice(n) {
  return Number(n).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── Start ────────────────────────────────────────────────
bindSearch();
init();
