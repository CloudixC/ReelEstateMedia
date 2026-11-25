/* 📼 Plain-MP4 maker. Chrome's recorder writes a "fragmented" MP4: the file is a chain of short pieces and its header says the
   length is 0, so each player has to work the length out for itself. Chrome does; Safari (Mac and iPhone) can stop at the end of
   the first piece, so a one-minute preview played as a short one. mwpFlatten rewrites the header into the ordinary kind (one
   index up front with every frame's size, time and position, and the true length); the picture and sound data are reused
   untouched, not re-encoded. Returns { blob, dur, vDur, aDur, frags } (seconds) or throws if the file isn't what it expects. */
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
    info: { mts, tracks: live.map(T => ({ kind: T.kind, codec: T.codec, ts: T.ts, n: T.sizes.length, secs: Math.round(T.total / T.ts * 1000) / 1000, lead: Math.round(T.lead * 1000) / 1000, keys: T.sync.filter(Boolean).length, chunks: T.chunks.length, cts: T.anyCts, firstSecs: Math.round(T.durs.slice(0, T.chunks[0].n).reduce((a, b) => a + b, 0) / T.ts * 100) / 100 })) } };
}
if (typeof module !== 'undefined') module.exports = { mwpFlatten };
