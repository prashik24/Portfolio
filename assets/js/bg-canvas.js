/**
 * =========================================================================
 * 3D GEOMETRIC CRYSTAL POLYHEDRA (OVERVIEW / HERO ONLY)
 * Distinct, non-colliding geometric wireframe patterns confined strictly
 * to the Overview/Hero section with smooth harmonic floating motion.
 * =========================================================================
 */

(function () {
  'use strict';

  const heroSection = document.getElementById('hero');
  const canvas = document.getElementById('hero-bg-canvas');
  if (!heroSection || !canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrameId = null;
  let isSectionVisible = true;
  let isTabActive = true;

  // Mouse interaction state (relative to hero section)
  const mouse = {
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    active: false
  };

  // Theme-aware color palette
  function getThemeColors() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      return {
        edgeColor: 'rgba(37, 99, 235, ',      // Vibrant Blue / Indigo
        vertexColor: 'rgba(30, 64, 175, ',    // Deep Navy Blue
        starColor: 'rgba(59, 130, 246, ',     // Soft Blue
        glow: 'rgba(37, 99, 235, 0.25)'
      };
    } else {
      return {
        edgeColor: 'rgba(56, 189, 248, ',     // Tech Cyan / Sky
        vertexColor: 'rgba(224, 242, 254, ',  // Luminous Ice White
        starColor: 'rgba(96, 165, 250, ',     // Ambient Stardust
        glow: 'rgba(56, 189, 248, 0.45)'
      };
    }
  }

  let theme = getThemeColors();

  // Watch for theme toggle
  const themeObserver = new MutationObserver(() => {
    theme = getThemeColors();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  /* -------------------------------------------------------------------------
   * 1. 6 DISTINCT GEOMETRIC 3D WIREFRAME MODELS
   * ------------------------------------------------------------------------- */
  
  // Model 0: Regular Icosahedron (20 faces, 12 vertices, 30 edges)
  function createIcosahedron() {
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVerts = [
      [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
      [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
      [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
    ];
    const len = Math.hypot(1, phi);
    const verts = rawVerts.map(([x, y, z]) => [x / len, y / len, z / len]);
    const edges = [];
    for (let i = 0; i < verts.length; i++) {
      for (let j = i + 1; j < verts.length; j++) {
        const d = Math.hypot(
          verts[i][0] - verts[j][0],
          verts[i][1] - verts[j][1],
          verts[i][2] - verts[j][2]
        );
        if (Math.abs(d - (2 / len)) < 0.15) {
          edges.push([i, j]);
        }
      }
    }
    return { name: 'Icosahedron', vertices: verts, edges };
  }

  // Model 1: Elongated Faceted Crystal Shard (Asymmetric Gem)
  function createCrystalShard() {
    const verts = [
      [0, 1.4, 0],          // Top needle
      [-0.8, 0.4, -0.6],    // Upper ring
      [0.8, 0.4, -0.6],
      [0, 0.5, 0.9],
      [-0.9, -0.4, 0.5],    // Lower ring
      [0.9, -0.4, 0.5],
      [0, -0.5, -0.9],
      [0, -1.4, 0]          // Bottom needle
    ];
    // Normalize to unit scale
    const normVerts = verts.map(([x, y, z]) => {
      const l = Math.hypot(x, y, z);
      return [x / l, y / l, z / l];
    });
    const edges = [
      [0, 1], [0, 2], [0, 3],
      [1, 2], [2, 3], [3, 1],
      [1, 4], [2, 5], [3, 4], [3, 5],
      [1, 6], [2, 6], [4, 6], [5, 6],
      [4, 5],
      [7, 4], [7, 5], [7, 6]
    ];
    return { name: 'CrystalShard', vertices: normVerts, edges };
  }

  // Model 2: Geometric Octahedron (Dual Pyramid Diamond, 6 vertices, 12 edges)
  function createOctahedron() {
    const verts = [
      [ 1,  0,  0], [-1,  0,  0],
      [ 0,  1,  0], [ 0, -1,  0],
      [ 0,  0,  1], [ 0,  0, -1]
    ];
    const edges = [
      [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 4], [4, 3], [3, 5], [5, 2]
    ];
    return { name: 'Octahedron', vertices: verts, edges };
  }

  // Model 3: Hexagonal Bipyramid (Diamond Crystal, 8 vertices, 18 edges)
  function createHexBipyramid() {
    const verts = [
      [0,  1.3, 0], // Top
      [0, -1.3, 0]  // Bottom
    ];
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      verts.push([Math.cos(a) * 0.95, 0, Math.sin(a) * 0.95]);
    }
    const normVerts = verts.map(([x, y, z]) => {
      const l = Math.hypot(x, y, z);
      return [x / l, y / l, z / l];
    });
    const edges = [];
    for (let i = 2; i < 8; i++) {
      const next = i === 7 ? 2 : i + 1;
      edges.push([i, next]); // equator
      edges.push([0, i]);    // to top
      edges.push([1, i]);    // to bottom
    }
    return { name: 'HexBipyramid', vertices: normVerts, edges };
  }

  // Model 4: Truncated Tetrahedron (Faceted Tech Prism, 12 vertices, 18 edges)
  function createTruncatedTetrahedron() {
    const a = 1.0;
    const b = 0.333;
    const rawVerts = [
      [ a,  b,  b], [ a, -b, -b], [-a,  b, -b], [-a, -b,  b],
      [ b,  a,  b], [-b,  a, -b], [ b, -a, -b], [-b, -a,  b],
      [ b,  b,  a], [-b, -b,  a], [ b, -b, -a], [-b,  b, -a]
    ];
    const normVerts = rawVerts.map(([x, y, z]) => {
      const l = Math.hypot(x, y, z);
      return [x / l, y / l, z / l];
    });
    const edges = [];
    for (let i = 0; i < normVerts.length; i++) {
      for (let j = i + 1; j < normVerts.length; j++) {
        const d = Math.hypot(
          normVerts[i][0] - normVerts[j][0],
          normVerts[i][1] - normVerts[j][1],
          normVerts[i][2] - normVerts[j][2]
        );
        if (d > 0.45 && d < 0.85) {
          edges.push([i, j]);
        }
      }
    }
    return { name: 'TruncatedTetrahedron', vertices: normVerts, edges };
  }

  // Model 5: Stellated Gem (Facet Prism)
  function createStellatedGem() {
    const verts = [
      [0, 1.25, 0],
      [0.85, 0.3, 0.5], [-0.85, 0.3, 0.5], [0, 0.3, -0.9],
      [0.7, -0.4, -0.6], [-0.7, -0.4, -0.6], [0, -0.5, 0.9],
      [0, -1.25, 0]
    ];
    const normVerts = verts.map(([x, y, z]) => {
      const l = Math.hypot(x, y, z);
      return [x / l, y / l, z / l];
    });
    const edges = [
      [0, 1], [0, 2], [0, 3],
      [1, 2], [2, 3], [3, 1],
      [1, 4], [2, 5], [3, 6],
      [4, 5], [5, 6], [6, 4],
      [7, 4], [7, 5], [7, 6]
    ];
    return { name: 'StellatedGem', vertices: normVerts, edges };
  }

  const MODELS = [
    createIcosahedron(),
    createCrystalShard(),
    createOctahedron(),
    createHexBipyramid(),
    createTruncatedTetrahedron(),
    createStellatedGem()
  ];

  /* -------------------------------------------------------------------------
   * 2. NON-COLLIDING HARMONIC POLYHEDRON CLASS
   * ------------------------------------------------------------------------- */
  class HarmonicPolyhedron {
    constructor(anchorXRatio, anchorYRatio, radius, modelIndex) {
      this.anchorXRatio = anchorXRatio;
      this.anchorYRatio = anchorYRatio;
      this.radius = radius;

      const model = MODELS[modelIndex % MODELS.length];
      this.vertices = model.vertices;
      this.edges = model.edges;

      // 3D rotation angles
      this.rotX = Math.random() * Math.PI * 2;
      this.rotY = Math.random() * Math.PI * 2;
      this.rotZ = Math.random() * Math.PI * 2;

      // Smooth slow 3D tumbling speeds
      this.speedX = (Math.random() > 0.5 ? 1 : -1) * (0.003 + Math.random() * 0.003);
      this.speedY = (Math.random() > 0.5 ? 1 : -1) * (0.003 + Math.random() * 0.003);
      this.speedZ = (Math.random() > 0.5 ? 1 : -1) * (0.002 + Math.random() * 0.0025);

      // Harmonic floating offsets (confined to dedicated anchor, never collides)
      this.phaseX = Math.random() * Math.PI * 2;
      this.phaseY = Math.random() * Math.PI * 2;
      this.freqX = 0.0007 + Math.random() * 0.0006;
      this.freqY = 0.0008 + Math.random() * 0.0006;
      this.ampX = 16 + Math.random() * 14;
      this.ampY = 14 + Math.random() * 12;

      // Subtle parallax reaction to mouse
      this.parallaxFactor = 0.02 + Math.random() * 0.02;

      this.currentX = 0;
      this.currentY = 0;
    }

    update(timestamp) {
      // 3D rotation update
      this.rotX += this.speedX;
      this.rotY += this.speedY;
      this.rotZ += this.speedZ;

      // Smooth harmonic floating motion around anchor
      const baseAnchorX = this.anchorXRatio * width;
      const baseAnchorY = this.anchorYRatio * height;

      this.currentX = baseAnchorX + Math.sin(timestamp * this.freqX + this.phaseX) * this.ampX;
      this.currentY = baseAnchorY + Math.cos(timestamp * this.freqY + this.phaseY) * this.ampY;
    }

    draw(ctx, projectedMouse) {
      let renderX = this.currentX;
      let renderY = this.currentY;

      // Gentle mouse parallax
      if (projectedMouse.active) {
        const dx = projectedMouse.x - width / 2;
        const dy = projectedMouse.y - height / 2;
        renderX += dx * this.parallaxFactor;
        renderY += dy * this.parallaxFactor;
      }

      // Precalculate 3D rotation trigonometric values
      const cosX = Math.cos(this.rotX);
      const sinX = Math.sin(this.rotX);
      const cosY = Math.cos(this.rotY);
      const sinY = Math.sin(this.rotY);
      const cosZ = Math.cos(this.rotZ);
      const sinZ = Math.sin(this.rotZ);

      // Perspective projection
      const fov = 320;
      const projected = [];

      for (let i = 0; i < this.vertices.length; i++) {
        let [x, y, z] = this.vertices[i];
        x *= this.radius;
        y *= this.radius;
        z *= this.radius;

        // Rotate X
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;

        // Rotate Y
        const x2 = x * cosY + z1 * sinY;
        const z2 = -x * sinY + z1 * cosY;

        // Rotate Z
        const x3 = x2 * cosZ - y1 * sinZ;
        const y3 = x2 * sinZ + y1 * cosZ;

        // Perspective scale
        const scale = fov / (fov + z2 + 80);
        const px = renderX + x3 * scale;
        const py = renderY + y3 * scale;

        projected.push({ x: px, y: py, z: z2, scale });
      }

      // Proximity highlight if mouse is near
      let isNear = false;
      if (projectedMouse.active) {
        const d = Math.hypot(renderX - projectedMouse.x, renderY - projectedMouse.y);
        isNear = d < this.radius * 2.2;
      }
      const baseAlpha = isNear ? 0.6 : 0.32;

      // Draw wireframe edges
      ctx.lineWidth = isNear ? 1.4 : 1.0;
      for (let i = 0; i < this.edges.length; i++) {
        const [a, b] = this.edges[i];
        const p1 = projected[a];
        const p2 = projected[b];

        // Depth cueing: front edges are crisper, back edges softer
        const avgZ = (p1.z + p2.z) / (this.radius * 2);
        const edgeAlpha = Math.max(0.1, Math.min(0.7, baseAlpha + avgZ * 0.22));

        ctx.strokeStyle = `${theme.edgeColor}${edgeAlpha})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Draw glowing vertex nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const nodeAlpha = Math.max(0.18, Math.min(0.9, 0.5 + (p.z / this.radius) * 0.3));
        const nodeRadius = Math.max(0.8, (isNear ? 2.2 : 1.7) * p.scale);

        ctx.fillStyle = `${theme.vertexColor}${nodeAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  /* -------------------------------------------------------------------------
   * 3. SUBTLE AMBIENT STARDUST PARTICLES (Sparse & Clean)
   * ------------------------------------------------------------------------- */
  class Stardust {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = (Math.random() - 0.5) * 0.25;
      this.radius = 0.8 + Math.random() * 1.2;
      this.alpha = 0.15 + Math.random() * 0.3;
      this.pulseSpeed = 0.002 + Math.random() * 0.002;
    }

    update(timestamp) {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      this.currentAlpha = this.alpha + Math.sin(timestamp * this.pulseSpeed) * 0.12;
    }

    draw(ctx) {
      ctx.fillStyle = `${theme.starColor}${Math.max(0.05, this.currentAlpha)})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* -------------------------------------------------------------------------
   * 4. ANCHOR LAYOUT & SPAWN (Dedicated Non-Overlapping Quadrants)
   * ------------------------------------------------------------------------- */
  let polyhedra = [];
  let stars = [];

  function initShapes() {
    polyhedra = [];
    stars = [];

    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    // Strategically placed anchors in hero empty negative spaces:
    // Guarantees shapes never overlap each other, title text, or the developer card
    const anchors = isMobile
      ? [
          { x: 0.10, y: 0.18, r: 48, model: 1 }, // Top left
          { x: 0.90, y: 0.22, r: 44, model: 3 }, // Top right
          { x: 0.50, y: 0.90, r: 52, model: 0 }  // Bottom center
        ]
      : isTablet
      ? [
          { x: 0.08, y: 0.22, r: 58, model: 1 }, // Far upper left
          { x: 0.12, y: 0.82, r: 66, model: 0 }, // Lower left
          { x: 0.50, y: 0.14, r: 46, model: 2 }, // Top center
          { x: 0.90, y: 0.25, r: 58, model: 3 }, // Upper right
          { x: 0.86, y: 0.84, r: 62, model: 4 }  // Lower right
        ]
      : [
          { x: 0.06, y: 0.24, r: 66, model: 1 }, // Far upper left
          { x: 0.10, y: 0.84, r: 76, model: 0 }, // Lower left
          { x: 0.46, y: 0.14, r: 48, model: 2 }, // Top center (above headline)
          { x: 0.48, y: 0.88, r: 56, model: 3 }, // Bottom center (below buttons)
          { x: 0.92, y: 0.18, r: 64, model: 4 }, // Upper right (behind card top)
          { x: 0.88, y: 0.82, r: 70, model: 5 }  // Lower right (behind card bottom)
        ];

    for (let i = 0; i < anchors.length; i++) {
      const a = anchors[i];
      polyhedra.push(new HarmonicPolyhedron(a.x, a.y, a.r, a.model));
    }

    // 18-24 delicate ambient stardust particles
    const starCount = isMobile ? 12 : 20;
    for (let i = 0; i < starCount; i++) {
      stars.push(new Stardust());
    }
  }

  /* -------------------------------------------------------------------------
   * 5. RESIZE & SECTION BOUNDS
   * ------------------------------------------------------------------------- */
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = heroSection.clientWidth;
    height = heroSection.clientHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
    initShapes();
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  }, { passive: true });

  /* -------------------------------------------------------------------------
   * 6. MOUSE & VISIBILITY LISTENERS
   * ------------------------------------------------------------------------- */
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    mouse.targetX = e.clientX - rect.left;
    mouse.targetY = e.clientY - rect.top;
    mouse.active = true;
  }, { passive: true });

  heroSection.addEventListener('mouseleave', () => {
    mouse.active = false;
  }, { passive: true });

  // Pause when scrolled out of view (using IntersectionObserver)
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isSectionVisible = entry.isIntersecting;
      if (isSectionVisible && isTabActive && !animationFrameId) {
        animationFrameId = requestAnimationFrame(animate);
      }
    });
  }, { threshold: 0.05 });
  heroObserver.observe(heroSection);

  // Pause when browser tab is inactive
  document.addEventListener('visibilitychange', () => {
    isTabActive = !document.hidden;
    if (isSectionVisible && isTabActive && !animationFrameId) {
      animationFrameId = requestAnimationFrame(animate);
    }
  });

  /* -------------------------------------------------------------------------
   * 7. SMOOTH ANIMATION LOOP
   * ------------------------------------------------------------------------- */
  function animate(timestamp) {
    if (!isSectionVisible || !isTabActive) {
      animationFrameId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // Smooth mouse position easing
    if (mouse.active) {
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;
    }

    // 1. Draw delicate ambient stardust
    for (let i = 0; i < stars.length; i++) {
      stars[i].update(timestamp);
      stars[i].draw(ctx);
    }

    // 2. Draw distinct 3D polyhedra (each in its own non-overlapping quadrant)
    for (let i = 0; i < polyhedra.length; i++) {
      polyhedra[i].update(timestamp);
      polyhedra[i].draw(ctx, mouse);
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // Initial setup & start
  resize();
  animationFrameId = requestAnimationFrame(animate);
})();
