/**
 * Copyright (c) 2026 [a1b1001]
 * Released under the MIT license
 * https://licenses.opensource.jp/MIT/MIT.html
 */
window.console.error = window.alert;
try {
    // load json
  const c = JSON.parse(document.getElementById('wb')?.textContent || '{}');
  // html process
  if (c.html && typeof c.html === 'string') {
    c.html.split(',').forEach((a:string)=> {
      const [k, v] = a.split('=');
      if (k && /^[a-zA-Z-]+$/.test(k.trim())) {
        document.documentElement.setAttribute(k.trim(), (v || '').replace(/['"]/g, ''));
      }
    });
  }
  // meta, link, script process
  ['meta', 'link', 'script'].forEach(t => {
    if (c[t] && typeof c[t] === 'string') {
      const i = c[t].indexOf("'");
      const p = i === -1 ? c[t] : c[t].slice(0, i);
      const s = i === -1 ? '' : c[t].slice(i + 1);
      const e = document.createElement(t as any);
      p.trim().split(/\s+/).forEach((a:string)=> {
        const [k, v] = a.split('=');
        if (k && /^[a-zA-Z-]+$/.test(k.trim())) {
          const n = k.trim();
          const m = (v || '').replace(/['"]/g, '');
          if (t === 'script' && (n.toLowerCase() === 'src' || n.toLowerCase().startsWith('on'))) return;
          e.setAttribute(n, m);
        }
      });
      if (s.trim()) {
        if (t === 'script') { e.textContent = s; } else { e.setAttribute('content', s); }
      }
      document.head.appendChild(e);
    }
  });
} catch (e) {
  console.error('Engine Error: ' + (e as any).message);
}