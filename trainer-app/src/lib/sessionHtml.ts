import { BRAND } from '../brand';
import { getCategory } from '../data/categories';
import { DIFFICULTY_LABELS, type Exercise } from '../data/types';
import { colors } from '../theme';
import { materialList, PHASE_LABELS, resolveItems, totalDuration } from './plan';
import type { Session } from './session';

export type PdfOptions = {
  /** Varianten und Coaching-Tipps mit ausdrucken */
  detailed: boolean;
};

function esc(text: string) {
  return text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

function exerciseHtml(exercise: Exercise, index: number, phase: string, options: PdfOptions) {
  const category = getCategory(exercise.category);
  const material = exercise.material.length ? exercise.material.map(esc).join(', ') : 'kein Material nötig';
  return `
  <section class="exercise">
    <div class="ex-head" style="border-color:${category.color}">
      <div class="ex-num" style="background:${category.color}">${index + 1}</div>
      <div class="ex-title">
        <div class="ex-phase">${esc(phase)} · ${esc(category.title)}</div>
        <h2>${esc(exercise.title)}</h2>
      </div>
      <div class="ex-time">${exercise.duration}&nbsp;Min</div>
    </div>
    <div class="facts">
      <span>🎯 ${esc(exercise.goal)}</span>
      <span>👧 ${esc(exercise.ages.join(' · '))} J.</span>
      <span>👥 ${esc(exercise.players)}</span>
      <span>📈 ${DIFFICULTY_LABELS[exercise.difficulty]}</span>
    </div>
    <p><b>Material:</b> ${material}</p>
    <p><b>Aufbau:</b> ${esc(exercise.setup)}</p>
    <ol>${exercise.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
    ${
      options.detailed
        ? `<div class="variants">
            <div><b>⬇ Leichter:</b> ${esc(exercise.easier)}</div>
            <div><b>⬆ Schwerer:</b> ${esc(exercise.harder)}</div>
          </div>
          <div class="tips">${exercise.tips.map((t) => `💡 ${esc(t)}`).join('<br/>')}</div>`
        : ''
    }
    <div class="notes">Notizen: </div>
  </section>`;
}

export function buildSessionHtml(session: Session, options: PdfOptions) {
  const items = resolveItems(session.items);
  const exercises = items.map((i) => i.exercise);
  const title = session.title.trim() || 'Trainingseinheit';
  const date = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const materials = materialList(exercises);

  const overview = items
    .map(
      (item, i) => `
      <tr>
        <td class="check">☐</td>
        <td>${i + 1}. ${esc(item.exercise.title)}</td>
        <td>${esc(PHASE_LABELS[item.phase])}</td>
        <td>${esc(getCategory(item.exercise.category).short)}</td>
        <td class="right">${item.exercise.duration} Min</td>
      </tr>`,
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8" />
<title>${esc(title)} – ${BRAND.name}</title>
<style>
  @page { size: A4; margin: 14mm 12mm; }
  * { box-sizing: border-box; }
  body { font-family: -apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif; color: ${colors.text}; font-size: 11pt; line-height: 1.4; margin: 0; }
  header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 3px solid ${colors.orange}; padding-bottom: 8px; margin-bottom: 14px; }
  .brand { font-size: 22pt; font-weight: 900; color: ${colors.orange}; letter-spacing: -0.5px; }
  .brand span { color: ${colors.green}; }
  .slogan { font-size: 9pt; font-weight: 700; color: ${colors.textMuted}; text-transform: uppercase; letter-spacing: 1.5px; }
  .meta { text-align: right; font-size: 10pt; color: ${colors.textMuted}; }
  h1 { font-size: 18pt; margin: 0 0 4px; }
  .summary { display: flex; gap: 16px; font-size: 10pt; color: ${colors.textMuted}; margin-bottom: 12px; }
  .box { background: ${colors.surfaceAlt}; border-radius: 8px; padding: 10px 12px; margin-bottom: 12px; }
  .box h3 { margin: 0 0 6px; font-size: 11pt; }
  table { width: 100%; border-collapse: collapse; font-size: 10pt; }
  td { padding: 4px 6px; border-bottom: 1px solid ${colors.border}; }
  td.check { width: 18px; font-size: 12pt; }
  td.right { text-align: right; white-space: nowrap; }
  .materials { columns: 2; font-size: 10pt; margin: 0; padding-left: 0; list-style: none; }
  .materials li::before { content: '☐ '; }
  .exercise { page-break-inside: avoid; break-inside: avoid; border: 1px solid ${colors.border}; border-radius: 10px; padding: 10px 12px; margin-bottom: 12px; }
  .ex-head { display: flex; align-items: center; gap: 10px; border-bottom: 2px solid; padding-bottom: 6px; margin-bottom: 6px; }
  .ex-num { color: #fff; font-weight: 900; width: 26px; height: 26px; border-radius: 13px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .ex-title { flex: 1; }
  .ex-phase { font-size: 8.5pt; font-weight: 700; color: ${colors.textMuted}; text-transform: uppercase; letter-spacing: 1px; }
  h2 { font-size: 14pt; margin: 0; }
  .ex-time { font-weight: 800; font-size: 12pt; }
  .facts { display: flex; flex-wrap: wrap; gap: 4px 14px; font-size: 9.5pt; color: ${colors.textMuted}; margin-bottom: 4px; }
  p { margin: 4px 0; }
  ol { margin: 4px 0; padding-left: 20px; }
  .variants { display: flex; gap: 12px; font-size: 9.5pt; margin-top: 4px; }
  .variants div { flex: 1; background: ${colors.surfaceAlt}; border-radius: 6px; padding: 6px 8px; }
  .tips { font-size: 9.5pt; margin-top: 6px; }
  .notes { margin-top: 8px; border-bottom: 1px dotted ${colors.textMuted}; height: 22px; font-size: 9pt; color: ${colors.textMuted}; }
  footer { text-align: center; font-size: 8.5pt; color: ${colors.textMuted}; margin-top: 16px; }
</style>
</head>
<body>
  <header>
    <div>
      <div class="brand">PowerUp<span>Kids</span></div>
      <div class="slogan">${esc(BRAND.slogan)}</div>
    </div>
    <div class="meta">Datum: ${date}${session.age ? `<br/>Alter: ${esc(session.age)} Jahre` : ''}</div>
  </header>

  <h1>${esc(title)}</h1>
  <div class="summary">
    <span>⏱ ca. ${totalDuration(exercises)} Minuten</span>
    <span>📋 ${items.length} Übungen</span>
  </div>

  ${session.notes.trim() ? `<div class="box"><h3>Notizen</h3>${esc(session.notes).replace(/\n/g, '<br/>')}</div>` : ''}

  <div class="box">
    <h3>Ablauf</h3>
    <table>${overview}</table>
  </div>

  <div class="box">
    <h3>🎒 Materialliste</h3>
    ${materials.length ? `<ul class="materials">${materials.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>` : 'Kein Material nötig.'}
  </div>

  ${items.map((item, i) => exerciseHtml(item.exercise, i, PHASE_LABELS[item.phase], options)).join('')}

  <footer>${BRAND.name} · ${esc(BRAND.slogan)}</footer>
</body>
</html>`;
}
