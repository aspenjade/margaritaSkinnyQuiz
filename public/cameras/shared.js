// Shared between index.html (public browse) and checkin.html (QR-only flow)

const CAMERA_THEMES = {
  skinny:     { bodyClass: 'theme-skinny',     tagBg: '#E9D6F7', tagText: '#FF4FA3' },
  spicy:      { bodyClass: 'theme-spicy',      tagBg: '#FFE3C9', tagText: '#C1432B' },
  strawberry: { bodyClass: 'theme-strawberry', tagBg: '#FCE0EC', tagText: '#E0155F' },
  salty:      { bodyClass: 'theme-salty',      tagBg: '#D6E8F7', tagText: '#1B4F91' }
};
const DEFAULT_THEME = CAMERA_THEMES.skinny;

function getTheme(cameraName) {
  const n = (cameraName || '').toLowerCase();
  for (const key in CAMERA_THEMES) {
    if (n.includes(key)) return CAMERA_THEMES[key];
  }
  return DEFAULT_THEME;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' · ' +
         d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

function renderMediaThumb(m) {
  if (m.media_type === 'video') {
    return `<video src="${m.file_url}" controls></video>`;
  }
  return `<img src="${m.file_url}" loading="lazy">`;
}

function renderTrail(checkins, media) {
  if (!checkins.length && !media.length) {
    return `<p style="font-family:var(--font-ui); font-size:12px; color:var(--ink-soft);">No check-ins yet. Be the first.</p>`;
  }
  const items = [];
  checkins.forEach(c => items.push({ type: 'checkin', date: c.created_at, data: c }));
  media.filter(m => !m.checkin_id).forEach(m => items.push({ type: 'media', date: m.created_at, data: m }));
  items.sort((a,b) => new Date(b.date) - new Date(a.date));

  return items.map(item => {
    if (item.type === 'checkin') {
      const c = item.data;
      const attachedMedia = media.filter(m => m.checkin_id === c.id);
      return `
        <div class="trail-item">
          <div class="trail-meta">${formatDate(c.created_at)} · ${c.frames_remaining} frames left${c.finder_name ? ' · ' + escapeHtml(c.finder_name) : ''}</div>
          ${c.note ? `<div>${escapeHtml(c.note)}</div>` : ''}
          ${attachedMedia.length ? `<div class="trail-media">${attachedMedia.map(renderMediaThumb).join('')}</div>` : ''}
        </div>`;
    } else {
      return `
        <div class="trail-item">
          <div class="trail-meta">${formatDate(item.date)}</div>
          <div class="trail-media">${renderMediaThumb(item.data)}</div>
        </div>`;
    }
  }).join('');
}
