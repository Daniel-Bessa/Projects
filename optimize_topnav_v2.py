import re

# Read the file
with open(r'C:\Users\iceco\Projects\TopNavigationBar\Top_Navigation_Bar.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the constructor section more flexibly
constructor_start = content.find('    constructor() {')
if constructor_start == -1:
    print("[ERROR] Could not find constructor")
    exit(1)

# Find the end of constructor (next method)
constructor_end = content.find('    //Fired when the widget is added to the html DOM of the page', constructor_start)
if constructor_end == -1:
    constructor_end = content.find('    connectedCallback', constructor_start)

old_constructor_text = content[constructor_start:constructor_end]

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
    }

'''

content = content[:constructor_start] + new_constructor + content[constructor_end:]
print("[OK] Constructor optimized")

# Now optimize the other lifecycle methods
# connectedCallback
connected_pattern = r'    //Fired when the widget is added to the html DOM of the page\s+connectedCallback\(\)\{\s+this\.firstConnection = true;\s+var that = this;\s+loadthis\(that\)\s+\}'
new_connected = '''    /**
     * Lifecycle: Called when the widget is added to the DOM
     * Initializes the widget and loads its initial state
     */
    connectedCallback() {
      this.firstConnection = true;
      loadthis(this);
    }'''

if re.search(connected_pattern, content):
    content = re.sub(connected_pattern, new_connected, content)
    print("[OK] connectedCallback optimized")
else:
    print("[WARN] connectedCallback pattern not matched, trying alternative")
    # Try alternative pattern
    connected_start = content.find('    //Fired when the widget is added to the html DOM of the page')
    if connected_start != -1:
        connected_end = content.find('    }', content.find('connectedCallback', connected_start)) + 5
        content = content[:connected_start] + new_connected + '\n\n' + content[connected_end:]
        print("[OK] connectedCallback optimized (alternative method)")

# disconnectedCallback
disconnected_pattern = r'    //Fired when the widget is removed from the html DOM of the page.*?\s+disconnectedCallback\(\)\{\s+\s+\}'
new_disconnected = '''    /**
     * Lifecycle: Called when the widget is removed from the DOM
     * Cleanup operations can be added here if needed (e.g., removing event listeners)
     */
    disconnectedCallback() {
      // Currently no cleanup needed - event listeners are automatically removed with shadow DOM
    }'''

if re.search(disconnected_pattern, content, re.DOTALL):
    content = re.sub(disconnected_pattern, new_disconnected, content, flags=re.DOTALL)
    print("[OK] disconnectedCallback optimized")
else:
    print("[WARN] disconnectedCallback pattern not matched, trying alternative")
    disconnected_start = content.find('    //Fired when the widget is removed from the html DOM')
    if disconnected_start != -1:
        disconnected_end = content.find('    }', content.find('disconnectedCallback', disconnected_start)) + 5
        content = content[:disconnected_start] + new_disconnected + '\n\n' + content[disconnected_end:]
        print("[OK] disconnectedCallback optimized (alternative method)")

# onCustomWidgetBeforeUpdate
before_pattern = r'    //When the custom widget is updated.*?first\s+onCustomWidgetBeforeUpdate\(oChangedProperties\) \{\s+\}'
new_before = '''    /**
     * Lifecycle: Called before the widget properties are updated
     * @param {Object} oChangedProperties - Object containing changed property names and values
     */
    onCustomWidgetBeforeUpdate(oChangedProperties) {
      // Currently no pre-update operations needed
    }'''

if re.search(before_pattern, content, re.DOTALL):
    content = re.sub(before_pattern, new_before, content, flags=re.DOTALL)
    print("[OK] onCustomWidgetBeforeUpdate optimized")
else:
    print("[WARN] onCustomWidgetBeforeUpdate pattern not matched, trying alternative")
    before_start = content.find('    //When the custom widget is updated, the Custom Widget SDK framework executes this function first')
    if before_start != -1:
        before_end = content.find('    }', content.find('onCustomWidgetBeforeUpdate', before_start)) + 5
        content = content[:before_start] + new_before + '\n\n' + content[before_end:]
        print("[OK] onCustomWidgetBeforeUpdate optimized (alternative method)")

# onCustomWidgetAfterUpdate
after_pattern = r'    //When the custom widget is updated.*?after the update\s+onCustomWidgetAfterUpdate\(oChangedProperties\) \{\s+var that = this;\s+loadthis\(that\);\s+\}'
new_after = '''    /**
     * Lifecycle: Called after the widget properties are updated
     * Reloads the widget state to reflect the changes
     * @param {Object} oChangedProperties - Object containing changed property names and values
     */
    onCustomWidgetAfterUpdate(oChangedProperties) {
      loadthis(this);
    }'''

if re.search(after_pattern, content, re.DOTALL):
    content = re.sub(after_pattern, new_after, content, flags=re.DOTALL)
    print("[OK] onCustomWidgetAfterUpdate optimized")
else:
    print("[WARN] onCustomWidgetAfterUpdate pattern not matched, trying alternative")
    after_start = content.find('    //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update')
    if after_start != -1:
        after_end = content.find('    }', content.find('onCustomWidgetAfterUpdate', after_start)) + 5
        content = content[:after_start] + new_after + '\n\n' + content[after_end:]
        print("[OK] onCustomWidgetAfterUpdate optimized (alternative method)")

# onCustomWidgetDestroy
destroy_pattern = r'    //When the custom widget is removed from the canvas.*?closed\s+onCustomWidgetDestroy\(\)\{\s+\s+\}'
new_destroy = '''    /**
     * Lifecycle: Called when the widget is removed from the canvas or app is closed
     * Cleanup operations can be added here if needed
     */
    onCustomWidgetDestroy() {
      // Currently no cleanup needed - resources are automatically released
    }'''

if re.search(destroy_pattern, content, re.DOTALL):
    content = re.sub(destroy_pattern, new_destroy, content, flags=re.DOTALL)
    print("[OK] onCustomWidgetDestroy optimized")
else:
    print("[WARN] onCustomWidgetDestroy pattern not matched, trying alternative")
    destroy_start = content.find('    //When the custom widget is removed from the canvas or the analytic application is closed')
    if destroy_start != -1:
        destroy_end = content.find('    }', content.find('onCustomWidgetDestroy', destroy_start)) + 5
        content = content[:destroy_start] + new_destroy + '\n\n' + content[destroy_end:]
        print("[OK] onCustomWidgetDestroy optimized (alternative method)")

# Write the file
with open(r'C:\Users\iceco\Projects\TopNavigationBar\Top_Navigation_Bar.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n[OK] Lifecycle methods optimization complete")
