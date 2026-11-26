
# Add floating animation to the laptop image
extra_css = """
/* ==========================================================================
   ENTITLED Hero — Laptop floating & screen glow animation
   ========================================================================== */

/* Override the base laptop-image-wrapper to add gentle float animation */
.mockup-laptop-hero .laptop-image-wrapper {
  animation: laptopFloat 5s ease-in-out infinite;
}

@keyframes laptopFloat {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}

/* On hover: pause the floating and scale up */
.mockup-laptop-hero .laptop-image-wrapper:hover {
  animation-play-state: paused;
  transform: translateY(-10px) scale(1.02) !important;
}

/* Enhance the max-width for the laptop to look bigger and more imposing */
.mockup-laptop-hero .laptop-image-wrapper img {
  max-width: 700px !important;
}
"""

with open("styles.css", "a", encoding="utf-8") as f:
    f.write(extra_css)

# Count braces
with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

open_count = css.count("{")
close_count = css.count("}")
print(f"Open: {open_count}, Close: {close_count}, Diff: {open_count - close_count}")
print("Done!")
