
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find the footer and show 1500 chars before it
footer_idx = html.find('<footer class=')
snippet = html[footer_idx - 1500: footer_idx + 50]
print(snippet)
