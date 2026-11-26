
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx = html.find('footer class=')
ctx = html[max(0,idx-800):idx+100]
print(ctx)
