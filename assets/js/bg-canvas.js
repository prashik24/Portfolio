/**
 * =========================================================================
 * INTERACTIVE 3D WIREFRAME POLYHEDRA & CONSTELLATION BACKGROUND
 * High-performance, zero-dependency HTML5 Canvas visualization.
 * =========================================================================
 */

(function () {
  'use strict';

  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Configuration
  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrameId = null;
  let isTabActive = true;

  // Mouse interaction state
  const mouse = {
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    radius: 140,
    active: false
  };

  // Color theme definitions
  function getThemeColors() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      return {
        polyEdge: 'rgba(37, 99, 235, ',      // Indigo/Blue
        polyVertex: 'rgba(30, 64, 175, ',    // Deep Blue
        particle: 'rgba(59, 130, 246, ',     // Soft Blue
        connection: 'rgba(99, 102, 241, ',   // Slate-Indigo
        glowColor: 'rgba(37, 99, 235, 0.3)'
      };
    } else {
      return {
        polyEdge: 'rgba(56, 189, 248, ',     // Vibrant Cyan/Sky
        polyVertex: 'rgba(224, 242, 254, ',  // Luminous Ice White
        particle: 'rgba(96, 165, 250, ',     // Tech Blue
        connection: 'rgba(56, 189, 248, ',   // Ethereal Cyan
        glowColor: 'rgba(56, 189, 248, 0.45)'
      };
    }
  }

  let themeColors = getThemeColors();

  // Listen to theme changes
  const themeObserver = new MutationObserver(() => {
    themeColors = getThemeColors();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  /* -------------------------------------------------------------------------
   * 1. 3D GEOMETRY MODELS (Polyhedra & Crystals)
   * ------------------------------------------------------------------------- */
  
  // Model A: Icosahedron (20 triangular faces, 12 vertices, 30 edges)
  function createIcosahedron() {
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVerts = [
      [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
      [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
      [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
    ];
    const len = Math.hypot(1, phi);
    const verts = rawVerts.map(([x, y, z]) => [x / len, y / len, z / len]);
    
    // Connect vertices within icosahedron edge distance
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
    return { vertices: verts, edges };
  }

  // Model B: Octahedron (8 faces, 6 vertices, 12 edges)
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
    return { vertices: verts, edges };
  }

  // Model C: Hexagonal Crystal Bipyramid (8 vertices, 18 edges)
  function createCrystalBipyramid() {
    const verts = [
      [0,  1.35, 0], // Top apex
      [0, -1.35, 0]  // Bottom apex
    ];
    // 6 equatorial vertices
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      verts.push([Math.cos(angle) * 0.9, 0, Math.sin(angle) * 0.9]);
    }
    const edges = [];
    // Equatorial ring
    for (let i = 2; i < 8; i++) {
      const next = i === 7 ? 2 : i + 1;
      edges.push([i, next]);
      edges.push([0, i]); // to top apex
      edges.push([1, i]); // to bottom apex
    }
    return { vertices: verts, edges };
  }

  // Model D: Faceted Gem Cluster (Irregular Triangulated Mesh)
  function createFacetedGem() {
    const verts = [
      [0, 1.2, 0],
      [-0.9, 0.4, -0.6], [0.9, 0.4, -0.6], [0, 0.5, 1.0],
      [-1.0, -0.5, 0.5], [1.0, -0.5, 0.5], [0, -0.6, -1.0],
      [0, -1.3, 0]
    ];
    const edges = [
      [0, 1], [0, 2], [0, 3],
      [1, 2], [2, 3], [3, 1],
      [1, 4], [2, 5], [3, 4], [3, 5],
      [1, 6], [2, 6], [4, 6], [5, 6],
      [4, 5],
      [7, 4], [7, 5], [7, 6]
    ];
    return { vertices: verts, edges };
  }

  const GEOMETRY_TEMPLATES = [
    createIcosahedron(),
    createOctahedron(),
    createCrystalBipyramid(),
    createFacetedGem()
  ];

  /* -------------------------------------------------------------------------
   * 2. POLYHEDRON INSTANCE CLASS
   * ------------------------------------------------------------------------- */
  class Polyhedron {
    constructor(x, y, radius, modelIndex) {
      this.x = x;
      this.y = y;
      this.baseX = x;
      this.baseY = y;
      this.radius = radius;
      
      const template = GEOMETRY_TEMPLATES[modelIndex % GEOMETRY_TEMPLATES.length];
      this.vertices = template.vertices;
      this.edges = template.edges;

      // Rotation angles and velocity
      this.rotX = Math.random() * Math.PI * 2;
      this.rotY = Math.random() * Math.PI * 2;
      this.rotZ = Math.random() * Math.PI * 2;

      this.speedX = (Math.random() - 0.5) * 0.007;
      this.speedY = (Math.random() - 0.5) * 0.007;
      this.speedZ = (Math.random() - 0.5) * 0.005;

      // Drift velocity across screen
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;

      // Mouse parallax response factor
      this.parallaxFactor = 0.02 + Math.random() * 0.025;
    }

    update() {
      // Rotate in 3D
      this.rotX += this.speedX;
      this.rotY += this.speedY;
      this.rotZ += this.speedZ;

      // Gentle drift
      this.x += this.vx;
      this.y += this.vy;

      // Screen boundary wrapping with padding
      const pad = this.radius * 1.5;
      if (this.x < -pad) this.x = width + pad;
      if (this.x > width + pad) this.x = -pad;
      if (this.y < -pad) this.y = height + pad;
      if (this.y > height + pad) this.y = -pad;
    }

    draw(ctx, projectedMouse) {
      // Calculate mouse offset for smooth parallax
      let renderX = this.x;
      let renderY = this.y;

      if (projectedMouse.active) {
        const dx = projectedMouse.x - width / 2;
        const dy = projectedMouse.y - height / 2;
        renderX += dx * this.parallaxFactor;
        renderY += dy * this.parallaxFactor;
      }

      // Precalculate trigonometric values for 3D rotation
      const cosX = Math.cos(this.rotX);
      const sinX = Math.sin(this.rotX);
      const cosY = Math.cos(this.rotY);
      const sinY = Math.sin(this.rotY);
      const cosZ = Math.cos(this.rotZ);
      const sinZ = Math.sin(this.rotZ);

      // Project 3D vertices to 2D screen coordinates with perspective
      const fov = 340;
      const projected = [];

      for (let i = 0; i < this.vertices.length; i++) {
        let [x, y, z] = this.vertices[i];
        x *= this.radius;
        y *= this.radius;
        z *= this.radius;

        // Rotation around X axis
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;

        // Rotation around Y axis
        const x2 = x * cosY + z1 * sinY;
        const z2 = -x * sinY + z1 * cosY;

        // Rotation around Z axis
        const x3 = x2 * cosZ - y1 * sinZ;
        const y3 = x2 * sinZ + y1 * cosZ;

        // Perspective projection
        const scale = fov / (fov + z2 + 80);
        const px = renderX + x3 * scale;
        const py = renderY + y3 * scale;

        projected.push({ x: px, y: py, z: z2, scale });
      }

      // Check proximity to mouse for reactive highlight
      let mouseDist = 9999;
      if (projectedMouse.active) {
        mouseDist = Math.hypot(renderX - projectedMouse.x, renderY - projectedMouse.y);
      }
      const isHovered = mouseDist < this.radius * 2.2;
      const baseAlpha = isHovered ? 0.55 : 0.28;

      // Draw wireframe edges
      ctx.lineWidth = isHovered ? 1.4 : 1.0;
      ctx.beginPath();
      for (let i = 0; i < this.edges.length; i++) {
        const [a, b] = this.edges[i];
        const p1 = projected[a];
        const p2 = projected[b];

        // Depth cueing: edge opacity based on average z
        const avgZ = (p1.z + p2.z) / (this.radius * 2);
        const edgeAlpha = Math.max(0.08, Math.min(0.65, baseAlpha + avgZ * 0.18));

        ctx.strokeStyle = `${themeColors.polyEdge}${edgeAlpha})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Draw vertices with subtle luminous node glow
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const pointAlpha = Math.max(0.15, Math.min(0.85, 0.45 + (p.z / this.radius) * 0.25));
        const pointRadius = isHovered ? 2.4 * p.scale : 1.8 * p.scale;

        ctx.fillStyle = `${themeColors.polyVertex}${pointAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.8, pointRadius), 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  /* -------------------------------------------------------------------------
   * 3. CONSTELLATION NODE (Floating Particle Network)
   * ------------------------------------------------------------------------- */
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = 1.2 + Math.random() * 1.4;
      this.baseAlpha = 0.25 + Math.random() * 0.35;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wrap around edges
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw(ctx) {
      ctx.fillStyle = `${themeColors.particle}${this.baseAlpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* -------------------------------------------------------------------------
   * 4. WORLD STATE & INITIALIZATION
   * ------------------------------------------------------------------------- */
  let polyhedra = [];
  let particles = [];

  function initWorld() {
    polyhedra = [];
    particles = [];

    // Scale counts according to display size
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1100;

    const polyCount = isMobile ? 3 : isTablet ? 5 : 7;
    const particleCount = isMobile ? 24 : isTablet ? 38 : 52;

    // Distinct starting distribution quadrants for polyhedra
    const positions = [
      { x: width * 0.12, y: height * 0.22, r: 62 }, // Upper left
      { x: width * 0.88, y: height * 0.18, r: 54 }, // Upper right
      { x: width * 0.08, y: height * 0.75, r: 72 }, // Lower left
      { x: width * 0.92, y: height * 0.82, r: 60 }, // Lower right
      { x: width * 0.50, y: height * 0.12, r: 48 }, // Top center
      { x: width * 0.48, y: height * 0.88, r: 66 }, // Bottom center
      { x: width * 0.82, y: height * 0.52, r: 56 }  // Right middle
    ];

    for (let i = 0; i < polyCount; i++) {
      const pos = positions[i % positions.length];
      const offsetX = (Math.random() - 0.5) * 80;
      const offsetY = (Math.random() - 0.5) * 80;
      const radius = pos.r * (0.85 + Math.random() * 0.3);
      polyhedra.push(new Polyhedron(pos.x + offsetX, pos.y + offsetY, radius, i));
    }

    // Initialize floating ambient particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  /* -------------------------------------------------------------------------
   * 5. RESIZE & HIGH-DPI CANVAS MANAGEMENT
   * ------------------------------------------------------------------------- */
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for optimal battery/FPS
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
    initWorld();
  }

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 180);
  }, { passive: true });

  /* -------------------------------------------------------------------------
   * 6. MOUSE & TOUCH LISTENERS
   * ------------------------------------------------------------------------- */
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.active = true;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.targetX = e.touches[0].clientX;
      mouse.targetY = e.touches[0].clientY;
      mouse.active = true;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.active = false;
  }, { passive: true });

  // Tab visibility management to save CPU
  document.addEventListener('visibilitychange', () => {
    isTabActive = !document.hidden;
    if (isTabActive && !animationFrameId) {
      animationFrameId = requestAnimationFrame(animate);
    }
  });

  /* -------------------------------------------------------------------------
   * 7. ANIMATION RENDER LOOP
   * ------------------------------------------------------------------------- */
  const CONNECTION_DIST = 115;
  const MOUSE_CONNECTION_DIST = 150;

  function animate() {
    if (!isTabActive) {
      animationFrameId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // Smooth mouse interpolation
    if (mouse.active) {
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;
    }

    // 1. Update and draw polyhedra
    for (let i = 0; i < polyhedra.length; i++) {
      polyhedra[i].update();
      polyhedra[i].draw(ctx, mouse);
    }

    // 2. Update particles & draw constellation lines
    const pLen = particles.length;
    for (let i = 0; i < pLen; i++) {
      particles[i].update();
      particles[i].draw(ctx);

      // Particle-to-particle constellation lines
      for (let j = i + 1; j < pLen; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.18;
          ctx.strokeStyle = `${themeColors.connection}${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      // Particle-to-mouse interactive connection
      if (mouse.active) {
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mdist = Math.hypot(mdx, mdy);

        if (mdist < MOUSE_CONNECTION_DIST) {
          const malpha = (1 - mdist / MOUSE_CONNECTION_DIST) * 0.32;
          ctx.strokeStyle = `${themeColors.connection}${malpha})`;
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // Initial trigger
  resize();
  animationFrameId = requestAnimationFrame(animate);
})();
