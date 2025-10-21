#!/usr/bin/env python3
"""
Replace hardcoded colors with CSS variables in CSS properties
"""
import re

def replace_colors_in_css(content):
    """Replace hardcoded colors with CSS variables in CSS properties only"""
    replacements = [
        ('#9E9E9E', 'var(--border-primary)'),
        ('#fff', 'var(--bg-primary)'),
        ('#FFF', 'var(--bg-primary)'),
        ('rgb(4, 96, 169)', 'var(--bg-accent)'),
        ('#0460A9', 'var(--bg-accent-hex)'),
        ('#212121', 'var(--text-primary)'),
        ('rgb(255, 255, 255)', 'var(--text-inverse)'),
        ('#666', 'var(--text-secondary)'),
        ('#ccc', 'var(--border-secondary)'),
        ('#CBCBCB', 'var(--border-tertiary)'),
        ('#9CBFDD', 'var(--bg-light-blue)'),
        ('#388E3C', 'var(--success-green)'),
    ]

    result = content
    count = 0

    # Only replace in CSS context (look for property: value; pattern)
    # This avoids replacing in SVG fill="#xxx" attributes
    for old_color, new_var in replacements:
        # Pattern matches: property: #color; or property: rgb(...);
        # Lookahead/behind ensures we're in CSS property context
        pattern = r'(:\s*)' + re.escape(old_color) + r'(\s*[;\}])'
        result, n = re.subn(
            pattern,
            r'\1' + new_var + r'\2',
            result,
            flags=re.IGNORECASE
        )
        count += n
        if n > 0:
            print(f"  Replaced {old_color} -> {new_var}: {n} times")

    return result, count

def main():
    input_file = r'c:\Users\iceco\Projects\TopNavigationBar\Top_Navigation_Bar.js'

    print(f"Reading {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    print("\nReplacing colors in CSS properties...")
    new_content, total_count = replace_colors_in_css(content)

    print(f"\nWriting changes...")
    with open(input_file, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"\nDone! Total replacements: {total_count}")
    print(f"\nNote: SVG fill/stroke colors were NOT changed (they require different handling)")

if __name__ == '__main__':
    main()
