
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find the exact start of the injected fragment
marker_start = html.find('"""\n\nprint(')
if marker_start == -1:
    marker_start = html.find('"""\r\n\r\nprint(')
    
print("marker_start:", marker_start)

if marker_start != -1:
    # Find the end: the next '    </div>' after the print statement
    # The injected fragment ends right before '    </div>\n\n    <!-- ===='
    # The print line: print("CapQuant HTML length:", len(cq_html))
    end_of_print = html.find('\n\n    </div>', marker_start)
    print("end_of_print:", end_of_print)
    
    fragment = html[marker_start:end_of_print]
    print("Fragment to remove:", repr(fragment))
    
    # Remove just the fragment - replace with empty string
    # The section before it ends with </section>
    # So we keep everything before marker_start, skip the fragment, keep from end_of_print
    html_fixed = html[:marker_start] + html[end_of_print:]
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html_fixed)
    print("Fixed! New length:", len(html_fixed))
    
    # Verify it's gone
    if '"""\n\nprint(' not in html_fixed and 'CapQuant HTML length' not in html_fixed:
        print("VERIFIED: Python code is gone!")
    else:
        print("WARNING: Python code still present!")
else:
    print("Fragment not found, checking for CRLF...")
    idx = html.find('CapQuant HTML length')
    print("Any remaining:", idx)
