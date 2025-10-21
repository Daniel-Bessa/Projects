#!/usr/bin/env python3
"""
Fix remaining hardcoded colors
"""
import re

def main():
    input_file = r'c:\Users\iceco\Projects\TopNavigationBar\Top_Navigation_Bar.js'

    print(f"Reading {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Simple direct replacements for remaining instances in CSS
    replacements = [
        ('solid #9E9E9E;', 'solid var(--border-primary);'),
        ('solid #9E9E9E }', 'solid var(--border-primary) }'),
        (' #9E9E9E;', ' var(--border-primary);'),
        (' #9E9E9E }', ' var(--border-primary) }'),
        ('#FFF;', 'var(--bg-primary);'),  # Uppercase version
        ('#000;', 'var(--text-black);'),
    ]

    count = 0
    for old, new in replacements:
        before = content
        content = content.replace(old, new)
        n = content.count(new) - before.count(new)
        if n > 0:
            print(f"  Replaced '{old}' -> '{new}': added {n} instances")
            count += n

    print(f"\nWriting changes...")
    with open(input_file, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Done! Additional replacements: {count}")

if __name__ == '__main__':
    main()
