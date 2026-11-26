
with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Find section-container CSS
idx = css.find('.section-container {')
print("section-container:")
print(css[idx:idx+300])
print()

# Also check if there's padding-left on portfolio-wrapper or body
idx2 = css.find('body {')
print("body:")
print(css[idx2:idx2+200])
