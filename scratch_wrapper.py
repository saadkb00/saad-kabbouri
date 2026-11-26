
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find main wrapper class around portfolio
idx = content.find('portfolio-wrapper')
if idx == -1:
    idx = content.find('id="app"')
if idx == -1:
    idx = content.find('class="app"')
print("Main wrapper idx:", idx)
print(content[max(0,idx-50):idx+200])

# Also check CSS for main layout
with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Find if there's a flex container around the footer
for cls in ['portfolio-root', 'portfolio-wrapper', 'app-root', 'page-wrapper', 'main-container']:
    if cls in css:
        i = css.find(cls)
        print(f"\nFound .{cls}:")
        print(css[i:i+200])
