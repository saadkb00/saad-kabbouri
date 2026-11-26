/**
 * Portfolio Interactivity & Behaviors
 * Matches Figma Portfolio nodes 0:16 (UI/UX Design) and 0:848 (Graphic Design)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========================================================================
  // 1. Dual View Switcher (UI/UX DESIGN vs GRAPHIC DESIGN)
  // ========================================================================
  const uiUxView = document.getElementById('uiUxView');
  const graphicDesignView = document.getElementById('graphicDesignView');
  const portfolioWrapper = document.getElementById('portfolioWrapper');

  function switchView(viewName) {
    if (viewName === 'graphic') {
      if (uiUxView) uiUxView.classList.remove('active-view');
      if (graphicDesignView) graphicDesignView.classList.add('active-view');
      if (portfolioWrapper) portfolioWrapper.classList.add('theme-graphic');
      document.body.classList.add('theme-graphic');

      // Update all toggle buttons state
      document.querySelectorAll('.segmented-toggle').forEach(el => el.classList.add('graphic-active'));
      window.location.hash = 'graphic-design';
      showToast('Switched to Graphic Design showcase view');

      if (window.bgEngine) {
        window.bgEngine.setTheme(true);
      }
    } else {
      if (graphicDesignView) graphicDesignView.classList.remove('active-view');
      if (uiUxView) uiUxView.classList.add('active-view');
      if (portfolioWrapper) portfolioWrapper.classList.remove('theme-graphic');
      document.body.classList.remove('theme-graphic');

      // Update all toggle buttons state
      document.querySelectorAll('.segmented-toggle').forEach(el => el.classList.remove('graphic-active'));
      window.location.hash = 'uiux-design';
      showToast('Switched to UI/UX Design showcase view');

      if (window.bgEngine) {
        window.bgEngine.setTheme(false);
      }
    }
  }

  // Bind all UI/UX and Graphic Design buttons across both navigation bars
  document.querySelectorAll('.toggle-btn-ui').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('ui');
    });
  });

  document.querySelectorAll('.toggle-btn-graphic').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('graphic');
    });
  });

  // Check URL hash on initial page load & handle browser history back/forward
  function checkHash() {
    if (window.location.hash === '#graphic-design') {
      switchView('graphic');
    } else if (window.location.hash === '#uiux-design') {
      switchView('uiux');
    }
  }
  checkHash();
  window.addEventListener('hashchange', checkHash);

  // ========================================================================
  // 2. Interactive Background Engine (Canvas Particles, Mouse Glow & Ripples)
  // ========================================================================
  const canvas = document.getElementById('interactiveCanvas');
  const cursorGlow = document.getElementById('cursorGlow');

  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let isGraphic = document.body.classList.contains('theme-graphic');

    // Palettes matching the design
    const palettes = {
      dark: [
        { r: 239, g: 195, b: 17 },  // Gold
        { r: 144, g: 59, b: 255 },  // Purple
        { r: 3, g: 184, b: 204 },   // Cyan
        { r: 255, g: 255, b: 255 }  // White star
      ],
      light: [
        { r: 80, g: 140, b: 94 },   // Sage Green
        { r: 255, g: 197, b: 72 },  // Amber Gold
        { r: 207, g: 111, b: 111 }, // Coral Salmon
        { r: 50, g: 50, b: 50 }     // Charcoal
      ]
    };

    // Mouse Tracking
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 140,
      active: false
    };

    // Ripples array
    const ripples = [];

    // Resize Handler
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Particle Class
    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(randomize = false) {
        this.x = randomize ? Math.random() * width : (Math.random() > 0.5 ? 0 : width);
        this.y = randomize ? Math.random() * height : Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.baseRadius = 1.6 + Math.random() * 2.2;
        this.radius = this.baseRadius;
        this.colorIndex = Math.floor(Math.random() * 4);
        this.baseAlpha = 0.25 + Math.random() * 0.5;
        this.pulseAngle = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.03;
      }

      update() {
        // Natural organic drift
        this.x += this.vx;
        this.y += this.vy;

        // Gentle breathing pulse
        this.pulseAngle += this.pulseSpeed;
        this.alpha = this.baseAlpha + Math.sin(this.pulseAngle) * 0.15;

        // Wrap edges smoothly
        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;

        // Interactive Mouse Influence
        if (mouse.active) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 1.5;
            this.x += (dx / dist) * force;
            this.y += (dy / dist) * force;
            this.radius = this.baseRadius * 1.35;
          } else {
            this.radius += (this.baseRadius - this.radius) * 0.05;
          }
        } else {
          this.radius += (this.baseRadius - this.radius) * 0.05;
        }

        // Ripple interaction
        for (let i = 0; i < ripples.length; i++) {
          const r = ripples[i];
          const dx = this.x - r.x;
          const dy = this.y - r.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const diff = dist - r.currentRadius;

          if (Math.abs(diff) < 25 && dist > 0) {
            const force = (1 - Math.abs(diff) / 25) * r.strength * 2.5;
            this.x += (dx / dist) * force;
            this.y += (dy / dist) * force;
          }
        }
      }

      draw() {
        const palette = isGraphic ? palettes.light : palettes.dark;
        const color = palette[this.colorIndex];

        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.5, this.radius), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${Math.max(0.05, Math.min(1, this.alpha))})`;
        ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }
    }

    // Spawn 55 Particles
    const particleCount = 55;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Mouse Listeners
    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;

      if (cursorGlow) {
        cursorGlow.classList.add('active');
      }
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
      if (cursorGlow) {
        cursorGlow.classList.remove('active');
      }
    });

    // Touch Support for mobile
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
        if (cursorGlow) cursorGlow.classList.add('active');
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      mouse.active = false;
      if (cursorGlow) cursorGlow.classList.remove('active');
    });

    // Interactive Click / Tap Ripple
    window.addEventListener('click', (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        currentRadius: 0,
        maxRadius: Math.max(width, height) * 0.45,
        speed: 10,
        alpha: 0.6,
        strength: 2.2
      });
    }, { passive: true });

    // Main Animation Loop
    let animationFrameId;
    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor glow spotlight spring interpolation
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;

        if (cursorGlow) {
          cursorGlow.style.left = `${mouse.x}px`;
          cursorGlow.style.top = `${mouse.y}px`;
        }
      }

      // Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles within proximity
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 105) {
            const lineAlpha = (1 - dist / 105) * (isGraphic ? 0.08 : 0.09);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isGraphic
              ? `rgba(0, 0, 0, ${lineAlpha})`
              : `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw delicate line to mouse cursor if near
        if (mouse.active) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = isGraphic
              ? `rgba(80, 140, 94, ${lineAlpha})`
              : `rgba(239, 195, 17, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Update & Draw Expanding Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.currentRadius += r.speed;
        r.alpha -= 0.012;
        r.strength *= 0.94;

        if (r.alpha > 0) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.currentRadius, 0, Math.PI * 2);
          ctx.strokeStyle = isGraphic
            ? `rgba(80, 140, 94, ${r.alpha * 0.3})`
            : `rgba(239, 195, 17, ${r.alpha * 0.3})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else {
          ripples.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    // Theme Switch Bridge
    window.bgEngine = {
      setTheme: (graphic) => {
        isGraphic = graphic;
      }
    };

    // Pause when tab is hidden to save energy
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animate();
      }
    });
  }

  // ========================================================================
  // 3. Expandable Website Cards
  // ========================================================================
  const websiteCards = document.querySelectorAll('.website-card');
  websiteCards.forEach(card => {
    const trigger = card.querySelector('.card-footer-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        card.classList.toggle('expanded');
      });
    }

    const scrollBtn = card.querySelector('.scroll-pill-btn');
    const previewWindow = card.querySelector('.preview-window');
    const scrollImg = card.querySelector('.preview-scroll-img');

    if (scrollBtn && scrollImg && previewWindow) {
      scrollBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const maxScroll = scrollImg.offsetHeight - previewWindow.offsetHeight;
        
        if (card.dataset.scrolled === 'true') {
          scrollImg.style.transform = 'translateY(0)';
          card.dataset.scrolled = 'false';
          scrollBtn.innerHTML = 'Scroll down <img src="assets/imgArrow2.svg" alt="" style="width:10px;height:10px;">';
        } else {
          scrollImg.style.transform = `translateY(-${Math.max(0, maxScroll)}px)`;
          card.dataset.scrolled = 'true';
          scrollBtn.innerHTML = 'Back to top ↑';
        }
      });
    }
  });

  // ========================================================================
  // 4. Expandable Application Cards & Interactive Screen Carousel
  // ========================================================================
  const appCards = document.querySelectorAll('.app-card');
  appCards.forEach(card => {
    const toggleBtn = card.querySelector('.app-details-toggle-btn');
    const actionCircle = card.querySelector('.app-action-circle-btn');
    const stage = card.querySelector('.app-screens-stage');

    const handleToggle = () => {
      card.classList.toggle('expanded');
      const isExpanded = card.classList.contains('expanded');
      if (toggleBtn) {
        const textSpan = toggleBtn.querySelector('.toggle-label');
        if (textSpan) {
          textSpan.textContent = isExpanded ? 'Hide Specs' : 'View Specs';
        }
      }
    };

    if (toggleBtn) toggleBtn.addEventListener('click', handleToggle);

    // Circular arrow button smoothly scrolls carousel to next screen
    if (actionCircle && stage) {
      actionCircle.addEventListener('click', (e) => {
        e.stopPropagation();
        const maxScroll = stage.scrollWidth - stage.clientWidth;
        if (stage.scrollLeft >= maxScroll - 15) {
          stage.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          stage.scrollBy({ left: 220, behavior: 'smooth' });
        }
      });
    }

    // Mouse drag-to-scroll interaction for mobile screens
    if (stage) {
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;

      stage.addEventListener('mousedown', (e) => {
        isDown = true;
        stage.classList.add('active-drag');
        startX = e.pageX - stage.offsetLeft;
        scrollLeft = stage.scrollLeft;
      });

      stage.addEventListener('mouseleave', () => {
        isDown = false;
        stage.classList.remove('active-drag');
      });

      stage.addEventListener('mouseup', () => {
        isDown = false;
        stage.classList.remove('active-drag');
      });

      stage.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - stage.offsetLeft;
        const walk = (x - startX) * 1.5;
        stage.scrollLeft = scrollLeft - walk;
      });
    }
  });

  // ========================================================================
  // 5. CapQuant Trading Screens Carousel
  // ========================================================================
  const carouselTabs = document.querySelectorAll('.carousel-tab-btn');
  const carouselSlides = document.querySelectorAll('.carousel-slide-item');

  carouselTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetIndex = tab.dataset.slide;
      
      carouselTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      carouselSlides.forEach(slide => {
        if (slide.dataset.slide === targetIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    });
  });

  // ========================================================================
  // 6. Copy Email to Clipboard across all email buttons
  // ========================================================================
  document.querySelectorAll('.email-pill-container').forEach(pill => {
    pill.addEventListener('click', () => {
      const email = 'kabbourisaad2@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Copied kabbourisaad2@gmail.com to clipboard!');
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  });

  // ========================================================================
  // 7. Color Swatch Copy Hex
  // ========================================================================
  const swatchItems = document.querySelectorAll('.swatch-item');
  swatchItems.forEach(item => {
    item.addEventListener('click', () => {
      const hex = item.dataset.hex;
      if (hex) {
        navigator.clipboard.writeText(hex).then(() => {
          showToast(`Copied ${hex} to clipboard!`);
        });
      }
    });
  });

  // ========================================================================
  // 8. Entitled Landing Page Auto-Scroll Controller
  // ========================================================================
  const entitledAutoscrollBtn = document.getElementById('entitledAutoscrollBtn');
  const entitledLandingContainer = document.getElementById('entitledLandingContainer');
  let entitledScrollTimer = null;
  let isEntitledScrolling = false;

  if (entitledAutoscrollBtn && entitledLandingContainer) {
    entitledAutoscrollBtn.addEventListener('click', () => {
      if (isEntitledScrolling) {
        clearInterval(entitledScrollTimer);
        isEntitledScrolling = false;
        entitledAutoscrollBtn.innerHTML = '<span class="play-icon">▶</span><span class="autoscroll-label">Auto-Scroll</span>';
        entitledAutoscrollBtn.classList.remove('active');
        showToast('Auto-scroll paused');
      } else {
        isEntitledScrolling = true;
        entitledAutoscrollBtn.innerHTML = '<span class="play-icon">⏸</span><span class="autoscroll-label">Pause</span>';
        entitledAutoscrollBtn.classList.add('active');
        showToast('Auto-scrolling Entitled Landing Page');

        entitledScrollTimer = setInterval(() => {
          const maxScroll = entitledLandingContainer.scrollHeight - entitledLandingContainer.clientHeight;
          if (entitledLandingContainer.scrollTop >= maxScroll - 4) {
            clearInterval(entitledScrollTimer);
            isEntitledScrolling = false;
            entitledAutoscrollBtn.innerHTML = '<span class="play-icon">▶</span><span class="autoscroll-label">Auto-Scroll</span>';
            entitledAutoscrollBtn.classList.remove('active');
            showToast('Reached end of page');
          } else {
            entitledLandingContainer.scrollTop += 2;
          }
        }, 22);
      }
    });

    // Pause on user manual mouse wheel or drag
    entitledLandingContainer.addEventListener('wheel', () => {
      if (isEntitledScrolling) {
        clearInterval(entitledScrollTimer);
        isEntitledScrolling = false;
        entitledAutoscrollBtn.innerHTML = '<span class="play-icon">▶</span><span class="autoscroll-label">Auto-Scroll</span>';
        entitledAutoscrollBtn.classList.remove('active');
      }
    }, { passive: true });
  }

  // ========================================================================
  // 9. Toast Notification Handler
  // ========================================================================
  function showToast(message) {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // ========================================================================
  // 9. Back to Top Button
  // ========================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
