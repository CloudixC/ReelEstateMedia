const MWP_SYNC_CLIP = 'AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAA4fbW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAACigAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAABOF0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAACigAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAKAAAABaAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAooAAAAAAABAAAAAARZbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAA8AAAAnABVxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAAEBG1pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAA8RzdGJsAAAAvHN0c2QAAAAAAAAAAQAAAKxhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAKAAWgBIAAAASAAAAAAAAAABDExhdmMgbGlieDI2NAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAAMmF2Y0MBQsAM/+EAGWdCwAymEQo35MBEAAADAAQAAAMA8DxQqEYBAAZoyEIESyAAAAAQcGFzcAAAAAEAAAABAAAAFGJ0cnQAAAAAAAAXhQAAF4UAAAAYc3R0cwAAAAAAAAABAAAATgAAAgAAAAA4c3RzcwAAAAAAAAAKAAAAAQAAABAAAAATAAAAHwAAACIAAAAuAAAAMQAAAD0AAABAAAAATAAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAFMc3RzegAAAAAAAAAAAAAATgAAArAAAAAKAAAACwAAAAsAAAALAAAACwAAAAsAAAALAAAACwAAAAsAAAALAAAACwAAAAsAAAALAAAACwAAADsAAAAKAAAACwAAADsAAAAKAAAACwAAAAsAAAALAAAACwAAAAsAAAALAAAACwAAAAsAAAALAAAACwAAADsAAAAKAAAACwAAADsAAAAKAAAACwAAAAsAAAALAAAACwAAAAsAAAALAAAACwAAAAsAAAALAAAACwAAADsAAAAKAAAACwAAADsAAAAKAAAACwAAAAsAAAALAAAACwAAAAsAAAALAAAACwAAAAsAAAALAAAACwAAADsAAAAKAAAACwAAADsAAAAKAAAACwAAAAsAAAALAAAACwAAAAsAAAALAAAACwAAAAsAAAALAAAACwAAADsAAAAKAAAACwAAAUhzdGNvAAAAAAAAAE4AAA5kAAARHAAAES4AABE9AAARUAAAEV8AABFyAAARgQAAEZQAABGnAAARtgAAEckAABHYAAAR6wAAEfoAABNqAAAUOAAAFOIAABT1AAAVNAAAFUYAABVVAAAVaAAAFXcAABWKAAAVnQAAFawAABW/AAAVzgAAFeEAABeDAAAZpgAAGbQAABnHAAAaCgAAGhgAABorAAAaOgAAGk0AABpcAAAabwAAGoIAABqRAAAapAAAGrMAABxAAAAdGQAAHaQAAB2zAAAd9gAAHggAAB4XAAAeKgAAHjkAAB5MAAAeWwAAHm4AAB6BAAAekAAAHqMAACCJAAAi7wAAIv0AACMQAAAjTwAAI2EAACN0AAAjgwAAI5YAACOlAAAjuAAAI8cAACPaAAAj7QAAI/wAACV8AAAmQwAAJpoAAAiNdHJhawAAAFx0a2hkAAAAAwAAAAAAAAAAAAAAAgAAAAAAAAooAAAAAAAAAAAAAAABAQAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAJGVkdHMAAAAcZWxzdAAAAAAAAAABAAAKKAAABAAAAQAAAAAIBW1kaWEAAAAgbWRoZAAAAAAAAAAAAAAAAAAAu4AAAeuAVcQAAAAAAC1oZGxyAAAAAAAAAABzb3VuAAAAAAAAAAAAAAAAU291bmRIYW5kbGVyAAAAB7BtaW5mAAAAEHNtaGQAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAB3RzdGJsAAAAfnN0c2QAAAAAAAAAAQAAAG5tcDRhAAAAAAAAAAEAAAAAAAAAAAABABAAAAAAu4AAAAAAADZlc2RzAAAAAAOAgIAlAAIABICAgBdAFQAAAAAAfQAAADL/BYCAgAURiFblAAaAgIABAgAAABRidHJ0AAAAAAAAfQAAADL/AAAAIHN0dHMAAAAAAAAAAgAAAHoAAAQAAAAAAQAAA4AAAANMc3RzYwAAAAAAAABFAAAAAQAAAAEAAAABAAAAAgAAAAIAAAABAAAABAAAAAEAAAABAAAABQAAAAIAAAABAAAABgAAAAEAAAABAAAABwAAAAIAAAABAAAACAAAAAEAAAABAAAACQAAAAIAAAABAAAACwAAAAEAAAABAAAADAAAAAIAAAABAAAADQAAAAEAAAABAAAADgAAAAIAAAABAAAADwAAAAEAAAABAAAAEAAAAAIAAAABAAAAEQAAAAEAAAABAAAAEgAAAAIAAAABAAAAFAAAAAEAAAABAAAAFQAAAAIAAAABAAAAFgAAAAEAAAABAAAAFwAAAAIAAAABAAAAGAAAAAEAAAABAAAAGQAAAAIAAAABAAAAGwAAAAEAAAABAAAAHAAAAAIAAAABAAAAHQAAAAEAAAABAAAAHgAAAAIAAAABAAAAHwAAAAEAAAABAAAAIAAAAAIAAAABAAAAIQAAAAEAAAABAAAAIgAAAAIAAAABAAAAJAAAAAEAAAABAAAAJQAAAAIAAAABAAAAJgAAAAEAAAABAAAAJwAAAAIAAAABAAAAKAAAAAEAAAABAAAAKQAAAAIAAAABAAAAKwAAAAEAAAABAAAALAAAAAIAAAABAAAALQAAAAEAAAABAAAALgAAAAIAAAABAAAALwAAAAEAAAABAAAAMAAAAAIAAAABAAAAMQAAAAEAAAABAAAAMgAAAAIAAAABAAAANAAAAAEAAAABAAAANQAAAAIAAAABAAAANgAAAAEAAAABAAAANwAAAAIAAAABAAAAOAAAAAEAAAABAAAAOQAAAAIAAAABAAAAOwAAAAEAAAABAAAAPAAAAAIAAAABAAAAPQAAAAEAAAABAAAAPgAAAAIAAAABAAAAPwAAAAEAAAABAAAAQAAAAAIAAAABAAAAQQAAAAEAAAABAAAAQgAAAAIAAAABAAAARAAAAAEAAAABAAAARQAAAAIAAAABAAAARgAAAAEAAAABAAAARwAAAAIAAAABAAAASAAAAAEAAAABAAAASQAAAAIAAAABAAAASwAAAAEAAAABAAAATAAAAAIAAAABAAAATQAAAAEAAAABAAAATgAAAAIAAAABAAAATwAAAAEAAAABAAACAHN0c3oAAAAA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AAAAB0GaiIAvwewBGCAHARggBwAAAAdBmpiQL8HsARggBwAAAAdBmqigL8HsARggBwEYIAcAAAAHQZq4sC/B7AEYIAcAAAAHQZrIwC/B7AEYIAcBGCAHAAAAB0Ga2NArwewBGEAHAAAAB0Ga6OAnwewBGJWwOw7Du+wddJASxGOI5ngRPwj4KJcEmkabCUAeAnsYX4XxaxS1MKiQehWampj1iWih0CKZg+W+ZS6DzLq3fW+fIuTf5f9vI+gN78AA7vGt9GYRGsJFen8AB13JYbu5d//r//bkkBEMMjPrkUHrEVbHJRqf17OwCQREhiwIPFVuiIrikaN0jiswR1G7I8P5MR6F2cj4d8gEfa/1QIfpt/LaS6V6vJdj6QS4/wElqMmSwNIlER0fgoCJDETGIlIRED7zl2MPks7BJCF991rKn4eRznaeq5TYVKDLFbVlWKjlSLGRnZ2NUkoDMm3m82LE+GGGEjgzY/GZPv76D/Hw2n399B/j4zD394T/HxmHv76D/HxmHuR1WxI6rOEcxlSOBj1Kgk+2SwmHJZbRktDmiWcz5LJYAlYpE1BIvjEbWMI4/G++g/x8Zh7++g/x8Zhn99A+PjMM/voHx8eIz++gcPjxGfgAAAA3ZYiBAd5MUAATNr77777777666666666666666666666666666666666666666666666666668AFEUZDWZhJVpzj2zN9/V3VdVq7XLklySQAAxGHh58ZgdlOU5xpuD6paBSJIGi57+z7Ppt19SLnnnmqh4e2sAAGHDw8+4AAGHDw9txAAw4eHtuAABhw8PbcAAGHDw9twAAU4eHrcAAGHDw9twAAYcPD23AABhw8PW4AAMOHh63AABhw8PW4AAMOHh63AABTh4etxHAAAAAZBmhwK8HsBGJU27FvsOw7fb7hrXX/T7n3+fpArUmCYMhCKTNlCUPguABJ3NZZsPBxasu+b+sjtuc0azU3rN9OQwLViafv1C1LURTvsLUtRF3GqFqWpansuNUE0wiCJasb2GeHVbjBTEUII6HUkczLJOpUFEIjNMoSUazRU367m3jLbSJEWqIkAvbedQ8qf6th/8dCfgsv/cbI9apvtWeOyoz4BGOAHAAAAB0GaKgJ8HsABGCAHARggBwAAADdliIIHeTFAAE1++++++++++uuuuuuuuuuuuuuuuuuu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Qf4+G0+/vCf4+G0+/vCf4+G0+/vCf4+G0+/vCf4+G+AAAAA3ZYiBAd5MUAATNr77777777666666666666666666666666666666666666666666666666668AEoUZC2lKvWTmT4+3U9/15ypriS7u7u5ckkEY8PbgESMDRoymBWP4MmGHgvHCHf+iEIdMhHgd0aMpiKXYDvCYFyNja2v4+3AAADxh4e3AAACow8PeAAAHjDw94AAAe0PD3sAABUYeHuIAAB4w8PcQAADxh4e8AAYceHh7wABh4w8PeAAMPGHn3sAGHjDz72ADDxh597ABh4w8+9gAw/AAAABkGaHArwewEYlG7dQnfYdh2+33+33PUnf3PuNfQIQikzZQnc1lmw7vm/rFE3kecRlHo2hDOWY7ulPSnBK8FMRQgjodSRzMsk6lQUQiM0yhJRrNFTSMCPQLiR32sgiRFqiJAL23nUPKn+rYZEQ+sCQA8l//utCUuaTSQjJkECEJRopMROARjgBwAAAAdBmioCfB7AARggBwAAADdliIIHeTFAAE1++++++++++uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuvAARggBwEYIAcAAAAGQZocC/B7ARggBwEYIAcAAAAHQZoqAvwewAEYIAcAAAAHQZo7AvwewAEYIAcBGCAHAAAAB0GaSQC/B7ABGCAHAAAAB0GaWUC/B7ABGCAHARggBwAAAAdBmmmAvwewARggBwAAAAdBmnnAvwewARggBwEYIAcAAAAHQZqIgC/B7AEYIAcBGCAHAAAAB0GamJAvwewBGCAHAAAAB0GaqKArwewBGCAHARhABwAAAAdBmriwJ8HsARiUbDu+77vsH3L+//Y+6fj17V/0PvfXS/uCd/GE89oamwxDDZAhdiEFLIJFnQH9T1ghGcQW0gw5ApyBhEAix4L/h/U/AfkPWP2n3D5j1jvDsghCaQY8g9RBLCCzkDJ7HoBJIRSLbXUJOEElJ9W4Dw0n1700R2Ewj4q4tgfFrRJ7KSOHvGXG97kRvIsASUciMNqOtYudSXaP+N9R7Z6OyaG7QfpfvPr3ZOxsw7RzdSMbEZtIjRlEZMwjMjklJInMSKQiMVYnoolEioIGdQYCD/j/ZzFbNtTzIMOfriIwIRGE8i+ARe4i1xFzPz31H17tXsrsnZOqtU5esmyiKEkUoInQRQciY5E5sxZhtq2banmQYdDYc6XVWpMEwZIRSLbXUJOEElwD3SQwFMn1700R2Ewj4q4tgfFsHFqwkcPeMuN73tNEmBJKORGG1HWsWUwdEEhh/8ZZJ49x0k7B757GJIORIMkEP/7MqJWHKoOzp9JPwp9B3cSUkicxIpCIxVieiiUSKggdO7y1bq4kEP/7/m/W+09bdc8lcN3VunPWG4cSAD/9/zfrfz31Hw3xbknb23dVZNXlZOVUZCNkEuDEJR45GLEJQ4RGDAJPeRa0i8ZJoiKwklAx6jAj8AAAADdliIEB3kxQABM2vvvvvvvvvrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrwATCVtuJr4p3xTfn/ryu9ez8/8f8/d8cc8T/x/x/1+p9XzxA3e+IN36q2XUSVjByxr7TV/0u+LuDs2WDbvU2TUlmjze+M9TevBITLLevBITLLevBITLKDXr3/J/5IToYGBr168EhISDSy8e1pN/TERx842eeokrGDljX2mr/T6U/fZplgmp6jBuQkIH321Cd7ZHrzurRu7clf/eiuC5mJCD/+/rvyMui8y5R4q6V6G3LlokEP/7/m++zKDubrHiVDRPL11badqxNxrVK/YWioaJ5evRvRerdV2radduVxrVZrTy9PL0xZbVtOVYnFYms1qNjn1+49rSb+mIjj1ElYwcsa/S74u4OzajBuQkIH33WeRPXuLeOknYPfPYxJByJBkgh//elehty5aJBD/+/5vvtDRPL11badqxOFoqGieXr0b0Xq3Vdq2l5enl6Ystq2nKsTisTwATCVptQi1926uoO38fzqtda1r/j8/r8ceXGtf/hp5zzWnlAq2W3e+IN37sm/ycFJ7u2ehfu0Ncy8+mpoMU/0iinV9PpFFPP9PpFFPP9PpFFFPOr6fT6RRRTzz/T6fQ7IftFvh8Nq/IQYfHjz4vSl+eaABouaK1jg6Ej19NlWwBVRgwMfmiqeOnqkBrP5vSyqrHT12D55/t6uWVpVPHTxAoN4kwg5muwGUVlaWTx08TIT4YgQOxSYRd1e3bPs0f3bW+3fUuGe8bmW3Pe2wUcPG30cbneAAAAABkGaHArwewEY4AcAAAAHQZoqAnwewAEYIAcBGCAHAAAAN2WIggd5MUAATX777777777666666666666666666666666666666666666666666666666668ABGCAHAAAABkGaHAvwewEYIAcBGCAHAAAAB0GaKgL8HsABGCAHARggBwAAAAdBmjsC/B7AARggBwAAAAdBmkkAvwewARggBwEYIAcAAAAHQZpZQL8HsAEYIAcAAAAHQZppgL8HsAEYIAcBGCAHAAAAB0GaecC/B7ABGCAHAAAAB0GaiIAvwewBGCAHARggBwAAAAdBmpiQL8HsARggBwEYIAcAAAAHQZqooCvB7AEYQAcAAAAHQZq4sCfB7AEYlaQ7Du+77B10k/Q66/VPwBLEY4jmeBE/CPgolwSaRpsJQB4CexhfhfFrFLUwqJB6FZqamPWJaKHQIpmD5b5lLoPMurd9b58i5N/l/28j6A3v1CThBrUmCYMj4q4tgfFiXAPdJDAU5cb3vg4tWcIDoLn/MnbPR3Le1LFm1NFqV9ZL47GlKBJq5+PWJ6KJRIqCBPpJ+FPoO7qJD7V6D4d3b090zw4jQUSmoIyTkoxiMQpKCQiOUSFHIhiEgQSIH52aReMk0RFYSSgY9RgR8mrysnKqMhGyCXBicAE08YkWRhFV6detyvb28fH5vPbJq3nJLlrkkDJ8fEGf3934y3ESZDJTMISHqiOV4iRRIIrORrzyMmGRcoiYf84CbY4zZh7+/uMnw2M/v7jJ8Zh7+/uWT4+A77+4f+PgJ9/cP/HwHff3B/j4M77+4f+PgJ9/cP/HwHff3D/x8BPv7h/4+An39w/8fAT7+4f+PgJ9/cH+PgJ9/ccAAAA3ZYiBAd5MUAATNr77777777666666666666666666666666666666666666666666666666668AFOUZDWVMJXnxzpVePjR55vzzqSaq1yQgAAAxRHh6NOnY2Nra3W45mIgE0A4eHh4eHrcQAAAAAKYtDw8PDw9t3AAAAAABTuHh4eHh7bwAAAAABh3jDw8PD23ewAAAAAMO8YeHh4e27iAAAAABh3Dw8PDw9buAAAAAADu4eHh4e27uIAAAAYd3Dw8PD+AAAABkGaHArwewEYlNr7DsOw7B545mwRlZEjmcyR0OpI5mWSdSoKIRGaZQ/qujiIzy6LKw+9iJEWqIkAvbfcNWcbRvxq/NJQ/MLogyeCpIMn4AEYgbRwAAAAB0GaKgJ8HsABGIG0cA==';
const MWP_LAG = {};
async function mwpMeasure(blob) {
  const ac = new (window.AudioContext || window.webkitAudioContext)();
  let ab; try { ab = await ac.decodeAudioData(await blob.arrayBuffer()); } finally { try { ac.close(); } catch (e) {} }
  const ch = ab.getChannelData(0), sr = ab.sampleRate, beeps = []; let last = -1e9;
  for (let i = 0; i < ch.length; i++) if (Math.abs(ch[i]) > 0.08) { if (i - last > sr * 0.1) beeps.push(i / sr); last = i; }
  const v = document.createElement('video'); v.muted = true; v.playsInline = true;
  if (!v.requestVideoFrameCallback) return null;
  const url = URL.createObjectURL(blob); v.src = url;
  try {
    await new Promise((r, j) => { v.onloadeddata = r; v.onerror = () => j(new Error('cannot open')); setTimeout(() => j(new Error('timeout')), 8000); });
    const c = document.createElement('canvas'); c.width = 8; c.height = 8; const x = c.getContext('2d', { willReadFrequently: true });
    const fr = [];
    await new Promise((res, rej) => { const f = (now, md) => { x.drawImage(v, 0, 0, 8, 8); const d = x.getImageData(0, 0, 8, 8).data; let s = 0; for (let i = 0; i < d.length; i += 4) s += d[i]; fr.push([md.mediaTime, s / 64]); if (!v.ended) v.requestVideoFrameCallback(f); };
      v.requestVideoFrameCallback(f); v.onended = () => setTimeout(res, 150); setTimeout(res, 9000); v.play().catch(rej); });
    const flashes = []; let prev = 0; fr.forEach(a => { if (a[1] > 120 && prev <= 120) flashes.push(a[0]); prev = a[1]; });
    const d = []; beeps.forEach(b => { let best = null; flashes.forEach(f => { if (best === null || Math.abs(f - b) < Math.abs(best - b)) best = f; }); if (best !== null && Math.abs(best - b) < 0.24) d.push((best - b) * 1000); });
    if (d.length < 3) return null;
    d.sort((a, b) => a - b); return Math.round(d[d.length >> 1]);
  } finally { try { v.pause(); v.removeAttribute('src'); v.load(); } catch (e) {} URL.revokeObjectURL(url); }
}
/* 🔥 Warm-up. A recorder that has sat idle for a few seconds lines its picture and sound up differently from one that has just
   been used (its encoders start cold; measured on a Mac: 12 ms apart, sometimes 40). So a half-second throwaway recording runs
   right before every real recording and every sync check, which puts them all in the same state. */
async function mwpWarm(w, h, mime, bits) {
  let ac = null, cv = null;
  try {
    cv = document.createElement('canvas'); cv.width = w; cv.height = h; const cx = cv.getContext('2d');
    ac = new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state !== 'running') await Promise.race([ac.resume().catch(() => {}), new Promise(r => setTimeout(r, 1500))]);
    if (ac.state !== 'running') return;
    const dst = ac.createMediaStreamDestination(), g = ac.createGain(), osc = ac.createOscillator(); g.gain.value = 0; osc.connect(g); g.connect(dst); osc.start();
    let cst = cv.captureStream(0), push = null; const vt = cst.getVideoTracks()[0];
    push = vt && vt.requestFrame ? () => vt.requestFrame() : cst.requestFrame ? () => cst.requestFrame() : null;
    if (!push) cst = cv.captureStream(30);
    const rec = new MediaRecorder(new MediaStream([...cst.getVideoTracks(), ...dst.stream.getAudioTracks()]), { mimeType: mime, videoBitsPerSecond: bits, audioBitsPerSecond: 128000 });
    const stopped = new Promise(r => { rec.onstop = r; }); rec.ondataavailable = () => {};
    rec.start(1000); const t0 = performance.now(); let n = 0;
    while (performance.now() - t0 < 500) { cx.fillStyle = n++ % 2 ? '#0b0b0b' : '#000'; cx.fillRect(0, 0, w, h); if (push) push();
      await new Promise(r => { const t = setTimeout(r, 60); requestAnimationFrame(() => { clearTimeout(t); r(); }); }); }
    rec.stop(); await Promise.race([stopped, new Promise(r => setTimeout(r, 1500))]);
  } catch (e) {} finally { try { if (ac) ac.close(); } catch (e) {} if (cv) { cv.width = 0; cv.height = 0; } }
}
async function mwpLag(ctl, w, h, mime) {
  const k = w + 'x' + h;
  if (MWP_LAG[k] !== undefined) return MWP_LAG[k];
  const KEY = 'rem_pvsync_v5'; let all = {}, hist = [], m = null, note = '';
  try { all = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; hist = (Array.isArray(all[k]) ? all[k] : []).filter(x => typeof x === 'number' && Math.abs(x) <= 250).slice(-7); } catch (e) { all = {}; hist = []; }
  try {
    const bin = atob(MWP_SYNC_CLIP), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    /* recorded at the size the real preview will be: the recorder behaves differently at small sizes */
    const o = await makeWebPreview(new File([u], 'sync-check.mp4', { type: 'video/mp4' }), null, ctl, { cal: true, w, h });
    m = await mwpMeasure(o.file);
    if (m !== null && Math.abs(m) > 250) m = null;
  } catch (e) { if (e && (e.needsTap || /cancelled/.test(String(e.message)))) throw e; note = String(e && e.message || 'error'); }
  if (m !== null) { hist.push(m); all[k] = hist; try { localStorage.setItem(KEY, JSON.stringify(all)); } catch (e) {} }
  /* one check can land either side of the true value by up to a frame; the middle of the recent checks is steadier */
  let lag = /avc1/.test(mime || '') ? -50 : 50;   /* typical: H.264/AAC puts the sound late, VP9/Opus puts it early */
  if (hist.length) { const lo = Math.min.apply(null, hist), hi = Math.max.apply(null, hist), so = hist.slice().sort((a, b) => a - b); lag = hi - lo <= 45 ? Math.round((lo + hi) / 2) : so[so.length >> 1]; }
  MWP_LAG[k] = lag; window.__mwpSync = { size: k, lagMs: lag, now: m, checks: hist.length, note };
  return lag;
}
/* 📼 Plain-MP4 maker. Chrome's recorder writes a "fragmented" MP4: the file is a chain of short pieces (about 3 to 4 seconds each)
   and its header gives the length of the first piece only, so every player has to work the real length out for itself. Chrome
   does. Other players (Safari on Mac and iPhone, QuickTime) may not, and then a one-minute preview shows as a short one.
   mwpFlatten rewrites the header into the ordinary kind: one index up front with every frame's size, time and position, and the
   true length. The picture and sound data are reused untouched (not re-encoded), so it takes a moment, not a second pass.
   Returns { blob, dur, vDur, aDur, frags } (seconds) or throws if the file isn't what it expects. */
async function mwpFlatten(blob) {
  const rd = async (a, b) => new DataView(await blob.slice(a, b).arrayBuffer());
  const u32 = (d, o) => d.getUint32(o), u64 = (d, o) => d.getUint32(o) * 4294967296 + d.getUint32(o + 4);
  const fcc = (d, o) => String.fromCharCode(d.getUint8(o), d.getUint8(o + 1), d.getUint8(o + 2), d.getUint8(o + 3));
  const kids = (d, s, e) => { const out = []; let o = s; while (o + 8 <= e) { let z = u32(d, o), h = 8; const t = fcc(d, o + 4); if (z === 1) { z = u64(d, o + 8); h = 16; } else if (z === 0) z = e - o; if (z < h || o + z > e) break; out.push({ t, o, z, h }); o += z; } return out; };
  const pick = (list, t) => list.find(b => b.t === t);
  /* 1 · walk the top-level boxes without loading the picture data */
  const top = []; let ftyp = null, moovAt = null;
  for (let o = 0; o + 8 <= blob.size;) { const hd = await rd(o, Math.min(blob.size, o + 16)); let z = u32(hd, 0), h = 8; const t = fcc(hd, 4);
    if (z === 1) { z = u64(hd, 8); h = 16; } else if (z === 0) z = blob.size - o;
    if (z < h) throw new Error('bad box'); if (o + z > blob.size) z = blob.size - o;
    top.push({ t, o, z, h }); if (t === 'moov' && !moovAt) moovAt = top[top.length - 1]; if (t === 'ftyp' && !ftyp) ftyp = top[top.length - 1]; o += z; }
  if (!moovAt) throw new Error('no moov'); const moofs = top.filter(b => b.t === 'moof'), mdats = top.filter(b => b.t === 'mdat');
  if (!moofs.length) throw new Error('not fragmented');
  /* 2 · the header: tracks and their defaults */
  const mv = await rd(moovAt.o, moovAt.o + moovAt.z), mk = kids(mv, moovAt.h, moovAt.z);
  const mvhd = pick(mk, 'mvhd'); if (!mvhd) throw new Error('no mvhd');
  const mvV = mv.getUint8(mvhd.o + mvhd.h), mts = u32(mv, mvhd.o + mvhd.h + (mvV ? 20 : 12));
  const trex = {}; const mvex = pick(mk, 'mvex'); if (mvex) kids(mv, mvex.o + mvex.h, mvex.o + mvex.z).filter(b => b.t === 'trex').forEach(b => { const p = b.o + b.h; trex[u32(mv, p + 4)] = { dur: u32(mv, p + 12), size: u32(mv, p + 16), flags: u32(mv, p + 20) }; });
  const tracks = [], byId = {};
  mk.filter(b => b.t === 'trak').forEach(b => { const tk = kids(mv, b.o + b.h, b.o + b.z), tkhd = pick(tk, 'tkhd'), mdia = pick(tk, 'mdia'); if (!tkhd || !mdia) throw new Error('bad trak');
    const tv = mv.getUint8(tkhd.o + tkhd.h), id = u32(mv, tkhd.o + tkhd.h + (tv ? 20 : 12));
    const mdk = kids(mv, mdia.o + mdia.h, mdia.o + mdia.z), mdhd = pick(mdk, 'mdhd'), hdlr = pick(mdk, 'hdlr'), minf = pick(mdk, 'minf'); if (!mdhd || !hdlr || !minf) throw new Error('bad mdia');
    const dv = mv.getUint8(mdhd.o + mdhd.h), ts = u32(mv, mdhd.o + mdhd.h + (dv ? 20 : 12)), kind = fcc(mv, hdlr.o + hdlr.h + 8);
    const mik = kids(mv, minf.o + minf.h, minf.o + minf.z), stbl = pick(mik, 'stbl'); if (!stbl) throw new Error('no stbl');
    const stsd = pick(kids(mv, stbl.o + stbl.h, stbl.o + stbl.z), 'stsd'); if (!stsd) throw new Error('no stsd');
    const T = { id, ts, kind, box: b, tk, tkhd, tv, mdia, mdk, mdhd, dv, hdlr, minf, mik, stbl, stsd, codec: fcc(mv, stsd.o + stsd.h + 12), sizes: [], durs: [], sync: [], cts: [], anyCts: false, chunks: [], t0: null, end: 0 };
    tracks.push(T); byId[id] = T; });
  if (!tracks.length) throw new Error('no tracks');
  /* 3 · every piece: where each frame's bytes are, how long it lasts, whether it is a key frame */
  for (const mf of moofs) { const d = await rd(mf.o, mf.o + mf.z); let prevEnd = null, first = true;
    for (const tf of kids(d, mf.h, mf.z).filter(b => b.t === 'traf')) { const tk = kids(d, tf.o + tf.h, tf.o + tf.z), tfhd = pick(tk, 'tfhd'); if (!tfhd) continue;
      let p = tfhd.o + tfhd.h; const fl = u32(d, p) & 0xffffff, T = byId[u32(d, p + 4)]; p += 8; if (!T) continue;
      const def = Object.assign({ dur: 0, size: 0, flags: 0 }, trex[T.id] || {});
      let base = fl & 0x20000 ? mf.o : first ? mf.o : prevEnd;
      if (fl & 1) { base = u64(d, p); p += 8; } if (fl & 2) p += 4; if (fl & 8) { def.dur = u32(d, p); p += 4; } if (fl & 16) { def.size = u32(d, p); p += 4; } if (fl & 32) { def.flags = u32(d, p); p += 4; }
      const tfdt = pick(tk, 'tfdt'); let at = null; if (tfdt) { const q = tfdt.o + tfdt.h; at = d.getUint8(q) ? u64(d, q + 4) : u32(d, q + 4); }
      if (at !== null) { if (T.t0 === null) { T.t0 = at; T.end = at; } else if (at > T.end && T.durs.length) { T.durs[T.durs.length - 1] += at - T.end; T.end = at; }
        else if (at < T.end && T.durs.length && T.durs[T.durs.length - 1] > T.end - at) { T.durs[T.durs.length - 1] -= T.end - at; T.end = at; } }   /* a gap (paused, or frames skipped): the last frame before it stays up */
      else if (T.t0 === null) { T.t0 = 0; T.end = 0; }
      let dataPos = base;
      for (const tr of tk.filter(b => b.t === 'trun')) { let q = tr.o + tr.h; const ver = d.getUint8(q), rf = u32(d, q) & 0xffffff, n = u32(d, q + 4); q += 8;
        if (rf & 1) { dataPos = base + d.getInt32(q); q += 4; } let ff = null; if (rf & 4) { ff = u32(d, q); q += 4; }
        const ch = { off: dataPos, n, bytes: 0 };
        for (let i = 0; i < n; i++) { let du = def.dur, sz = def.size, sf = i === 0 && ff !== null ? ff : def.flags, ct = 0;
          if (rf & 0x100) { du = u32(d, q); q += 4; } if (rf & 0x200) { sz = u32(d, q); q += 4; } if (rf & 0x400) { sf = u32(d, q); q += 4; } if (rf & 0x800) { ct = ver ? d.getInt32(q) : u32(d, q); q += 4; }
          T.sizes.push(sz); T.durs.push(du); T.sync.push(!(sf & 0x10000)); T.cts.push(ct); if (ct) T.anyCts = true; ch.bytes += sz; T.end += du; }
        if (n) T.chunks.push(ch); dataPos += ch.bytes; prevEnd = dataPos; }
      first = false; } }
  const live = tracks.filter(T => T.sizes.length); if (!live.length) throw new Error('no samples');
  /* 4 · where the data will sit in the new file: the same bytes, in the same order, in one block */
  const map = []; let pay = 0; mdats.forEach(m => { map.push({ a: m.o + m.h, b: m.o + m.z, at: pay }); pay += m.z - m.h; });
  const rel = off => { const m = map.find(x => off >= x.a && off < x.b); if (!m) throw new Error('data outside mdat'); return m.at + off - m.a; };
  live.forEach(T => T.chunks.forEach(c => { c.rel = rel(c.off); if (c.bytes && rel(c.off + c.bytes - 1) !== c.rel + c.bytes - 1) throw new Error('split run'); }));
  /* 5 · write the ordinary header */
  const W = () => { const a = []; return { a, u8: v => a.push(v & 255), u32: v => a.push((v >>> 24) & 255, (v >>> 16) & 255, (v >>> 8) & 255, v & 255), u64: v => { const hi = Math.floor(v / 4294967296); a.push((hi >>> 24) & 255, (hi >>> 16) & 255, (hi >>> 8) & 255, hi & 255); const lo = v >>> 0; a.push((lo >>> 24) & 255, (lo >>> 16) & 255, (lo >>> 8) & 255, lo & 255); }, s: t => { for (let i = 0; i < 4; i++) a.push(t.charCodeAt(i)); } }; };
  const box = (t, ...parts) => { let n = 8; parts.forEach(p => n += p.length); const o = new Uint8Array(n), dv = new DataView(o.buffer); dv.setUint32(0, n); for (let i = 0; i < 4; i++) o[4 + i] = t.charCodeAt(i); let at = 8; parts.forEach(p => { o.set(p, at); at += p.length; }); return o; };
  const raw = b => new Uint8Array(mv.buffer.slice(b.o, b.o + b.z));
  const full = (t, w) => box(t, Uint8Array.from(w.a));
  const start = Math.min.apply(null, live.map(T => T.t0 / T.ts));
  live.forEach(T => { T.total = T.end - T.t0; T.lead = T.t0 / T.ts - start; });
  const movDur = Math.round(Math.max.apply(null, live.map(T => (T.lead + T.total / T.ts) * mts)));
  const patch = (b, ver, kind, v) => { const o = raw(b), dv = new DataView(o.buffer), p = b.h + 4;   /* kind: 'mv'/'md' → after creation, modification, timescale; 'tk' → after creation, modification, id, reserved */
    const at = kind === 'tk' ? p + (ver ? 24 : 16) : p + (ver ? 20 : 12);
    if (ver) { dv.setUint32(at, Math.floor(v / 4294967296)); dv.setUint32(at + 4, v >>> 0); } else dv.setUint32(at, Math.min(v, 0xffffffff)); return o; };
  const build = (dataStart, big) => {
    const traks = live.map(T => { const n = T.sizes.length;
      const stts = W(); stts.u32(0); const runs = []; T.durs.forEach(du => { const l = runs[runs.length - 1]; if (l && l[1] === du) l[0]++; else runs.push([1, du]); }); stts.u32(runs.length); runs.forEach(r => { stts.u32(r[0]); stts.u32(r[1]); });
      const stsc = W(); stsc.u32(0); const sr = []; T.chunks.forEach((c, i) => { const l = sr[sr.length - 1]; if (!l || l[1] !== c.n) sr.push([i + 1, c.n]); }); stsc.u32(sr.length); sr.forEach(r => { stsc.u32(r[0]); stsc.u32(r[1]); stsc.u32(1); });
      const stsz = W(); stsz.u32(0); stsz.u32(0); stsz.u32(n); T.sizes.forEach(z => stsz.u32(z));
      const co = W(); co.u32(0); co.u32(T.chunks.length); T.chunks.forEach(c => big ? co.u64(dataStart + c.rel) : co.u32(dataStart + c.rel));
      const parts = [raw(T.stsd), full('stts', stts)];
      if (T.anyCts) { const neg = T.cts.some(c => c < 0), ct = W(); ct.u32(neg ? 0x01000000 : 0); const cr = []; T.cts.forEach(c => { const l = cr[cr.length - 1]; if (l && l[1] === c) l[0]++; else cr.push([1, c]); }); ct.u32(cr.length); cr.forEach(r => { ct.u32(r[0]); ct.u32(r[1] >>> 0); }); parts.push(full('ctts', ct)); }
      if (T.kind === 'vide' && T.sync.some(s => !s)) { const ss = W(); ss.u32(0); const ks = []; T.sync.forEach((s, i) => { if (s) ks.push(i + 1); }); ss.u32(ks.length); ks.forEach(k => ss.u32(k)); parts.push(full('stss', ss)); }
      parts.push(full('stsc', stsc), full('stsz', stsz), full(big ? 'co64' : 'stco', co));
      const stbl = box('stbl', ...parts);
      const minf = box('minf', ...T.mik.filter(b => b.t !== 'stbl').map(raw), stbl);
      const mdia = box('mdia', patch(T.mdhd, T.dv, 'md', T.total), ...T.mdk.filter(b => b.t !== 'mdhd' && b.t !== 'minf').map(raw), minf);
      const segDur = Math.round(T.total / T.ts * mts), leadDur = Math.round(T.lead * mts), tp = [patch(T.tkhd, T.tv, 'tk', leadDur + segDur)];
      if (leadDur > 0) { const el = W(); el.u32(0); el.u32(2); el.u32(leadDur); el.u32(0xffffffff); el.u32(0x00010000); el.u32(segDur); el.u32(0); el.u32(0x00010000); tp.push(box('edts', full('elst', el))); }
      tp.push(...T.tk.filter(b => b.t !== 'tkhd' && b.t !== 'mdia' && b.t !== 'edts').map(raw), mdia);
      return box('trak', ...tp); });
    return box('moov', patch(mvhd, mvV, 'mv', movDur), ...traks, ...mk.filter(b => b.t !== 'mvhd' && b.t !== 'trak' && b.t !== 'mvex').map(raw)); };
  const fw = W(); fw.s('isom'); fw.u32(512); ['isom', 'iso2', 'mp41'].concat(live.some(T => /^avc/.test(T.codec)) ? ['avc1'] : []).forEach(b => fw.s(b));
  const ftypB = box('ftyp', Uint8Array.from(fw.a)), bigM = pay + 8 > 0xffffffff;
  let big = false, moov = build(0, false), ds = ftypB.length + moov.length + (bigM ? 16 : 8);
  if (ds + pay > 0xffffffff) { big = true; moov = build(0, true); ds = ftypB.length + moov.length + (bigM ? 16 : 8); }
  moov = build(ds, big);
  const mh = new Uint8Array(bigM ? 16 : 8), mdv = new DataView(mh.buffer); if (bigM) { mdv.setUint32(0, 1); mdv.setUint32(8, Math.floor((pay + 16) / 4294967296)); mdv.setUint32(12, (pay + 16) >>> 0); } else mdv.setUint32(0, pay + 8); 'mdat'.split('').forEach((c, i) => { mh[4 + i] = c.charCodeAt(0); });
  const V = live.find(T => T.kind === 'vide'), A = live.find(T => T.kind === 'soun');
  return { blob: new Blob([ftypB, moov, mh].concat(map.map(m => blob.slice(m.a, m.b))), { type: 'video/mp4' }), dur: movDur / mts, vDur: V ? V.total / V.ts : 0, aDur: A ? A.total / A.ts : 0, frags: moofs.length,
    info: { mts, tracks: live.map(T => ({ kind: T.kind, codec: T.codec, ts: T.ts, n: T.sizes.length, secs: Math.round(T.total / T.ts * 1000) / 1000, lead: Math.round(T.lead * 1000) / 1000, keys: T.sync.filter(Boolean).length, chunks: T.chunks.length, cts: T.anyCts })) } };
}
/* How long a finished recording really is, as a player sees it (used when the file could not be read box by box). 0 = unknown. */
async function mwpLen(blob) {
  const v = document.createElement('video'); v.muted = true; v.playsInline = true; v.preload = 'metadata'; const u = URL.createObjectURL(blob); v.src = u;
  try {
    await new Promise((r, j) => { v.onloadedmetadata = r; v.onerror = () => j(new Error('open')); setTimeout(() => j(new Error('timeout')), 8000); });
    if (!isFinite(v.duration) || v.duration < 0.05) await new Promise(r => { const t = setTimeout(r, 4000); v.onseeked = () => { clearTimeout(t); r(); }; v.currentTime = 1e9; });
    return isFinite(v.duration) ? v.duration : v.currentTime || 0;
  } catch (e) { return 0; } finally { try { v.removeAttribute('src'); v.load(); } catch (e) {} URL.revokeObjectURL(u); }
}
/* 💧 Review watermark. One see-through layer the size of the preview, drawn over every recorded frame, so a copy saved from the
   review page carries the watermark across the whole picture (tiled on a slant, so it can't be cropped away); the clean
   full-quality file only comes with approval. Pinnacle agents (pin) get "CONTENT HUB · REEL REVIEW", everyone else
   "REEL ESTATE MEDIA · REEL PREVIEW". Made once per preview, not per frame. The poster frame stays clean. */
function mwpMark(w, h, pin) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const x = c.getContext('2d'), txt = pin ? 'CONTENT HUB \u00B7 REEL REVIEW' : 'REEL ESTATE MEDIA \u00B7 REEL PREVIEW', px = Math.min(w, h) / 19;
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round';
  x.font = '800 ' + px + 'px -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif';
  try { x.letterSpacing = (px * 0.14).toFixed(1) + 'px'; } catch (e) {}
  x.lineWidth = Math.max(1, px / 14); x.strokeStyle = 'rgba(0,0,0,.11)'; x.fillStyle = 'rgba(255,255,255,.2)';
  x.translate(w / 2, h / 2); x.rotate(-Math.PI / 7.5);
  const stepX = x.measureText(txt).width + px * 3.2, stepY = px * 5.4, R = Math.hypot(w, h) / 2 + stepY;
  let r = 0;
  for (let y = -Math.ceil(R / stepY) * stepY; y <= R; y += stepY, r++)
    for (let dx = -Math.ceil(R / stepX) * stepX + (r % 2 ? stepX / 2 : 0); dx <= R + stepX; dx += stepX) { x.strokeText(txt, dx, y); x.fillText(txt, dx, y); }
  return c;
}
async function makeWebPreview(file, onPct, ctl, opt) {
  try { return await mwpOnce(file, onPct, ctl, opt); }
  catch (e) { if (!(e && e.short) || (ctl && ctl.cancelled)) throw e; if (onPct) onPct(0); return await mwpOnce(file, onPct, ctl, opt); }   /* came out short: one more go, then give up (the review then plays the originals) */
}
async function mwpOnce(file, onPct, ctl, opt) {
  const MAX = 1280, FPS = 30, DLY = 0.12, LEAD = 0.008, PRE = 150;
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
    let w = Math.max(2, Math.round(W * sc / 2) * 2), h = Math.max(2, Math.round(H * sc / 2) * 2);
    if (opt && opt.cal && opt.w && opt.h) { w = opt.w; h = opt.h; }
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    const cx = cv.getContext('2d');
    const seek = t => new Promise(r => { const f = () => { v.removeEventListener('seeked', f); r(); }; v.addEventListener('seeked', f); v.currentTime = t; });
    await seek(Math.min(dur * 0.2, 4));
    cx.drawImage(v, 0, 0, w, h);
    const poster = cv.toDataURL('image/jpeg', 0.85);
    await seek(0);
    let wm = null; if (!(opt && (opt.cal || opt.mark === false))) { try { wm = mwpMark(w, h, !!(opt && opt.pin)); } catch (e) { wm = null; } }
    const mark = () => { if (wm) cx.drawImage(wm, 0, 0); };
    let aTracks = [];
    const needsTap = () => { const e = new Error('Chrome needs a tap to play the sound'); e.needsTap = true; return e; };
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    cleanup.push(() => { try { ac.close(); } catch (e) {} });
    if (ac.state !== 'running') await Promise.race([ac.resume().catch(() => {}), new Promise(r => setTimeout(r, 1500))]);
    if (ac.state !== 'running') throw needsTap();
    const lag = opt && opt.cal ? 0 : await mwpLag(ctl, w, h, mime);
    const aDly = DLY + Math.max(0, lag) / 1000, vDly = DLY + Math.max(0, -lag) / 1000;
    try {
      const src = ac.createMediaElementSource(v), dst = ac.createMediaStreamDestination(), dl = ac.createDelay(1);
      dl.delayTime.value = aDly; src.connect(dl); dl.connect(dst); aTracks = dst.stream.getAudioTracks();
    } catch (e) { aTracks = []; }
    let cst = null, push = null;
    try { cst = cv.captureStream(0); const vt0 = cst.getVideoTracks()[0]; push = vt0 && vt0.requestFrame ? () => vt0.requestFrame() : cst.requestFrame ? () => cst.requestFrame() : null; } catch (e) { cst = null; }
    if (!push) cst = cv.captureStream(FPS);
    const stream = new MediaStream([...cst.getVideoTracks(), ...aTracks]);
    const bits = Math.round(Math.min(3.2e6, Math.max(1.2e6, w * h * FPS * 0.08)));
    await mwpWarm(w, h, mime, bits);
    const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: bits, audioBitsPerSecond: 128000 });
    const chunks = []; rec.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
    const stopped = new Promise(r => { rec.onstop = r; });
    let alive = true;
    /* 🔊 Sound and picture stay together: every frame is copied the moment the player shows it (with its exact time in the video),
       then put on the recorded canvas a fixed time later (vDly); the sound goes through a fixed delay too (aDly). The two differ by
       `lag`, what this browser's recorder itself adds between picture and sound (measured by mwpLag). Before, frames were drawn
       whenever the page got round to it and nothing made up for the recorder. */
    const RING = Math.min(18, Math.ceil(vDly * FPS) + 5), ring = [], q = [];
    for (let i = 0; i < RING; i++) { const c = document.createElement('canvas'); c.width = w; c.height = h; ring.push({ c, x: c.getContext('2d') }); }
    cleanup.push(() => { ring.forEach(r => { r.c.width = 0; r.c.height = 0; }); cv.width = 0; cv.height = 0; if (wm) { wm.width = 0; wm.height = 0; } });   /* hand the picture memory back now, not whenever the browser tidies up */
    let wr = 0, lastM = -1, endedAt = 0;
    const clock = () => endedAt ? dur + (performance.now() - endedAt) / 1000 : v.currentTime;
    const grab = (now, md) => { if (!alive) return;
      const m = md && typeof md.mediaTime === 'number' ? md.mediaTime : v.currentTime;
      if ((m - lastM >= 1 / FPS - 0.004 || m < lastM) && q.length < RING - 1) { const s = ring[wr]; wr = (wr + 1) % RING; s.x.drawImage(v, 0, 0, w, h); q.push({ s, m }); lastM = m; }
      if (onPct) onPct(Math.min(99, Math.round(v.currentTime / dur * 100)));
      if (v.requestVideoFrameCallback) v.requestVideoFrameCallback(grab); else requestAnimationFrame(grab); };
    const emit = () => { if (!alive) return;
      const t = clock(); let n = 0;
      while (n < q.length && q[n].m + vDly - LEAD <= t) n++;
      if (n > 2) q.splice(0, n - 1);   /* fell well behind: jump to the newest frame that is due */
      if (n) { const due = q.shift(); cx.drawImage(due.s.c, 0, 0); mark(); if (push) push(); }   /* one frame per screen refresh, oldest first */
      requestAnimationFrame(emit); };
    const draw = () => { cx.drawImage(v, 0, 0, w, h); mark(); if (push) push(); grab(); emit(); };
    const vis = () => { if (document.hidden) { if (rec.state === 'recording') { rec.pause(); v.pause(); } } else if (rec.state === 'paused') { v.play().then(() => rec.resume()).catch(() => {}); } };
    document.addEventListener('visibilitychange', vis); cleanup.push(() => document.removeEventListener('visibilitychange', vis));
    const ended = new Promise((res, rej) => { v.onended = () => { endedAt = performance.now(); res(); }; v.onerror = () => rej(new Error('playback failed')); });
    rec.start(1000);
    /* lead-in: hold the first frame for a moment so the recorder's picture and sound encoders are both running before the video
       starts — without it the gap between picture and sound changed from one recording to the next */
    { const tp = performance.now(); while (performance.now() - tp < PRE && !(ctl && ctl.cancelled)) { cx.drawImage(v, 0, 0, w, h); mark(); if (push) push();
        await new Promise(r => { const t = setTimeout(r, 60); requestAnimationFrame(() => { clearTimeout(t); r(); }); }); } }
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
    await new Promise(r => setTimeout(r, Math.max(aDly, vDly) * 1000 + 300));
    alive = false; rec.stop(); await stopped;
    const isMp4 = /mp4/.test(mime), type = isMp4 ? 'video/mp4' : 'video/webm';
    const base = String(file.name || 'video').replace(/\.[^.]+$/, '');
    let body = new Blob(chunks, { type }), got = 0, plain = false;
    if (!(opt && opt.cal)) {
      if (isMp4) { try { const fl = await mwpFlatten(body); body = fl.blob; got = fl.vDur || fl.dur; plain = true; } catch (e) { plain = false; } }
      if (!got) got = await mwpLen(body);
      if (got && got < dur - Math.max(1.5, dur * 0.04)) { const e = new Error('the preview came out short, ' + Math.round(got) + ' s of ' + Math.round(dur) + ' s'); e.short = true; throw e; }
    }
    const out = new File([body], base + ' (web preview).' + (isMp4 ? 'mp4' : 'webm'), { type });
    if (onPct) onPct(100);
    window.__mwpLast = { srcSecs: Math.round(dur * 10) / 10, gotSecs: Math.round(got * 10) / 10, plain, kb: Math.round(out.size / 1024) };
    return { file: out, poster, w, h, dur, len: got, plain };
  } finally {
    cleanup.forEach(f => { try { f(); } catch (e) {} });
    try { v.pause(); v.removeAttribute('src'); v.load(); } catch (e) {}
    URL.revokeObjectURL(url);
  }
}
