import * as THREE from "three";

/*
 * The request stack: four plates (phone, web, api, data) and one lime request dot.
 * Scrolling drives the camera down the stack; each plate shows the screenshot of the
 * project whose section is on screen. Clicking a plate lifts that screenshot out and
 * flies it to the viewer, with the request dot chasing it.
 *
 * The DOM owns the content. Sections marked [data-layer] or [data-far] are the steps,
 * in document order; a [data-layer] step carries its screenshot in data-shot-* attributes.
 */

export type FocusState = { key: string; index: number; count: number } | null;

export type JourneyOptions = {
  root: HTMLElement;
  canvas: HTMLCanvasElement;
  bigword: HTMLElement;
  reduce: boolean;
  monoFamily: string;
  onHop: (layer: number) => void;
  onFocus: (state: FocusState) => void;
};

export type JourneyApi = {
  open: (key: string) => void;
  close: () => void;
  go: (dir: number) => void;
  launch: () => void;
  destroy: () => void;
};

type Key = { y: number; d: number; r: number; p: number };

type Screen = {
  step: number;
  key: string;
  layer: number;
  m: THREE.Mesh;
  mat: THREE.MeshBasicMaterial;
  src?: string;
  code: boolean;
  w: number;
  h: number;
  loaded: boolean;
};

type Layer = {
  g: THREE.Group;
  y: number;
  fill: THREE.Mesh;
  fillMat: THREE.MeshBasicMaterial;
  edgeMat: THREE.LineBasicMaterial;
  detMat: THREE.LineBasicMaterial;
  label: THREE.Mesh | null;
  lift: number;
};

const LAYER_Y = [4.5, 1.5, -1.5, -4.5];
const NAMES = ["01 phone", "02 web", "03 api", "04 data"];
const FAR: Record<string, Key> = {
  hero: { y: 0.4, d: 30, r: -0.55, p: 6.5 },
  response: { y: 0, d: 27, r: 0.75, p: 6.5 },
  founder: { y: 0, d: 33, r: 0.95, p: 6.5 },
  quests: { y: 0, d: 35, r: 1.1, p: 6.5 },
  off: { y: 0, d: 37, r: 1.25, p: 6.5 },
  hire: { y: 0, d: 39, r: 1.4, p: 6.5 },
};
const BLOCK = "a,button,input,label,.cap,.panel,.term,.phone,.ticket,.log,.mesh,.hud,.focus-panel";
const HEX = { ground: "#0B0D0C", surface: "#111412", line: "#262B27", muted: "#8A918B", ink: "#E8EAE6", accent: "#B6F36A" };

const smooth = (t: number) => t * t * (3 - 2 * t);
const inOutCubic = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function createJourney(o: JourneyOptions): JourneyApi | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: o.canvas, antialias: true, powerPreference: "low-power" });
  } catch {
    return null;
  }

  const fine = matchMedia("(pointer: fine)").matches;
  const off: Array<() => void> = [];
  const on = <K extends keyof WindowEventMap>(type: K, fn: (e: WindowEventMap[K]) => void, opts?: AddEventListenerOptions) => {
    window.addEventListener(type, fn, opts);
    off.push(() => window.removeEventListener(type, fn, opts));
  };

  /* ---------- steps and scroll position ---------- */
  const steps = [...o.root.querySelectorAll<HTMLElement>("[data-layer],[data-far]")];
  let mids: number[] = [];
  const measure = () => {
    mids = steps.map((s) => {
      const r = s.getBoundingClientRect();
      return r.top + scrollY + r.height / 2;
    });
  };
  const journeyT = () => {
    const pos = scrollY + innerHeight / 2;
    if (pos <= mids[0]) return 0;
    for (let i = 0; i < mids.length - 1; i++) if (pos < mids[i + 1]) return i + (pos - mids[i]) / (mids[i + 1] - mids[i]);
    return mids.length - 1;
  };

  /* ---------- scene ---------- */
  const C = Object.fromEntries(Object.entries(HEX).map(([k, v]) => [k, new THREE.Color(v)])) as Record<keyof typeof HEX, THREE.Color>;
  renderer.setClearColor(C.ground, 1);
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(C.ground, 20, 50);
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  const stack = new THREE.Group();
  scene.add(stack);

  const segs: number[][] = [];
  const rect = (x: number, z: number, w: number, d: number) => {
    const a = [x - w / 2, z - d / 2], b = [x + w / 2, z - d / 2], c = [x + w / 2, z + d / 2], e = [x - w / 2, z + d / 2];
    segs.push(a, b, b, c, c, e, e, a);
  };
  const ln = (x1: number, z1: number, x2: number, z2: number) => segs.push([x1, z1], [x2, z2]);
  const flush = (y: number) => {
    const arr = new Float32Array(segs.length * 3);
    segs.forEach((p, i) => { arr[i * 3] = p[0]; arr[i * 3 + 1] = y; arr[i * 3 + 2] = p[1]; });
    segs.length = 0;
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  };
  const DETAIL = [
    () => { rect(0, 0, 1.5, 2.8); rect(0, 0, 1.3, 2.5); ln(-0.2, -1.15, 0.2, -1.15); rect(0, -0.05, 1.0, 0.9); rect(0, 0.85, 1.0, 0.32); },
    () => { rect(0, 0, 4.4, 3); ln(-2.2, -1.1, 2.2, -1.1); rect(-1.6, 0.35, 0.9, 2.3); [-0.45, 0.65, 1.7].forEach((x) => rect(x, -0.35, 0.9, 0.9)); rect(0.62, 0.85, 3.0, 0.7); },
    () => {
      const n = [[-2, -1], [-2, 1], [0, 0], [2, -1.1], [2, 0], [2, 1.1]];
      n.forEach(([x, z]) => rect(x, z, 0.55, 0.4));
      [[0, 2], [1, 2], [2, 3], [2, 4], [2, 5]].forEach(([a, b]) => ln(n[a][0] + 0.28, n[a][1], n[b][0] - 0.28, n[b][1]));
    },
    () => { [-1.7, 0, 1.7].forEach((x) => { rect(x, 0, 1.4, 2.6); ln(x - 0.7, -0.85, x + 0.7, -0.85); for (let r = -0.45; r < 1.3; r += 0.4) ln(x - 0.55, r, x + 0.55, r); }); },
  ];

  const canvasTexture = (c: HTMLCanvasElement) => {
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  };

  const layers: Layer[] = LAYER_Y.map((y, i) => {
    const g = new THREE.Group();
    g.position.y = y;
    const fillMat = new THREE.MeshBasicMaterial({ color: C.surface, transparent: true, opacity: 0.85, depthWrite: false, side: THREE.DoubleSide });
    const fill = new THREE.Mesh(new THREE.PlaneGeometry(6, 4), fillMat);
    fill.rotation.x = -Math.PI / 2;
    fill.userData.layer = i;
    g.add(fill);
    rect(0, 0, 6, 4);
    const edgeMat = new THREE.LineBasicMaterial({ color: C.line.clone() });
    g.add(new THREE.LineSegments(flush(0), edgeMat));
    DETAIL[i]();
    const detMat = new THREE.LineBasicMaterial({ color: C.muted.clone(), transparent: true, opacity: 0.3 });
    g.add(new THREE.LineSegments(flush(0.02), detMat));
    stack.add(g);
    return { g, y, fill, fillMat, edgeMat, detMat, label: null, lift: 0 };
  });

  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  fontsReady.then(() => {
    layers.forEach((L, i) => {
      const c = document.createElement("canvas");
      c.width = 512; c.height = 96;
      const g = c.getContext("2d")!;
      g.font = `500 44px ${o.monoFamily}`;
      g.fillStyle = HEX.ink; g.textBaseline = "middle";
      g.fillText(NAMES[i].toUpperCase(), 4, 48);
      const m = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.41), new THREE.MeshBasicMaterial({ map: canvasTexture(c), transparent: true, depthWrite: false, opacity: 0.4 }));
      m.rotation.x = -Math.PI / 2;
      m.position.set(-1.85, 0.03, -2.35);
      L.label = m;
      L.g.add(m);
    });
  });

  /* ---------- screenshots on the plates ---------- */
  const drawCode = () => {
    const c = document.createElement("canvas");
    c.width = 1050; c.height = 700;
    const g = c.getContext("2d")!;
    g.fillStyle = HEX.ground; g.fillRect(0, 0, 1050, 700);
    g.strokeStyle = HEX.line; g.lineWidth = 3; g.strokeRect(2, 2, 1046, 696);
    const lines: [string, string][] = [
      [HEX.muted, "// illustration, not production code"], [HEX.ink, "POST /v1/bnpl/checkout"], [HEX.muted, '{ "amount": …, "tenor": 3 }'], ["", ""],
      [HEX.ink, "→ 201 created"], [HEX.muted, "  plan: 3 instalments"], [HEX.muted, "  status: approved"], [HEX.muted, "  ledger: balanced"], ["", ""],
      [HEX.ink, "idempotency-key ✓  audit ✓"],
    ];
    g.font = `500 34px ${o.monoFamily}`;
    lines.forEach(([col, t], i) => { if (!t) return; g.fillStyle = col; g.fillText(t, 50, 90 + i * 56); });
    return canvasTexture(c);
  };
  const loader = new THREE.TextureLoader();
  const screens: Screen[] = [];
  steps.forEach((s, i) => {
    if (s.dataset.layer == null) return;
    const L = Number(s.dataset.layer);
    const code = s.dataset.shotCode === "1";
    const a = code ? 1.5 : Number(s.dataset.shotW) / Number(s.dataset.shotH);
    const w = Math.min(5.5, 3.6 * a), h = w / a;
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    m.rotation.x = -Math.PI / 2;
    m.position.y = 0.04 + screens.length * 0.002;
    m.visible = false;
    layers[L].g.add(m);
    screens.push({ step: i, key: s.dataset.key || String(i), layer: L, m, mat, src: s.dataset.shot, code, w, h, loaded: false });
  });
  const ensure = (sc: Screen) => {
    if (sc.loaded) return;
    sc.loaded = true;
    if (sc.code) fontsReady.then(() => { sc.mat.map = drawCode(); sc.mat.needsUpdate = true; });
    else if (sc.src) loader.load(sc.src, (t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; sc.mat.map = t; sc.mat.needsUpdate = true; });
  };

  /* ---------- the request ---------- */
  const spine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 7.5, 0), new THREE.Vector3(0, -6.5, 0)]),
    new THREE.LineDashedMaterial({ color: C.line, dashSize: 0.18, gapSize: 0.14 }),
  );
  spine.computeLineDistances();
  stack.add(spine);
  const packet = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), new THREE.MeshBasicMaterial({ color: C.accent }));
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.22, 0.25, 40), new THREE.MeshBasicMaterial({ color: C.accent, transparent: true, side: THREE.DoubleSide }));
  ring.rotation.x = -Math.PI / 2;
  stack.add(packet, ring);

  const makeTrail = (n: number) => {
    const pos = new Float32Array(n * 3), col = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const k = 1 - i / n, c = C.ground.clone().lerp(C.accent, k * k);
      col.set([c.r, c.g, c.b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return { pos, g, n };
  };
  const pushTrail = (t: { pos: Float32Array; g: THREE.BufferGeometry; n: number }, v: THREE.Vector3) => {
    t.pos.copyWithin(3, 0, (t.n - 1) * 3);
    t.pos.set([v.x, v.y, v.z], 0);
    (t.g.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  };
  const trail = makeTrail(40);
  for (let i = 0; i < 40; i++) trail.pos.set([0, 6.5, 0], i * 3);
  const trailLine = new THREE.Line(trail.g, new THREE.LineBasicMaterial({ vertexColors: true }));
  stack.add(trailLine);

  /* ---------- keyframes ---------- */
  const subCount: Record<number, number> = {};
  const K: Key[] = steps.map((s) => {
    if (s.dataset.far) return FAR[s.dataset.far] ?? FAR.hire;
    const L = Number(s.dataset.layer);
    const sub = (subCount[L] = (subCount[L] ?? -1) + 1);
    return { y: LAYER_Y[L], d: 13.5, r: -0.35 + L * 0.22 + sub * 0.07, p: LAYER_Y[L] };
  });
  const sample = (t: number): Key => {
    const i = Math.min(Math.floor(t), K.length - 2), f = smooth(clamp01(t - i)), a = K[i], b = K[i + 1];
    return { y: a.y + (b.y - a.y) * f, d: a.d + (b.d - a.d) * f, r: a.r + (b.r - a.r) * f, p: a.p + (b.p - a.p) * f };
  };
  const words = steps.map((s) => s.dataset.word || "");

  let W = 0, H = 0, narrow = false;
  const resize = () => {
    W = innerWidth; H = innerHeight; narrow = W < 820;
    measure();
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    if (narrow) camera.setViewOffset(W, H, 0, -H * 0.12, W, H);
    else camera.setViewOffset(W, H, -W * 0.18, 0, W, H);
    camera.updateProjectionMatrix();
  };
  on("resize", resize);
  on("load", measure);
  resize();
  const ro = new ResizeObserver(measure);
  ro.observe(o.root);
  off.push(() => ro.disconnect());

  /* ---------- pointer: tilt + hover lift ---------- */
  const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  let hovered = -1;
  const pickLayer = (cx: number, cy: number) => {
    ndc.set((cx / W - 0.5) * 2, -(cy / H - 0.5) * 2);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(layers.map((L) => L.fill))[0];
    return hit ? (hit.object.userData.layer as number) : -1;
  };
  if (fine) on("pointermove", (e) => {
    ptr.tx = (e.clientX / W - 0.5) * 2; ptr.ty = (e.clientY / H - 0.5) * 2;
    const t = e.target as Element | null;
    hovered = F.on || t?.closest?.(BLOCK) ? -1 : pickLayer(e.clientX, e.clientY);
    document.body.style.cursor = hovered >= 0 ? "pointer" : "";
  }, { passive: true });

  /* ---------- focus: a plate lifts out and flies to the viewer ---------- */
  const F = {
    on: false, p: 0, e: 0, dir: 0, layer: -1, list: [] as Screen[], idx: 0, swap: -1, pending: -1,
    landed: false, landAt: 0, resetTrail: false,
  };
  const card = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ transparent: true, depthTest: false, depthWrite: false }));
  card.renderOrder = 10; card.visible = false; scene.add(card);
  const cardMat = card.material as THREE.MeshBasicMaterial;
  const edge = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(1, 1)), new THREE.LineBasicMaterial({ color: C.ink.clone(), transparent: true, depthTest: false }));
  edge.renderOrder = 11; card.add(edge);
  const edgeMat = edge.material as THREE.LineBasicMaterial;
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), new THREE.MeshBasicMaterial({ color: C.accent, depthTest: false, transparent: true }));
  const halo = new THREE.Mesh(new THREE.RingGeometry(0.22, 0.25, 40), new THREE.MeshBasicMaterial({ color: C.accent, transparent: true, depthTest: false, side: THREE.DoubleSide }));
  dot.renderOrder = halo.renderOrder = 13; dot.visible = halo.visible = false;
  const ftrail = makeTrail(32);
  const ftrailLine = new THREE.Line(ftrail.g, new THREE.LineBasicMaterial({ vertexColors: true, depthTest: false }));
  ftrailLine.renderOrder = 12; ftrailLine.frustumCulled = false; ftrailLine.visible = false;
  scene.add(dot, halo, ftrailLine);
  const vA = new THREE.Vector3(), vB = new THREE.Vector3(), vP = new THREE.Vector3(), vC = new THREE.Vector3();
  const qA = new THREE.Quaternion(), qB = new THREE.Quaternion();

  const emit = () => {
    const sc = F.list[F.idx];
    o.onFocus(sc ? { key: sc.key, index: F.idx, count: F.list.length } : null);
  };
  const openLayer = (layer: number, from?: Screen) => {
    if (F.on && F.dir > 0) return;
    const t = journeyT();
    const list = screens.filter((s) => s.layer === layer);
    if (!list.length) return;
    list.forEach(ensure);
    const pick = from ?? list.reduce((a, b) => (Math.abs(t - b.step) < Math.abs(t - a.step) ? b : a));
    Object.assign(F, { layer, list, idx: Math.max(0, list.indexOf(pick)), swap: -1, pending: -1, on: true, dir: 1, landed: false, resetTrail: true });
    document.documentElement.style.overflow = "hidden";
    emit();
  };
  const close = () => {
    if (!F.on || F.dir < 0) return;
    F.dir = -1;
    o.onFocus(null);
  };
  const go = (d: number) => {
    if (!F.on || F.dir < 0 || F.list.length < 2 || F.swap >= 0) return;
    F.pending = (F.idx + d + F.list.length) % F.list.length;
    F.swap = 0;
  };

  on("keydown", (e) => {
    if (!F.on) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
  });
  on("click", (e) => {
    const t = e.target as Element | null;
    if (t?.closest?.(".open-btn")) return;
    if (F.on) { if (!t?.closest?.(".focus-panel")) close(); return; }
    if (t?.closest?.(BLOCK)) return;
    const hit = pickLayer(e.clientX, e.clientY);
    if (hit >= 0) openLayer(hit);
  });
  on("wheel", (e) => { if (F.on && Math.abs(e.deltaY) > 24) close(); }, { passive: true });
  let ty0: number | null = null;
  on("touchstart", (e) => { ty0 = F.on ? e.touches[0].clientY : null; }, { passive: true });
  on("touchmove", (e) => {
    const t = e.target as Element | null;
    if (ty0 !== null && Math.abs(e.touches[0].clientY - ty0) > 60 && !t?.closest?.(".focus-panel")) { ty0 = null; close(); }
  }, { passive: true });

  const updateFocus = (dt: number, now: number) => {
    if (!F.on) { F.e = 0; return; }
    F.p = clamp01(F.p + (F.dir * dt) / (o.reduce ? 0.001 : 0.9));
    if (F.p === 0 && F.dir < 0) {
      F.on = false; F.dir = 0; F.e = 0;
      card.visible = dot.visible = halo.visible = ftrailLine.visible = false;
      document.documentElement.style.overflow = "";
      return;
    }
    const p = F.p, e = (F.e = inOutCubic(p));

    // sliding to another project on the same plate
    let sw = 1;
    if (F.swap >= 0) {
      F.swap += dt / (o.reduce ? 0.001 : 0.5);
      if (F.swap >= 0.5 && F.pending >= 0) { F.idx = F.pending; F.pending = -1; emit(); }
      if (F.swap >= 1) F.swap = -1;
      else sw = Math.abs(Math.cos(F.swap * Math.PI));
    }
    const sc = F.list[F.idx];
    if (sc.mat.map && cardMat.map !== sc.mat.map) { cardMat.map = sc.mat.map; cardMat.needsUpdate = true; }

    // from: the screenshot on its plate. to: upright and facing the viewer
    sc.m.updateWorldMatrix(true, false);
    sc.m.getWorldPosition(vA);
    sc.m.getWorldQuaternion(qA);
    const D = 9, visH = 2 * D * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)), visW = visH * camera.aspect;
    const s = Math.min(((narrow ? 0.4 : 0.68) * visH) / sc.h, ((narrow ? 0.88 : 0.52) * visW) / sc.w);
    vB.set(0, narrow ? visH * 0.27 : 0, -D).applyMatrix4(camera.matrixWorld);
    qB.copy(camera.quaternion);
    card.position.copy(vA).lerp(vB, e);
    card.position.y += Math.sin(e * Math.PI) * 1.4;
    card.quaternion.copy(qA).slerp(qB, e);
    card.rotateZ(Math.sin(e * Math.PI) * 0.12 * (F.dir > 0 ? 1 : -1));
    const k = (1 + (s - 1) * e) * (0.92 + 0.08 * sw);
    card.scale.set(sc.w * k, sc.h * k, 1);
    card.translateX((1 - sw) * (F.pending >= 0 || F.swap < 0.5 ? -0.25 : 0.25) * sc.w);
    card.visible = true;

    // the request dot leaves a beat later, swoops, and lands on the card's corner
    card.updateMatrixWorld(true);
    packet.getWorldPosition(vP);
    vC.set(0.47, 0.45, 0).applyMatrix4(card.matrixWorld);
    const de = inOutCubic(clamp01((p - 0.15) / 0.85));
    dot.position.copy(vP).lerp(vC, de);
    dot.position.y += Math.sin(de * Math.PI) * 2.4;
    dot.position.x += Math.sin(de * Math.PI * 2) * 0.9;
    if (F.dir > 0 && de >= 1 && !F.landed) { F.landed = true; F.landAt = now; }
    if (F.dir < 0) F.landed = false;
    if (F.resetTrail) { for (let i = 0; i < ftrail.n; i++) ftrail.pos.set([dot.position.x, dot.position.y, dot.position.z], i * 3); F.resetTrail = false; }
    pushTrail(ftrail, dot.position);
    const ds = 1 - 0.45 * de;
    dot.scale.setScalar(ds);
    halo.position.copy(dot.position);
    halo.quaternion.copy(camera.quaternion);
    const u = F.landed && !o.reduce ? ((now - F.landAt) / 1400) % 1 : 0;
    halo.scale.setScalar(ds * (1 + u * 1.4));
    (halo.material as THREE.MeshBasicMaterial).opacity = F.landed ? 1 - u : 0;
    dot.visible = halo.visible = ftrailLine.visible = true;

    // the card's frame flashes lime when the dot lands
    const flash = F.landed && !o.reduce ? Math.max(0, 1 - (now - F.landAt) / 700) : 0;
    cardMat.opacity = Math.min(1, e * 6) * sw;
    edgeMat.color.copy(C.ink).lerp(C.accent, flash);
    edgeMat.opacity = Math.min(1, e * 6) * sw * (0.5 + 0.5 * flash);
  };

  /* ---------- frame loop ---------- */
  const cur = sample(journeyT());
  let last = performance.now(), activeHop = -2, lastWord: string | null = null, launchAt = -1, raf = 0;
  const tmp = new THREE.Color();
  const vTmp = new THREE.Vector3();

  const frame = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const t = journeyT(), target = sample(t), k = o.reduce ? 1 : 1 - Math.exp(-dt * 5);
    (Object.keys(cur) as (keyof Key)[]).forEach((key) => { cur[key] += (target[key] - cur[key]) * k; });

    // giant outlined word behind the stack
    const wi = Math.round(t), word = words[Math.min(wi, words.length - 1)];
    if (word !== lastWord) { o.bigword.textContent = word; lastWord = word; }
    const frac = t - wi;
    o.bigword.style.opacity = word ? String(Math.max(0, 1 - Math.abs(frac) * 1.6)) : "0";
    o.bigword.style.transform = `translate3d(${o.reduce ? 2 : 4 - frac * 30}vw,0,0)`;

    ptr.x += (ptr.tx - ptr.x) * 0.06;
    ptr.y += (ptr.ty - ptr.y) * 0.06;
    const dist = cur.d * (narrow ? 1.45 : 1);
    camera.position.set(0, cur.y + dist * 0.5, dist);
    camera.lookAt(0, cur.y, 0);
    stack.rotation.y = cur.r + ptr.x * 0.18;
    stack.rotation.x = ptr.y * 0.05;

    let p = cur.p;
    if (launchAt > 0 && !o.reduce) { const a = (now - launchAt) / 600; if (a < 1) p = cur.p + Math.sin(a * Math.PI) * 0.8; }
    packet.position.y = p;
    ring.position.y = p;
    const pulse = o.reduce ? 0.5 : (now / 1400) % 1;
    ring.scale.setScalar(1 + pulse * 2.2);
    (ring.material as THREE.MeshBasicMaterial).opacity = 1 - pulse;
    pushTrail(trail, vTmp.set(0, p, 0));

    const shown = [0, 0, 0, 0];
    screens.forEach((sc) => {
      const d = Math.abs(t - sc.step);
      if (d < 2.5) ensure(sc);
      const v = clamp01(1.15 - d * 1.3) * (F.on && sc.layer === F.layer ? 0 : 1 - F.e * 0.7);
      sc.mat.opacity = sc.mat.map ? v : 0;
      sc.m.visible = sc.mat.opacity > 0.01;
      shown[sc.layer] = Math.max(shown[sc.layer], sc.mat.opacity);
    });

    let best = -1, bestD = 9;
    layers.forEach((L, i) => {
      const prox = Math.max(0, 1 - Math.abs(p - L.y) / 1.6);
      const fe = F.e, mine = F.on && i === F.layer;
      const spread = F.on ? (i < F.layer ? 1.8 : i > F.layer ? -1.8 : 0) * fe : 0;
      L.lift += ((hovered === i ? 0.35 : 0) - L.lift) * 0.12;
      L.g.position.y = L.y + L.lift + spread;
      L.edgeMat.color.copy(C.line).lerp(C.ink, Math.max(prox * 0.85, hovered === i ? 0.6 : 0, mine ? 0.9 * fe : 0) * (mine ? 1 : 1 - fe));
      L.detMat.opacity = (0.22 + prox * 0.7) * (1 - shown[i]) * (1 - fe * 0.8);
      L.detMat.color.copy(tmp.copy(C.muted).lerp(C.ink, prox));
      L.fillMat.opacity = 0.85 * (1 - fe * (mine ? 0.2 : 0.55));
      if (L.label) (L.label.material as THREE.MeshBasicMaterial).opacity = (0.3 + prox * 0.7) * (mine ? 1 : 1 - fe * 0.7);
      const dd = Math.abs(p - L.y);
      if (dd < bestD) { bestD = dd; best = i; }
    });
    const hop = bestD < 1.2 ? best : -1;
    if (hop !== activeHop) { activeHop = hop; o.onHop(hop); }

    updateFocus(dt, now);
    packet.visible = ring.visible = trailLine.visible = !F.on;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  return {
    open: (key) => {
      const sc = screens.find((s) => s.key === key);
      if (sc) openLayer(sc.layer, sc);
    },
    close,
    go,
    launch: () => { launchAt = performance.now(); },
    destroy: () => {
      cancelAnimationFrame(raf);
      off.forEach((f) => f());
      document.documentElement.style.overflow = "";
      document.body.style.cursor = "";
      scene.traverse((obj) => {
        const m = obj as THREE.Mesh;
        m.geometry?.dispose?.();
        const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
        mats.forEach((mt) => { (mt as THREE.MeshBasicMaterial).map?.dispose(); mt.dispose(); });
      });
      renderer.dispose();
    },
  };
}
