
extra = """
/* ==========================================================================
   ENTITLED Hero — Perspective grid floor (3D workstation stage)
   ========================================================================== */

.entitled-perspective-floor {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%) perspective(600px) rotateX(70deg);
  width: 500px;
  height: 160px;
  background-image:
    linear-gradient(rgba(13, 136, 211, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(13, 136, 211, 0.15) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,0,0,0.9) 0%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,0,0,0.9) 0%, transparent 100%);
  pointer-events: none;
  z-index: 0;
  opacity: 0.65;
}
"""

with open("styles.css", "a", encoding="utf-8") as f:
    f.write(extra)

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()
print(f"Open: {css.count('{')}, Close: {css.count('}')}, Diff: {css.count('{') - css.count('}')}")
