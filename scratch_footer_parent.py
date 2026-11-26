
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Get the last 3000 chars before the footer to see all parent divs
footer_idx = html.find('footer class=')
snippet = html[max(0, footer_idx - 3000):footer_idx]

# Count open vs close divs to understand nesting
opens = snippet.count('<div')
closes = snippet.count('</div')
print(f"Open divs in snippet: {opens}, Close divs: {closes}")

# Show the last 400 chars right before the footer
print("\n--- Last 400 chars before footer ---")
print(html[footer_idx-400:footer_idx])
