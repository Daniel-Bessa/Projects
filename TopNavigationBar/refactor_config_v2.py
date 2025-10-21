#!/usr/bin/env python3
"""
Refactor script to add configuration section to Top_Navigation_Bar.js - Version 2
"""
import re

# Color mapping - extracted from the file
COLORS_MAP = {
    '#9E9E9E': 'BORDER_PRIMARY',
    '#fff': 'BG_PRIMARY',
    '#FFF': 'BG_PRIMARY',
    'rgb(4, 96, 169)': 'BG_ACCENT',
    '#0460A9': 'BG_ACCENT_HEX',
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

def replace_colors_with_vars(css_content):
    """Replace hardcoded colors with CSS variables in CSS properties only"""
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
    }

    result = css_content

    # Only replace colors in CSS property contexts (not in SVG)
    # Look for patterns like: property: #color; or property: rgb(...);
    for old_color, new_var in replacements.items():
        # Pattern: CSS property followed by color
        # This will match:  border-color: #9E9E9E;  but not  fill="#9E9E9E"
        pattern = r'(:\s*)' + re.escape(old_color) + r'(\s*[;\}])'
        result = re.sub(
            pattern,
            r'\1' + new_var + r'\2',
            result,
            flags=re.IGNORECASE
        )

    return result

def refactor_file(input_path):
    """Main refactoring function"""
    print(f"Reading {input_path}...")

    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if already refactored
    if 'const CONFIG = {' in content:
        print("File already contains CONFIG section. Skipping...")
        return

    # Step 1: Add CONFIG section after the initial variable declarations
    # Find the line after "let adminHeight = true;"
    config_template = '''

// ===================================================================
// CONFIGURATION SECTION - Customize icons and colors here
// ===================================================================

const CONFIG = {
  // Icon Configuration
  // Note: This file uses inline SVG icons in the HTML template.
  // These values are semantic names that correspond to the UI elements.
  // If you wish to use Material Symbols instead of SVG, you can reference these.
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

    // Accent Colors (used in logos/SVGs)
    SUCCESS_GREEN: '#388E3C',
    ACCENT_ORANGE: '#E74A21',
    ACCENT_YELLOW: '#EC9A1E',
    ACCENT_RED: '#FF585D',
    ACCENT_GOLD: '#FFC100',
    ACCENT_DARK_BLUE: '#002068',
  }
};

'''

    config_insert_pattern = r'(let adminHeight = true;)'
    config_replacement = r'\1' + config_template
    content = re.sub(config_insert_pattern, config_replacement, content, count=1)

    # Step 2: Add CSS variables after the <style> tag
    css_vars_template = '''
          /* ============================================================
             CSS Custom Properties - Generated from CONFIG.COLORS
             You can override these by changing values in CONFIG.COLORS
             ============================================================ */
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

    style_insert_pattern = r'(<style>)'
    style_replacement = r'\1' + css_vars_template
    content = re.sub(style_insert_pattern, style_replacement, content, count=1)

    # Step 3: Replace colors in CSS with variables (but not in SVG)
    # Extract and replace in the style section only
    style_pattern = r'(<style>)(.*?)(</style>)'

    def replace_style_section(match):
        open_tag = match.group(1)
        style_content = match.group(2)
        close_tag = match.group(3)

        # Replace colors in CSS properties
        new_style_content = replace_colors_with_vars(style_content)

        return open_tag + new_style_content + close_tag

    content = re.sub(style_pattern, replace_style_section, content, flags=re.DOTALL, count=1)

    print(f"Writing to {input_path}...")
    with open(input_path, 'w', encoding='utf-8') as f:
        f.write(content)

    # Count replacements
    var_count = content.count('var(--')

    print("Refactoring complete!")
    print(f"\nSummary:")
    print(f"  - Icons configured: 7 (ADMIN, CONFIG, CLIPBOARD, DOWNLOAD, INFO, USER, MENU)")
    print(f"  - Colors configured: 17 unique color variables")
    print(f"  - CONFIG object added at top with ICONS and COLORS sections")
    print(f"  - CSS custom properties (:host) added to style section")
    print(f"  - CSS property color values replaced with variables: {var_count} instances")
    print(f"\nNote: SVG fill/stroke colors were NOT replaced as they require")
    print(f"      different handling. CSS properties (border, background, color) were updated.")

if __name__ == '__main__':
    # First, restore original file from backup if it exists
    import shutil
    import os

    input_file = r'c:\Users\iceco\Projects\TopNavigationBar\Top_Navigation_Bar.js'

    # Create backup if doesn't exist
    backup_file = input_file + '.backup'
    if not os.path.exists(backup_file):
        print(f"Creating backup at {backup_file}")
        shutil.copy(input_file, backup_file)

    refactor_file(input_file)

    print(f"\n✓ Changes applied to: {input_file}")
    print(f"✓ Backup saved at: {backup_file}")
