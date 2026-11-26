
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# The injected Python code to remove
# It appears as:   </section>"""\n\nprint("CapQuant HTML length:", len(cq_html))\n\n    <div
bad_before = '      </section>"""\n\nprint("CapQuant HTML length:", len(cq_html))\n\n    <div'
good_replace = '      </section>\n\n    <div'

if bad_before in html:
    html = html.replace(bad_before, good_replace)
    print("Found and fixed!")
else:
    # Try to find with slightly different whitespace
    idx = html.find('"""\n\nprint("CapQuant HTML length:"')
    if idx == -1:
        idx = html.find('"""\n\nprint(')
    print("Index of problem:", idx)
    if idx != -1:
        # Show surrounding context
        print(repr(html[idx-5:idx+100]))

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Done. HTML length:", len(html))
