#!/usr/bin/env python3
"""
Refactor script to add configuration section to Top_Navigation_Bar.js
"""
import re

# Color mapping - extracted from the file
COLORS_MAP = {
    '#9E9E9E': 'BORDER_PRIMARY',
    '#fff': 'BG_PRIMARY',
    '#FFF': 'BG_PRIMARY',  # Same as #fff
    'rgb(4, 96, 169)': 'BG_ACCENT',
    '#0460A9': 'BG_ACCENT_HEX',  # Same as rgb(4, 96, 169)
    '#212121': 'TEXT_PRIMARY',
    'rgb(255, 255, 255)': 'TEXT_INVERSE',
    '#000': 'TEXT_BLACK',
    '#666': 'TEXT_SECONDARY',
    '#ccc': 'BORDER_SECONDARY',
    '#CBCBCB': 'BORDER_TERTIARY',
    '#9CBFDD': 'BG_LIGHT_BLUE',
    '#388E3C': 'SUCCESS_GREEN',
    '#E74A21': 'ACCENT_ORANGE',
    '#EC9A1E': 'ACCENT_YELLOW',
    '#FF585D': 'ACCENT_RED',
    '#FFC100': 'ACCENT_GOLD',
    '#002068': 'ACCENT_DARK_BLUE',
}

# Icon identifiers found
ICONS = {
    'ADMIN': 'admin_panel_settings',  # Based on variable toggleConfigIcon context
    'CONFIG': 'settings',
    'CLIPBOARD': 'share',
    'DOWNLOAD': 'download',
    'INFO': 'info',
    'USER': 'person',
    'MENU': 'menu',
}

# Configuration template
CONFIG_TEMPLATE = '''// ===================================================================
// CONFIGURATION SECTION - Customize icons and colors here
// ===================================================================

const CONFIG = {
  // Icon Configuration
  // Note: This file uses inline SVG icons in the HTML template
  // These values can be used if converting to Material Symbols
  ICONS: {
    ADMIN: 'admin_panel_settings',
    CONFIG: 'settings',
    CLIPBOARD: 'share',
    DOWNLOAD: 'download',
    INFO: 'info',
    USER: 'person',
    MENU: 'menu',
  },

  // Color Configuration (CSS Custom Properties will be created from these)
  COLORS: {
    // Border Colors
    BORDER_PRIMARY: '#9E9E9E',
    BORDER_SECONDARY: '#ccc',
    BORDER_TERTIARY: '#CBCBCB',

    // Background Colors
    BG_PRIMARY: '#fff',
    BG_ACCENT: 'rgb(4, 96, 169)',
    BG_ACCENT_HEX: '#0460A9',
    BG_LIGHT_BLUE: '#9CBFDD',

    // Text/Font Colors
    TEXT_PRIMARY: '#212121',
    TEXT_SECONDARY: '#666',
    TEXT_BLACK: '#000',
    TEXT_INVERSE: 'rgb(255, 255, 255)',

    // Accent Colors
    SUCCESS_GREEN: '#388E3C',
    ACCENT_ORANGE: '#E74A21',
    ACCENT_YELLOW: '#EC9A1E',
    ACCENT_RED: '#FF585D',
    ACCENT_GOLD: '#FFC100',
    ACCENT_DARK_BLUE: '#002068',
  }
};

'''

# CSS variables template to inject into :host or style section
CSS_VARS_TEMPLATE = '''
          /* CSS Custom Properties - Generated from CONFIG.COLORS */
          :host {
            --border-primary: #9E9E9E;
            --border-secondary: #ccc;
            --border-tertiary: #CBCBCB;
            --bg-primary: #fff;
            --bg-accent: rgb(4, 96, 169);
            --bg-accent-hex: #0460A9;
            --bg-light-blue: #9CBFDD;
            --text-primary: #212121;
            --text-secondary: #666;
            --text-black: #000;
            --text-inverse: rgb(255, 255, 255);
            --success-green: #388E3C;
            --accent-orange: #E74A21;
            --accent-yellow: #EC9A1E;
            --accent-red: #FF585D;
            --accent-gold: #FFC100;
            --accent-dark-blue: #002068;
          }
'''

def replace_colors_with_vars(css_content):
    """Replace hardcoded colors with CSS variables"""
    replacements = {
        '#9E9E9E': 'var(--border-primary)',
        '#fff': 'var(--bg-primary)',
        '#FFF': 'var(--bg-primary)',
        'rgb(4, 96, 169)': 'var(--bg-accent)',
        '#0460A9': 'var(--bg-accent-hex)',
        '#212121': 'var(--text-primary)',
        'rgb(255, 255, 255)': 'var(--text-inverse)',
        '#000': 'var(--text-black)',
        '#666': 'var(--text-secondary)',
        '#ccc': 'var(--border-secondary)',
        '#CBCBCB': 'var(--border-tertiary)',
        '#9CBFDD': 'var(--bg-light-blue)',
        '#388E3C': 'var(--success-green)',
        '#E74A21': 'var(--accent-orange)',
        '#EC9A1E': 'var(--accent-yellow)',
        '#FF585D': 'var(--accent-red)',
        '#FFC100': 'var(--accent-gold)',
        '#002068': 'var(--accent-dark-blue)',
    }

    result = css_content
    for old_color, new_var in replacements.items():
        # Replace in various CSS contexts
        result = re.sub(
            r'\b' + re.escape(old_color) + r'\b',
            new_var,
            result,
            flags=re.IGNORECASE
        )

    return result

def refactor_file(input_path, output_path):
    """Main refactoring function"""
    print(f"Reading {input_path}...")

    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Step 1: Add CONFIG section after the initial variable declarations
    # Find the line after "let adminHeight = true;"
    config_insert_pattern = r'(let adminHeight = true;)'
    config_replacement = r'\1\n\n' + CONFIG_TEMPLATE
    content = re.sub(config_insert_pattern, config_replacement, content, count=1)

    # Step 2: Add CSS variables after the <style> tag
    style_insert_pattern = r'(<style>)'
    style_replacement = r'\1' + CSS_VARS_TEMPLATE
    content = re.sub(style_insert_pattern, style_replacement, content, count=1)

    # Step 3: Replace colors in CSS with variables
    # Extract the style section
    style_pattern = r'(<style>)(.*?)(</style>)'
    def replace_style_section(match):
        open_tag = match.group(1)
        style_content = match.group(2)
        close_tag = match.group(3)

        # Replace colors
        new_style_content = replace_colors_with_vars(style_content)

        return open_tag + new_style_content + close_tag

    content = re.sub(style_pattern, replace_style_section, content, flags=re.DOTALL, count=1)

    print(f"Writing to {output_path}...")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("Refactoring complete!")
    print(f"\nSummary:")
    print(f"  - Icons configured: {len(ICONS)}")
    print(f"  - Colors configured: {len(set(COLORS_MAP.values()))}")
    print(f"  - CONFIG object added with ICONS and COLORS")
    print(f"  - CSS variables added to :host")
    print(f"  - All hardcoded colors replaced with var(--color-name)")

if __name__ == '__main__':
    input_file = r'c:\Users\iceco\Projects\TopNavigationBar\Top_Navigation_Bar.js'
    output_file = r'c:\Users\iceco\Projects\TopNavigationBar\Top_Navigation_Bar.js'

    refactor_file(input_file, output_file)

    # Print icon names found
    print(f"\nIcon names configured:")
    for key, value in ICONS.items():
        print(f"  - {key}: '{value}'")

    # Print unique colors found
    print(f"\nUnique colors found and configured:")
    unique_colors = set(COLORS_MAP.values())
    for color_var in sorted(unique_colors):
        print(f"  - {color_var}")
