/* =============================================================
   Funken – app.js
   =============================================================

   GOOGLE SHEETS SETUP – Schritt für Schritt:
   ─────────────────────────────────────────
   1. Erstelle ein Google Spreadsheet mit folgenden Spalten
      (exakt so benennen, Reihenfolge egal):
      Titel | Autor | Kategorie | Beschreibung | Bild | Datum | Tags | Status

   2. Kategorie-Werte: Schreiben / Malen / Fotografie / Musik / Basteln / Bewegung
      Status-Werte:    veröffentlicht  (alles andere wird ignoriert)

   3. Datei > Freigabe > Im Web veröffentlichen > "Galerie"-Blatt > CSV > Veröffentlichen
      → Kopiere die ID aus der Spreadsheet-URL (der lange String zwischen /d/ und /edit)

   4. Ersetze SHEET_ID unten mit deiner echten ID.

   5. Erstelle ein Google Formular mit passenden Feldern → Antworten in dasselbe Sheet.
      Kopiere die Formular-URL und ersetze den href im #submit-link im HTML.
   ─────────────────────────────────────────
*/

/* ---------- Konfiguration ---------- */
const CONFIG = {
  // ⚠️ Hier die Spreadsheet-ID eintragen (aus der URL zwischen /d/ und /edit)
  SHEET_ID:       'DEINE_SPREADSHEET_ID',
  SHEET_GALERIE:  'Galerie',      // Tab-Name für die Galerie
  SHEET_IMPULSE:  'Impulse',      // Tab-Name für die Tagesimpulse
  // ⚠️ Web-App-URL aus Google Apps Script (Schritt 4 in SETUP.md)
  FORM_ENDPOINT:  'DEIN_APPS_SCRIPT_URL',

  // Kategorie → Farbklassen (Tailwind arbitrary values)
  CATEGORY_STYLES: {
    'Schreiben':   { badge: 'bg-[#e8f0e9] text-[#5c7a5e]' },
    'Malen':       { badge: 'bg-[#fdf0e8] text-[#a07050]' },
    'Fotografie':  { badge: 'bg-[#f5f0e0] text-[#7a6020]' },
    'Musik':       { badge: 'bg-[#f0eaf8] text-[#6050a0]' },
    'Basteln':     { badge: 'bg-[#e8f5f0] text-[#30806a]' },
    'Bewegung':    { badge: 'bg-[#fdf0f0] text-[#906060]' },
    'Sonstiges':   { badge: 'bg-[#f0e8de] text-[#7a6855]' },
  },
};

/* ---------- Demo-Daten (solange SHEET_ID nicht gesetzt) ---------- */
const DEMO_ITEMS = [
  {
    Titel: 'Herbstnebel',
    Autor: 'Petra M.',
    Kategorie: 'Fotografie',
    Beschreibung: 'Ein stiller Herbstmorgen – diese Aufnahme entstand, als ich versuchte, 10 Minuten lang einfach nur zu beobachten und nichts zu werten.',
    Bild: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=600&q=80',
    Datum: '12. März 2025',
    Tags: 'natur, stille, herbst',
    Status: 'veröffentlicht',
  },
  {
    Titel: 'Brief ans Licht',
    Autor: 'Thomas K.',
    Kategorie: 'Schreiben',
    Beschreibung: 'Ich habe mir selbst geschrieben – von jemandem, der schon auf der anderen Seite dieser Zeit ist. Es hat mir mehr gegeben, als ich erwartet hatte.',
    Bild: '',
    Datum: '3. April 2025',
    Tags: 'brief, mut, reflexion',
    Status: 'veröffentlicht',
  },
  {
    Titel: 'Emotion in Blau',
    Autor: 'Lena S.',
    Kategorie: 'Malen',
    Beschreibung: 'Ich wollte malen, wie sich Sehnsucht anfühlt. Herausgekommen ist Blau in allen Abstufungen – und ein leises Aufatmen.',
    Bild: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80',
    Datum: '28. März 2025',
    Tags: 'aquarell, emotion, blau',
    Status: 'veröffentlicht',
  },
  {
    Titel: 'Drei Töne',
    Autor: 'Maria V.',
    Kategorie: 'Musik',
    Beschreibung: 'Mit einer alten Ukulele, die ich seit Jahren nicht angefasst hatte. Drei Töne, die sich richtig angefühlt haben. Mehr brauchte es nicht.',
    Bild: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=80',
    Datum: '17. April 2025',
    Tags: 'ukulele, improvisation, klang',
    Status: 'veröffentlicht',
  },
  {
    Titel: 'Papierblumen',
    Autor: 'Anonym',
    Kategorie: 'Basteln',
    Beschreibung: 'Aus alten Briefen habe ich Blumen gefaltet. Es hat zwei Stunden gedauert. Ich weiß nicht, wo die Zeit geblieben ist – aber es war gut.',
    Bild: 'https://images.unsplash.com/photo-1490750967868-88df5691cc1d?w=600&q=80',
    Datum: '5. Mai 2025',
    Tags: 'origami, papier, achtsam',
    Status: 'veröffentlicht',
  },
  {
    Titel: 'Morgenlicht, Fenster',
    Autor: 'Claudia H.',
    Kategorie: 'Fotografie',
    Beschreibung: 'In drei Wochen täglich dasselbe Fenster fotografiert. Das Licht ist jeden Tag anders. Ich bin jeden Tag anders. Das fand ich überraschend tröstlich.',
    Bild: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80',
    Datum: '22. April 2025',
    Tags: 'licht, fenster, serie',
    Status: 'veröffentlicht',
  },
];


/* Globale Bild-Fehler-Funktion (wird von onerror="window.__galImgError(this)" aufgerufen) */
window.__galImgError = function (img) {
  const wrap = img.closest('.gallery-img-wrap');
  if (wrap) {
    const fallback = document.createElement('div');
    fallback.className = 'w-full h-full flex items-center justify-center text-5xl opacity-30';
    fallback.setAttribute('aria-hidden', 'true');
    fallback.textContent = '✦';
    wrap.replaceChild(fallback, img);
  }
};


/* ═══════════════════════════════════════════
   GALERIE – Google Sheets Fetch & Render
   ═══════════════════════════════════════════ */

const Gallery = (() => {
  let allItems = [];

  /* Parst die JSON-Antwort der Google Sheets gviz-API */
  function parseGvizJSON(text) {
    // Response hat die Form: google.visualization.Query.setResponse({...});
    const jsonStr = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
    const data = JSON.parse(jsonStr);
    const cols = data.table.cols.map(c => c.label);
    return data.table.rows
      .filter(row => row && row.c)
      .map(row => {
        const item = {};
        row.c.forEach((cell, i) => {
          // .f = formatierter Wert (z.B. Datum), .v = Rohwert
          item[cols[i]] = cell ? (cell.f ?? cell.v ?? '') : '';
        });
        return item;
      })
      .filter(item => String(item.Status).trim().toLowerCase() === 'veröffentlicht');
  }

  async function fetchFromSheets() {
    const url = `https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(CONFIG.SHEET_GALERIE)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    return parseGvizJSON(text);
  }

  function createCard(item) {
    const styles = CONFIG.CATEGORY_STYLES[item.Kategorie] || CONFIG.CATEGORY_STYLES['Sonstiges'];
    const tagsHtml = item.Tags
      ? item.Tags.split(',').map(t =>
          `<span class="text-[0.68rem] px-2 py-0.5 bg-cream rounded-full text-brown-muted">${t.trim()}</span>`
        ).join('')
      : '';

    // Kein komplexer onerror-String – stattdessen globale Hilfsfunktion (s. unten)
    const imageHtml = item.Bild
      ? `<img src="${item.Bild}" alt="${item.Titel}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" onerror="window.__galImgError(this)">`
      : `<div class="w-full h-full flex items-center justify-center text-5xl opacity-30" aria-hidden="true">✦</div>`;

    return `
      <article class="gallery-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group" data-category="${item.Kategorie}">
        <div class="gallery-img-wrap aspect-video bg-cream-dark relative overflow-hidden">
          ${imageHtml}
          <span class="absolute top-3 left-3 text-[0.7rem] font-bold px-2.5 py-1 rounded-full ${styles.badge}">${item.Kategorie}</span>
        </div>
        <div class="p-5 flex flex-col flex-1 gap-2">
          <h3 class="font-serif font-semibold text-brown text-base leading-snug">${item.Titel}</h3>
          <p class="text-xs text-brown-muted">von ${item.Autor}${item.Datum ? ' · ' + item.Datum : ''}</p>
          <p class="text-sm text-brown-muted leading-relaxed flex-1 overflow-hidden" style="-webkit-line-clamp:3;display:-webkit-box;-webkit-box-orient:vertical;">${item.Beschreibung}</p>
          ${tagsHtml ? `<div class="flex flex-wrap gap-1 pt-1">${tagsHtml}</div>` : ''}
        </div>
      </article>`;
  }

  function render(items) {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    grid.innerHTML = items.length
      ? items.map(createCard).join('')
      : `<div class="col-span-full py-16 text-center text-brown-muted">
           <p class="text-4xl mb-4">✦</p>
           <p class="text-sm">Noch keine Einträge in dieser Kategorie.</p>
         </div>`;
  }

  function initFilters() {
    document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.gallery-filter-btn').forEach(b => {
          b.classList.remove('bg-sage', 'text-white');
          b.classList.add('bg-cream', 'text-brown-muted');
        });
        btn.classList.add('bg-sage', 'text-white');
        btn.classList.remove('bg-cream', 'text-brown-muted');

        const filter = btn.dataset.filter;
        const filtered = filter === 'alle'
          ? allItems
          : allItems.filter(i => i.Kategorie === filter);
        render(filtered);
      });
    });
  }

  async function init() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    const isDemo = CONFIG.SHEET_ID === 'DEINE_SPREADSHEET_ID';

    if (isDemo) {
      // Demo-Modus: Zeige Beispiel-Daten und Hinweis
      allItems = DEMO_ITEMS;
      render(allItems);
      grid.insertAdjacentHTML('beforebegin', `
        <div class="bg-[#f5f0e0] border border-[#e8c060] rounded-xl px-5 py-3 flex gap-3 items-start mb-6 text-sm">
          <span class="text-[#e8c060] text-xl shrink-0 mt-0.5">ℹ</span>
          <p class="text-[#7a6020] leading-relaxed">
            <strong>Demo-Modus:</strong> Diese Galerie zeigt Beispiel-Daten.
            Trage die echte <code class="bg-white/70 px-1 rounded">SHEET_ID</code> in <code class="bg-white/70 px-1 rounded">js/app.js</code> ein, um echte Einreichungen zu laden.
          </p>
        </div>`);
      initFilters();
      return;
    }

    try {
      allItems = await fetchFromSheets();
      render(allItems);
      initFilters();
    } catch (err) {
      console.warn('[Galerie] Fehler beim Laden:', err);
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center text-brown-muted">
          <p class="text-4xl mb-4">✦</p>
          <p class="text-sm font-semibold mb-2">Galerie konnte nicht geladen werden</p>
          <p class="text-xs">Bitte prüfe, ob das Google Sheet öffentlich veröffentlicht ist.</p>
        </div>`;
    }
  }

  return { init };
})();


/* ═══════════════════════════════════════════
   GENERISCHER SHEET-FETCH HELPER
   ═══════════════════════════════════════════ */

async function fetchSheet(sheetName) {
  const url = `https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
  const res  = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text  = await res.text();
  const json  = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
  const cols  = json.table.cols.map(c => c.label);
  return json.table.rows
    .filter(row => row && row.c)
    .map(row => {
      const obj = {};
      row.c.forEach((cell, i) => { obj[cols[i]] = cell ? (cell.f ?? cell.v ?? '') : ''; });
      return obj;
    });
}


/* ═══════════════════════════════════════════
   DYNAMISCHE IMPULSE aus Google Sheets
   ═══════════════════════════════════════════ */

// Farb-Schemas pro Kategorie (für dynamisch gerenderte Karten)
const IMPULSE_COLORS = {
  'Schreiben':  { hover: 'border-[#8aaa8e]',  today: 'border-[#8aaa8e] bg-[#e8f0e9]/30', num: 'text-[#8aaa8e]/20', badge: 'bg-[#e8f0e9] text-[#5c7a5e]' },
  'Malen':      { hover: 'border-[#c4956a]',  today: 'border-[#c4956a] bg-[#fdf0e8]/30', num: 'text-[#c4956a]/20', badge: 'bg-[#fdf0e8] text-[#a07050]' },
  'Fotografie': { hover: 'border-[#e8c060]',  today: 'border-[#e8c060] bg-[#f5f0e0]/40', num: 'text-[#e8c060]/30', badge: 'bg-[#f5f0e0] text-[#7a6020]' },
  'Musik':      { hover: 'border-[#b0a0d0]',  today: 'border-[#b0a0d0] bg-[#f0eaf8]/30', num: 'text-[#b0a0d0]/40', badge: 'bg-[#f0eaf8] text-[#6050a0]' },
  'Basteln':    { hover: 'border-[#70c0a0]',  today: 'border-[#70c0a0] bg-[#e8f5f0]/30', num: 'text-[#70c0a0]/30', badge: 'bg-[#e8f5f0] text-[#30806a]' },
  'Bewegung':   { hover: 'border-[#d0a0a0]',  today: 'border-[#d0a0a0] bg-[#fdf0f0]/30', num: 'text-[#d0a0a0]/30', badge: 'bg-[#fdf0f0] text-[#906060]' },
};

// Mapping: panel data-Attribut → Kategoriename im Sheet
const PANEL_CATEGORY_MAP = {
  schreiben: 'Schreiben',
  malen:     'Malen',
  foto:      'Fotografie',
  musik:     'Musik',
  basteln:   'Basteln',
  bewegung:  'Bewegung',
};

function createImpulseCard(item, index, colors) {
  const isToday = String(item.Heute).toLowerCase() === 'ja';
  const borderClass = isToday ? colors.today : `border-border hover:${colors.hover}`;
  return `
    <article class="bg-white rounded-2xl p-6 border ${borderClass} hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 relative">
      ${isToday ? '<div class="absolute top-4 right-4 text-[#e8c060] text-base" aria-label="Impuls des Tages">✦ Heute</div>' : ''}
      <div class="text-3xl font-serif font-bold ${colors.num} leading-none">${String(index).padStart(2, '0')}</div>
      <h3 class="font-serif font-semibold text-[#3d2e22] text-base">${item.Titel}</h3>
      <p class="text-[#7a6855] text-sm leading-relaxed flex-1">${item.Beschreibung}</p>
      ${item.Tag ? `<span class="inline-block self-start text-[0.7rem] font-bold uppercase tracking-wider px-2.5 py-1 ${colors.badge} rounded-full">${item.Tag}</span>` : ''}
    </article>`;
}

async function loadImpulses() {
  if (CONFIG.SHEET_ID === 'DEINE_SPREADSHEET_ID') return; // Demo-Modus: hardcoded HTML verwenden

  try {
    const items = await fetchSheet(CONFIG.SHEET_IMPULSE);
    if (!items.length) return;

    // Gruppiere nach Kategorie
    const byCategory = {};
    items.forEach(item => {
      const cat = item.Kategorie;
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push(item);
    });

    // Rendere jedes Panel neu
    Object.entries(PANEL_CATEGORY_MAP).forEach(([panelKey, catName]) => {
      const panel  = document.querySelector(`[data-panel="${panelKey}"]`);
      const colors = IMPULSE_COLORS[catName] || IMPULSE_COLORS['Schreiben'];
      if (!panel || !byCategory[catName] || !byCategory[catName].length) return;
      panel.innerHTML = byCategory[catName]
        .map((item, i) => createImpulseCard(item, i + 1, colors))
        .join('');
    });
  } catch (err) {
    console.warn('[Impulse] Fehler beim Laden (verwende hardcoded Fallback):', err);
  }
}


/* ═══════════════════════════════════════════
   EINREICH-FORMULAR
   ═══════════════════════════════════════════ */

function initForm() {
  const form = document.getElementById('einreich-form');
  const btn  = document.getElementById('einreich-btn');
  const status = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      name:          form.querySelector('[name="name"]').value.trim(),
      email:         form.querySelector('[name="email"]').value.trim(),
      kategorie:     form.querySelector('[name="kategorie"]').value,
      titel:         form.querySelector('[name="titel"]').value.trim(),
      beschreibung:  form.querySelector('[name="beschreibung"]').value.trim(),
      bild:          form.querySelector('[name="bild"]').value.trim(),
      tags:          form.querySelector('[name="tags"]').value.trim(),
    };

    // Einfache Validierung
    if (!data.name || !data.email || !data.kategorie || !data.titel || !data.beschreibung) {
      showStatus(status, 'error', 'Bitte füll alle Pflichtfelder aus (*).');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      showStatus(status, 'error', 'Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }

    // Apps Script noch nicht konfiguriert?
    if (CONFIG.FORM_ENDPOINT === 'DEIN_APPS_SCRIPT_URL') {
      showStatus(status, 'warn',
        'Das Formular ist noch nicht mit Google verbunden (FORM_ENDPOINT in app.js fehlt). ' +
        'Bitte folge der SETUP.md-Anleitung.');
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Wird gesendet …';

    try {
      // no-cors vermeidet CORS-Fehler; Antwort ist opaque → optimistisches Feedback
      await fetch(CONFIG.FORM_ENDPOINT, {
        method:  'POST',
        mode:    'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body:    JSON.stringify(data),
      });

      form.reset();
      showStatus(status, 'success',
        `Danke, ${data.name}! ✦ Deine Einreichung ist angekommen. Du erhältst gleich eine Bestätigungsmail.`);
    } catch (err) {
      showStatus(status, 'error',
        'Beim Senden ist ein Fehler aufgetreten. Bitte versuch es erneut oder schreib direkt eine E-Mail.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Einreichen ✦';
    }
  });
}

function showStatus(el, type, msg) {
  const styles = {
    success: 'bg-[#e8f0e9] border border-[#8aaa8e] text-[#3d5a40]',
    error:   'bg-[#fdf0f0] border border-[#d0a0a0] text-[#804040]',
    warn:    'bg-[#f5f0e0] border border-[#e8c060] text-[#7a6020]',
  };
  el.className = `mt-4 p-4 rounded-xl text-sm ${styles[type] || styles.warn}`;
  el.textContent = msg;
  el.classList.remove('hidden');
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  if (type === 'success') setTimeout(() => el.classList.add('hidden'), 8000);
}


/* ═══════════════════════════════════════════
   TAGESIMPULSE – Tab-Switching
   ═══════════════════════════════════════════ */

function initImpulseTabs() {
  const tabs   = document.querySelectorAll('.impulse-tab');
  const panels = document.querySelectorAll('.impulse-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Alle Tabs zurücksetzen
      tabs.forEach(t => {
        t.classList.remove('bg-sage', 'text-white');
        t.classList.add('bg-cream-dark', 'text-brown-muted');
        t.setAttribute('aria-selected', 'false');
      });
      // Alle Panels ausblenden
      panels.forEach(p => p.classList.add('hidden'));

      // Aktiven Tab hervorheben
      tab.classList.add('bg-sage', 'text-white');
      tab.classList.remove('bg-cream-dark', 'text-brown-muted');
      tab.setAttribute('aria-selected', 'true');

      // Passendes Panel anzeigen
      const panel = document.querySelector(`[data-panel="${tab.dataset.tab}"]`);
      if (panel) panel.classList.remove('hidden');
    });
  });
}


/* ═══════════════════════════════════════════
   NAVIGATION & SCROLL
   ═══════════════════════════════════════════ */

function initNav() {
  const toggle     = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('nav-mobile');
  const header     = document.getElementById('site-header');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('hidden') === false;
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('shadow-sm', window.scrollY > 8);
    }, { passive: true });
  }
}


/* ═══════════════════════════════════════════
   SCROLL-REVEAL
   ═══════════════════════════════════════════ */

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
}


/* ═══════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initImpulseTabs();
  initForm();
  Gallery.init();
  loadImpulses();
});

