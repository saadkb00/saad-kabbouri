
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find where the footer ends - close the footer-inner div before </footer>
idx = html.find('</footer>')
print("footer close at:", idx)
print(repr(html[idx-200:idx+30]))
