async function makeWebPreview(file, onPct, ctl) {
  const MAX = 1280, FPS = 30;
  if (typeof MediaRecorder === 'undefined' || !HTMLCanvasElement.prototype.captureStream) throw new Error('this browser can’t make previews');
  const types = ['video/mp4;codecs=avc1.4d401f,mp4a.40.2', 'video/mp4;codecs=avc1.42e01f,mp4a.40.2', 'video/mp4;codecs=avc1,mp4a', 'video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'];
  const mime = types.find(t => { try { return MediaRecorder.isTypeSupported(t); } catch (e) { return false; } });
  if (!mime) throw new Error('no recording format');
  const url = URL.createObjectURL(file);
  const v = document.createElement('video');
  v.playsInline = true; v.preload = 'auto'; v.src = url;
  const cleanup = [];
  try {
    await new Promise((res, rej) => { v.onloadeddata = res; v.onerror = () => rej(new Error('this browser can’t open ' + (file.name || 'the file') + ' (try exporting H.264)')); setTimeout(() => rej(new Error('timed out opening the file')), 60000); });
    const W = v.videoWidth, H = v.videoHeight, dur = v.duration;
    if (!W || !H || !(dur > 0) || !isFinite(dur)) throw new Error('could not read the video size or length');
    const sc = Math.min(1, MAX / Math.max(W, H));
    const w = Math.max(2, Math.round(W * sc / 2) * 2), h = Math.max(2, Math.round(H * sc / 2) * 2);
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    const cx = cv.getContext('2d');
    const seek = t => new Promise(r => { const f = () => { v.removeEventListener('seeked', f); r(); }; v.addEventListener('seeked', f); v.currentTime = t; });
    await seek(Math.min(dur * 0.2, 4));
    cx.drawImage(v, 0, 0, w, h);
    const poster = cv.toDataURL('image/jpeg', 0.85);
    await seek(0);
    let aTracks = [];
    const needsTap = () => { const e = new Error('Chrome needs a tap to play the sound'); e.needsTap = true; return e; };
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    cleanup.push(() => { try { ac.close(); } catch (e) {} });
    if (ac.state !== 'running') await Promise.race([ac.resume().catch(() => {}), new Promise(r => setTimeout(r, 1500))]);
    if (ac.state !== 'running') throw needsTap();
    try {
      const src = ac.createMediaElementSource(v), dst = ac.createMediaStreamDestination();
      src.connect(dst); aTracks = dst.stream.getAudioTracks();
    } catch (e) { aTracks = []; }
    const stream = new MediaStream([...cv.captureStream(FPS).getVideoTracks(), ...aTracks]);
    const bits = Math.round(Math.min(3.2e6, Math.max(1.2e6, w * h * FPS * 0.08)));
    const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: bits, audioBitsPerSecond: 128000 });
    const chunks = []; rec.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
    const stopped = new Promise(r => { rec.onstop = r; });
    let alive = true;
    const draw = () => { if (!alive) return; cx.drawImage(v, 0, 0, w, h); if (onPct) onPct(Math.min(99, Math.round(v.currentTime / dur * 100)));
      if (v.requestVideoFrameCallback) v.requestVideoFrameCallback(draw); else requestAnimationFrame(draw); };
    const vis = () => { if (document.hidden) { if (rec.state === 'recording') { rec.pause(); v.pause(); } } else if (rec.state === 'paused') { v.play().then(() => rec.resume()).catch(() => {}); } };
    document.addEventListener('visibilitychange', vis); cleanup.push(() => document.removeEventListener('visibilitychange', vis));
    const ended = new Promise((res, rej) => { v.onended = res; v.onerror = () => rej(new Error('playback failed')); });
    rec.start(1000);
    draw();
    try { await Promise.race([v.play(), new Promise((r, j) => setTimeout(() => j(Object.assign(new Error('timeout'), {name: 'NotAllowedError'})), 8000))]); } catch (e) {
      alive = false; try { rec.stop(); } catch (e2) {}
      if (e && e.name === 'NotAllowedError') throw needsTap();
      throw new Error('the browser couldn’t play the file (' + (e && e.name || 'error') + ')');
    }
    let lastT = -1, lastMove = Date.now();
    await Promise.race([ended, new Promise((r, j) => { const t = setInterval(() => {
      if (ctl && ctl.cancelled) { clearInterval(t); try { v.pause(); rec.stop(); } catch (e) {} j(new Error('cancelled')); return; }
      if (document.hidden || rec.state === 'paused') { lastMove = Date.now(); return; }
      if (v.currentTime !== lastT) { lastT = v.currentTime; lastMove = Date.now(); }
      else if (Date.now() - lastMove > 20000) { clearInterval(t); try { v.pause(); rec.stop(); } catch (e) {} j(new Error('playback stalled')); }
    }, 400); cleanup.push(() => clearInterval(t)); })]);
    cx.drawImage(v, 0, 0, w, h);
    await new Promise(r => setTimeout(r, 250));
    alive = false; rec.stop(); await stopped;
    const isMp4 = /mp4/.test(mime), type = isMp4 ? 'video/mp4' : 'video/webm';
    const base = String(file.name || 'video').replace(/\.[^.]+$/, '');
    const out = new File(chunks, base + ' (web preview).' + (isMp4 ? 'mp4' : 'webm'), { type });
    if (onPct) onPct(100);
    return { file: out, poster, w, h, dur };
  } finally {
    cleanup.forEach(f => { try { f(); } catch (e) {} });
    try { v.pause(); v.removeAttribute('src'); v.load(); } catch (e) {}
    URL.revokeObjectURL(url);
  }
}
