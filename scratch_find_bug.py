
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

idx = html.find('CapQuant HTML length')
print('Found at index:', idx)
if idx != -1:
    ctx = html[max(0, idx-300):idx+400]
    print(repr(ctx))
