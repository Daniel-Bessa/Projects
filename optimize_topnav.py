import re

# Read the file
with open(r'C:\Users\iceco\Projects\TopNavigationBar\Top_Navigation_Bar.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract SVG icons and their links from the nineDotMenu section
# Pattern to find each menu item with its link and SVG
pattern = r'<span class="dotNav-(\w+)">\s*<a href="([^"]+)"[^>]*>\s*(<svg[^>]*>.*?</svg>)\s*</a>\s*</span>'

matches = re.findall(pattern, content, re.DOTALL)

print(f"Found {len(matches)} menu items with SVGs and links:")
for match in matches:
    menu_name = match[0]
    link = match[1]
    svg_preview = match[2][:100] + '...' if len(match[2]) > 100 else match[2]
    print(f"\n{menu_name}:")
    print(f"  Link: {link}")
    print(f"  SVG length: {len(match[2])} characters")
