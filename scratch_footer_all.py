
with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Find ALL occurrences of footer-thanks-title
import re
for m in re.finditer(r'footer-thanks-title|footer-subtitle|footer-section', css):
    start = m.start()
    print(f"\n=== At {start}: {m.group()} ===")
    print(css[start:start+200])
