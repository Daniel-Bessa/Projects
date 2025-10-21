import re

# Read the file
with open(r'C:\Users\iceco\Projects\TopNavigationBar\Top_Navigation_Bar.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract SVG icons and their links from the nineDotMenu section
pattern = r'<span class="dotNav-(\w+)">\s*<a href="([^"]+)"[^>]*>\s*(<svg[^>]*>.*?</svg>)\s*</a>\s*</span>'
matches = re.findall(pattern, content, re.DOTALL)

# Create the configuration objects
svg_icons_config = "// ===================================================================\n"
svg_icons_config += "// SVG CONFIGURATION - Easy access to menu icons\n"
svg_icons_config += "// ===================================================================\n"
svg_icons_config += "const SVG_ICONS = {\n"

menu_links_config = "\n// MENU LINKS - Easy access to URLs attached to each menu item\n"
menu_links_config += "const MENU_LINKS = {\n"

# Build configuration objects
for i, match in enumerate(matches):
    menu_name = match[0]
    link = match[1]
    svg = match[2]

    # Convert menu name to constant format (e.g., genieHome -> GENIE_HOME)
    const_name = re.sub(r'([a-z])([A-Z])', r'\1_\2', menu_name).upper()

    # Add to SVG_ICONS
    svg_escaped = svg.replace('`', '\\`').replace('${', '\\${')
    svg_icons_config += f"  {const_name}: `{svg_escaped}`"
    if i < len(matches) - 1:
        svg_icons_config += ","
    svg_icons_config += "\n"

    # Add to MENU_LINKS
    menu_links_config += f"  {const_name}: '{link}'"
    if i < len(matches) - 1:
        menu_links_config += ","
    menu_links_config += "\n"

svg_icons_config += "};\n"
menu_links_config += "};\n"

# Find where to insert the configuration (after existing variable declarations)
# Look for the line with "let tmpl = document.createElement('template');"
tmpl_match = re.search(r"(let tmpl = document\.createElement\('template'\);)", content)

if tmpl_match:
    insert_pos = tmpl_match.start()

    # Insert the configuration before the template
    configuration = "\n" + svg_icons_config + menu_links_config + "\n"
    content = content[:insert_pos] + configuration + content[insert_pos:]

    print("[OK] Configuration objects created and inserted")
else:
    print("[ERROR] Could not find template declaration")
    exit(1)

# Now replace the nineDotMenu HTML to use the configuration
# Build the replacement HTML
replacement_html = '      <div id="nineDotMenu" class="nineDotMenu" style="display: none;">\n'

for match in matches:
    menu_name = match[0]
    const_name = re.sub(r'([a-z])([A-Z])', r'\1_\2', menu_name).upper()

    replacement_html += f'        <span class="dotNav-{menu_name}">\n'
    replacement_html += f'          <a href="${{MENU_LINKS.{const_name}}}" target="_Blank">\n'
    replacement_html += f'            ${{SVG_ICONS.{const_name}}}\n'
    replacement_html += f'          </a>\n'
    replacement_html += f'        </span>\n'

replacement_html += '      </div>'

# Find and replace the nineDotMenu section
ninedot_pattern = r'<div id="nineDotMenu" class="nineDotMenu"[^>]*>.*?</div>\s*(?=<div id="clipBoardMenu")'
content = re.sub(ninedot_pattern, replacement_html + '\n      ', content, flags=re.DOTALL)

print("[OK] HTML template updated to use configuration objects")

# Optimize the constructor
old_constructor = r'''    constructor\(\) \{
      super\(\);
      this\._shadowRoot = this\.attachShadow\(\{mode: "open"\}\);
      this\._shadowRoot\.appendChild\(tmpl\.content\.cloneNode\(true\)\);

      this\._export_settings = \{\};

      //#region // addEventListener for everything[\s\S]*?//#endregion

      this\._props = \{\};
      this\._firstConnection = false;
    \}'''

new_constructor = '''    /**
     * Constructor - Initializes the custom widget
     * Sets up shadow DOM and attaches event listeners for all interactive elements
     */
    constructor() {
      super();

      // Initialize shadow DOM
      this._shadowRoot = this.attachShadow({mode: "open"});
      this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

      // Initialize widget state
      this._export_settings = {};
      this._props = {};
      this._firstConnection = false;

      // Attach event listeners to all interactive elements
      this._attachEventListeners();
    }

    /**
     * Attaches event listeners to all interactive elements in the shadow DOM
     * Centralizes event listener setup for better maintainability
     */
    _attachEventListeners() {
      const eventBindings = [
        { id: 'blankSpace', event: 'onClick' },
        { id: 'adminElement', event: 'onClickAdmin' },
        { id: 'configElement', event: 'onClickConfig' },
        { id: 'clipBoardElement', event: 'onClickClipBoard' },
        { id: 'copyLink', event: 'onClickCopyLink' },
        { id: 'downloadElement', event: 'onClickDownload' },
        { id: 'infoElement', event: 'onClickInfo' },
        { id: 'userElement', event: 'onClickUser' },
        { id: 'adminSwitch', event: 'onToggleAdmin' },
        { id: 'menuElement', event: 'onClickMenu' }
      ];

      eventBindings.forEach(({ id, event }) => {
        const element = this._shadowRoot.getElementById(id);
        if (element) {
          element.addEventListener('click', () => {
            this.dispatchEvent(new Event(event));
          });
        }
      });
    }'''

content = re.sub(old_constructor, new_constructor, content, flags=re.DOTALL)
print("[OK] Constructor optimized with event listener refactoring")

# Optimize connectedCallback
old_connected = r'''    //Fired when the widget is added to the html DOM of the page
    connectedCallback\(\)\{
        this\.firstConnection = true;
        var that = this;
        loadthis\(that\)
    \}'''

new_connected = '''    /**
     * Lifecycle: Called when the widget is added to the DOM
     * Initializes the widget and loads its initial state
     */
    connectedCallback() {
      this.firstConnection = true;
      loadthis(this);
    }'''

content = re.sub(old_connected, new_connected, content)
print("[OK] connectedCallback optimized")

# Optimize disconnectedCallback
old_disconnected = r'''    //Fired when the widget is removed from the html DOM of the page \(e\.g\. by hide\)
    disconnectedCallback\(\)\{

    \}'''

new_disconnected = '''    /**
     * Lifecycle: Called when the widget is removed from the DOM
     * Cleanup operations can be added here if needed (e.g., removing event listeners)
     */
    disconnectedCallback() {
      // Currently no cleanup needed - event listeners are automatically removed with shadow DOM
    }'''

content = re.sub(old_disconnected, new_disconnected, content)
print("[OK] disconnectedCallback optimized")

# Optimize onCustomWidgetBeforeUpdate
old_before = r'''    //When the custom widget is updated, the Custom Widget SDK framework executes this function first
    onCustomWidgetBeforeUpdate\(oChangedProperties\) \{
    \}'''

new_before = '''    /**
     * Lifecycle: Called before the widget properties are updated
     * @param {Object} oChangedProperties - Object containing changed property names and values
     */
    onCustomWidgetBeforeUpdate(oChangedProperties) {
      // Currently no pre-update operations needed
    }'''

content = re.sub(old_before, new_before, content)
print("✓ onCustomWidgetBeforeUpdate optimized")

# Optimize onCustomWidgetAfterUpdate
old_after = r'''    //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
    onCustomWidgetAfterUpdate\(oChangedProperties\) \{
      var that = this;
      loadthis\(that\);
    \}'''

new_after = '''    /**
     * Lifecycle: Called after the widget properties are updated
     * Reloads the widget state to reflect the changes
     * @param {Object} oChangedProperties - Object containing changed property names and values
     */
    onCustomWidgetAfterUpdate(oChangedProperties) {
      loadthis(this);
    }'''

content = re.sub(old_after, new_after, content)
print("✓ onCustomWidgetAfterUpdate optimized")

# Optimize onCustomWidgetDestroy
old_destroy = r'''    //When the custom widget is removed from the canvas or the analytic application is closed
    onCustomWidgetDestroy\(\)\{

    \}'''

new_destroy = '''    /**
     * Lifecycle: Called when the widget is removed from the canvas or app is closed
     * Cleanup operations can be added here if needed
     */
    onCustomWidgetDestroy() {
      // Currently no cleanup needed - resources are automatically released
    }'''

content = re.sub(old_destroy, new_destroy, content)
print("✓ onCustomWidgetDestroy optimized")

# Write the optimized file
with open(r'C:\Users\iceco\Projects\TopNavigationBar\Top_Navigation_Bar.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✓ File successfully optimized and written to disk")
print(f"\nSummary:")
print(f"- Extracted {len(matches)} SVG icons")
print(f"- Extracted {len(matches)} menu links")
print(f"- Created SVG_ICONS configuration object")
print(f"- Created MENU_LINKS configuration object")
print(f"- Optimized all 6 lifecycle methods")
print(f"- Updated HTML template to use configuration objects")
print(f"- Refactored constructor to use centralized event listener attachment")
