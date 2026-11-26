
with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

idx = css.find('.portfolio-wrapper')
print(css[idx:idx+500])
