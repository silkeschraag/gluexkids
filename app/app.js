/* GlüXkids Eltern-App — App-Logik (kein Build-Schritt nötig) */
(function () {
  'use strict';

  const C = window.GLUX_CONTENT;
  const view = document.getElementById('view');
  const backBtn = document.getElementById('backBtn');

  /* ------------------------------------------------------------- icons */
  const ICONS = {
    home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
    bulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
    cap: '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    user: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
    back: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    bookmark: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98m-.01-10.98-6.82 3.98"/>',
    bell: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    phone: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    printer: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>',
    external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    award: '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>'
  };
  ICONS['heart-handshake'] = ICONS.heart;
  ICONS.move = '<circle cx="13" cy="4" r="2"/><path d="m7 21 3-6 3 2v5"/><path d="m5 11 3-3 4 1 3 3 3 1"/><path d="m10 15 2-6"/>';
  ICONS.box = '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>';
  ICONS.prev = '<path d="m15 18-6-6 6-6"/>';
  const icon = (n) => `<svg class="svg" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ICONS.heart}</svg>`;

  /* ----------------------------------------------------------- helpers */
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
  const fmtDate = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });

  const TYPES = {
    serie:    { label: 'Thema',  plural: 'Serien',    icon: 'move',     farbe: 'orange' },
    uebung:   { label: 'Übung',        plural: 'Übungen',   icon: 'zap',      farbe: 'orange' },
    alltag:   { label: 'Für den Alltag', plural: 'Alltag',  icon: 'sun',      farbe: 'green' },
    download: { label: 'Download',     plural: 'Downloads', icon: 'download', farbe: 'blue' }
  };

  /* ------------------------------------------------- local storage (safe) */
  const KEY = 'gluexkids-app-v1';
  let store = { done: {}, fav: {}, steps: {}, ex: {}, pos: {}, notes: {}, waitlist: {}, seenImpuls: '', installDismissed: false };
  try { Object.assign(store, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { /* privat-modus o.ä. */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* ignorieren */ } };

  /* ------------------------------------------------------------ content */
  const impulse = () => C.impulse.filter((i) => i.datum <= today()).sort((a, b) => b.datum.localeCompare(a.datum));
  const latestImpuls = () => impulse()[0];
  const hasNewImpuls = () => { const l = latestImpuls(); return !!l && store.seenImpuls !== l.id; };
  const freebie = (id) => C.freebies.find((f) => f.id === id);

  /* -------------------------------------------------------------- toast */
  const toastEl = document.getElementById('toast');
  let toastT;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  async function share(title, text) {
    const url = location.href;
    if (navigator.share) { try { await navigator.share({ title, text, url }); } catch (e) { /* abgebrochen */ } return; }
    try { await navigator.clipboard.writeText(`${title} – ${url}`); toast('Link kopiert'); } catch (e) { toast('Teilen ist hier leider nicht möglich'); }
  }

  /* ------------------------------------------------------- components */
  const thumb = (f, cls) => f.figur
    ? `<div class="thumb fig" style="background-image:url('img/bande/${esc(f.figur)}.webp')" role="img" aria-label=""></div>`
    : f.bild
    ? `<div class="thumb" style="background-image:url('${esc(f.bild)}')" role="img" aria-label=""></div>`
    : `<div class="thumb t-${f.typ}">${icon(TYPES[f.typ].icon)}</div>`;
  const doneMark = (f) => store.done[f.id] ? `<span class="done-mark" title="Ausprobiert">${icon('check')}</span>` : '';
  const metaRow = (f) => `<div class="meta"><span>${icon('user')} ${esc(f.alter)}</span>${f.uebungen
    ? `<span>${icon('move')} ${f.uebungen.length} Übungen</span>` : `<span>${icon('clock')} ${esc(f.dauer)}</span>`}</div>`;
  const typeLabel = (f) => `${TYPES[f.typ].label}${f.neu && !store.done[f.id] ? ' <span class="badge-new">Neu</span>' : ''}`;

  function freebieCard(f) {
    return `<a class="card fcard" href="#/freebie/${esc(f.id)}">
      ${thumb(f)}
      <div class="body">
        <div class="type">${typeLabel(f)}</div>
        <h3>${esc(f.titel)}</h3>
        ${metaRow(f)}
      </div>
      ${doneMark(f)}
    </a>`;
  }

  function freebieTile(f) {
    return `<a class="card vcard" href="#/freebie/${esc(f.id)}">
      ${thumb(f)}
      <div class="body">
        <div class="kicker">${typeLabel(f)}</div>
        <h3>${esc(f.titel)}</h3>
        ${metaRow(f)}
      </div>
      ${doneMark(f)}
    </a>`;
  }

  function themaCard(f) {
    const n = f.uebungen ? f.uebungen.length : 0;
    const d = (store.ex[f.id] || []).length;
    const img = f.figur
      ? `<div class="t-img fig" style="background-image:url('img/bande/${esc(f.figur)}.webp')"></div>`
      : f.bild ? `<div class="t-img" style="background-image:url('${esc(f.bild)}')"></div>` : '';
    return `<a class="card thema" href="#/freebie/${esc(f.id)}">
      ${img}
      <div class="body">
        <div class="kicker">${typeLabel(f)}</div>
        <h3>${esc(f.titel)}</h3>
        <p>${esc(f.kurz)}</p>
        <div class="meta"><span>${icon('user')} ${esc(f.alter)}</span><span>${icon('move')} ${n} Übungen</span>${d ? `<span class="ok">${icon('check')} ${d} geschafft</span>` : ''}</div>
      </div>
    </a>`;
  }

  function impulsFeature(i, isNew) {
    return `<a class="feature" href="#/impuls/${esc(i.id)}">
      ${i.bild ? `<div class="img" style="background-image:url('${esc(i.bild)}')"></div>` : ''}
      <div class="body">
        <div class="top"><span class="kicker">Wochenimpuls · ${new Date(i.datum + 'T12:00:00').toLocaleDateString('de-DE', { day: 'numeric', month: 'short' })}</span>${isNew ? '<span class="badge-new">Neu</span>' : ''}</div>
        <h3>${esc(i.titel)}</h3>
        <p>${esc(i.kurz)}</p>
        <span class="link-more">Weiterlesen ${icon('arrow')}</span>
      </div>
    </a>`;
  }

  function impulsRow(i, isNew) {
    return `<a class="card kcard" href="#/impuls/${esc(i.id)}">
      <div class="top"><span class="kicker">${fmtDate(i.datum)}</span>${isNew ? '<span class="badge-new">Neu</span>' : ''}</div>
      <h3>${esc(i.titel)}</h3>
      <p style="margin:0">${esc(i.kurz)}</p>
    </a>`;
  }

  function kursCard(k, n) {
    const ok = k.status === 'verfuegbar';
    const onList = store.waitlist[k.id];
    return `<a class="card kcard" href="#/kurs/${esc(k.id)}">
      <div class="top"><span class="num">Nr. ${String(n + 1).padStart(2, '0')}</span>
        ${ok ? '<span class="status ok">Verfügbar</span>' : onList ? '<span class="status ok">Auf der Warteliste</span>' : '<span class="status soon">Bald verfügbar</span>'}
      </div>
      <h3>${esc(k.titel)}</h3>
      <p>${esc(k.kurz)}</p>
      <div class="foot"><span class="price">${esc(k.preis)}</span><span class="link-more" style="margin:0">Ansehen ${icon('arrow')}</span></div>
    </a>`;
  }

  function newsletterBand() {
    return `<section class="letter">
      <div class="ic">${icon('mail')}</div>
      <h2>Jede Woche ein <em>Impuls</em></h2>
      <p>Trag dich in meinen Newsletter ein – dann bekommst du neue Impulse und alle Kurs-Starts zuerst.</p>
      <a class="btn btn-primary" href="${esc(C.einstellungen.newsletterLink)}" target="_blank" rel="noopener">Zum Newsletter</a>
    </section>`;
  }

  /* ----------------------------------------------------- install prompt */
  let deferredPrompt = null;
  const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; if (route().name === 'start') render(); });
  window.addEventListener('appinstalled', () => { deferredPrompt = null; toast('Die GlüXkids-App ist jetzt installiert!'); render(); });

  function installBanner() {
    if (isStandalone() || store.installDismissed) return '';
    if (!deferredPrompt && !isIOS()) return '';
    return `<div class="card install">
      <img src="icons/icon-192.png" alt="">
      <div class="txt"><b>App installieren</b>Alle Freebies immer griffbereit.</div>
      <button class="btn btn-primary" data-action="install">Installieren</button>
      <button class="close-x" data-action="dismiss-install" aria-label="Hinweis ausblenden">${icon('x')}</button>
    </div>`;
  }

  function showIOSSheet() {
    const bg = document.createElement('div');
    bg.className = 'sheet-bg';
    bg.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-label="App installieren">
      <h2>So installierst du die App</h2>
      <ol>
        <li>Tippe unten in Safari auf das <b>Teilen-Symbol</b> (Quadrat mit Pfeil nach oben).</li>
        <li>Wähle <b>„Zum Home-Bildschirm“</b>.</li>
        <li>Tippe auf <b>„Hinzufügen“</b> – fertig!</li>
      </ol>
      <button class="btn btn-primary btn-block" data-close>Alles klar</button>
    </div>`;
    bg.addEventListener('click', (e) => { if (e.target === bg || e.target.hasAttribute('data-close')) bg.remove(); });
    document.body.appendChild(bg);
  }

  /* -------------------------------------------------------------- views */
  const views = {
    start() {
      const l = latestImpuls();
      return `
        <section class="welcome">
          <span class="kicker accent">Für Eltern · von Silke</span>
          <h1>Starke Kinder beginnen <em>zu Hause.</em></h1>
          <p>Ich begleite dich dabei, dein Kind zu stärken: für mehr Selbstvertrauen, innere Stärke und einen klaren Schutz vor Ärgern und Mobbing.</p>
          <ul class="pillars">
            <li>${icon('heart')}<span>Selbstvertrauen fördern</span></li>
            <li>${icon('sun')}<span>Innere Stärke aufbauen</span></li>
            <li>${icon('shield')}<span>Mobbing vorbeugen</span></li>
          </ul>
        </section>
        ${installBanner()}

        ${C.freebies.filter((f) => f.neu).slice(0, 1).map((f) => `<a class="spotlight${f.bild ? ' has-img' : ''}" href="#/freebie/${esc(f.id)}">
          ${f.bild ? `<div class="spot-img" style="background-image:url('${esc(f.bild)}')"></div>` : `<div class="spot-ic">${icon(TYPES[f.typ].icon)}</div>`}
          <span class="kicker">Neu · Gratis für dich</span>
          <h3>${esc(f.titel)}</h3>
          <p>${esc(f.kurz)}</p>
          <span class="btn btn-light">${store.ex[f.id] && store.ex[f.id].length ? 'Weitermachen' : 'Jetzt starten'} ${icon('arrow')}</span>
        </a>`).join('')}

        ${l ? impulsFeature(l, hasNewImpuls()) : ''}

        <section class="section">
          <div class="section-head"><h2>Gratis für dich</h2><a href="#/freebies">Alle Themen</a></div>
          <div class="hscroll">${C.freebies.slice().sort((a, b) => (b.neu ? 1 : 0) - (a.neu ? 1 : 0)).map(freebieTile).join('')}</div>
        </section>

        <section class="quote">
          <p>„Manchmal ist das Mutigste, Nein zu sagen. Genau das lernen Kinder bei uns – und du kannst sie dabei zu Hause begleiten.“</p>
          <div class="who"><img src="img/silke.webp" alt="">Silke Schraag · GlüXkids</div>
        </section>

        <section class="section">
          <div class="section-head"><h2>Tiefer einsteigen?</h2><a href="#/kurse">Alle Kurse</a></div>
          <p class="section-sub">Kompakte Online-Kurse für Eltern – zu Mobbing, Selbstvertrauen und innerer Stärke.</p>
          <div class="list">${C.kurse.slice(0, 2).map(kursCard).join('')}</div>
        </section>

        ${newsletterBand()}`;
    },

    freebies() {
      return `
        <span class="kicker accent">Kostenlos</span>
        <h1 class="page-title">Freebies für <em>starke Kinder</em></h1>
        <p class="page-sub">Übungen und Rituale, gebündelt nach Themen – zum Durchwischen, Ausprobieren und Abhaken.</p>
        <div class="list">${C.freebies.map(themaCard).join('')}</div>`;
    },

    freebie(params) {
      const f = freebie(params.id);
      if (!f) return notFound();
      if (f.typ === 'serie') return serieView(f);
      const t = TYPES[f.typ];
      const checked = store.steps[f.id] || [];
      const isDownload = !!f.datei;
      return `
        ${f.bild && !isDownload ? `<div class="cover" style="background-image:url('${esc(f.bild)}')"></div>` : ''}
        <section class="d-head">
          ${f.figur ? `<img class="d-fig" src="img/bande/${esc(f.figur)}.webp" alt="">` : f.bild && !isDownload ? '' : `<div class="ic t-${f.typ}">${icon(t.icon)}</div>`}
          <span class="kicker accent">${t.label} · ${esc(f.thema)}</span>
          <h1>${esc(f.titel)}</h1>
          ${metaRow(f)}
        </section>
        <p class="lead">${rich(f.intro)}</p>
        ${isDownload ? `
          ${f.bild ? `<div class="preview"><img src="${esc(f.bild)}" alt="Vorschau: ${esc(f.titel)}" loading="lazy"></div>` : ''}
          <a class="btn btn-accent btn-block" href="${esc(f.datei)}" download>${icon('download')} Kostenlos herunterladen</a>` : ''}
        <h2 class="h-small">So geht's</h2>
        <ol class="steps" data-freebie="${esc(f.id)}">
          ${f.schritte.map((s, i) => `<li class="${checked.includes(i) ? 'checked' : ''}" data-step="${i}"><span class="n">${checked.includes(i) ? icon('check') : i + 1}</span><span class="t">${rich(s)}</span></li>`).join('')}
        </ol>
        <p class="hint">Tippe einen Schritt an, um ihn abzuhaken.</p>
        ${f.tipp ? `<div class="tipp"><span class="kicker">${icon('bulb')} Silkes Tipp</span><p>${rich(f.tipp)}</p></div>` : ''}
        <div class="actions">
          <button class="btn btn-block ${store.done[f.id] ? 'btn-done' : 'btn-primary'}" data-action="done" data-id="${esc(f.id)}">
            ${icon('check')} ${store.done[f.id] ? 'Ausprobiert' : 'Haben wir ausprobiert'}
          </button>
          <div class="actions-row">
            <button class="btn btn-ghost" data-action="fav" data-id="${esc(f.id)}">${icon('bookmark')} ${store.fav[f.id] ? 'Gemerkt' : 'Merken'}</button>
            <button class="btn btn-ghost" data-action="share" data-title="${esc(f.titel)}">${icon('share')} Teilen</button>
          </div>
        </div>
        ${relatedKurs(f)}`;
    },

    impulse() {
      const list = impulse();
      const newId = hasNewImpuls() ? latestImpuls().id : null;
      return `
        <span class="kicker accent">Jede Woche neu</span>
        <h1 class="page-title">Wochen&shy;<em>impulse</em></h1>
        <p class="page-sub">Ein Gedanke und eine kleine Aufgabe für eure Woche – in zwei Minuten gelesen.</p>
        <div class="list">${list.length ? list.map((i) => impulsRow(i, i.id === newId)).join('') : '<div class="empty">Der erste Impuls kommt bald.</div>'}</div>
        ${newsletterBand()}`;
    },

    impuls(params) {
      const i = impulse().find((x) => x.id === params.id);
      if (!i) return notFound();
      if (latestImpuls() && latestImpuls().id === i.id && store.seenImpuls !== i.id) { store.seenImpuls = i.id; save(); updateTabs(); }
      return `
        ${i.bild ? `<div class="cover" style="background-image:url('${esc(i.bild)}')"></div>` : ''}
        <section class="d-head">
          <span class="kicker accent">Wochenimpuls · ${fmtDate(i.datum)}</span>
          <h1>${esc(i.titel)}</h1>
        </section>
        <div class="prose">${i.text.map((p) => `<p>${rich(p)}</p>`).join('')}</div>
        ${i.frage ? `<div class="frage"><span class="kicker">${icon('chat')} Zum Nachdenken</span><p class="q">${esc(i.frage)}</p>
          <textarea data-note="${esc(i.id)}" placeholder="Deine Gedanken – sie bleiben nur auf deinem Gerät.">${esc(store.notes[i.id] || '')}</textarea></div>` : ''}
        <div class="actions"><button class="btn btn-ghost btn-block" data-action="share" data-title="${esc(i.titel)}">${icon('share')} Impuls teilen</button></div>`;
    },

    kurse() {
      return `
        <span class="kicker accent">Elterninput & Online-Kurse</span>
        <h1 class="page-title">Wissen, das euch <em>stärkt</em></h1>
        <p class="page-sub">Kompakte Online-Kurse zu den Themen, die Eltern wirklich beschäftigen. Schritt für Schritt kommen neue dazu.</p>
        <section class="offer">
          <span class="kicker">Jeder Kurs</span>
          <h2>Für nur <em>19 €</em></h2>
          <p>Kompakt, praxisnah und sofort im Familienalltag umsetzbar. Trag dich auf die Warteliste ein und erfahre zuerst, wenn es losgeht.</p>
        </section>
        <div class="list">${C.kurse.map(kursCard).join('')}</div>`;
    },

    kurs(params) {
      const k = C.kurse.find((x) => x.id === params.id);
      if (!k) return notFound();
      const ok = k.status === 'verfuegbar' && k.kaufLink;
      const onList = store.waitlist[k.id];
      return `
        <section class="d-head">
          <div class="ic">${icon('cap')}</div>
          <span class="kicker accent">Online-Kurs · ${ok ? 'Jetzt verfügbar' : 'Bald verfügbar'}</span>
          <h1>${esc(k.titel)}</h1>
          <div class="meta"><span>${icon('cap')} Online-Kurs</span><span>${esc(k.preis)}</span></div>
        </section>
        <p class="lead">${esc(k.kurz)}</p>
        <h2 class="h-small">Das erwartet dich</h2>
        <ul class="checklist">${k.inhalte.map((x) => `<li>${icon('check')}<span>${esc(x)}</span></li>`).join('')}</ul>
        <div class="actions">
          ${ok ? `<a class="btn btn-accent btn-block" href="${esc(k.kaufLink)}" target="_blank" rel="noopener">Jetzt für ${esc(k.preis)} starten ${icon('arrow')}</a>`
               : onList ? `<button class="btn btn-done btn-block" disabled>${icon('check')} Du stehst auf der Warteliste</button>
                           <p class="hint" style="text-align:center">Sobald der Kurs startet, erfährst du es zuerst.</p>`
                        : `<button class="btn btn-accent btn-block" data-action="waitlist" data-id="${esc(k.id)}">${icon('bell')} Auf die Warteliste</button>
                           <p class="hint" style="text-align:center">Kostenlos und unverbindlich.</p>`}
        </div>`;
    },

    silke() {
      const s = C.einstellungen;
      return `
        <div class="about-photo" style="background-image:url('img/silke.webp')" role="img" aria-label="Silke Schraag"></div>
        <span class="kicker accent">Hallo, ich bin Silke</span>
        <h1 class="page-title">Ich helfe Kindern, an sich selbst zu <em>glauben.</em></h1>
        <div class="prose">
          <p>Als Resilienz- und Mobbingpräventions-Trainerin begleite ich seit Jahren Kinder und Jugendliche auf dem Weg zu mehr innerer Stärke. Mit <strong>GlüXkids</strong> mache ich Mut, Selbstvertrauen und mentale Stärke für Kinder spielerisch erlebbar – mit Bewegung, Herz und klaren Methoden.</p>
          <p>Mit dieser App möchte ich dich als Mama oder Papa im Alltag begleiten: mit kleinen Übungen, Wochenimpulsen und Kursen, die wirklich etwas verändern.</p>
        </div>
        <p class="signature">Herzlich, deine Silke</p>
        <div class="badge-row">
          <img src="img/siegel-mobbing.png" alt="Siegel: Ganzheitlicher Mobbingpräventions-Trainer, Akademie für ganzheitliches Kinder- und Jugendcoaching">
          <p><span class="kicker">Zertifiziert</span>Ganzheitliche Mobbingpräventions-Trainerin der Akademie für ganzheitliches Kinder- &amp; Jugendcoaching®</p>
        </div>
        <div class="creds">
          <div>${icon('award')} Zertifizierte Resilienz-Trainerin</div>
          <div>${icon('heart')} TaffeTiger® Trainerin</div>
          <div>${icon('cap')} Staatlich geprüfter Stresscoach</div>
        </div>
        <section class="bande">
          <img src="img/glueckbande.webp" alt="Die GlüXkids-Bande mit Foxy und seinen Freunden" loading="lazy">
          <span class="kicker accent">Die GlüXbande</span>
          <h2>Foxy und seine <em>Freunde</em></h2>
          <p>In der App begleitet dich <strong>Foxy, der Fuchs</strong>. Ab und zu schauen auch seine Freunde vorbei: Lio, PinguPik, Fina, Samy, Taffi und Elli. Gemeinsam zeigen sie: Jedes Kind ist auf seine Weise stark.</p>
        </section>
        <div class="links">
          <a class="card" href="${esc(s.webseite)}" target="_blank" rel="noopener">${icon('globe')} gluexkids.de – Kurse vor Ort ${icon('external')}</a>
          <a class="card" href="${esc(s.newsletterLink)}" target="_blank" rel="noopener">${icon('mail')} Newsletter abonnieren ${icon('external')}</a>
          <a class="card" href="${esc(s.instagram)}" target="_blank" rel="noopener">${icon('heart')} Instagram ${icon('external')}</a>
          ${!isStandalone() ? `<a class="card" href="#" data-action="install">${icon('phone')} App installieren ${icon('chevron')}</a>` : ''}
        </div>
        <p class="foot-note"><a href="${esc(s.impressum)}" target="_blank" rel="noopener">Impressum</a> · <a href="${esc(s.datenschutz)}" target="_blank" rel="noopener">Datenschutz</a><br>Deine Notizen und Häkchen werden nur auf deinem Gerät gespeichert.</p>`;
    }
  };

  function serieView(f) {
    const done = store.ex[f.id] || [];
    const n = f.uebungen.length;
    const pad = (i) => String(i + 1).padStart(2, '0');
    return `
      ${f.bild ? `<div class="cover" style="background-image:url('${esc(f.bild)}')"></div>` : ''}
      <section class="d-head">
        ${f.bild || f.figur ? '' : `<div class="ic">${icon('move')}</div>`}
        ${f.figur && !f.bild ? `<img class="d-fig" src="img/bande/${esc(f.figur)}.webp" alt="">` : ''}
        <span class="kicker accent">Gratis-Thema · ${esc(f.thema)}</span>
        <h1>${esc(f.titel)}</h1>
        <div class="meta"><span>${icon('user')} ${esc(f.alter)}</span><span>${icon('move')} ${n} Übungen</span><span>${icon('clock')} ${esc(f.dauer)}</span></div>
      </section>
      <div class="prose">${[].concat(f.intro).map((p) => `<p>${rich(p)}</p>`).join('')}</div>
      ${f.hinweise ? `<div class="hinweise"><span class="kicker">So klappt's am besten</span>
        <ul class="checklist">${f.hinweise.map((h) => `<li>${icon('check')}<span>${rich(h)}</span></li>`).join('')}</ul></div>` : ''}

      <div class="deck-head">
        <h2 class="h-small" style="margin:0">Die Übungen</h2>
        <span class="deck-progress" data-progress><b>${done.length}</b> von ${n} geschafft</span>
      </div>
      <div class="progress-bar"><span data-bar style="width:${(done.length / n) * 100}%"></span></div>
      <p class="hint" style="margin:0 0 12px">Wische nach links für die nächste Übung.</p>

      <div class="deck" data-deck="${esc(f.id)}">
        ${f.uebungen.map((u, i) => `
        <article class="card ex${done.includes(i) ? ' is-done' : ''}" data-ex="${i}" aria-label="Übung ${i + 1} von ${n}">
          <div class="ex-top"><span class="ex-num">${pad(i)}</span><span class="ex-of">von ${n}</span>
            ${u.figur ? `<img class="ex-fig" src="img/bande/${esc(u.figur)}.webp" alt="">` : ''}</div>
          <h3>${esc(u.titel)}</h3>
          <div class="meta">${u.dauer ? `<span>${icon('clock')} ${esc(u.dauer)}</span>` : ''}${u.material ? `<span>${icon('box')} ${esc(u.material)}</span>` : ''}</div>
          ${u.intro ? `<p class="ex-intro">${rich(u.intro)}</p>` : ''}
          <ol class="ex-steps">${u.schritte.map((st) => `<li><span>${rich(st)}</span></li>`).join('')}</ol>
          ${u.liste ? `<div class="ex-list"><span class="kicker">${esc(u.liste.titel)}</span><ul>${u.liste.punkte.map((p) => `<li>${rich(p)}</li>`).join('')}</ul></div>` : ''}
          ${u.datei ? `<a class="btn btn-ghost btn-block ex-dl" href="${esc(u.datei)}" download>${icon('download')} ${esc(u.dateiText || 'Herunterladen')}</a>` : ''}
          ${u.steigerung ? `<div class="ex-plus"><span class="kicker">Noch kniffliger</span><p>${rich(u.steigerung)}</p></div>` : ''}
          ${u.tipp ? `<p class="ex-why"><span class="kicker">Silkes Tipp</span>${rich(u.tipp)}</p>` : ''}
          ${u.warum ? `<p class="ex-why"><span class="kicker">Warum das hilft</span>${rich(u.warum)}</p>` : ''}
          <button class="btn btn-block ${done.includes(i) ? 'btn-done' : 'btn-primary'}" data-ex-done="${i}">${icon('check')} ${done.includes(i) ? 'Geschafft' : 'Haben wir geschafft'}</button>
        </article>`).join('')}
      </div>
      <div class="deck-nav">
        <button class="icon-btn" data-deck-go="-1" aria-label="Vorherige Übung">${icon('prev')}</button>
        <div class="dots">${f.uebungen.map((u, i) => `<button class="dot-btn${done.includes(i) ? ' done' : ''}" data-deck-to="${i}" aria-label="Übung ${i + 1}"></button>`).join('')}</div>
        <button class="icon-btn" data-deck-go="1" aria-label="Nächste Übung">${icon('chevron')}</button>
      </div>

      ${f.datei ? `<a class="btn btn-accent btn-block" style="margin-top:22px" href="${esc(f.datei)}" download>${icon('printer')} Druckversion herunterladen (PDF)</a>` : ''}
      ${f.tipp ? `<div class="tipp"><span class="kicker">${icon('bulb')} Silkes Tipp</span><p>${rich(f.tipp)}</p></div>` : ''}
      <div class="actions">
        <button class="btn btn-ghost btn-block" data-action="share" data-title="${esc(f.titel)}">${icon('share')} Mit anderen Eltern teilen</button>
      </div>
      ${relatedKurs(f)}`;
  }

  /* Karten-Stapel: Position merken, Punkte aktualisieren */
  function deckStep(deck) {
    const cards = deck.children;
    return cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : deck.clientWidth;
  }
  function deckIndex(deck) { return Math.round(deck.scrollLeft / deckStep(deck)); }
  function deckGo(deck, i, smooth) {
    const max = deck.children.length - 1;
    i = Math.max(0, Math.min(max, i));
    deck.scrollTo({ left: i * deckStep(deck), behavior: smooth ? 'smooth' : 'auto' });
  }
  function initDeck() {
    const deck = view.querySelector('[data-deck]');
    if (!deck) return;
    const id = deck.dataset.deck;
    const dots = view.querySelectorAll('.dot-btn');
    const mark = () => {
      const i = deckIndex(deck);
      dots.forEach((d, k) => d.classList.toggle('active', k === i));
      view.querySelector('[data-deck-go="-1"]').disabled = i === 0;
      view.querySelector('[data-deck-go="1"]').disabled = i === dots.length - 1;
      return i;
    };
    let t;
    deck.addEventListener('scroll', () => { const i = mark(); clearTimeout(t); t = setTimeout(() => { store.pos[id] = i; save(); }, 250); }, { passive: true });
    requestAnimationFrame(() => { deckGo(deck, store.pos[id] || 0, false); mark(); });
  }

  function toggleExercise(btn) {
    const card = btn.closest('.ex'); const deck = card.parentElement;
    const id = deck.dataset.deck; const i = +btn.dataset.exDone;
    const f = freebie(id); const n = f.uebungen.length;
    const arr = store.ex[id] || [];
    const nowDone = !arr.includes(i);
    store.ex[id] = nowDone ? arr.concat(i) : arr.filter((x) => x !== i);
    const count = store.ex[id].length;
    card.classList.toggle('is-done', nowDone);
    btn.className = `btn btn-block ${nowDone ? 'btn-done' : 'btn-primary'}`;
    btn.innerHTML = `${icon('check')} ${nowDone ? 'Geschafft' : 'Haben wir geschafft'}`;
    view.querySelector('[data-progress]').innerHTML = `<b>${count}</b> von ${n} geschafft`;
    view.querySelector('[data-bar]').style.width = `${(count / n) * 100}%`;
    view.querySelectorAll('.dot-btn')[i].classList.toggle('done', nowDone);
    if (count === n && !store.done[id]) { store.done[id] = true; toast(`Alle ${n} Übungen geschafft – stark gemacht!`); }
    else if (nowDone) { toast(`Übung ${i + 1} geschafft`); setTimeout(() => deckGo(deck, i + 1, true), 450); }
    save();
  }

  /* Passender Kurs zum Thema (Feld „kurs“ in content.js) */
  function relatedKurs(f) {
    const i = f && f.kurs ? C.kurse.findIndex((k) => k.id === f.kurs) : -1;
    if (i < 0) return '';
    return `<hr class="rule"><div class="section-head"><h2>Tiefer einsteigen?</h2></div>
      <p class="section-sub">Du möchtest mehr dazu wissen? Dieser Online-Kurs passt zum Thema.</p>${kursCard(C.kurse[i], i)}`;
  }

  function notFound() {
    return `<div class="empty"><img src="img/bande/foxy.webp" alt=""><h2>Hoppla!</h2><p>Diese Seite gibt es (noch) nicht.</p><a class="btn btn-primary" href="#/">Zur Startseite</a></div>`;
  }

  /* ------------------------------------------------------------- router */
  const TAB_OF = { start: 'start', freebies: 'freebies', freebie: 'freebies', impulse: 'impulse', impuls: 'impulse', kurse: 'kurse', kurs: 'kurse', silke: 'silke' };
  const PARENT = { freebie: '#/freebies', impuls: '#/impulse', kurs: '#/kurse' };

  function route() {
    const [path, query] = (location.hash.replace(/^#\/?/, '') || '').split('?');
    const parts = path.split('/').filter(Boolean);
    const name = parts[0] || 'start';
    const params = Object.fromEntries(new URLSearchParams(query || ''));
    if (parts[1]) params.id = decodeURIComponent(parts[1]);
    return { name: views[name] ? name : 'notfound', params };
  }

  function updateTabs() {
    const r = route();
    const tabs = [['start', 'Start', 'home'], ['freebies', 'Freebies', 'gift'], ['impulse', 'Impulse', 'bulb'], ['kurse', 'Kurse', 'cap'], ['silke', 'Über mich', 'heart']];
    document.querySelectorAll('.tabbar a').forEach((a, i) => {
      const [key, label, ic] = tabs[i];
      const active = TAB_OF[r.name] === key;
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
      a.innerHTML = `${icon(ic)}<span>${label}</span>${key === 'impulse' && hasNewImpuls() ? '<span class="dot" aria-label="Neuer Impuls"></span>' : ''}`;
    });
  }

  let navDepth = 0;
  let lastName = null;
  function render() {
    const r = route();
    const html = r.name === 'notfound' ? notFound() : views[r.name](r.params);
    view.innerHTML = html;
    if (r.name !== lastName || r.params.id) {
      view.classList.remove('view-enter'); void view.offsetWidth; view.classList.add('view-enter');
    }
    lastName = r.name;
    backBtn.hidden = !PARENT[r.name];
    backBtn.innerHTML = icon('back');
    updateTabs();
    initDeck();
    const titles = { freebie: 'Freebie', impuls: 'Wochenimpuls', kurs: 'Kurs' };
    document.title = (titles[r.name] ? titles[r.name] + ' · ' : '') + 'GlüXkids – Die Eltern-App';
  }

  window.addEventListener('hashchange', () => { navDepth++; render(); window.scrollTo(0, 0); });
  backBtn.addEventListener('click', () => {
    const r = route();
    if (navDepth > 0) { navDepth -= 2; history.back(); } else location.hash = PARENT[r.name] || '#/';
  });
  window.addEventListener('scroll', () => document.getElementById('topbar').classList.toggle('scrolled', window.scrollY > 6), { passive: true });

  /* ------------------------------------------------------------ actions */
  view.addEventListener('click', async (e) => {
    const chip = e.target.closest('[data-filter]');
    if (chip) { const f = chip.dataset.filter; history.replaceState(null, '', f === 'alle' ? '#/freebies' : `#/freebies?filter=${f}`); render(); return; }

    const exBtn = e.target.closest('[data-ex-done]');
    if (exBtn) { toggleExercise(exBtn); return; }
    const go = e.target.closest('[data-deck-go], [data-deck-to]');
    if (go) {
      const deck = view.querySelector('[data-deck]');
      deckGo(deck, go.dataset.deckTo != null ? +go.dataset.deckTo : deckIndex(deck) + +go.dataset.deckGo, true);
      return;
    }

    const step = e.target.closest('.steps li');
    if (step) {
      const id = step.parentElement.dataset.freebie; const i = +step.dataset.step;
      const arr = store.steps[id] || [];
      store.steps[id] = arr.includes(i) ? arr.filter((x) => x !== i) : arr.concat(i);
      const f = freebie(id);
      if (store.steps[id].length === f.schritte.length && !store.done[id]) { store.done[id] = true; toast('Alle Schritte geschafft – stark!'); }
      save(); render(); return;
    }

    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = btn.dataset.id;
    switch (btn.dataset.action) {
      case 'done':
        store.done[id] = !store.done[id]; save(); render();
        if (store.done[id]) toast('Schön, dass ihr es ausprobiert habt.');
        break;
      case 'fav':
        store.fav[id] = !store.fav[id]; if (!store.fav[id]) delete store.fav[id]; save(); render();
        toast(store.fav[id] ? 'Gemerkt – du findest es unter „Gemerkt“' : 'Nicht mehr gemerkt');
        break;
      case 'share':
        share(btn.dataset.title, 'Schau mal, das habe ich in der GlüXkids-App gefunden:');
        break;
      case 'waitlist': {
        const k = C.kurse.find((x) => x.id === id);
        store.waitlist[id] = true; save(); render();
        const subject = encodeURIComponent(`Warteliste: ${k.titel}`);
        const body = encodeURIComponent(`Hallo Silke,\n\nbitte gib mir Bescheid, sobald der Kurs „${k.titel}“ verfügbar ist.\n\nViele Grüße`);
        location.href = `mailto:${C.einstellungen.wartelisteMail}?subject=${subject}&body=${body}`;
        break;
      }
      case 'install':
        e.preventDefault();
        if (deferredPrompt) { deferredPrompt.prompt(); const r = await deferredPrompt.userChoice; deferredPrompt = null; if (r.outcome !== 'accepted') render(); }
        else if (isIOS()) showIOSSheet();
        else toast('Öffne das Browser-Menü und wähle „App installieren“ bzw. „Zum Startbildschirm hinzufügen“.');
        break;
      case 'dismiss-install':
        store.installDismissed = true; save(); render();
        break;
    }
  });

  view.addEventListener('input', (e) => {
    const ta = e.target.closest('[data-note]');
    if (ta) { store.notes[ta.dataset.note] = ta.value; save(); }
  });

  /* ------------------------------------------------------ offline (SW) */
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }

  render();
})();
