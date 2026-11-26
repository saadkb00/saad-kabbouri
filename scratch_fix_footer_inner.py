
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix: close the footer-inner div properly before </footer>
# Current state after our edit: footer has <div class="footer-inner"> but no </div> before </footer>
# Find </footer> and insert </div> before it

old = '      </div>\n    </footer>'
new = '      </div>\n      </div><!-- /footer-inner -->\n    </footer>'

if old in html:
    html = html.replace(old, new, 1)
    print("Fixed footer-inner close tag")
else:
    # Try to find the email-pill container close and footer close
    idx = html.find('</footer>')
    print("</footer> at:", idx)
    print(repr(html[idx-100:idx+15]))

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Done")
