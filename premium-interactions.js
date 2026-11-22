/* Browser microinteractions and enhancements; appended to the existing Worker UI. */
export const premiumJS = String.raw`
/* KVN CLOTHING interaction refinements — leave the existing analytics logic intact. */
(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const $id = id => document.getElementById(id);
  const hero = document.querySelector('.hero');
  if (hero) {
    const copy = hero.firstElementChild;
    if (copy) {
      copy.classList.add('hero-copy');
      const note = document.createElement('p');
      note.className = 'hero-note';
      note.textContent = 'PUBLIC ROBLOX DATA  /  NO MADE-UP NUMBERS';
      copy.append(note);
    }
    const atmosphere = document.createElement('div');
    atmosphere.className = 'atmosphere';
    atmosphere.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 6; i++) atmosphere.append(document.createElement('i'));
    hero.prepend(atmosphere);
  }
  const metricGrid = document.querySelector('.metrics');
  if (metricGrid) {
    const strip = document.createElement('div');
    strip.className = 'signal-strip reveal';
    strip.setAttribute('aria-label', 'Additional measured statistics');
    strip.innerHTML = '<div class="signal-card"><div><span>MEASURED CCU CHANGE · 1H</span><strong id="signalChange">—</strong></div><em aria-hidden="true">↗</em></div>' +
      '<div class="signal-card"><div><span>DATA POINTS · SELECTED RANGE</span><strong id="signalSamples">—</strong></div><em aria-hidden="true">◷</em></div>' +
      '<div class="signal-card"><div><span>CURRENT DATA SOURCE</span><strong id="signalSource">—</strong></div><em aria-hidden="true">◈</em></div>';
    metricGrid.insertAdjacentElement('afterend', strip);
    if (typeof observer !== 'undefined') observer.observe(strip);
    else strip.classList.add('show');
  }
  const tabBar = $id('tabs');
  if (tabBar) {
    tabBar.setAttribute('role', 'tablist');
    tabBar.setAttribute('aria-label','Analytics categories');
    for (const b of tabBar.querySelectorAll('button[data-tab]')) {
      b.setAttribute('type', 'button');
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', String(b.classList.contains('active')));
      b.setAttribute('aria-controls', 'panel-'+b.dataset.tab);
      const panel = document.querySelector('.tabbody[data-page="'+b.dataset.tab+'"]');
      if (panel) {
        panel.id = 'panel-'+b.dataset.tab;
        panel.setAttribute('role','tabpanel');
        panel.setAttribute('aria-label',b.textContent.trim());
      }
    }
    tabBar.addEventListener('click', () => {
      for (const b of tabBar.querySelectorAll('button[data-tab]'))
        b.setAttribute('aria-selected', String(b.classList.contains('active')));
    });
    tabBar.addEventListener('keydown', e => {
      const keys = ['ArrowLeft','ArrowRight','Home','End'];
      if (!keys.includes(e.key)) return;
      const buttons = [...tabBar.querySelectorAll('button[data-tab]')];
      const active = Math.max(0,buttons.indexOf(document.activeElement));
      const next = e.key === 'Home' ? 0 : e.key === 'End' ? buttons.length-1 :
        (active+(e.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;
      e.preventDefault();
      buttons[next].focus();
      buttons[next].click();
    });
  }
  for (const b of document.querySelectorAll('#ranges button,#metrics button')) b.type = 'button';

  const historyWindow = ms => {
    const data = typeof getVerifiedHistory==='function' ? getVerifiedHistory() : (usingCloud ? cloudHistory : browserHistory);
    const cutoff = Date.now()-ms;
    return data.filter(x => Number.isFinite(x.t) && x.t>=cutoff && Number.isFinite(x.ccu));
  };
  function updateSignals() {
    const oneHour = historyWindow(3600000);
    const sampled = historyWindow(spans[currentRange]);
    const change = $id('signalChange');
    const samples = $id('signalSamples');
    const source = $id('signalSource');
    if (!change || !samples || !source) return;
    samples.textContent = String(sampled.length);
    source.textContent = usingCloud ? 'CLOUDFLARE D1' : 'THIS BROWSER';
    const hasCoverage = oneHour.length>=2 && oneHour[oneHour.length-1].t-oneHour[0].t>=45*60000;
    if (hasCoverage) {
      const diff = oneHour[oneHour.length-1].ccu-oneHour[0].ccu;
      change.textContent = (diff>0?'+':'')+diff.toLocaleString('en-US');
      change.style.color = diff<0?'#ffa8bd':diff>0?'#7cd7ff':'#e4f5ff';
    } else {
      change.textContent='—';
      change.title='Change appears once 45 minutes of real measurements are available.';
    }
  }
  const ranges = $id('ranges');
  if (ranges) ranges.addEventListener('click', () => setTimeout(updateSignals, 200));
  const met = $id('metrics');
  if (met) met.addEventListener('click', () => setTimeout(updateSignals, 50));
  updateSignals();
  setInterval(updateSignals, 15000);

  if (hero && !reduced.matches && window.matchMedia('(pointer:fine)').matches) {
    let scheduled = false;
    let x = 0, y = 0;
    hero.addEventListener('pointermove', e => {
      const bounds = hero.getBoundingClientRect();
      x = ((e.clientX-bounds.left)/bounds.width-.5)*15;
      y = ((e.clientY-bounds.top)/bounds.height-.5)*15;
      if(scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        hero.style.setProperty('--cursor-x', x.toFixed(1)+'px');
        hero.style.setProperty('--cursor-y', y.toFixed(1)+'px');
        scheduled = false;
      });
    }, {passive:true});
  }
  const title = document.querySelector('title');
  if(title) title.textContent = 'TRENDING EMOTES! | KVN CLOTHING Analytics';
})();
`;
