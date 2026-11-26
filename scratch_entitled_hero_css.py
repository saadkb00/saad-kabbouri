
# Script to append the ENTITLED hero CSS to styles.css
new_css = """
/* ==========================================================================
   ENTITLED Hero — Floating Telemetry Badges (Azure palette override)
   ========================================================================== */

/* Position classes for ENTITLED hero badges (override CQ purple to azure) */
.entitled-badge-tr {
  top: 12%;
  right: -10px;
  border-color: rgba(13, 136, 211, 0.4) !important;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.6), 0 0 18px rgba(13, 136, 211, 0.3) !important;
  animation: floatBadge1 4s ease-in-out infinite alternate;
}

.entitled-badge-bl {
  bottom: 20%;
  left: -10px;
  border-color: rgba(229, 202, 146, 0.35) !important;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.6), 0 0 16px rgba(229, 202, 146, 0.2) !important;
  animation: floatBadge2 4.5s ease-in-out infinite alternate;
}

/* Azure-colored live dot for ENTITLED */
.entitled-badge-tr .telemetry-live-dot {
  background: #27c93f;
  box-shadow: 0 0 8px #27c93f;
  animation: entitledLivePulse 1.6s ease-in-out infinite;
}

@keyframes entitledLivePulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.6; }
}

.entitled-badge-bl .telemetry-bolt-icon {
  color: #e5ca92;
  font-size: 13px;
}

/* ==========================================================================
   ENTITLED Hero — Pedestal Stage (sleek obsidian glass surface)
   ========================================================================== */

.entitled-stand-pedestal-stage {
  position: relative;
  width: 68%;
  height: 14px;
  margin-top: -18px;
  z-index: 1;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}

/* Contact shadows under each leg */
.pedestal-contact-shadow {
  width: 60px;
  height: 10px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.75) 0%, rgba(13, 136, 211, 0.1) 50%, transparent 80%);
  filter: blur(5px);
  animation: shadowBreathe 3s ease-in-out infinite alternate;
}

@keyframes shadowBreathe {
  0% { opacity: 0.65; transform: scaleX(1); }
  100% { opacity: 0.95; transform: scaleX(1.15); }
}

/* Ambient glow strip beneath the whole stand */
.pedestal-surface-glow {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  height: 18px;
  background: radial-gradient(ellipse at center, rgba(13, 136, 211, 0.22) 0%, transparent 70%);
  filter: blur(10px);
  pointer-events: none;
}

/* ==========================================================================
   ENTITLED Hero — Enhanced laptop image wrapper with 3D perspective
   ========================================================================== */

/* Richer ambient glow around the laptop */
.mockup-laptop-hero .laptop-stage-glow {
  background: radial-gradient(ellipse,
    rgba(13, 136, 211, 0.32) 0%,
    rgba(3, 51, 92, 0.2) 35%,
    rgba(229, 202, 146, 0.08) 60%,
    transparent 75%
  );
  width: 560px;
  height: 300px;
  top: 25%;
  filter: blur(55px);
}

/* 3D perspective tilt on the laptop image */
.mockup-laptop-hero .laptop-image-wrapper {
  perspective: 1200px;
  transform-style: preserve-3d;
}

.mockup-laptop-hero .laptop-image-wrapper img {
  transform: rotateX(2deg) rotateY(-3deg);
  filter:
    drop-shadow(0 30px 55px rgba(0, 0, 0, 0.9))
    drop-shadow(0 0 40px rgba(13, 136, 211, 0.18));
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.6s ease;
}

.mockup-laptop-hero .laptop-image-wrapper:hover img {
  transform: rotateX(0deg) rotateY(0deg) translateY(-6px) scale(1.015);
  filter:
    drop-shadow(0 40px 70px rgba(0, 0, 0, 0.85))
    drop-shadow(0 0 50px rgba(13, 136, 211, 0.3));
}

/* Scanline shimmer effect over the laptop screen area */
.laptop-image-wrapper::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(13, 136, 211, 0.03) 50%,
    transparent 100%
  );
  background-size: 100% 4px;
  pointer-events: none;
  opacity: 0.6;
  z-index: 3;
  border-radius: 8px;
}

/* ==========================================================================
   ENTITLED Hero — Section background aurora
   ========================================================================== */

/* Add an extra layered aurora in the background of the hero wrapper */
.mockup-laptop-hero::before {
  content: '';
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 120%;
  height: 120%;
  background:
    radial-gradient(ellipse 60% 40% at 30% 50%, rgba(13, 136, 211, 0.1) 0%, transparent 60%),
    radial-gradient(ellipse 40% 30% at 70% 60%, rgba(229, 202, 146, 0.07) 0%, transparent 60%);
  filter: blur(30px);
  pointer-events: none;
  z-index: 0;
}
"""

with open("styles.css", "a", encoding="utf-8") as f:
    f.write(new_css)

print("CSS appended successfully!")

# Count braces
with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

open_count = css.count("{")
close_count = css.count("}")
print(f"Open braces: {open_count}, Close braces: {close_count}, Diff: {open_count - close_count}")
