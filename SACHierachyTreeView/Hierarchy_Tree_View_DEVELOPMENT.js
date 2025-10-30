(function () {
    /*--------------------------------------------------------------------------------------------------------------- */
    /*--------------------------  Global Variable Declaration  ------------------------------------- */
    //this is a test
    let _shadowRoot;
    let div;
    let widgetID = [];
    let widgetName;
    let _SelectedChild;
    let _SelectedNode;
    let _SelectedNodeDec;

    let _SelectedLevel_Value;
    let _SelectedParentId_Value;
    let _SelectedNodeId_Value;
    let _SelectedTextId_Value;
    let _SelectedTextDesc_Value;

    let _iconSize = [];
    let _IconStyling = [];
    let _DefaultCBStyling = [];
    let _SelectedCBStyling = [];

    let previousSelectedNode;
    let currentSelectedNode;

    let ammountofWidgets = 0;

    // ===== FIXED: Replace hard-coded instances with dynamic Map =====
    let initWidgetState = new Map(); // Unlimited instances
    // REMOVED: initWidget1, initWidget2, initWidget3, initWidget4

    // ===== AUTO WIDGET INSTANCE MANAGEMENT =====
    let widgetInstanceCounter = 0; // Global counter for auto-assigning widget numbers
    let widgetInstanceMap = new WeakMap(); // Maps widget element -> auto-assigned instance number

    let defaultLevelFunction = (widgetInstance = null) => {
        try {
            // If a specific widget instance is passed, find its index
            let y;
            if (widgetInstance) {
                // Find the index of this specific widget instance
                y = thatWidget.indexOf(widgetInstance);
                if (y === -1) {
                    console.warn("[defaultLevelFunction] Widget instance not found in thatWidget array");
                    return;
                }
            } else {
                // Fallback to last instance (old behavior)
                y = (thatWidget && thatWidget.length) ? thatWidget.length - 1 : 0;
            }

            const that = thatWidget?.[y];
            const tree = thisTree?.[y];
            const mapcanvas_divstr = thatMapcanvas_divstr?.[y];

            // Only proceed if we have all required variables
            if (!that || !tree || !tree.$) {
                console.warn("[defaultLevelFunction] required variables not ready yet");
                return;
            }

            const ITEM_HEIGHT = 40, MIN_HEIGHT = 88, EXTRA_PAD = 50;
            const itemList = tree.$().find(".sapMTreeItemBase");
            let displayedCount = 0;

            // Update item heights and count displayed items
            for (let i = 0; i < itemList.length; i++) {
                const el = itemList[i];
                if (el?.classList?.contains("displayed")) displayedCount++;
                if (el && el.style && el.style.height !== `${ITEM_HEIGHT}px`) {
                    el.style.height = `${ITEM_HEIGHT}px`;
                }
            }

            // Calculate dynamic size
            const sizeDynamicCW = Math.max(displayedCount * ITEM_HEIGHT + EXTRA_PAD, MIN_HEIGHT);

            // Get panel elements
            const divLayoutCommonWidget = that && that.parentNode;
            if (!divLayoutCommonWidget) {
                return;
            }

            const divCommonWidgetPanelWrapper = divLayoutCommonWidget.parentNode;
            const divCommonWidgetPanel = divCommonWidgetPanelWrapper?.parentNode;
            const divPanelComponentSection = divCommonWidgetPanel?.parentNode;

            // ===== FIX: Force style calculation to ensure SAC's border is applied =====
            // Reading getComputedStyle forces the browser to calculate all pending styles,
            // ensuring SAC's border is applied before we modify the element
            if (divCommonWidgetPanelWrapper) {
                window.getComputedStyle(divCommonWidgetPanelWrapper);
            }

            // Update panel styles in next frame
            requestAnimationFrame(() => {

                if (divLayoutCommonWidget?.style) {
                    divLayoutCommonWidget.style.overflowY = "auto";
                }

                if (divCommonWidgetPanelWrapper?.style) {
                    divCommonWidgetPanelWrapper.style.visibility = "visible";
                    divCommonWidgetPanelWrapper.style.display = "";
                    divCommonWidgetPanelWrapper.style.overflowY = "auto";
                }

                if (divCommonWidgetPanel?.style) {
                    let maxHeightValue = "70vh";

                    // Cap max-height at 70vh even if that.max_height is 100%
                    if (that && that.max_height && that.unit_option) {
                        if (that.unit_option === "%" && that.max_height > 70) {
                            maxHeightValue = "70vh";
                        } else if (that.unit_option === "%") {
                            maxHeightValue = `${that.max_height}vh`;
                        } else {
                            maxHeightValue = `${that.max_height}${that.unit_option}`;
                        }
                    }

                    divCommonWidgetPanel.style.minWidth = "297px";
                    divCommonWidgetPanel.style.maxHeight = maxHeightValue;
                    divCommonWidgetPanel.style.minHeight = `${MIN_HEIGHT}px`;
                    divCommonWidgetPanel.style.height = `min(${sizeDynamicCW}px, ${maxHeightValue})`;
                    divCommonWidgetPanel.style.overflowY = "auto";
                }

                if (divPanelComponentSection?.style) {
                    divPanelComponentSection.style.minWidth = "297px";
                    divPanelComponentSection.style.maxHeight = "100%";
                    divPanelComponentSection.style.minHeight = `${MIN_HEIGHT}px`;
                    divPanelComponentSection.style.height = "100%";
                    divPanelComponentSection.style.visibility = "visible";
                    divPanelComponentSection.style.opacity = "";
                }

                // Update shadow root if needed
                const scriptParent = (typeof mapcanvas_divstr !== "undefined") ? mapcanvas_divstr.parentNode : null;
                const shadowRootDiv = scriptParent?.parentNode;
                const shadowPanelDiv2 = shadowRootDiv?.children?.item(2)?.firstChild?.firstChild;
                if (shadowPanelDiv2?.style) {
                    shadowPanelDiv2.style.maxHeight = `${sizeDynamicCW}px`;
                    shadowPanelDiv2.style.minHeight = `${MIN_HEIGHT}px`;
                }
            });

            return sizeDynamicCW;
        } catch(e) {
            console.warn("[defaultLevelFunction] failed:", e);
            return null;
        }
    };

    let _ptid;
    let _ptdec;
    let _FF1;
    let _FF2;
    var Ar = [];
    let _filternode = [];
    let _filtervalue = [];
    let _filterValueDesc = [];
    let _filterinfo = [];
    let _setModeInfo = [1, 1, 1];
    let _dfnumber = [];
    let _dfdesc = [];
    let _BuilderPanel = [];
    let _dfF1 = [];
    let _dfF2 = [];
    let IDNum = [3, 3, 3];
    let IDNum1 = [0, 0, 0];
    let _FontStyle = [];

    let _ParentNodes = [];
    let _SelectedNodes = [];
    let _Default_Level = [];
    let currentSelectedItem = [];

    let thisTree = [];
    let results = [];
    let thatWidget = [];
    let thatWidgetName = [];
    let thatWidgetLevel = [];
    let thatMapcanvas_divstr = [];
    
    let heightCustomWidget = [];
    let searchBar = "";

    let getSelection = [];
    let getSpart = [];

    let listSelectedTest = [];

    /*--------------------------------------------------------------------------------------------------------------- */
    /*--------------------------  Start: Template Creation  ------------------------------------- */

    let tmpl = document.createElement("template");
    tmpl.innerHTML = `<div style="background-color: #fff; position: absolute; z-index: 1; top: 0px; height: 100%; width: 100%; border-radius: 10px;" id="root"></div> `;
    // tmpl.innerHTML = `<div id="root"></div> `;

    /*--------------------------  End: Template Creation  ------------------------------------- */
    /*----------------------------------------------------------------------------------------ccc----------------------- */


    // ==== debug helpers (add these once) ====
    window.__CW_DEBUG = true;
    window.cwLog  = function(...a){ if (window.__CW_DEBUG) console.log("[CW]",   ...a); };
    window.ctrlLog= function(...a){ if (window.__CW_DEBUG) console.log("[CTRL]", ...a); };

    // Dump the current Tree rows (helps map IDs)
    window.dumpTree = function(){
    try{
        const treeId = widgetID[widgetID.length-1] + "--Tree";
        const tree   = sap.ui.getCore().byId(treeId);
        const bi     = tree?.getBindingInfo("items") || {};
        const model  = (typeof bi.model === "string" && bi.model.trim()) ? bi.model.trim() : null;
        const items  = tree?.getItems() || [];
        const rows   = items.map((it,i)=>{
        const ctx = model ? it.getBindingContext(model) : it.getBindingContext();
        const n   = ctx ? (ctx.getObject()||{}) : {};
        return {
            i,
            title: it.getTitle?.(),
            nodeid: n.nodeid,
            nodeUnique: n.nodeUnique,
            id: n.id,
            IDNAME: n.IDNAME,
            NODE_ID: n.NODE_ID?.id || n.NODE_ID,
            NODE_NAME: n.NODE_NAME?.id || n.NODE_NAME,
            text: n.text,
            nodeIdDec: n.nodeIdDec
        };
        });
        console.log("[dumpTree] treeId:", treeId, "model:", model, "count:", rows.length);
        console.table(rows.slice(0,100));
        return rows;
    }catch(e){ console.error("[dumpTree] failed", e); }
    };

    /*--------------------------------------------------------------------------------------------------------------- */
    /*--------------------------Start: Main Class  ------------------------------------- */

    class MultiInput extends HTMLElement {
        
        constructor() {
            super();
    
            _shadowRoot = this.attachShadow({ mode: "open" });
            _shadowRoot.appendChild(tmpl.content.cloneNode(true));
    
            this._export_settings = {};
    
            this.addEventListener("click", event => {
                setTimeout(() => {
                    var eventclick = new Event("onClick");
                    this.dispatchEvent(eventclick);
                }, "200");
            });
                
            this.addEventListener("mouseup", event => {
                if (previousSelectedNode === undefined){
                    previousSelectedNode = currentSelectedItem;
                }
                setTimeout(() => {
                    currentSelectedNode = currentSelectedItem;
                    if (previousSelectedNode !== currentSelectedNode) {
                        var eventchange = new Event("onChange");
                        this.dispatchEvent(eventchange);
                    }
                    previousSelectedNode = currentSelectedNode;
                }, "200");
            });
    
            this._partialParents = new Set();
            this._didAttachUpdateFinished = false;
            this._props = {};
            this._firstConnection = 0;
        }
    
        connectedCallback(changedProperties)  {
            var that = this;

            let searchBar = document.querySelectorAll(".sapMInputBaseInner");
            for (let i=0; i < searchBar.length; i++){
                searchBar[i].value = "";
            }

            let itemList = document.querySelectorAll(".sapMTreeItemBase");
            for (let i=0; i < itemList.length; i++){
                itemList[i].style.display = "";
            }

            // FIX: Pass the current widget instance instead of using the last one
            defaultLevelFunction(this);

            this._firstConnection = 1;
        }
    
        disconnectedCallback() {
            if (this._subscription) {
                this._subscription();
                this._subscription = null;
            }
        }
    
        _reapplyPartialMarks() {
            // FIX: Access tree using widgetID array
            if (!this.widgetno || !widgetID || !widgetID[this.widgetno - 1]) return;

            const treeId = widgetID[this.widgetno - 1] + "--Tree";
            const tree = sap.ui.getCore().byId(treeId);
            if (!tree || tree.bIsDestroyed) return;

            const items = tree.getItems();
            if (!items || items.length === 0) return;

            // Get model name
            const modelName = tree.getBindingInfo("items")?.model;

            // Build node array from tree items
            const nodes = items.map(item => {
                const ctx = modelName ? item.getBindingContext(modelName) : item.getBindingContext();
                return ctx ? ctx.getObject() : null;
            });

            // Fresh DOM every time
            const $ = tree.$();
            const lis = Array.from($.find("li.sapMTreeItemBase"));

            // Rebuild index map from nodes
            const idxById = new Map(nodes.map((n, i) => [n?.nodeUnique, i]));

            this._partialParents?.forEach((id) => {
                const idx = idxById.get(id);
                if (idx == null) return;
                const mark = lis[idx]?.querySelector(".sapMCbMark");
                if (mark) mark.classList.add("sapMCbMarkPartiallyChecked");
            });
        }
    
        _ensureTreeSetup() {
            // FIX: Access tree using widgetID array
            if (!this.widgetno || !widgetID || !widgetID[this.widgetno - 1]) return;

            const treeId = widgetID[this.widgetno - 1] + "--Tree";
            const tree = sap.ui.getCore().byId(treeId);
            if (!tree || tree.bIsDestroyed) return;

            if (tree.getIncludeItemInSelection && !tree.getIncludeItemInSelection()) {
                tree.setIncludeItemInSelection(true);
            }
            if (tree.setMode && tree.getMode && tree.getMode() !== "MultiSelect") {
                tree.setMode("MultiSelect");
            }

            if (!this._didAttachUpdateFinished) {
                tree.attachUpdateFinished(() => this._reapplyPartialMarks());
                this._didAttachUpdateFinished = true;
            }
        }
    
        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
            if ("designMode" in changedProperties) {
                this._designMode = changedProperties["designMode"];
            }
        }
    
        onCustomWidgetReady() {
            this._renderTitle?.();
            this._ensureTreeSetup();
        }
    
        // ===== FIXED: Handle setSelection without reloading data =====
        onCustomWidgetAfterUpdate(changedProperties) {
            const keys = Object.keys(changedProperties || {});
            const onlySetSel = keys.length === 1 && keys[0] === "setSelection";

            if (!onlySetSel) {
                // Normal update: rebuild data
                const that = this;
                loadthis(that, changedProperties);
                this._ensureTreeSetup();
            } else {
                // Selection-only: fast path
                this._ensureTreeSetup();
                this._applySelectionOnly(changedProperties.setSelection);
            }
        }

        // ===== FIXED: New method for selection-only updates =====
        _applySelectionOnly(selectionIds, retryCount = 0) {
            try {
                if (!selectionIds) return;

                const ids = Array.isArray(selectionIds) ? selectionIds : [selectionIds];
                if (ids.length === 0) return;

                // Limit retries to prevent infinite loops
                const MAX_RETRIES = 50; // 5 seconds max (50 * 100ms)

                // FIX: Access tree using widgetID array and widget instance number
                if (!this.widgetno || !widgetID || !widgetID[this.widgetno - 1]) {
                    if (retryCount >= MAX_RETRIES) {
                        console.warn("[CW] _applySelectionOnly: Widget not initialized after max retries, giving up");
                        return;
                    }
                    setTimeout(() => this._applySelectionOnly(ids, retryCount + 1), 100);
                    return;
                }

                const treeId = widgetID[this.widgetno - 1] + "--Tree";
                const tree = sap.ui.getCore().byId(treeId);

                if (!tree || tree.bIsDestroyed) {
                    if (retryCount >= MAX_RETRIES) {
                        console.warn("[CW] _applySelectionOnly: Tree not ready after max retries, giving up. TreeId:", treeId);
                        return;
                    }
                    setTimeout(() => this._applySelectionOnly(ids, retryCount + 1), 100);
                    return;
                }

                const items = tree.getItems();
                if (!items || items.length === 0) {
                    if (retryCount >= MAX_RETRIES) {
                        console.warn("[CW] _applySelectionOnly: No items after max retries, giving up");
                        return;
                    }
                    setTimeout(() => this._applySelectionOnly(ids, retryCount + 1), 100);
                    return;
                }

                // Use existing _applyIdsNow if available
                const ctrl = tree.getParent();
                if (ctrl && typeof ctrl._applyIdsNow === 'function') {
                    ctrl._applyIdsNow(ids);
                    return;
                }

                // Fallback: manual selection with descendants and partial parents
                const modelName = tree.getBindingInfo("items")?.model;
                const nodes = items.map(item => {
                    const ctx = modelName ? item.getBindingContext(modelName) : item.getBindingContext();
                    return ctx ? ctx.getObject() : null;
                });

                // Get DOM elements for partial checkbox styling
                const $ = tree.$();
                const lis = Array.from($.find("li.sapMTreeItemBase"));
                const cbMarks = lis.map(li => li.querySelector(".sapMCbMark"));

                // Step 1: Clear ALL selections and partial marks
                items.forEach(item => item.setSelected(false));
                cbMarks.forEach(mark => {
                    if (mark) mark.classList.remove("sapMCbMarkPartiallyChecked");
                });
                if (this._partialParents) this._partialParents.clear();

                // Step 2: Build relationship maps using node.nodes array (like existing onClick logic)
                const indexById = new Map(nodes.map((n, i) => [n?.nodeUnique, i]));
                const childrenById = new Map(nodes.map(n => [
                    n?.nodeUnique,
                    (n?.nodes || []).map(k => k?.nodeUnique ?? k?.NODEUNIQUE).filter(Boolean)
                ]));

                // Build parent map from filterinfo if available
                const parentMap = new Map();
                try {
                    const filterinfo = _filterinfo[this.widgetno - 1] || [];
                    filterinfo.forEach(fi => {
                        if (fi.NODEUNIQUE && fi.PARENTID) {
                            parentMap.set(fi.NODEUNIQUE, fi.PARENTID);
                        }
                    });
                } catch (e) {
                    console.warn("[CW] Could not build parent map from filterinfo:", e);
                }

                // Helper: Get all descendants of a node (using same logic as onClick)
                const getDescendants = (nodeId) => {
                    const out = [];
                    const seen = new Set([nodeId]);
                    const stack = [...(childrenById.get(nodeId) || [])];
                    while (stack.length) {
                        const cur = stack.pop();
                        if (!cur || seen.has(cur)) continue;
                        seen.add(cur);
                        out.push(cur);
                        stack.push(...(childrenById.get(cur) || []));
                    }
                    return out;
                };

                // Helper: Get all ancestors of a node
                const getAncestors = (nodeId) => {
                    const ancestors = [];
                    let currentId = nodeId;
                    while (parentMap.has(currentId)) {
                        const parentId = parentMap.get(currentId);
                        ancestors.push(parentId);
                        currentId = parentId;
                    }
                    return ancestors;
                };

                // Step 3: For each target ID, select it + all descendants
                const toSelect = new Set();
                const parentNodes = new Set();

                ids.forEach(id => {
                    const idStr = String(id);

                    const index = nodes.findIndex(n =>
                        String(n?.nodeid) === idStr ||
                        String(n?.nodeUnique) === idStr ||
                        String(n?.IDNAME) === idStr ||
                        String(n?.id) === idStr
                    );

                    if (index >= 0) {
                        const node = nodes[index];
                        const nodeId = node.nodeUnique || node.nodeid || node.id;

                        // Select this node
                        toSelect.add(nodeId);

                        // Select all descendants
                        const descendants = getDescendants(nodeId);
                        descendants.forEach(descId => toSelect.add(descId));

                        // Mark all ancestors as partial
                        const ancestors = getAncestors(nodeId);
                        ancestors.forEach(ancestorId => parentNodes.add(ancestorId));
                    }
                });

                // Step 4: Apply selections
                nodes.forEach((node, idx) => {
                    if (!node) return;
                    const nodeId = node.nodeUnique || node.nodeid || node.id;

                    if (toSelect.has(nodeId)) {
                        items[idx].setSelected(true);
                    }
                });

                // Step 5: Apply partial marks to parent nodes
                if (this.Selection_Type === "MultiSelect") {
                    if (!this._partialParents) this._partialParents = new Set();

                    parentNodes.forEach(parentId => {
                        this._partialParents.add(parentId);

                        // Find index and apply CSS class
                        const idx = nodes.findIndex(n => {
                            const nId = n?.nodeUnique || n?.nodeid || n?.id;
                            return String(nId) === String(parentId);
                        });

                        if (idx >= 0 && cbMarks[idx]) {
                            cbMarks[idx].classList.add("sapMCbMarkPartiallyChecked");
                        }
                    });
                }

                // Step 6: Expand/collapse hierarchy - show selected node's ancestors and direct children
                const liItems = Array.from(lis);
                const labels = liItems.map(li => li.querySelector("label"));

                // Find top-level selected nodes (nodes that were explicitly requested, not descendants)
                const topLevelSelected = new Set();
                ids.forEach(id => {
                    const idStr = String(id);
                    const index = nodes.findIndex(n =>
                        String(n?.nodeid) === idStr ||
                        String(n?.nodeUnique) === idStr ||
                        String(n?.IDNAME) === idStr ||
                        String(n?.id) === idStr
                    );
                    if (index >= 0) {
                        const node = nodes[index];
                        const nodeId = node.nodeUnique || node.nodeid || node.id;
                        topLevelSelected.add(nodeId);
                    }
                });

                // Hide all nodes first
                liItems.forEach((li, idx) => {
                    li.classList.add("disabled");
                    li.classList.remove("displayed");
                    if (labels[idx]) {
                        labels[idx].classList.add("collapsed");
                        labels[idx].classList.remove("expanded");
                        labels[idx].setAttribute("data-sap-ui-icon-content", "");
                    }
                });

                // For each TOP-LEVEL selected node, show its ancestors and direct children only
                topLevelSelected.forEach(selectedId => {
                    const idx = indexById.get(selectedId);
                    if (idx == null) return;

                    // Show the selected node (EXPANDED to show its children)
                    liItems[idx]?.classList.add("displayed");
                    liItems[idx]?.classList.remove("disabled");
                    if (labels[idx]) {
                        labels[idx].classList.add("expanded");
                        labels[idx].classList.remove("collapsed");
                        labels[idx].setAttribute("data-sap-ui-icon-content", "");
                    }

                    // Show and expand all ancestors
                    const ancestors = getAncestors(selectedId);
                    ancestors.forEach(ancId => {
                        const ancIdx = indexById.get(ancId);
                        if (ancIdx != null) {
                            liItems[ancIdx]?.classList.add("displayed");
                            liItems[ancIdx]?.classList.remove("disabled");
                            if (labels[ancIdx]) {
                                labels[ancIdx].classList.add("expanded");
                                labels[ancIdx].classList.remove("collapsed");
                                labels[ancIdx].setAttribute("data-sap-ui-icon-content", "");
                            }
                        }
                    });

                    // Show direct children of selected node (collapsed)
                    const children = childrenById.get(selectedId) || [];
                    children.forEach(childId => {
                        const childIdx = indexById.get(childId);
                        if (childIdx != null) {
                            liItems[childIdx]?.classList.add("displayed");
                            liItems[childIdx]?.classList.remove("disabled");
                            if (labels[childIdx]) {
                                labels[childIdx].classList.add("collapsed");
                                labels[childIdx].classList.remove("expanded");
                            }
                        }
                    });
                });

                // Step 7: Trigger selectionChange event to update properties and styling
                // This will fire the onSelect handler which updates SelectedChild, SelectedNodeId, etc.
                // and applies proper styling to selected nodes
                tree.fireSelectionChange({
                    listItems: items.filter((item, idx) => toSelect.has(nodes[idx]?.nodeUnique || nodes[idx]?.nodeid || nodes[idx]?.id)),
                    selected: true
                });

                // Step 8: Recalculate widget height
                defaultLevelFunction(this);

            } catch (e) {
                console.error("[CW] _applySelectionOnly failed", e);
            }
        }

        _firePropertiesChanged() {
            this.SelectedChild = "";
            this.SelectedNodeId = "";
            this.SelectedNodeDec = "";
    
            this.SelectedLevel_Value = "";
            this.SelectedParentId_Value = "";
            this.SelectedNodeId_Value = "";
            this.SelectedTextId_Value = "";
            this.SelectedTextDesc_Value = "";
    
            this.Field1_Value = "";
            this.Field2_Value = "";
            this.ptid = "";
            this.ptdec = "";
    
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        SelectedChild: this.SelectedChild,
                        SelectedNodeId: this.SelectedNodeId,
                        SelectedNodeDec: this.SelectedNodeDec,
    
                        SelectedLevel_Value: this.SelectedLevel_Value,
                        SelectedParentId_Value: this.SelectedParentId_Value,
                        SelectedNodeId_Value: this.SelectedNodeId_Value, 
                        SelectedTextId_Value: this.SelectedTextId_Value,
                        SelectedTextDesc_Value: this.SelectedTextDesc_Value,
    
                        ptid: this.ptid,
                        ptdec: this.ptdec,
                        Field1_Value: this.Field1_Value,
                        Field2_Value: this.Field2_Value
                    }
                }
            }));
        }
    

        /*-------------------------- Get Set property for data return method  ------------------------------------- */
        //#region 
        get SelectedChild() {
            return this._export_settings.SelectedChild;
        }
        set SelectedChild(value) {
            value = _SelectedChild;
            this._export_settings.SelectedChild = value;
        }
        get SelectedNodeId() {
            return this._export_settings.SelectedNodeId;
        }
        set SelectedNodeId(value) {
            value = _SelectedNode;
            this._export_settings.SelectedNodeId = value;
        }
        get SelectedNodeDec() {
            return this._export_settings.SelectedNodeDec;
        }
        set SelectedNodeDec(value) {
            value = _SelectedNodeDec;
            this._export_settings.SelectedNodeDec = value;
        }
        get SelectedLevel_Value() {
            return this._export_settings.SelectedLevel_Value;
        }
        set SelectedLevel_Value(value) {
            value = _SelectedLevel_Value;
            this._export_settings.SelectedLevel_Value = value;
        }
        get SelectedParentId_Value() {
            return this._export_settings.SelectedParentId_Value;
        }
        set SelectedParentId_Value(value) {
            value = _SelectedParentId_Value;
            this._export_settings.SelectedParentId_Value = value;
        }
        get SelectedNodeId_Value() {
            return this._export_settings.SelectedNodeId_Value;
        }
        set SelectedNodeId_Value(value) {
            value = _SelectedNodeId_Value;
            this._export_settings.SelectedNodeId_Value = value;
        }
        get SelectedTextId_Value() {
            return this._export_settings.SelectedTextId_Value;
        }
        set SelectedTextId_Value(value) {
            value = _SelectedTextId_Value;
            this._export_settings.SelectedTextId_Value = value;
        }
        get SelectedTextDesc_Value() {
            return this._export_settings.SelectedTextDesc_Value;
        }
        set SelectedTextDesc_Value(value) {
            value = _SelectedTextDesc_Value;
            this._export_settings.SelectedTextDesc_Value = value;
        }
        get ptid() {
            return this._export_settings.ptid;
        }
        set ptid(value) {
            value = _ptid;
            this._export_settings.ptid = value;
        }
        get ptdec() {
            return this._export_settings.ptdec;
        }
        set ptdec(value) {
            value = _ptdec;
            this._export_settings.ptdec = value;
        }
        get Field1_Value() {
            return this._export_settings.Field1_Value;
        }
        set Field1_Value(value) {
            value = _FF1;
            this._export_settings.Field1_Value = value;
        }
        get Field2_Value() {
            return this._export_settings.Field2_Value;
        }
        set Field2_Value(value) {
            value = _FF2;
            this._export_settings.Field2_Value = value;
        }
        get setdata() {
            return this._export_settings.setdata;
        }
        set setdata(value) {
            this._export_settings.setdata = value;
        }

        get setSelection() {
            return this._export_settings.setSelection;
        }
        set setSelection(value) {
            this._export_settings.setSelection = value;
            // If the widget is already on screen, apply immediately without data changes
            try { this._applySelectionOnly(value); } catch(_) {}
        }


        //#endregion
        static get observedAttributes() {
            return [
                "SelectedChild",
                "setdata",
                "SelectedNodeId",
                "setSelection",
            ];
        }
    }

    /*--------------------------------------------------------------------------------------------------------------- */
    /*--------------------------End: Main Class ------------------------------------- */

    customElements.define("com-ds-hierarchy-tree-view-development-sap-sac-alive", MultiInput);

    function loadthis(that, changedProperties) {
        var that_ = that;
        widgetName = changedProperties.widgetName;

        // Normalize the mode; default = parentChild
        const logicMode = (that && typeof that.Logic_Mode === "string"
            ? that.Logic_Mode.trim().toLowerCase()
            : "parentChild");



        /*--------------------------------------------------------------------------------------------------------------- */
        /*--------------------------Start: Data from SAC and prepare for JSON Model -------------------- ----------------- */
        /*--------------------------------------------------------------------------------------------------------------- */
        
        if(logicMode === "flat"){

            var resultSetData = changedProperties.setdata;
            var rowData = {};
        
        }else { // parentChild (default)
            var LL = that.LEVEL_col;
            var PI = that.PARENTID_col;
            var NI = that.NODEID_col;
            var ND = that.TEXTDEC_col;
            var TI = that.TEXTID_col;
            var TD = that.TEXTDEC_col;
            var Field1 = that.Field1_Name;
            var Field2 = that.Field2_Name;

            var a = changedProperties.setdata;

            var rowData = [[], [], [], [], [], [], [], [], [], [], []];

            // Level wise Node Distrubution
            if (a) {
                for (var i = 0; i < a.length; i++) {

                    switch (a[i][LL].id) {
                        case '1':
                            rowData[0].push(a[i]);
                            break;
                        case '2':
                            rowData[1].push(a[i]);
                            break;
                        case '3':
                            rowData[2].push(a[i]);
                            break;
                        case '4':
                            rowData[3].push(a[i]);
                            break;
                        case '5':
                            rowData[4].push(a[i]);
                            break;
                        case '6':
                            rowData[5].push(a[i]);
                            break;
                        case '7':
                            rowData[6].push(a[i]);
                            break;
                        case '8':
                            rowData[7].push(a[i]);
                            break;
                        case '9':
                            rowData[8].push(a[i]);
                            break;
                        case '10':
                            rowData[9].push(a[i]);
                            break;
                        case '11':
                            rowData[10].push(a[i]);
                            break;
                    }
                }
            }
        }

        // ===== AUTO WIDGET INSTANCE MANAGEMENT =====
        // Auto-assign a unique widget number if not already assigned
        if (!widgetInstanceMap.has(that)) {
            widgetInstanceCounter++;
            widgetInstanceMap.set(that, widgetInstanceCounter);
        }
        
        // Always use the auto-assigned widget number (ignore any manual widgetno from payload)
        that.widgetno = widgetInstanceMap.get(that);
        
        let payload = changedProperties.setdata;
        resultSetData = Array.isArray(payload?.data) ? payload.data : payload;
        
        // Ignore manual widgetno if provided in payload - log a warning
        if (payload?.widgetno != null) {
            console.warn(`[CW] Manual widgetno (${payload.widgetno}) provided but ignored. Using auto-assigned instance #${that.widgetno}`);
        }
        
        let defaultSelection = payload?.defaultSelection ?? changedProperties.setSelection ?? changedProperties.default;

        /*-------------------------- Node Hierarchy Creation based on Paren-Child Relations  ------------------------------------- */
        /*-------------------------- Local Variable Declaration  ------------------------------------- */
        
        var data = [];
        var count = 0;

        var filternode = [];
        var filtervalue = [];
        var filterValueDesc = [];
        var filterinfo = [];
        var nodenm = changedProperties.default;
        var setSelection = changedProperties.setSelection;

        var dfcount = 0;
        var dfnumber = [];
        var dfdesc = [];
        var F1 = that.Field1_Name;
        var F2 = that.Field2_Name;

        var dfF1 = [];
        var dfF2 = [];
        var FontStyle = [that.fstyle, that.fsize, that.fbi, that.fcolor]
        if (!that.fbi || that.fbi == " " || that.fbi == ""){
            that.fbi = "normal";
        }
        if (!that.fcolor || that.fcolor == " " || that.fcolor == ""){
            that.fcolor = "#333";
        }

        let ParentNodes = [that.Parent_fStyle, that.fsize, that.Parent_fColor, that.Parent_fTransp, that.Parent_bg]
        let SelectedNodes = [that.SelectedNode_fStyle, that.fsize, that.SelectedNode_fColor, that.SelectedNode_bg]
        let Default_Level = [that.Default_Level];
        let IconStyling = [that.DefaultIconColor, that.SelectedIconColor];
        if (!that.DefaultIconColor || !that.SelectedIconColor) {
            IconStyling = ["#717171", "#717171"]
        }

        let DefaultCBStyling = [that.DefaultCBBorder, that.DefaultCBBackground];
        if (DefaultCBStyling) {
            DefaultCBStyling = ["#9E9E9E", "#ffffff"]
        }

        let SelectedCBStyling = [that.SelectedCBBorder, that.SelectedCBBackground, that.SelectedCBCheckMark];
        if (SelectedCBStyling) {
            SelectedCBStyling = ["#9E9E9E", "#ffffff", "#0460A9"]
        }

        if(that.Selection_Type == "SingleSelectLeft" || that.Selection_Type == "undefined" || that.Selection_Type == "SingleSelectMaster"){
            SelectedNodes = [that.SelectedNode_fStyle, that.fsize, "#ffffff", "#0460A9"];
            IconStyling = ["#717171", "#ffffff"]
        }

        // MultiSelect: both selected and non-selected icons use DefaultIconColor
        if(that.Selection_Type == "MultiSelect"){
            IconStyling = [that.DefaultIconColor || "#717171", that.DefaultIconColor || "#717171"]
        }

        let IconSize = [Number(that.fsize) + 2 + "px"];
        if (!IconSize) {
            IconSize = ["16px"]
        }

        let max_height = that.max_height;
        if (!max_height){
            max_height = "70";
        }
        let unit_option = that.unit_option;
        if (!unit_option){
            unit_option = "%";
        }
        _FontStyle[that.widgetno] = FontStyle;
        _ParentNodes[that.widgetno] = ParentNodes;
        _SelectedNodes[that.widgetno] = SelectedNodes;
        _Default_Level[that.widgetno - 1] = Default_Level;
        _IconStyling[that.widgetno] = IconStyling;
        _DefaultCBStyling[that.widgetno] = DefaultCBStyling;
        _SelectedCBStyling[that.widgetno] = SelectedCBStyling;
        _iconSize[that.widgetno] = IconSize;

        // ===================================================================================
        // ========== Contrast Validation - Check for visibility issues ===================
        // ===================================================================================
        (function validateContrast() {
            const normalizeColor = (color) => {
                if (!color) return null;
                // Remove spaces and convert to lowercase
                return color.toString().replace(/\s/g, '').toLowerCase();
            };

            const selectedBg = normalizeColor(SelectedNodes[3]); // Background color
            const selectedTextColor = normalizeColor(SelectedNodes[2]); // Text color
            const selectedIconColor = normalizeColor(IconStyling[1]); // Selected icon color
            const defaultIconColor = normalizeColor(IconStyling[0]); // Default icon color

            // For MultiSelect checkbox colors
            const checkboxBg = normalizeColor(SelectedCBStyling[1]); // Checkbox background
            const checkboxMark = normalizeColor(SelectedCBStyling[2]); // Checkmark color

            let hasError = false;
            const errors = [];
            const warnings = [];

            // Check selected text vs background
            if (selectedTextColor && selectedBg && selectedTextColor === selectedBg) {
                errors.push(`   ❌ Selected Text will be INVISIBLE!
      Text Color: ${SelectedNodes[2]}
      Background: ${SelectedNodes[3]}
      → Text disappears when nodes are selected`);
                hasError = true;
            }

            // Check selected icon vs background
            if (selectedIconColor && selectedBg && selectedIconColor === selectedBg) {
                errors.push(`   ❌ Selected Icons will be INVISIBLE!
      Icon Color: ${IconStyling[1]}
      Background: ${SelectedNodes[3]}
      → Icons disappear when nodes are selected`);
                hasError = true;
            }

            // Check checkbox mark vs checkbox background (MultiSelect)
            if (that.Selection_Type === "MultiSelect" && checkboxMark && checkboxBg && checkboxMark === checkboxBg) {
                errors.push(`   ❌ Checkmarks will be INVISIBLE!
      Checkmark Color: ${SelectedCBStyling[2]}
      Checkbox Background: ${SelectedCBStyling[1]}
      → Checked state won't be visible in MultiSelect`);
                hasError = true;
            }

            // Warning: Check if default icon color might blend with common backgrounds
            if (defaultIconColor === 'rgb(255,255,255)' || defaultIconColor === '#ffffff' || defaultIconColor === '#fff') {
                warnings.push(`   ⚠️  Default icons are WHITE
      Icon Color: ${IconStyling[0]}
      → May not be visible on light backgrounds`);
            }

            // Display results
            if (hasError || warnings.length > 0) {
                console.groupCollapsed(`%c🎨 [Hierarchy Tree Widget #${that.widgetno}] CONTRAST VALIDATION`, 'color: #ff6b6b; font-weight: bold; font-size: 12px;');

                if (hasError) {
                    console.error(`%c🔴 CRITICAL CONTRAST ERRORS DETECTED`, 'color: #ff0000; font-weight: bold; font-size: 11px;');
                    errors.forEach(err => console.error(err));
                    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #ff6b6b;');
                }

                if (warnings.length > 0) {
                    console.warn(`%c⚠️  CONTRAST WARNINGS`, 'color: #ffa500; font-weight: bold; font-size: 11px;');
                    warnings.forEach(warn => console.warn(warn));
                }

                console.log(`%c💡 TIP: Ensure text/icon colors contrast with backgrounds for visibility`, 'color: #4dabf7; font-style: italic;');
                console.log(`   Selection Type: ${that.Selection_Type}`);
                console.log(`   Widget Instance: ${that.widgetno}`);
                console.groupEnd();
            }
        })();

        /*-------------------------- Check and Set Separator  ------------------------------------- */
        if (that.Separator) {
            _BuilderPanel[that.widgetno] = { Separator: that.Separator, Display: that.Display, Show_Display: that.Show_Display, Show_Parent: that.Show_Parent };
            var spart = that.Separator;
            var Selection = that.Display;
        } else {
            spart = _BuilderPanel[that.widgetno].Separator;
            Selection = _BuilderPanel[that.widgetno].Display;
        }

        if (logicMode === "flat") {
            // Use the flattened breadcrumb columns only
            const PATH_ID   = that.TEXTID_col;   // e.g., "FLATTENED_NODE_NAME"
            const PATH_DESC = that.TEXTDEC_col;  // e.g., "FLATTENED_NODE_DESC"
          
            // Optional passthrough fields
            const F1 = that.Field1_Name;
            const F2 = that.Field2_Name;
          
            // ---- normalize setdata to an array of rows ----
            const _raw = changedProperties.setdata ?? [];
            const _payload = Array.isArray(_raw) ? { data: _raw } : (_raw || {});
            const resultSetData = Array.isArray(_payload.data) ? _payload.data : [];
          
            // Helpers
            const getId    = x => (x && x.id != null ? String(x.id) : "");
            const getDesc  = x => (x && x.description != null ? String(x.description) : "");
            const norm     = s => String(s ?? "").trim();
            const split    = s => norm(s).split("->").map(x => x.trim()).filter(Boolean);
            const eq       = (a,b) => norm(a).toLowerCase() === norm(b).toLowerCase();
          
            // 1) Expand flattened breadcrumbs into level fields (L1..L8)
            function toLeveledRows(rows){
              const MAX = 8, out = [];
              for (const row of rows || []) {
                const ids   = split(getId(row?.[PATH_ID]));
                const descs = split(getDesc(row?.[PATH_DESC]));
                const levels = {};
                for (let i=1;i<=MAX;i++){
                  const idVal   = ids[i-1]   ?? "@NullMember";
                  const descVal = descs[i-1] ?? "(Null)";
                  levels[`L${i}_ID`]          = { id: idVal,   description: idVal,   properties: {} };
                  levels[`L${i}_DESCRIPTION`] = { id: descVal, description: descVal, properties: {} };
                }
                out.push({
                  ...levels,
                  ...(F1 ? { [F1]: row?.[F1] } : {}),
                  ...(F2 ? { [F2]: row?.[F2] } : {}),
                });
              }
              return out;
            }
          
            // Keep only meaningful levels, drop adjacent dupes
            function removeMatchingLevels(dataIn){
              const MAX=8, tidy=s=>String(s??"").trim();
              return (dataIn||[]).map(src=>{
                const keep={};
                for (let lvl=1; lvl<=MAX; lvl++){
                  const idKey=`L${lvl}_ID`, dsKey=`L${lvl}_DESCRIPTION`;
                  const idObj=src[idKey], dsObj=src[dsKey];
                  if (!idObj || !dsObj) continue;
                  const id=idObj.id, ds=dsObj.description;
                  if (!id || id==="@NullMember" || !ds || ds==="(Null)") continue;
                  if (lvl>1){
                    const pId=src[`L${lvl-1}_ID`]?.id;
                    const pDs=src[`L${lvl-1}_DESCRIPTION`]?.description;
                    if (tidy(pId)===tidy(id) && tidy(pDs)===tidy(ds)) continue;
                  }
                  keep[idKey]=idObj; keep[dsKey]=dsObj;
                }
                const res={}; for (const k in src) if (!k.startsWith("L")) res[k]=src[k];
                Object.assign(res, keep);
                return res;
              });
            }
          
            // 2) Build hierarchy purely from L1..L8 tokens (NO NODE_ID usage)
            function buildHierarchy(rows){
              const MAX=8;
              let hierarchy=[], createdNodes=[];
              filternode=[]; filterinfo=[];
          
              const makeNode = (id, desc, parentId, level, srcRow) => {
                const n = {
                  id, nodeid:id, nodedec:desc, text:desc,
                  nodeIdDec: `${id} - ${desc}`,
                  nodeUnique:id, parentId, level:String(level), nodes:[]
                };
                if (F1 && srcRow?.[F1]) n[F1] = getId(srcRow[F1]);
                if (F2 && srcRow?.[F2]) n[F2] = getId(srcRow[F2]);
                return n;
              };
          
              for (const item of rows || []){
                let cursor = hierarchy;
                let parentId = "root";
                let parentDesc = "root";
          
                for (let level=1; level<=MAX; level++){
                  const idKey=`L${level}_ID`, dsKey=`L${level}_DESCRIPTION`;
                  const lvlId = getId(item[idKey]);
                  const lvlDs = getDesc(item[dsKey]);
          
                  if (!lvlId || lvlId==="@NullMember" || !lvlDs || lvlDs==="(Null)") break;
          
                  // ensure/create node
                  let node = cursor.find(n => eq(n.id, lvlId));
                  if (!node){
                    node = makeNode(lvlId, lvlDs, parentId, level, item);
                    cursor.push(node);
                    createdNodes.push(node);
          
                    filternode.push(lvlId);
                    filterinfo.push({
                      IDNAME: lvlId,
                      NODEDEC: lvlDs,
                      NODEUNIQUE: lvlId,
                      LEVEL: String(level),
                      PARENTID: parentId,
                      PTDEC: parentDesc,
                      PTID: parentId,
                      PTIDNAME: parentId,
                      ...(F1 && item?.[F1] ? { GRANULARITY: getId(item[F1]) } : {}),
                      ...(F2 && item?.[F2] ? { BU:          getId(item[F2]) } : {})
                    });
                  }
          
                  // descend
                  cursor = node.nodes;
                  parentId = node.id;
                  parentDesc = node.nodedec;
                }
              }
          
              // Build filtervalue as “all descendant ids” per created node
              function collectAllChildrenIds(n){
                const ids=[]; for (const c of n.nodes||[]) { ids.push(c.id, ...collectAllChildrenIds(c)); } return ids;
              }
              filtervalue = createdNodes.map(n=>{
                const all = Array.from(new Set(collectAllChildrenIds(n)));
                return all.length ? all.join(",") : n.id;
              });
          
              // prune any null placeholders (defense)
              const prune = (nodes)=> (nodes||[]).reduce((acc,n)=>{
                if (!n?.id || n.id==="@NullMember" || n.text==="(Null)") return acc.concat(prune(n.nodes));
                acc.push({ ...n, nodes: prune(n.nodes) }); return acc;
              },[]);
              return prune(hierarchy);
            }
          
            if (resultSetData && resultSetData.length){
              const leveled = toLeveledRows(resultSetData);
              const cleaned = removeMatchingLevels(leveled);
              data = buildHierarchy(cleaned);
          
              // map your default `nodenm` (if provided) to positions by id token
              if (Array.isArray(nodenm)) {
                const indexById = new Map();
                let flat=[]; (function walk(arr){ for (const n of arr||[]){ if(!indexById.has(n.id)) indexById.set(n.id, flat.length); flat.push(n); walk(n.nodes);} })(data);
                dfnumber=[]; dfdesc=[];
                for (const id of nodenm){
                  const idx = indexById.get(String(id));
                  if (idx != null) { dfnumber.push(idx); dfdesc.push(flat[idx].nodedec || flat[idx].text || String(id)); }
                }
              }
            }
          }else { // parentChild (default)
            if (rowData && rowData.length > 0) {
                // ---- helpers / guards ----
                const getId   = (x) => (x && x.id != null ? x.id : undefined);
                const getDesc = (x) => (x && x.description != null ? x.description : undefined);
              
                // Build parent -> children index once (by PARENT unique id)
                const childrenByParentUnique = new Map(); // key: parent NODEUNIQUE (PI.id or 'root')
                for (let lvl = 0; lvl < rowData.length; lvl++) {
                  const layer = rowData[lvl] || [];
                  for (const rec of layer) {
                    const pUnique = getId(rec[PI]) || "root";
                    if (!childrenByParentUnique.has(pUnique)) childrenByParentUnique.set(pUnique, []);
                    childrenByParentUnique.get(pUnique).push(rec);
                  }
                }
              
                // Output collectors (assume these exist in your outer scope)
                // data, filternode, filtervalue, filterValueDesc, filterinfo, dfnumber, dfdesc, dfF1, dfF2, count, dfcount
                // nodenm, spart, Selection, TI, TD, LL, NI, PI, ND, Field1, Field2, F1, F2, that, _* arrays...
              
                const addDfIfMatch = (nodeid, nodedec, rec) => {
                  dfcount++;
                  if (Array.isArray(nodenm) && nodenm.includes(nodeid)) {
                    dfnumber.push(dfcount - 1);
                    dfdesc.push(nodedec);
                    if (F1 && rec[F1]) dfF1.push(getId(rec[F1]));
                    if (F2 && rec[F2]) dfF2.push(getId(rec[F2]));
                  }
                };
              
                const buildFilterInfo = (rec, parentRec, nodeid) => {
                  const obj = {
                    LEVEL:     getId(rec[LL]),
                    PARENTID:  getId(rec[PI]) ?? "root",
                    NODEUNIQUE:getId(rec[NI]),
                    NODEDEC:   getDesc(rec[ND]),                 // <-- use description
                    PTDEC:     parentRec ? getDesc(parentRec[TD]) : "root", // <-- description of parent
                    PTID:      parentRec ? getId(parentRec[TI])  : "root",
                    IDNAME:    nodeid,
                    PTIDNAME:  parentRec ? getId(parentRec[TI])  : "root",
                  };
                  if (Field1 && rec[Field1]) obj.GRANULARITY = getId(rec[Field1]);
                  if (Field2 && rec[Field2]) obj.BU          = getId(rec[Field2]);
                  return obj;
                };
              
                // Recursive builder: returns { node, leafIds[], leafDescs[] }
                const buildNode = (rec, parentRec = null) => {
                  const nodeid     = getId(rec[TI]);
                  const nodedec    = getDesc(rec[TD]);              // <-- use description
                  const nodeLL     = getId(rec[LL]);
                  const nodeUnique = getId(rec[NI]);
                  const nodeIdDec  = `${nodeid} ${spart} ${nodedec ?? ""}`.trim();
                  const selectionnode = { nodedec, nodeid, nodeIdDec };
              
                  const nodeObj = {
                    nodedec,
                    nodeid,
                    nodeIdDec,
                    text: selectionnode[Selection] ?? nodedec ?? nodeid, // safe fallback
                    nodeUnique: nodeUnique,
                    level: nodeLL,
                    nodes: [],
                  };
              
                  // Optional field mapping
                  if (F1 && rec[F1]) nodeObj[F1] = getId(rec[F1]);
                  if (F2 && rec[F2]) nodeObj[F2] = getId(rec[F2]);
              
                  // df* tracking
                  addDfIfMatch(nodeid, nodedec, rec);
              
                  // Build children
                  const kids = childrenByParentUnique.get(nodeUnique) || [];
                  let leafIds = [];
                  let leafDescs = [];
              
                  for (const childRec of kids) {
                    const { node: childNode, leafIds: childLeaves, leafDescs: childLeafDescs } = buildNode(childRec, rec);
                    nodeObj.nodes.push(childNode);
                    if (childLeaves.length) {
                      leafIds.push(...childLeaves);
                      leafDescs.push(...childLeafDescs);
                    }
                  }
              
                  // If no children, this node is a leaf
                  if (kids.length === 0) {
                    leafIds.push(nodeid);
                    leafDescs.push(nodedec); // <-- push description
                  }
              
                  // filterinfo + filter* lists for this node
                  filterinfo.push(buildFilterInfo(rec, parentRec, nodeid));
                  filternode.push(nodeid);
                  // Keep the leading comma behavior for backward compatibility
                  filtervalue.push(leafIds.length ? ("," + leafIds.join(",")) : "");
                  filterValueDesc.push(leafDescs.length ? ("," + leafDescs.join(",")) : ""); // <-- make sure you declared filterValueDesc
                  count++;
              
                  return { node: nodeObj, leafIds, leafDescs };
                };
              
                // Build roots from level 0
                data.length = 0;
                const roots = rowData[0] || [];
                for (const rootRec of roots) {
                  const { node } = buildNode(rootRec, null);
                  data.push(node);
                }
            }
        }
        
        // Publish results
        _filternode[that.widgetno - 1]     = filternode;
        _filtervalue[that.widgetno - 1]     = filtervalue;
        // _filterValueDesc[that.widgetno - 1] = filterValueDesc;
        _filterinfo[that.widgetno - 1]      = filterinfo;
        _dfnumber[that.widgetno - 1]        = dfnumber;
        _setModeInfo[that.widgetno]         = 1;
        _dfdesc[that.widgetno - 1]          = dfdesc;
        _dfF1[that.widgetno]                = dfF1;
        _dfF2[that.widgetno]                = dfF2;

        /*--------------------------------------------------------------------------------------------------------------- */
        /*-------------------------------- End: Data from SAC and prepare for JSON Model -------------------------------- */
        /*--------------------------------------------------------------------------------------------------------------- */

        div = document.createElement('div');
        div.slot = "content_" + widgetName;

        if(that.Selection_Type == "SingleSelectLeft" || that.Selection_Type == "undefined"){
            that.Selection_Type = "SingleSelectMaster";
        }

        /*--------------------------  Set Display to Chosse ID,DEC,ID-DEC at Runtime ------------------------------------- */
        if (that.Show_Display === "Yes") {
            var Selelect_List = '<Select width="45%" selectedKey="' + changedProperties.Display + '"  change="handleSelectChange"> <items> <core:Item key="nodeid" text="ID" /> <core:Item key="nodedec" text="DESCRIPTION" /> <core:Item key="nodeIdDec" text="ID-DESCRIPTION" /> </items></Select>'
            var WD = `45%`;
        }
        else {
            Selelect_List = "";
            WD = `90%`;
        }

        let div0 = document.createElement('div');

        div0.innerHTML = '<script id="oView' + widgetName + '" name="oView' + widgetName + '" type="sapui5/xmlview"><mvc:View controllerName="myView.Template" xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc"  xmlns="sap.m"><Tree class=""  id="Tree"  items="{' + widgetName + '>/}" mode="MultiSelect"  selectionChange="onSelect" includeItemInSelection="true" updateFinished="onDefaultSelection"><headerToolbar><OverflowToolbar> ' + Selelect_List + ' <Input width="' + WD + '" placeholder="Type to search" value="{search/query}" liveChange="onLiveChange" /></OverflowToolbar></headerToolbar><StandardTreeItem title="{' + widgetName + '>text}" selected="{selected}"/></Tree></mvc:View></script>';
        _shadowRoot.appendChild(div0);

        if (that._firstConnection === 1) {
        } else {
            let div2 = document.createElement('div');
            let max_height_test;
            if(that.max_height && that.unit_option){
                // Cap max-height at 70% even if that.max_height is 100%
                if (that.unit_option === "%" && that.max_height > 70) {
                    max_height_test = "70%";
                } else {
                    max_height_test = that.max_height + that.unit_option;
                }
            }else {
                max_height_test = "70%";
            }
            div2.innerHTML = '<div style="max-height: '+max_height_test+'; border-radius: 15px;" id="ui5_content_' + widgetName + '" name="ui5_content_' + widgetName + '"><div style="max-height: '+max_height_test+'; border-radius: 15px; overflow-y: auto;" id="ui5_content_' + widgetName + '" name="ui5_content_' + widgetName + '"><slot name="content_' + widgetName + '"> </slot></div></div>';
            _shadowRoot.appendChild(div2);
            that._firstConnection = 1;
        }
        that_.appendChild(div);

        var mapcanvas_divstr = _shadowRoot.getElementById('oView' + widgetName);

        Ar.push({
            'id': widgetName,
            'div': mapcanvas_divstr
        });

        sap.ui.getCore().attachInit(function () {
            "use strict";

            /*-------------------------- Controller Fucntion ------------------------------------- */

            sap.ui.define(['sap/ui/core/mvc/Controller',
                'sap/ui/model/json/JSONModel'],

                function (Controller, JSONModel) {
                    "use strict";

                    var PageController = Controller.extend("myView.Template", {
                        onInit: function (event) {
                            
                            widgetID.push(this.byId("Tree").oParent.sId);
                           
                           // ===== FIXED: Dynamic instance tracking =====
                           if (that.widgetno) {
                            const treeId = widgetID[that.widgetno - 1] + "--Tree";
                            const tree = sap.ui.getCore().byId(treeId);

                            // ===== FIX: Only clear selections if NOT re-initializing with default selection =====
                            // Check if there are default selections to apply (stored in _dfnumber)
                            const hasDefaultSelections = _dfnumber[that.widgetno - 1] && _dfnumber[that.widgetno - 1].length > 0;

                            if (initWidgetState.get(that.widgetno) && tree?.getSelectedItems()?.length > 0) {
                                // Only clear if we're re-initializing AND no default selection will be applied
                                if (!hasDefaultSelections) {
                                    console.log('[CW] Clearing selections on re-init (no default selection)');
                                    tree.removeSelections();
                                } else {
                                    console.log('[CW] Skipping clear - default selection will be applied:', _dfnumber[that.widgetno - 1].length, 'items');
                                }
                            }

                            initWidgetState.set(that.widgetno, true);
                            ammountofWidgets++;
                        }

                        IDNum1[that.widgetno] = (IDNum1[that.widgetno] || 0) + 1;

                            /*-------------------------- Data assigned to Model For Tree Structure ------------------------------------- */

                            var oModel = new JSONModel(data);
                            let SizeLimitCW = filternode.length + 100;
                            
                            oModel.setSizeLimit(SizeLimitCW); // This set the amount of items that the dropdown shows (default value 100)
                            sap.ui.getCore().setModel(oModel, that.widgetName);

                        },

                        /* ------------------------------------- DefaultSelection at OnInitialization ------------------------------------- */
                        onDefaultSelection: function (event) {
                            //#region

                            let data_sap_icon_close = ""; //This is for the Add Button 
                            let data_sap_icon_open = ""; //This is for the Minus Button

                            
                            // let data_sap_icon_close = "";
                            // let data_sap_icon_open = "";

                            // ======================================================================================
                            // ======================================================================================
                            // ======================================================================================

                            if (that.Selection_Type == "MultiSelect"){
                                var style = document.createElement('style');
                                style.type = 'text/css';
                                style.innerHTML = '.sapMCb {position: absolute; right: 5px;}';
                                document.getElementsByTagName('head')[0].appendChild(style);
                            }

                            // ======================================================================================
                            // ======================================================================================
                            // ======================================================================================

                            // Optimized + safer version
                            let dynamicHeightCW = () => {
                                const ITEM_HEIGHT = 40;
                                const MIN_HEIGHT  = 88;
                                const EXTRA_PAD   = 50;
                                const tree = this.byId && this.byId("Tree");
                                if (!tree || !tree.$) {
                                    return;
                                }

                                const itemList = tree.$().find(".sapMTreeItemBase");
                                let displayedCount = 0;
                                for (let i = 0; i < itemList.length; i++) {
                                    const el = itemList[i];
                                    if (el?.classList?.contains("displayed")) displayedCount++;
                                    if (el && el.style && el.style.height !== `${ITEM_HEIGHT}px`) {
                                    el.style.height = `${ITEM_HEIGHT}px`;
                                    }
                                }
                                const sizeDynamicCW = Math.max(displayedCount * ITEM_HEIGHT + EXTRA_PAD, MIN_HEIGHT);

                                const divLayoutCommonWidget = that && that.parentNode;
                                if (!divLayoutCommonWidget) {
                                    return;
                                }

                                const divCommonWidgetPanelWrapper = divLayoutCommonWidget.parentNode;
                                const divCommonWidgetPanel        = divCommonWidgetPanelWrapper?.parentNode;
                                const divPanelComponentSection    = divCommonWidgetPanel?.parentNode;

                                // ===== FIX: Force style calculation to ensure SAC's styles are applied =====
                                // This ensures border and other styles are calculated before we modify elements
                                if (divCommonWidgetPanelWrapper) {
                                    window.getComputedStyle(divCommonWidgetPanelWrapper);
                                }
                                if (divCommonWidgetPanel) {
                                    window.getComputedStyle(divCommonWidgetPanel);
                                }

                                requestAnimationFrame(() => {
                                    if (divLayoutCommonWidget?.style) {
                                        divLayoutCommonWidget.style.overflowY = "auto";
                                    }
                                    if (divCommonWidgetPanelWrapper?.style) {
                                        divCommonWidgetPanelWrapper.style.visibility = "visible";
                                        divCommonWidgetPanelWrapper.style.display = "";
                                        divCommonWidgetPanelWrapper.style.overflowY = "auto";
                                    }
                                    if (divCommonWidgetPanel?.style) {
                                        let maxHeightValue = "70vh";

                                        // Cap max-height at 70vh even if that.max_height is 100%
                                        if (that && that.max_height && that.unit_option) {
                                            if (that.unit_option === "%" && that.max_height > 70) {
                                                maxHeightValue = "70vh";
                                            } else if (that.unit_option === "%") {
                                                maxHeightValue = `${that.max_height}vh`;
                                            } else {
                                                maxHeightValue = `${that.max_height}${that.unit_option}`;
                                            }
                                        }

                                        divCommonWidgetPanel.style.minWidth = "297px";
                                        divCommonWidgetPanel.style.maxHeight = maxHeightValue;
                                        divCommonWidgetPanel.style.minHeight = `${MIN_HEIGHT}px`;
                                        divCommonWidgetPanel.style.height = `min(${sizeDynamicCW}px, ${maxHeightValue})`;
                                        divCommonWidgetPanel.style.overflowY = "auto";
                                    }
                                    if (divPanelComponentSection?.style) {
                                        divPanelComponentSection.style.minWidth = "297px";
                                        divPanelComponentSection.style.maxHeight = "100%";
                                        divPanelComponentSection.style.minHeight = `${MIN_HEIGHT}px`;
                                        divPanelComponentSection.style.height    = "100%";
                                        divPanelComponentSection.style.visibility = "visible";
                                        divPanelComponentSection.style.opacity    = "";
                                    }
                                    const scriptParent    = (typeof mapcanvas_divstr !== "undefined") ? mapcanvas_divstr.parentNode : null;
                                    const shadowRootDiv   = scriptParent?.parentNode;
                                    const shadowPanelDiv2 = shadowRootDiv?.children?.item(2)?.firstChild?.firstChild;
                                    if (shadowPanelDiv2?.style) {
                                        shadowPanelDiv2.style.maxHeight = `${sizeDynamicCW}px`;
                                        shadowPanelDiv2.style.minHeight = `${MIN_HEIGHT}px`;
                                    }
                                });
                                return sizeDynamicCW;
                            };

                            // Set up MutationObserver to call dynamicHeightCW when CW becomes visible
                            if (that && that.parentNode) {
                                const divLayoutCommonWidget = that.parentNode;
                                const divCommonWidgetPanelWrapper = divLayoutCommonWidget.parentNode;
                                const divPanelComponentSection = divCommonWidgetPanelWrapper?.parentNode?.parentNode;

                                // Track previous visibility state
                                let wasVisible = false;
                                let debounceTimer = null;

                                const checkVisibility = () => {
                                    if (!divPanelComponentSection) return;

                                    const computedStyle = window.getComputedStyle(divPanelComponentSection);
                                    const isVisible = computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden';

                                    // Only call dynamicHeightCW when transitioning from hidden to visible
                                    if (isVisible && !wasVisible) {
                                        // Use setTimeout to ensure SAC has finished applying visibility changes
                                        setTimeout(() => {
                                            dynamicHeightCW();
                                        }, 100);
                                    }
                                    wasVisible = isVisible;
                                };

                                if (divPanelComponentSection) {
                                    const observer = new MutationObserver((mutations) => {
                                        // Debounce to avoid multiple rapid calls
                                        if (debounceTimer) clearTimeout(debounceTimer);
                                        debounceTimer = setTimeout(checkVisibility, 50);
                                    });

                                    observer.observe(divPanelComponentSection, {
                                        attributes: true,
                                        attributeFilter: ['style', 'class']
                                    });

                                    // Also observe parent elements in case SAC changes visibility there
                                    if (divPanelComponentSection.parentNode) {
                                        observer.observe(divPanelComponentSection.parentNode, {
                                            attributes: true,
                                            attributeFilter: ['style', 'class']
                                        });
                                    }
                                }
                            }

                            if(that.widgetno) {
                                // If document not ready doesn't run this function
                                if ( document.readyState !== 'complete' )  {
                                    return
                                }
                                
                                let node = [];
                                for (var i = 0; i < this.getView().byId("Tree").getItems().length; i++) {
                                    if (!node.includes(this.getView().byId("Tree").getItems()[i].getBindingContext(that.widgetName).getObject())){
                                        node.push(this.getView().byId("Tree").getItems()[i].getBindingContext(that.widgetName).getObject());
                                    }
                                }
                                let itemList = this.byId("Tree").$().find(".sapMTreeItemBase"); // Get the List of Items
                                const elementPartiallySelected = this.byId("Tree").$().find('.sapMCbMark');

                                // ===================================================================================
                                // ================================= SEARCH FUNCTION =================================
                                // ===================================================================================
                                
                                let nodeDescriptionSearch = [];
                                let nodeIdentifierSearch = [];
                                let searchStringID = [];
                                let searchStringDesc = [];
                                let consoleLabel = [];

                                // ================================ OPTIMIZED SEARCH ================================
                                (() => {
                                    const tree = this.byId && this.byId("Tree");
                                    if (!tree || !tree.$) return;
                                
                                    const root = tree.$();
                                    const searchBar = root.find("input.sapMInputBaseInner")[0];
                                    if (!searchBar || typeof searchBar.addEventListener !== "function" || !that?.widgetno) return;
                                
                                    // Cache DOM references
                                    const itemList = Array.from(root.find(".sapMTreeItemBase"));
                                    const contents = itemList.map(li => li.querySelector("div.sapMLIBContent"));
                                    const labels   = itemList.map(li => li.querySelector("label"));
                                
                                    // Data aliases
                                    const filterInfoList = filterinfo || [];
                                    const nodes = node || []; // [{ nodeid, nodedec }, ...] — same order as itemList
                                
                                    // ============================= Build fast lookup maps =============================
                                    const idToIndex  = new Map(nodes.map((n, i) => [n.nodeid, i]));
                                    const idToParent = new Map(filterInfoList.map(r => [r.IDNAME, r.PTIDNAME]));
                                    const idToLevel  = new Map(filterInfoList.map(r => [r.IDNAME, Number(r.LEVEL)]));
                                
                                    // =============================== Small DOM helpers ================================
                                    function hideAll() {
                                        for (let i = 0; i < itemList.length; i++) {
                                            const row = itemList[i];
                                            row.classList.add("disabled");
                                            row.classList.remove("displayed");
                                            // Clear inline display to let CSS control hidden state via classes
                                            row.style.display = "";
                                            const lbl = labels[i];
                                            if (lbl) {
                                                lbl.classList.remove("expanded");
                                                // don't force collapsed icon here; we set icons when showing relevant rows
                                            }
                                        }
                                    }
                                
                                    function showIndex(i, expand = true) {
                                        const row = itemList[i];
                                        const content = contents[i];
                                        if (!row || !content) return;
                                        row.classList.remove("disabled");
                                        row.classList.add("displayed");
                                        row.style.display = "flex";
                                        const lbl = labels[i];
                                        if (lbl) {
                                            lbl.setAttribute("data-sap-ui-icon-content", expand ? data_sap_icon_open : data_sap_icon_close);
                                            lbl.classList.toggle("expanded", !!expand);
                                            lbl.classList.toggle("collapsed", !expand);
                                        }
                                    }
                                
                                    // Walk up parents up to `maxDepth` (default 10, change as you like)
                                    function collectAncestors(ids, maxDepth = 10) {
                                        const result = new Set();
                                        let frontier = [...new Set(ids)];
                                        for (let depth = 0; depth < maxDepth && frontier.length; depth++) {
                                            const next = [];
                                            for (const id of frontier) {
                                                const p = idToParent.get(id);
                                                if (p && !result.has(p)) {
                                                    result.add(p);
                                                    next.push(p);
                                                }
                                            }
                                            frontier = next;
                                        }
                                        return result;
                                    }
                                
                                    // Show Level 1 + Level 2 by default (empty search)
                                    function showInitialLevels() {
                                        const toShow = [];
                                        for (const [id, lvl] of idToLevel) {
                                            if (lvl === 1 || lvl === 2) {
                                                const idx = idToIndex.get(id);
                                                if (idx != null) toShow.push([idx, lvl === 1]); // expand level 1, collapse level 2
                                            }
                                        }
                                        requestAnimationFrame(() => {
                                            hideAll();
                                            for (const [idx, expand] of toShow) showIndex(idx, expand);
                                            dynamicHeightCW?.();
                                        });
                                    }
                                
                                    // Main update
                                    function updateForSearch(raw) {
                                        const q = (raw || "").trim().toLowerCase();
                                    
                                        if (!q) {
                                            showInitialLevels();
                                            return;
                                        }
                                
                                        // 1) Find matches once
                                        const matchedIds = [];
                                        for (let i = 0; i < nodes.length; i++) {
                                            const { nodeid = "", nodedec = "" } = nodes[i] || {};
                                            if (nodeid.toLowerCase().includes(q) || nodedec.toLowerCase().includes(q)) {
                                            matchedIds.push(nodeid);
                                            }
                                        }
                                
                                        // 2) Gather ancestors (generic, not hard-coded to 10 blocks)
                                        const ancestorIds = collectAncestors(matchedIds, 10);
                                        const idsToShow = new Set([...matchedIds, ...ancestorIds]);
                                    
                                        // 3) Convert to indices
                                        const indices = [];
                                        for (const id of idsToShow) {
                                            const idx = idToIndex.get(id);
                                            if (idx != null) indices.push(idx);
                                        }
                                    
                                        // 4) Apply DOM changes in one frame
                                        requestAnimationFrame(() => {
                                            hideAll();
                                            for (const i of indices) showIndex(i, /*expand*/ true);
                                            dynamicHeightCW?.();
                                        });
                                    }
                                
                                    // Debounced input handler
                                    let t;
                                    const DEBOUNCE_MS = 200;
                                    searchBar.addEventListener("input", e => {
                                        clearTimeout(t);
                                        const val = e.target?.value || "";
                                        t = setTimeout(() => updateForSearch(val), DEBOUNCE_MS);
                                    });
                                
                                    // Initialize view to current input (or default)
                                    updateForSearch(searchBar.value || "");
                                })();
  

                                // ===================================================================================
                                // ================ This is to remove the animation from singleSelect ================
                                // ===================================================================================

                                if (that.Selection_Type == "SingleSelectLeft"){
                                    let sapMLIBSelectSingle = document.querySelectorAll('.sapMLIBSelectAnimation');
                                    if (sapMLIBSelectSingle){
                                        for (let i=0; i < sapMLIBSelectSingle.length; i++){
                                            if ( sapMLIBSelectSingle[i].classList.contains('sapMLIBSelectAnimation') ){
                                                sapMLIBSelectSingle[i].classList.remove('sapMLIBSelectAnimation');
                                            }
                                        }
                                    }
                                }

                                // ===================================================================================
                                // ========================= this is to hide flickering bug ==========================
                                // ===================================================================================

                                if(that.widgetno){
                                    let scriptParent = mapcanvas_divstr.parentNode; // This gets parent of mapcanvas script (its a div);
                                    let shadowRootDiv = scriptParent.parentNode; // This gets shadowroot;
                                    let shadowPanel = shadowRootDiv.firstChild; // This gets the 1st element of shadowroot (aka target that we want);
                                    if(that.widgetno){
                                        let stateCheck = setInterval(() => { // Creates a setInterval of 1sec to hide the content flicker;
                                            if (document.readyState === 'complete'){ // when document is loaded then removes the style
                                                clearInterval(stateCheck);
                                                shadowPanel.style.height = "0%";
                                                shadowPanel.style.position = "";
                                            }
                                        }, 2000)
                                    }
                                }

                                // ===================================================================================

                                if ( that.widgetno ){

                                    //====================================================================================
                                    partiallySelected();
                                    
                                    // ===================================================================================
                                    // ================================= Styling Options =================================
                                    // ===================================================================================
                                    
                                    var fbi = _FontStyle[that.widgetno];
                                    let disableParent = _ParentNodes[that.widgetno];
                                    let selectNodes = _SelectedNodes[that.widgetno];

                                    let iconSize = _iconSize[that.widgetno];
                                    let iconStyling = _IconStyling[that.widgetno];
                                    let defaultCBStyling = _DefaultCBStyling[that.widgetno];
                                    let selectedCBStyling = _SelectedCBStyling[that.widgetno];

                                    // ===================================================================================
                                    // =============================== SELECTION FUNCTION ================================
                                    // ===================================================================================

                                    if(!getSelection.includes(Selection)){
                                        getSelection.push(Selection);
                                    }
                                    if (Selection === "nodeIdDec"){
                                        if(!getSpart.includes(spart)){
                                            getSpart.push(spart);
                                        }
                                    }

                                    // ==================================================================================
                                    // == Onload get the default selected node and put parents also partially selected ==
                                    // ==================================================================================  
                                    // console.time("OnLoadSelection");
                                    
                                    // ======================= MULTI-SELECT ONLOAD: GENERIC & FAST =======================
                                    (() => {
                                        if (that?.Selection_Type !== "MultiSelect") return;

                                        const tree = this.byId && this.byId("Tree");
                                        if (!tree || !tree.$) return;

                                        const viewTree   = this.getView().byId("Tree");
                                        const uiItems    = viewTree.getItems();                            // UI5 ListItem controls
                                        const itemLis    = Array.from(tree.$().find("li.sapMTreeItemBase")); // DOM <li>
                                        const cbMarks    = Array.from(tree.$().find(".sapMCbMark"));         // checkbox marks

                                        const info  = filterinfo || []; // expects fields: NODEUNIQUE, PARENTID (parent's NODEUNIQUE), LEVEL (optional)
                                        const nodes = node || [];       // expects fields: nodeUnique, nodeid, nodes? (children array optional)

                                        // ------------------------------- Build/reuse cache -------------------------------
                                        // Reuse across features (search, selection) to avoid recompute.
                                        if (!that._treeCache) that._treeCache = {};

                                        const cache = that._treeCache;
                                        if (!cache.builtFor || cache.builtFor !== info.length + ":" + nodes.length) {
                                            const parentOf       = new Map(); // id -> parentId
                                            const childrenOf     = new Map(); // parentId -> [childId]
                                            const indexByUnique  = new Map(); // nodeUnique -> UI index
                                            const idSet          = new Set();

                                            // map nodeUnique -> UI index
                                            for (let i = 0; i < nodes.length; i++) {
                                                const key = nodes[i]?.nodeUnique;
                                                if (key != null) {
                                                    indexByUnique.set(key, i);
                                                    idSet.add(key);
                                                }
                                            }

                                            // parent/children from filterinfo
                                            for (let i = 0; i < info.length; i++) {
                                                const id  = info[i]?.NODEUNIQUE;
                                                const pid = info[i]?.PARENTID || null;
                                                if (!id) continue;
                                                parentOf.set(id, pid);
                                                if (!childrenOf.has(pid)) childrenOf.set(pid, []);
                                                childrenOf.get(pid).push(id);
                                                if (!childrenOf.has(id)) childrenOf.set(id, []); // ensure every node has an entry
                                                idSet.add(id);
                                            }

                                            cache.parentOf      = parentOf;
                                            cache.childrenOf    = childrenOf;
                                            cache.indexByUnique = indexByUnique;
                                            cache.idSet         = idSet;
                                            cache.builtFor      = info.length + ":" + nodes.length;
                                        }

                                        const { parentOf, childrenOf, indexByUnique } = cache;

                                        // ---------------------------- Gather default selection ---------------------------
                                        const SELECT_ALL_SENTINELS = new Set(["ALL_BRANDS_IM", "G_ALL_BRANDS"]);

                                        // Normalize default selected IDs to nodeUnique values
                                        const selectedIds = new Set();

                                        // IDs explicitly provided
                                        if (Array.isArray(that?.SelectedNodeId)) {
                                            for (const x of that.SelectedNodeId) selectedIds.add(String(x));
                                        }

                                        // Also support selected positions (dfnumber) if provided
                                        if (Array.isArray(dfnumber)) {
                                            for (const idx of dfnumber) {
                                                const key = nodes[idx]?.nodeUnique;
                                                if (key) selectedIds.add(key);
                                            }
                                        }

                                        // --- Select All path ---
                                        if ([...selectedIds].some(x => SELECT_ALL_SENTINELS.has(x))) {
                                            requestAnimationFrame(() => {
                                                for (let i = 0; i < uiItems.length; i++) {
                                                    uiItems[i].setSelected(true);
                                                    cbMarks[i]?.classList.remove("sapMCbMarkPartiallyChecked");
                                                }
                                                dynamicHeightCW?.();
                                            });
                                            return;
                                        }

                                        // --------------------------- Tri-state computation (generic) ---------------------
                                        // Start with: selected nodes = explicit defaults + all their descendants
                                        const fullySelected = new Set();
                                        const partially     = new Set();

                                        function addWithDescendants(id) {
                                            if (!id || fullySelected.has(id)) return;
                                            fullySelected.add(id);
                                            const kids = childrenOf.get(id);
                                            if (kids && kids.length) {
                                            for (const c of kids) addWithDescendants(c);
                                            }
                                        }
                                        for (const id of selectedIds) addWithDescendants(id);

                                        // Bottom-up fixpoint: mark parents as full/partial based on children
                                        let changed = true;
                                        while (changed) {
                                            changed = false;
                                            for (const [parent, kids] of childrenOf.entries()) {
                                            if (!parent || !kids || kids.length === 0) continue;

                                            let selCnt = 0;
                                            let anyPartial = false;
                                            for (const k of kids) {
                                                if (fullySelected.has(k)) selCnt++;
                                                if (partially.has(k)) anyPartial = true;
                                            }

                                            const allSel   = selCnt === kids.length;
                                            const someSel  = selCnt > 0 || anyPartial;

                                            if (allSel && !fullySelected.has(parent)) {
                                                fullySelected.add(parent);
                                                partially.delete(parent);
                                                changed = true;
                                            } else if (!allSel && someSel && !partially.has(parent) && !fullySelected.has(parent)) {
                                                partially.add(parent);
                                                changed = true;
                                            } else if (!someSel && partially.has(parent)) {
                                                partially.delete(parent);
                                                changed = true;
                                            }
                                            }
                                        }

                                        // ------------------------------ Apply to UI in one go ----------------------------
                                        requestAnimationFrame(() => {
                                            for (let i = 0; i < uiItems.length; i++) {
                                                const key = nodes[i]?.nodeUnique;
                                                const isFull = key && fullySelected.has(key);
                                                const isPart = key && partially.has(key) && !isFull;

                                                uiItems[i].setSelected(!!isFull);
                                                const mark = cbMarks[i];
                                                if (mark) {
                                                    // Only show partial if not fully selected
                                                    mark.classList.toggle("sapMCbMarkPartiallyChecked", !!isPart);
                                                }
                                            }
                                            dynamicHeightCW?.();
                                        });
                                    })();

                                    // ===================================================================================
                                    // === Onload make the DefaultLevel / Collapse and Expand Nodes custom Interaction ===
                                    // ===================================================================================

                                    // ========================= Generic default-level layout (with safe cache) =========================
                                    (() => {
                                        if (!that?.widgetno || !that?.Selection_Type) return;
                                    
                                        const tree = this.byId && this.byId("Tree");
                                        if (!tree || !tree.$) return;
                                    
                                        const $root   = tree.$();
                                        const itemLis = Array.from($root.find("li.sapMTreeItemBase"));
                                        const nodes   = Array.isArray(node) ? node : [];
                                        const info    = Array.isArray(filterinfo) ? filterinfo : [];
                                    
                                        // Hide native UI5 expanders once
                                        const $nativeExpanders = $root.find(".sapMTreeItemBaseExpander");
                                        if ($nativeExpanders && $nativeExpanders.length) {
                                        $nativeExpanders.css({ "pointer-events": "none", "display": "none" });
                                        }
                                    
                                        // ---------- Helper to ensure (or rebuild) shared cache pieces safely ----------
                                        function ensureTreeCache(host, infoList, nodeList) {
                                        if (!host._treeCache) host._treeCache = {};
                                        const c = host._treeCache;
                                    
                                        // indexById (nodeUnique -> UI index)
                                        const needIndex =
                                            !c.indexById ||
                                            c._idxForLen !== (nodeList?.length || 0);
                                        if (needIndex) {
                                            c.indexById = new Map();
                                            for (let i = 0; i < (nodeList?.length || 0); i++) {
                                            const id = nodeList[i]?.nodeUnique;
                                            if (id != null) c.indexById.set(id, i);
                                            }
                                            c._idxForLen = nodeList?.length || 0;
                                        }
                                    
                                        // levelOf (NODEUNIQUE -> numeric LEVEL)
                                        const needLevels =
                                            !c.levelOf ||
                                            c._levelsForLen !== (infoList?.length || 0);
                                        if (needLevels) {
                                            c.levelOf = new Map();
                                            for (const r of (infoList || [])) {
                                            if (r && r.NODEUNIQUE != null) {
                                                c.levelOf.set(r.NODEUNIQUE, Number(r.LEVEL) || 0);
                                            }
                                            }
                                            c._levelsForLen = infoList?.length || 0;
                                        }
                                    
                                        // (Optional) parent/children maps could be ensured here too if you use them elsewhere.
                                    
                                        return c;
                                        }
                                    
                                        const cache = ensureTreeCache(that, info, nodes);
                                    
                                        // Custom expander labels (create once per row if missing)
                                        const data_sap_icon_close = ""; // add
                                        const data_sap_icon_open  = ""; // minus
                                        const labels = itemLis.map(li => {
                                        let lbl = li.querySelector("label.sapMTreeItemBaseExpander.unselectable");
                                        if (!lbl) {
                                            lbl = document.createElement("label");
                                            lbl.setAttribute("role", "presentation");
                                            lbl.setAttribute("aria-hidden", "true");
                                            lbl.setAttribute("title", "Collapse/Expand");
                                            lbl.setAttribute("data-sap-ui", "expander");
                                            lbl.setAttribute("unselectable", "on");
                                            lbl.className = "sapUiIcon sapUiIconMirrorInRTL sapUiIconPointer sapMTreeItemBaseExpander unselectable";
                                            li.prepend(lbl);
                                        }
                                        // Styling hooks you used before
                                        lbl.style.fontFamily = "SAP-icons";
                                        lbl.style.pointerEvents = "all";
                                        if (Array.isArray(iconSize))    lbl.style.fontSize = iconSize[0];
                                        if (Array.isArray(iconStyling)) lbl.style.color    = iconStyling[0];
                                        return lbl;
                                        });
                                    
                                        const defaultLevel = Number(Default_Level) || 1;

                                        // One paint-friendly pass
                                        requestAnimationFrame(() => {
                                        const isSingleSelect = (that.Selection_Type === "SingleSelectLeft" || that.Selection_Type === "SingleSelectMaster");

                                        for (let i = 0; i < itemLis.length; i++) {
                                            const li  = itemLis[i];
                                            const lbl = labels[i];
                                            const id  = nodes[i]?.nodeUnique;

                                            // Safe level read: prefer cache.levelOf, fallback to node[i].level
                                            const lvlFromCache = id != null ? cache.levelOf.get(id) : undefined;
                                            const lvl = (lvlFromCache ?? Number(nodes[i]?.level) ?? 0);

                                            // Indentation: 0rem for level 1, +1rem per level
                                            const content = li.querySelector("div.sapMLIBContent");
                                            const labelWrapper = content?.parentNode?.firstChild;
                                            if (labelWrapper && Number.isFinite(lvl)) {
                                            labelWrapper.style.paddingLeft = `${Math.max(0, (lvl || 0) - 1)}rem`;
                                            }

                                            // Visibility by defaultLevel (always set this)
                                            const show = lvl && lvl <= defaultLevel;
                                            li.classList.toggle("displayed", !!show);
                                            li.classList.toggle("disabled", !show);

                                            // Icon state (skip for SingleSelect - it handles its own icons later)
                                            if (!isSingleSelect && lbl) {
                                                const opened = show && lvl < defaultLevel; // parents open, boundary collapsed
                                                lbl.setAttribute("data-sap-ui-icon-content", opened ? data_sap_icon_open : data_sap_icon_close);
                                                lbl.classList.toggle("expanded", opened);
                                                lbl.classList.toggle("collapsed", !opened);
                                            }
                                        }
                                        dynamicHeightCW?.();
                                        });
                                    })();

                                    // ===================================================================================
                                    // =================== Put the Hierarchy Displayed of Selected Node ==================
                                    // ===================================================================================
                                    
                                    // ============================ Helpers / Cache (safe) ============================
                                    (() => {
                                        const tree = this.byId && this.byId("Tree");
                                        if (!tree || !tree.$) return;
                                    
                                        const $root    = tree.$();
                                        const itemLis  = Array.from($root.find("li.sapMTreeItemBase"));
                                        const uiItems  = this.getView().byId("Tree").getItems();
                                        const cbMarks  = Array.from($root.find(".sapMCbMark"));
                                        const nodes    = Array.isArray(node) ? node : [];
                                        const info     = Array.isArray(filterinfo) ? filterinfo : [];
                                    
                                        // Fallback icons if globals aren’t defined here
                                        const ICON_OPEN  = (typeof data_sap_icon_open  !== "undefined") ? data_sap_icon_open  : "";
                                        const ICON_CLOSE = (typeof data_sap_icon_close !== "undefined") ? data_sap_icon_close : "";
                                    
                                        // One-time label cache (fast)
                                        const labels = itemLis.map(li => li.querySelector("label"));
                                    
                                        // Build/reuse shared cache
                                        function ensureTreeCache(host, infoList, nodeList) {
                                            if (!host._treeCache) host._treeCache = {};
                                            const c = host._treeCache;
                                    
                                            // nodeUnique -> UI index
                                            if (!c.indexById || c._idxLen !== (nodeList?.length || 0)) {
                                                c.indexById = new Map();
                                                for (let i = 0; i < (nodeList?.length || 0); i++) {
                                                    const id = nodeList[i]?.nodeUnique;
                                                    if (id != null) c.indexById.set(id, i);
                                                }
                                                c._idxLen = nodeList?.length || 0;
                                            }
                                    
                                            // parent/children maps from filterinfo
                                            if (!c.parentOf || !c.childrenOf || c._infoLen !== (infoList?.length || 0)) {
                                                const parentOf   = new Map();
                                                const childrenOf = new Map();
                                                for (const r of (infoList || [])) {
                                                    const id = r?.NODEUNIQUE;
                                                    if (!id) continue;
                                                    const p  = r?.PARENTID ?? null;
                                                    parentOf.set(id, p);
                                                    if (!childrenOf.has(p)) childrenOf.set(p, []);
                                                    childrenOf.get(p).push(id);
                                                    if (!childrenOf.has(id)) childrenOf.set(id, []);
                                                }
                                                c.parentOf   = parentOf;
                                                c.childrenOf = childrenOf;
                                                c._infoLen   = infoList?.length || 0;
                                            }
                                            return c;
                                        }
                                    
                                        const { indexById, parentOf, childrenOf } = ensureTreeCache(that, info, nodes);
                                    
                                        // Small DOM utilities
                                        function showIndex(i) {
                                            const li = itemLis[i]; if (!li) return;
                                            li.classList.add("displayed");
                                            li.classList.remove("disabled");
                                            const content = li.querySelector("div.sapMLIBContent");
                                            if (content && content.parentNode) content.parentNode.style.display = "flex";
                                        }
                                        function iconOpen(i) {
                                            const lbl = labels[i]; if (!lbl) return;
                                            lbl.setAttribute("data-sap-ui-icon-content", ICON_OPEN);
                                            lbl.classList.remove("collapsed");
                                            lbl.classList.add("expanded");
                                        }
                                        function iconClose(i) {
                                            const lbl = labels[i]; if (!lbl) return;
                                            lbl.setAttribute("data-sap-ui-icon-content", ICON_CLOSE);
                                            lbl.classList.add("collapsed");
                                            lbl.classList.remove("expanded");
                                        }
                                    
                                        // ==============================================================================
                                        // ================ A) MultiSelect: show children of partial rows ===============
                                        // ==============================================================================
                                        if (that.Selection_Type === "MultiSelect") {
                                            requestAnimationFrame(() => {
                                                for (let i = 0; i < cbMarks.length; i++) {
                                                    const mark = cbMarks[i];
                                                    if (!mark) continue;
                                                    if (mark.classList.contains("sapMCbMarkPartiallyChecked")) {
                                                        iconOpen(i); // open this parent
                                                        const pid  = nodes[i]?.nodeUnique;
                                                        const kids = pid != null ? (childrenOf.get(pid) || []) : [];
                                                        for (const childId of kids) {
                                                            const idx = indexById.get(childId);
                                                            if (idx != null) showIndex(idx);
                                                        }
                                                    }
                                                }
                                            });
                                        }
                                    
                                        // ==============================================================================
                                        // ======= B) SingleSelect: expand ancestors & show their direct children =======
                                        // ==============================================================================
                                        if (that.Selection_Type === "SingleSelectLeft" || that.Selection_Type === "SingleSelectMaster") {
                                            // Find first selected index
                                            let selIndex = -1;
                                            for (let i = 0; i < uiItems.length; i++) {
                                                if (uiItems[i]?.mProperties?.selected) { selIndex = i; break; }
                                            }
                                            if (selIndex < 0) return;

                                            const selId = nodes[selIndex]?.nodeUnique;

                                            // Climb ancestors
                                            const ancestors = [];
                                            let p = parentOf.get(selId);
                                            while (p) { ancestors.push(p); p = parentOf.get(p); }

                                            // First, show the hierarchy immediately (visibility)
                                            requestAnimationFrame(() => {
                                                // Expand all ancestors, make sure they're visible
                                                for (const aid of ancestors) {
                                                    const idx = indexById.get(aid);
                                                    if (idx != null) { showIndex(idx); }
                                                }

                                                // Show every ancestor's direct children (siblings at each level)
                                                const shown = new Set();
                                                for (const aid of ancestors) {
                                                    const kids = childrenOf.get(aid) || [];
                                                    for (const cid of kids) {
                                                        const idx = indexById.get(cid);
                                                        if (idx != null && !shown.has(idx)) {
                                                            shown.add(idx);
                                                            showIndex(idx);
                                                        }
                                                    }
                                                }

                                                // Ensure the selected row is visible
                                                showIndex(selIndex);
                                            });

                                                        // Then set icons with delay (to run after DefaultLevel)
                                            setTimeout(() => {
                                                let collapsedCount = 0, expandedCount = 0;
                                                // First, set ALL displayed nodes to collapsed (plus icon)
                                                for (let i = 0; i < itemLis.length; i++) {
                                                    if (itemLis[i]?.classList.contains("displayed") && labels[i]) {
                                                        labels[i].classList.add("collapsed");
                                                        labels[i].classList.remove("expanded");
                                                        labels[i].setAttribute("data-sap-ui-icon-content", "");
                                                        collapsedCount++;
                                                    }
                                                }

                                                // Then override: ancestors get expanded (minus icon)
                                                for (const aid of ancestors) {
                                                    const idx = indexById.get(aid);
                                                    if (idx != null && labels[idx]) {
                                                        labels[idx].classList.add("expanded");
                                                        labels[idx].classList.remove("collapsed");
                                                        labels[idx].setAttribute("data-sap-ui-icon-content", "");
                                                        expandedCount++;
                                                    }
                                                }
                                                console.log(`[SingleSelect Icons] Collapsed: ${collapsedCount}, Expanded: ${expandedCount}`);
                                            }, 200); // Delayed to run after DefaultLevel
                                        }
                                    })();

                                    // ===================================================================================
                                    // =================== Put the Hierarchy Displayed of Selected Node ==================
                                    // ===================================================================================

                                    // Call the globally defined defaultLevelFunction
                                    // FIX: Pass the current widget instance instead of using the last one
                                    if (typeof defaultLevelFunction === 'function') {
                                        defaultLevelFunction(that);
                                    }

                                    // ---------- tiny helpers ----------
                                    const reverseObject = (obj) =>
                                        Array.isArray(obj) ? [...obj].reverse() : Object.values(obj).reverse();
                                    
                                    // Keep identity-based uniqueness exactly like your original .includes on objects
                                    if (!results.includes(filterinfo)) results.push(filterinfo);
                                    
                                    // ---------- build widget arrays in a single pass ----------
                                    const count = Math.min(_filterinfo?.length || 0, widgetID?.length || 0);
                                    
                                    // Ensure holder arrays exist
                                    thisTree             = Array.isArray(thisTree) ? thisTree : [];
                                    thatWidgetName       = Array.isArray(thatWidgetName) ? thatWidgetName : [];
                                    thatWidgetLevel      = Array.isArray(thatWidgetLevel) ? thatWidgetLevel : [];
                                    thatWidget           = Array.isArray(thatWidget) ? thatWidget : [];
                                    thatMapcanvas_divstr = Array.isArray(thatMapcanvas_divstr) ? thatMapcanvas_divstr : [];
                                    
                                    // temp lookup to resolve “that.widgetName -> index” in O(1)
                                    const nameToIndex = new Map();
                                    
                                    for (let i = 0; i < count; i++) {
                                        const id   = widgetID[i];
                                        const tree = sap.ui.getCore().byId(id + "--Tree");
                                        if (tree && !thisTree[i]) thisTree[i] = tree;
                                    
                                        const modelName = tree?.mBindingInfos?.items?.model;
                                        if (modelName) {
                                        thatWidgetName[i] = modelName;
                                        nameToIndex.set(modelName, i);
                                        }
                                        if (thatWidgetLevel[i] == null) thatWidgetLevel[i] = Default_Level;
                                    }
                                    
                                    // Map current widget instance to its slot (by name), once
                                    {
                                        const ix = nameToIndex.get(that.widgetName);
                                        if (ix != null) {
                                        thatWidget[ix] = that;
                                        thatMapcanvas_divstr[ix] = mapcanvas_divstr;
                                        }
                                    }
                                    
                                    // ===================================================================================
                                    // ==== EventListener - (De)Selection of Children / PartiallySelection of Parents ====
                                    // ===================================================================================
                                    // #region
                                    this.byId("Tree").onclick = e => {
                                        let target = "";
                                        target = e.target || e.srcElement; // This is the target element

                                        if (target.id.includes("toolbar")) {

                                        } else if (target.tagName.toUpperCase() == 'DIV' && that.Selection_Type == "MultiSelect" || target.tagName.toUpperCase() == 'LI' && that.Selection_Type == "MultiSelect") {

                                            let targetParent = "";
                                            targetParent = target.parentNode; // This is the targeted LI
                                            let listItemsNode = "";
                                            listItemsNode = targetParent.parentNode; // This is the UL
                                            let listItemChild = "";
                                            listItemChild = listItemsNode.children; // This is the Collection of LI
                                            let targetParentChild = "";
                                            targetParentChild = targetParent.children; // This is the Div 
                                            let listChild = "";
                                            listChild = target.children;

                                            let clickedNode = "";
                                            let clickedLabel = "";
                                            let clickedLI = "";
                                            let clickedChild = "";
                                            
                                            // This if gets the text of the selected Node
                                            if (target.tagName.toUpperCase() == 'DIV' || target.tagName.toUpperCase() == 'LI' ){
                                                if (target.classList.contains('sapMCbBg')){
                                                    clickedLI = listItemsNode;
                                                }else if (target.classList.contains('sapMLIBSelectM')){
                                                    clickedLI = targetParent;
                                                } else if (target.classList.contains('sapMTreeItemBase')){
                                                    clickedLI = target;
                                                }else {
                                                    clickedLI = target.parentNode;
                                                }
                                            }
                                            let clickedUL = clickedLI.parentNode;
                                            const index = [...clickedUL.children].findIndex(item => item === clickedLI);
                                            clickedNode = node[index].nodeUnique;
                                            // ===================================================================================

                                            const itemList = this.byId("Tree").$().find("li.sapMTreeItemBase"); // Get the List of Items
                                            const baseItem = this.byId("Tree").$().find('.sapMTreeItemBase');

                                            // ===================================================================================
                                            // ========================   =============================   ========================
                                            // ===================================================================================

                                            let filterNodeList = filternode; // Gets the array for the List Item
                                            let filterValueList = filtervalue; // Gets the array for the children
                                            let filterInfoList = filterinfo; // Gets the array of all info

                                            let nodeDesc = [];
                                            let nodeLevelAllNodes = [];
                                            let allNodes = [];

                                            for (let i=0; i < filterInfoList.length; i++){
                                                nodeDesc.push(filterInfoList[i].NODEUNIQUE);
                                                nodeLevelAllNodes.push(filterInfoList[i].LEVEL)
                                            }
                                            for (let i=0; i < nodeLevelAllNodes.length; i++){
                                                if(nodeLevelAllNodes[i] == "1"){
                                                    allNodes.push(filterInfoList[i]);
                                                }
                                            }

                                            let allNodesNames;
                                            if(allNodes.length === 1){
                                                allNodesNames = allNodes[0].IDNAME;
                                            }

                                            if (node[index].nodeid.includes("ALL_BRANDS_IM") || node[index].nodeid.includes("G_ALL_BRANDS") || node[index].nodeid.includes(allNodesNames) ){
                                                let clickedItem = "";
                                                let clickedPosition = "";

                                                let elementPartiallySelected = this.byId("Tree").$().find('.sapMCbMark');
                                                for (let m=0; m < node.length; m++){
                                                    // let filteredList = itemList[m].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                    if (node[m].nodeUnique == clickedNode ){
                                                        clickedPosition = m;
                                                        clickedItem = this.getView().byId("Tree").getItems()[m];
                                                    }
                                                }
                                                
                                                if ( clickedItem.mProperties.selected == false ){
                                                    for (let i=1; i < itemList.length; i++){
                                                        this.getView().byId("Tree").getItems()[i].setSelected(true); // set selection of Parent Node to false
                                                        elementPartiallySelected[i].classList.remove("sapMCbMarkPartiallyChecked");
                                                        // this.byId("Tree").$().find('.sapMLIB.sapMLIBSelected').css({ "background-color": + "rgb" + selectNodes[3] })[i];
                                                    }
                                                }else {
                                                    for (let i=1; i < itemList.length; i++){
                                                        this.getView().byId("Tree").getItems()[i].setSelected(false); // set Selected to the elements that we want
                                                        elementPartiallySelected[i].classList.remove("sapMCbMarkPartiallyChecked");
                                                        // this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase').css({ "background-color": "transparent" })[i];
                                                    }
                                                }
                                            }else {
                                                // =======================================================================================================
                                                // ========================= This is for Appending all the Children (LEAF NODES) =========================
                                                // =======================================================================================================
                                                
                                                //#region 
                                                // ============================ Helpers & precomputed lookups =============================
                                                const uniq = arr => Array.from(new Set((arr || []).filter(Boolean)));

                                                const toTokens = (value) => {
                                                    // filterValueList entries can be arrays or comma/space delimited strings
                                                    // Normalize to a token array like your original logic.
                                                    if (Array.isArray(value)) return value.flat().map(String).filter(Boolean);
                                                    const s = String(value ?? "");
                                                    return s.replaceAll(",", " ").trim().split(/(\s+)/).filter(t => String(t).trim());
                                                };

                                                // Map: lower(nodeDesc) -> [positions]
                                                const posByDescLower = new Map();
                                                // Map: exact nodeDesc -> [positions] (used for parent climbing where you compared exact equality)
                                                const posByDescExact = new Map();

                                                // Parse all children once: index -> [tokens]
                                                const childrenTokensByIndex = new Map();

                                                // Quick: node token -> filterInfo (aligns filterNodeList & filterInfoList)
                                                const infoByToken = new Map();
                                                for (let i = 0; i < filterNodeList.length; i++) {
                                                    infoByToken.set(filterNodeList[i], filterInfoList[i]);
                                                }

                                                const fieldPresence = {
                                                    nodeid: 0, nodeUnique: 0, id: 0, IDNAME: 0,
                                                    "NODE_ID.id": 0, NODE_ID: 0, "NODE_NAME.id": 0, NODE_NAME: 0,
                                                    text: 0, nodeIdDec: 0
                                                };
                                                for (let i = 0; i < nodeDesc.length; i++) {
                                                    const desc = nodeDesc[i];
                                                    const lower = String(desc ?? "").toLowerCase();

                                                    if (!posByDescLower.has(lower)) posByDescLower.set(lower, []);
                                                    posByDescLower.get(lower).push(i);

                                                    if (!posByDescExact.has(desc)) posByDescExact.set(desc, []);
                                                    posByDescExact.get(desc).push(i);

                                                    childrenTokensByIndex.set(i, toTokens(filterValueList[i]));
                                                }

                                                // =============================== 1) Seed: clicked matches ===============================
                                                const clickedLower = String(clickedNode || "").toLowerCase();
                                                const labelLower   = String(clickedLabel || "").toLowerCase();

                                                const appendFilters = uniq([
                                                    ...(posByDescLower.get(clickedLower) || []),
                                                    ...(posByDescLower.get(labelLower)   || []),
                                                ]);

                                                // =============================== 2) Leaf children (NODEUNIQUE) ==========================
                                                const childrenTokens = uniq(appendFilters.flatMap(i => childrenTokensByIndex.get(i) || []));
                                                const uniquePullChildren = uniq(childrenTokens.map(t => infoByToken.get(t)?.NODEUNIQUE));

                                                // =============================== 3) Direct parents of clicked ===========================
                                                const uniquePullParent = uniq(appendFilters.map(i => filterInfoList[i]?.PARENTID));

                                                // =============================== 4) Parents of those children ===========================
                                                const uniquePullChildrenParent = uniq(childrenTokens.map(t => infoByToken.get(t)?.PARENTID));

                                                // =============================== 5) Climb up to the 10th parent =========================
                                                // Generic parent-climb using the exact nodeDesc matches you used in later steps.
                                                const climbParents = (startIds, maxDepth) => {
                                                    const levels = [];
                                                    let current = uniq(startIds);

                                                    for (let depth = 0; depth < maxDepth && current.length; depth++) {
                                                        levels.push(current);
                                                        const next = new Set();

                                                        for (const pid of current) {
                                                            const positions = posByDescExact.get(pid) || [];
                                                            for (const pos of positions) {
                                                                const info = filterInfoList[pos];
                                                                if (info?.PARENTID) next.add(info.PARENTID);
                                                            }
                                                        }
                                                        current = Array.from(next);
                                                    }
                                                    return levels;
                                                };

                                                // Starting from the parents of the children, climb up 9 more generations:
                                                const parentLevels = climbParents(uniquePullChildrenParent, 9);

                                                // Unpack for compatibility with your previous variable names:
                                                const [
                                                    uniquePullParentParent = [],
                                                    uniquePull3rdParent    = [],
                                                    uniquePull4thParent    = [],
                                                    uniquePull5thParent    = [],
                                                    uniquePull6thParent    = [],
                                                    uniquePull7thParent    = [],
                                                    uniquePull8thParent    = [],
                                                    uniquePull9thParent    = [],
                                                    uniquePull10thParent   = []
                                                ] = parentLevels;

                                                // =============================== Done ====================================================
                                                // At this point you have:
                                                // - uniquePullChildren
                                                // - uniquePullParent
                                                // - uniquePullChildrenParent
                                                // - uniquePullParentParent .. uniquePull10thParent

                                                //#endregion

                                                // ========================================================================================
                                                // ================================= This is the ItemList =================================
                                                // ========================================================================================
                                                
                                                if (target.tagName.toUpperCase() == 'LI' || target.tagName.toUpperCase() == 'DIV' && that.Selection_Type == "MultiSelect") {
                                                    let elementPartiallySelected = this.byId("Tree").$().find('.sapMCbMark');

                                                    let clickedItem = "";
                                                    let clickedPosition = "";
                                                    for (let m=0; m < node.length; m++){
                                                        // let filteredList = itemList[m].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                        if (node[m].nodeUnique == clickedNode ){
                                                            clickedPosition = m;
                                                            clickedItem = this.getView().byId("Tree").getItems()[m];
                                                        }
                                                    }
                                                    if ( clickedItem.mProperties.selected == false ){

                                                        // ======= Fast lookups & helpers =================================================
                                                        const tree  = this.getView().byId("Tree");
                                                        const items = tree.getItems();

                                                        // Map nodeUnique -> list index
                                                        const indexById = new Map();
                                                        for (let i = 0; i < node.length; i++) {
                                                            indexById.set(node[i].nodeUnique, i);
                                                        }

                                                        // Map nodeUnique -> immediate children ids (from `node[i].nodes`)
                                                        const childrenById = new Map();
                                                        for (let i = 0; i < node.length; i++) {
                                                            const n = node[i];
                                                            const kids = (n.nodes || []).map(k => k.nodeUnique ?? k.NODEUNIQUE).filter(Boolean);
                                                            childrenById.set(n.nodeUnique, kids);
                                                        }

                                                        // Small helpers
                                                        const setSelectedById = (id, selected) => {
                                                            const idx = indexById.get(id);
                                                            if (idx !== undefined) items[idx].setSelected(!!selected);
                                                        };

                                                        const addPartialById = (id) => {
                                                            const idx = indexById.get(id);
                                                            if (idx !== undefined && elementPartiallySelected[idx]) {
                                                                elementPartiallySelected[idx].classList.add("sapMCbMarkPartiallyChecked");
                                                            }
                                                        };

                                                        const removePartialById = (id) => {
                                                            const idx = indexById.get(id);
                                                            if (idx !== undefined && elementPartiallySelected[idx]) {
                                                                elementPartiallySelected[idx].classList.remove("sapMCbMarkPartiallyChecked");
                                                            }
                                                        };

                                                        const isListItemSelected = (idx) => {
                                                            // UI5 item selection API + DOM class as fallback (matches your original check)
                                                            return items[idx]?.mProperties?.selected === true || itemList[idx]?.classList?.contains("sapMLIBSelected");
                                                        };

                                                        // Merge all ancestor arrays into one unique list (and drop falsy & the clicked node id)
                                                        const allAncestors = [
                                                            ...(uniquePullChildrenParent || []),
                                                            ...(uniquePullParentParent || []),
                                                            ...(uniquePull3rdParent || []),
                                                            ...(uniquePull4thParent || []),
                                                            ...(uniquePull5thParent || []),
                                                            ...(uniquePull6thParent || []),
                                                            ...(uniquePull7thParent || []),
                                                            ...(uniquePull8thParent || []),
                                                            ...(uniquePull9thParent || []),
                                                            ...(uniquePull10thParent || [])
                                                        ].filter(Boolean);

                                                        const ancestorSet = new Set(allAncestors.filter(id => id !== clickedNode));

                                                        // ======= 1) Mark all ancestors partially selected (once) =======================
                                                        for (const parentId of ancestorSet) {
                                                            if (String(parentId) === String(clickedNode)) continue; // <-- don’t touch the clicked node
                                                            setSelectedById(parentId, false);
                                                            addPartialById(parentId);
                                                        }

                                                        // ======= 2) Select clicked node + all descendants of the clicked node ==========
                                                        const clickedIndex = clickedPosition; // you already computed this
                                                        const clickedId    = node[clickedIndex]?.nodeUnique;

                                                        // also select the clicked item itself
                                                        // if (clickedIndex !== undefined) {
                                                        //     items[clickedIndex].setSelected(true);
                                                        //     if (elementPartiallySelected[clickedIndex]) {
                                                        //         elementPartiallySelected[clickedIndex].classList.remove("sapMCbMarkPartiallyChecked");
                                                        //     }
                                                        // }

                                                        const collectDescendants = (startId) => {
                                                            const out = new Set();
                                                            const q   = [...(childrenById.get(startId) || [])];
                                                            const seen = new Set();

                                                            while (q.length) {
                                                                const id = q.shift();
                                                                if (!id || seen.has(id)) continue;
                                                                seen.add(id);
                                                                out.add(id);
                                                                const kids = childrenById.get(id) || [];
                                                                for (const k of kids) q.push(k);
                                                            }
                                                            return out;
                                                        };

                                                        if (clickedId) {
                                                            const descendants = collectDescendants(clickedId);
                                                            for (const id of descendants) {
                                                                const idx = indexById.get(id);
                                                                if (idx !== undefined) {
                                                                    items[idx].setSelected(true);
                                                                    if (elementPartiallySelected[idx]) {
                                                                        elementPartiallySelected[idx].classList.remove("sapMCbMarkPartiallyChecked");
                                                                    }
                                                                }
                                                            }
                                                        }

                                                        // ======= 3) If all children of a parent are selected, select that parent =======
                                                        // Use the SAME filter-based mapping you use in the deselect path to avoid misses.
                                                        const getChildrenListIdxsOfParent = (parentUnique) => {
                                                            // positions of this parent in filterInfoList
                                                            const positions = posByDescExact.get(parentUnique) || [];
                                                            if (!positions.length) return [];

                                                            // tokens of all children
                                                            const childTokens = new Set();
                                                            positions.forEach(p => {
                                                                (childrenTokensByIndex.get(p) || []).forEach(t => childTokens.add(t));
                                                            });

                                                            // map tokens -> unique child ids
                                                            const childUniqueIds = new Set(
                                                                Array.from(childTokens).map(t => infoByToken.get(t)?.NODEUNIQUE).filter(Boolean)
                                                            );

                                                            // map to list indices
                                                            const listIdxs = [];
                                                            childUniqueIds.forEach(id => {
                                                                const li = indexById.get(id);
                                                                if (li != null) listIdxs.push(li);
                                                            });
                                                            return listIdxs;
                                                        };

                                                        // run after UI updates settle
                                                        setTimeout(() => {
                                                            for (const parentId of ancestorSet) {
                                                                const kidIdx = getChildrenListIdxsOfParent(parentId);
                                                                if (!kidIdx.length) continue;

                                                                const allSelected = kidIdx.every(isListItemSelected);
                                                                if (allSelected) {
                                                                    setSelectedById(parentId, true);
                                                                    removePartialById(parentId);
                                                                }
                                                            }
                                                        }, 20);

                                                    }else {
                                                        // ===== caches / helpers =====
                                                        const tree      = this.getView().byId("Tree");
                                                        const treeItems = tree.getItems();
                                                        const $tree     = this.byId("Tree").$();
                                                        const itemList  = Array.from($tree.find("li.sapMTreeItemBase"));

                                                        // IMPORTANT: we reuse your existing jQuery collection if it's in scope.
                                                        // If not, this fallback will grab it.
                                                        const marks = (typeof elementPartiallySelected !== "undefined" && elementPartiallySelected)
                                                            ? elementPartiallySelected
                                                            : this.byId("Tree").$().find(".sapMCbMark");

                                                        const indexByNodeUnique = new Map(node.map((n, i) => [n.nodeUnique, i]));

                                                        const setPartial = (idx, on) => {
                                                            const mark = marks?.[idx] || itemList[idx]?.querySelector(".sapMCbMark");
                                                            if (mark && mark.classList) {
                                                                mark.classList[on ? "add" : "remove"]("sapMCbMarkPartiallyChecked");
                                                            }
                                                        };

                                                        const deselectIdx = (idx) => {
                                                            if (idx == null || idx < 0) return;
                                                            treeItems[idx].setSelected(false);
                                                            setPartial(idx, false);
                                                        };
                                                        const deselectById = (uniqueId) => deselectIdx(indexByNodeUnique.get(uniqueId));

                                                        // ===== group all "levels" dynamically (1..10) =====
                                                        const levels = [
                                                            uniquePullChildrenParent,
                                                            uniquePullParentParent,
                                                            uniquePull3rdParent,
                                                            uniquePull4thParent,
                                                            uniquePull5thParent,
                                                            uniquePull6thParent,
                                                            uniquePull7thParent,
                                                            uniquePull8thParent,
                                                            uniquePull9thParent,
                                                            uniquePull10thParent,
                                                        ].filter(Array.isArray);

                                                        // --------------------------------------------------------------------------
                                                        // 1) Deselect ALL parents across all levels (same as your repeated 1..10 loops)
                                                        // --------------------------------------------------------------------------
                                                        levels.forEach(arr => {
                                                            arr.forEach(parentId => {
                                                                if (!parentId) return;
                                                                if (String(parentId) === String(clickedNode)) return; // <-- don’t touch the clicked node
                                                                deselectById(parentId);
                                                            });
                                                        });

                                                        // --------------------------------------------------------------------------
                                                        // 2) Collect all descendants of the clicked item and deselect them (same logic)
                                                        // --------------------------------------------------------------------------
                                                        const collectDescendantIdxsFromPosition = (pos) => {
                                                            const start = node[pos];
                                                            if (!start) return [];
                                                            const out = [];
                                                            const stack = Array.isArray(start.nodes) ? [...start.nodes] : [];
                                                            while (stack.length) {
                                                                const cur = stack.pop();
                                                                if (!cur) continue;
                                                                const di = indexByNodeUnique.get(cur.nodeUnique);
                                                                if (di != null) out.push(di);
                                                                if (Array.isArray(cur.nodes)) stack.push(...cur.nodes);
                                                            }
                                                            return out;
                                                        };

                                                        const descIdxs = collectDescendantIdxsFromPosition(clickedPosition);
                                                        descIdxs.forEach(i => {
                                                            treeItems[i].setSelected(false);
                                                            setPartial(i, false);
                                                        });

                                                        // --------------------------------------------------------------------------
                                                        // 3) Parent recalculation for ALL ancestors:
                                                        //    - ALL children selected   -> parent selected=true,  remove partial
                                                        //    - NO children selected    -> parent selected=false, remove partial
                                                        //    - SOME children selected  -> parent selected=false, add partial
                                                        // --------------------------------------------------------------------------
                                                        const filterNodeList  = filternode;
                                                        const filterValueList = filtervalue;
                                                        const filterInfoList  = filterinfo;
                                                        const nodeDesc        = filterInfoList.map(x => x.NODEUNIQUE);

                                                        // token -> [infoIdxs]
                                                        const infoIdxsByToken = new Map();
                                                        for (let i = 0; i < filterNodeList.length; i++) {
                                                            const tok = filterNodeList[i];
                                                            if (!infoIdxsByToken.has(tok)) infoIdxsByToken.set(tok, []);
                                                            infoIdxsByToken.get(tok).push(i);
                                                        }

                                                        const tokensFromValueCell = (val) =>
                                                            Array.isArray(val)
                                                                ? val.flatMap(tokensFromValueCell)
                                                                : String(val).replaceAll(",", " ").trim().split(/(\s+)/).filter(s => s.trim());

                                                        const getChildrenListIdxsOfParent = (parentUnique) => {
                                                            const pos = [];
                                                            for (let i = 0; i < nodeDesc.length; i++) {
                                                                if (nodeDesc[i] === parentUnique) pos.push(i);
                                                            }
                                                            if (!pos.length) return [];

                                                            const childTokens = new Set();
                                                            for (const p of pos) {
                                                                tokensFromValueCell(filterValueList[p]).forEach(t => childTokens.add(t));
                                                            }

                                                            const childUniqueIds = new Set();
                                                            childTokens.forEach(tok => {
                                                                const idxs = infoIdxsByToken.get(tok);
                                                                if (idxs) {
                                                                    idxs.forEach(ii => childUniqueIds.add(filterInfoList[ii].NODEUNIQUE));
                                                                }
                                                            });

                                                            const listIdxs = [];
                                                            childUniqueIds.forEach(u => {
                                                                const li = indexByNodeUnique.get(u);
                                                                if (li != null) listIdxs.push(li);
                                                            });
                                                            return listIdxs;
                                                        };

                                                        // Compute ALL parents across all levels (not just the first)
                                                        const allParents = Array.from(new Set(levels.flat().filter(Boolean)));

                                                        // Keep your async timing (UI5 selection state settles), exactly like your setTimeouts
                                                        setTimeout(() => {
                                                            allParents.forEach(parentUnique => {
                                                                const pIdx = indexByNodeUnique.get(parentUnique);
                                                                if (pIdx == null) return;

                                                                const childIdxs = getChildrenListIdxsOfParent(parentUnique);
                                                                if (!childIdxs.length) return;

                                                                const allSelected  = childIdxs.every(i => itemList[i]?.classList?.contains("sapMLIBSelected"));
                                                                const noneSelected = childIdxs.every(i => !itemList[i]?.classList?.contains("sapMLIBSelected"));

                                                                if (allSelected) {
                                                                    treeItems[pIdx].setSelected(true);
                                                                    setPartial(pIdx, false);
                                                                } else if (noneSelected) {
                                                                    treeItems[pIdx].setSelected(false);
                                                                    setPartial(pIdx, false);
                                                                } else {
                                                                    treeItems[pIdx].setSelected(false);
                                                                    setPartial(pIdx, true); // <-- partial on mixed selection
                                                                }
                                                            });
                                                        }, 20);
                                                    }

                                                }
                                            }
                                        }
                                    }
                                    // #endregion

                                    // ==========================================================================
                                    // ======= This is the addEventListener for Label Collapse and Expand =======
                                    // ==========================================================================
                                    // #region
                                    // ===== Label expand/collapse handler (predictable layout) =====
                                    {
                                        const itemList = this.byId("Tree").$().find(".sapMTreeItemBase");
                                        const liItems  = Array.from(itemList);
                                        const labels   = liItems.map(li => li.querySelector("label"));

                                        const indexById = new Map(node.map((n,i)=>[n.nodeUnique, i]));
                                        const parentById = new Map(filterinfo.map(fi=>[fi.NODEUNIQUE, fi.PARENTID || null]));
                                        const childrenById = new Map(node.map(n => [n.nodeUnique, (n.nodes||[]).map(k=>k.nodeUnique ?? k.NODEUNIQUE).filter(Boolean)]));

                                        const topLevelIds  = Array.from(new Set(filterinfo.filter(fi => String(fi.LEVEL) === "1").map(fi => fi.NODEUNIQUE)));
                                        const topLevelIdxs = topLevelIds.map(id => indexById.get(id)).filter(i => i != null);

                                        const setIconOpen  = (labelEl) => { if (!labelEl) return; labelEl.setAttribute("data-sap-ui-icon-content", ""); labelEl.classList.add("expanded");  labelEl.classList.remove("collapsed"); };
                                        const setIconClose = (labelEl) => { if (!labelEl) return; labelEl.setAttribute("data-sap-ui-icon-content", ""); labelEl.classList.add("collapsed"); labelEl.classList.remove("expanded"); };
                                        const showIdx = (i) => { if (i==null) return; liItems[i]?.classList.add("displayed"); liItems[i]?.classList.remove("disabled"); };
                                        const hideIdx = (i) => { if (i==null) return; liItems[i]?.classList.add("disabled");  liItems[i]?.classList.remove("displayed"); };
                                        const showCollapsedIdx = (i) => { showIdx(i); setIconClose(labels[i]); };
                                        const showExpandedIdx  = (i) => { showIdx(i); setIconOpen(labels[i]);  };
                                        const hideAll = () => { for (let i=0;i<node.length;i++){ hideIdx(i); setIconClose(labels[i]); } };

                                        const getAncestors = (id) => { const chain=[]; let cur=id; while(cur){ chain.push(cur); cur=parentById.get(cur);} return chain.reverse(); };
                                        const getDescendants = (id) => {
                                            const out=[]; const seen=new Set([id]); const stack=[...(childrenById.get(id)||[])];
                                            while(stack.length){ const cur=stack.pop(); if(!cur||seen.has(cur)) continue; seen.add(cur); out.push(cur); stack.push(...(childrenById.get(cur)||[])); }
                                            return out;
                                        };

                                        labels.forEach(lbl => {
                                            lbl.addEventListener("click", (event) => {
                                            const tgt = event.target;
                                            if (tgt.tagName.toUpperCase() !== "LABEL") return;
                                            if (!tgt.classList.contains("expanded") && !tgt.classList.contains("collapsed")) return;

                                            const clickedIdx = labels.indexOf(tgt);
                                            if (clickedIdx < 0) return;
                                            const clickedId = node[clickedIdx].nodeUnique;

                                            // collapse branch
                                            if (tgt.classList.contains("expanded")) {
                                                setIconClose(tgt);
                                                setIconClose(labels[clickedIdx]);
                                                showIdx(clickedIdx);
                                                for (const id of getDescendants(clickedId)) {
                                                const i = indexById.get(id);
                                                if (i != null) { hideIdx(i); setIconClose(labels[i]); }
                                                }
                                                dynamicHeightCW?.();
                                                return;
                                            }

                                            // expand branch
                                            hideAll();
                                            for (const t of topLevelIdxs) showCollapsedIdx(t);

                                            const chain = getAncestors(clickedId);
                                            const chainSet = new Set(chain);

                                            for (const ancId of chain) {
                                                const ancIdx = indexById.get(ancId);
                                                if (ancIdx != null) showExpandedIdx(ancIdx);

                                                const parentId   = parentById.get(ancId);
                                                const siblingIds = parentId ? (childrenById.get(parentId) || []) : topLevelIds;
                                                for (const sibId of siblingIds) {
                                                if (sibId === ancId || chainSet.has(sibId)) continue;
                                                const sIdx = indexById.get(sibId);
                                                if (sIdx != null) showCollapsedIdx(sIdx);
                                                }
                                            }

                                            const kids = childrenById.get(clickedId) || [];
                                            const cIdx = indexById.get(clickedId);
                                            if (cIdx != null) showExpandedIdx(cIdx);
                                            for (const kid of kids) {
                                                const i = indexById.get(kid);
                                                if (i != null) showCollapsedIdx(i);
                                            }
                                            dynamicHeightCW?.();
                                            });
                                        });
                                    }

                                    // #endregion
                                    // ===============================================================================
                                    // =============================== Styling Options ===============================
                                    // ===============================================================================

                                    // #region
                                    // This function gets the color and alpha from styling panel and joins them together to get an RGBA color code
                                    function hexToRgbA(hex){
                                        var c;
                                        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
                                            c= hex.substring(1).split('');
                                            if(c.lenght==3){
                                                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
                                            }
                                            c= '0x'+c.join('');
                                            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255]. join(',')+',' + disableParent[3] + ')';
                                        }
                                        throw new Error('Bad Hex');
                                    }
                                    setTimeout(() => {
                                        this.byId("Tree").$().find('ul').css({"font-family": fbi[0], "font-size": fbi[1] + "px", "font-weight": fbi[2], "font-style": fbi[2], "color": fbi[3] + "!important", "background-color": "transparent" });
                                        // In this part the styling options from the panel gets applied to the List Items
                                        $('.sapMLIB').css({ "border-bottom": "1px solid #BEBEBE" });
                                        // Major change to all ListItems - "Tree"
                                        this.byId("Tree").$().find('.sapMLIBContent').css({
                                            "font-family": fbi[0], 
                                            "font-size": fbi[1] + "px", 
                                            "font-weight": fbi[2], 
                                            "font-style": fbi[2], 
                                            "color": fbi[3] + "!important", 
                                            "background-color": "transparent", 
                                        
                                            "width": "200px",
                                            // "height": "3em",
                                            "margin-right": "30px", //this was 25px
                                            // "overflow": "hidden",
                                            "align-items": "baseline",
                                            "line-height": "1.5em",
                                            "max-height": "3em",
                                            "overflow": "hidden",
                                            "text-overflow": "ellipsis",
                                            // "white-space": "nowrap", 

                                            
                                            "display": "-webkit-box",
                                            "-webkit-line-clamp": "2",
                                            "-webkit-box-orient": "vertical",

                                        });

                                        const baseItem = this.byId("Tree").$().find('.sapMTreeItemBaseLeaf');
                                        const treeBaseItem = this.byId("Tree").$().find('.sapMTreeItemBase');
                                        treeBaseItem.find('.sapMLIBContent').css({ "margin-left": "8px"})
                                        const baseSelected = this.byId("Tree").$().find('.sapMLIBSelected');
                                        baseSelected.find('div').css({
                                            "font-style": selectNodes[0] + "!important",
                                            "font-weight": selectNodes[0]  + "!important",
                                            "font-size": selectNodes[1] + "px", 
                                            "color": selectNodes[2]  + "!important"
                                        });
                                        baseSelected.css({ "background-color": + "rgb" + selectNodes[3]  + "!important"});
                                        this.byId("Tree").$().find('.sapMLIBFocusable', '::focus').css({ "outline": "none" });
                                        this.byId("Tree").$().find('li', '::hover').css({ "background-color": "#e0e0e0" });

                                        this.byId("Tree").$().find(".sapMIBar .sapMTB").css({ "pointer-events": "none", "margin": "0 auto" })
                                        this.byId("Tree").$().find(".sapMInputBase").css({ "margin": "0 auto", "pointer-events": "auto" });

                                        // ===============================================================================
                                        // This starts the styling of the parent nodes
                                        if (that.Show_Parent === "Yes") {
                                            // THIS IS SHOW_PARENT === YES

                                            // This is to disable Nodes and to make the span (Expand/ Collapse Icon) clickable
                                            // this.byId("Tree").$().find('ul').css('cursor', 'not-allowed');
                                            // This changes the Selected Node Background and pointer event to nonee
                                            this.byId("Tree").$().find('.sapMTreeItemBase').css({ "pointer-events": "none", "background-color": disableParent[4] + "!important" });
                                            this.byId("Tree").$().find('li').css('pointer-events', 'none');
                                            // this.byId("Tree").$().find('label .unselectable').css('pointer-events', 'all');
                                            this.byId("Tree").$().find('span').css('pointer-events', 'all');
                                            this.byId("Tree").$().find('.sapMRb').css({ "display": "", "pointer-events": "none" }); 
                                            // this changes the Disabled Parent Nodes Text
                                            this.byId("Tree").$().find('.sapMLIBContent').css({ 
                                                "font-style": disableParent[0], 
                                                "font-weight": disableParent[0], 
                                                "font-size": disableParent[1] + "px", 
                                                "color": "rgba" + hexToRgbA(disableParent[2]), 
                                                // "margin-left": "1rem", 
                                                // "pointer-events": "none" 
                                            });

                                            this.byId("Tree").$().find('.sapMLabel').css({ "padding-right": "0" });

                                            // This changes the Selected Node Background
                                            baseItem.css({ 
                                                "pointer-events": "all", 
                                                "cursor": "pointer", 
                                                "background-color": "transparent" 
                                            });
                                            baseItem.find('span').css({ "pointer-events": "none" });
                                            baseItem.find('li').css({ 
                                                "pointer-events": "all", 
                                                "cursor": "pointer"
                                            });
                                            baseItem.find('.sapMRb').css({ 
                                                "display": "block", 
                                                "pointer-events": "all" 
                                            });
                                            // This changes the Selected Node text
                                            baseItem.find('.sapMLIBContent').css({ 
                                                // "margin-left": "-0.5rem", 
                                                "pointer-events": "all", 
                                                "font-style": fbi[2], 
                                                "font-weight": fbi[2], 
                                                "font-size": fbi[1] + "px",
                                                "color": "rgb" + fbi[3]
                                            });
                                            // This changes the Node that is Selected by Default
                                            baseSelected.css({
                                                "background-color": selectNodes[3] ,
                                                "pointer-events": "all", 
                                                "cursor": "pointer",
                                            });
                                            baseSelected.find('.sapMLIBContent').css({ 
                                                "font-style": selectNodes[0], 
                                                "font-weight": selectNodes[0], 
                                                "font-size": selectNodes[1] + "!important", 
                                                "color": selectNodes[2]
                                            });
                                        }else {
                                            // THIS IS SHOW_PARENT === NO   
                                            this.byId("Tree").$().find('.sapMTreeItemBase').css({ 
                                                "background-color": "transparent" 
                                            });
                                            // This changes the Node that is Selected by Default
                                            baseSelected.css({ "background-color": selectNodes[3] });
                                            baseSelected.find('.sapMLIBContent').css({ 
                                                "font-style": selectNodes[0], 
                                                "font-weight": selectNodes[0], 
                                                "font-size": selectNodes[1] + "!important", 
                                                "color": selectNodes[2]
                                            });
                                            // This changes the Node that is Selected by Default
                                            baseSelected.css({ 
                                                "background-color": selectNodes[3]
                                            });
                                            baseSelected.find('.sapMLIBContent').css({ 
                                                "font-style": selectNodes[0], 
                                                "font-weight": selectNodes[0], 
                                                "font-size": selectNodes[1] + "!important", 
                                                "color": selectNodes[2]
                                            });
                                        }
                                        
                                        if (that.Selection_Type == "SingleSelectLeft" || that.Selection_Type == "SingleSelectMaster"){
                                            
                                            const baseSelected = this.byId("Tree").$().find('.sapMLIBSelected');
                                            const baseSelectedIcon = this.byId("Tree").$().find('.sapMLIBSelected label');
                                            // $('.sapMLIB').css({
                                                // "padding-left": "32px"
                                            // });

                                            this.byId("Tree").$().find('.sapMTreeItemBase').css({
                                                // "border": "0px",
                                                // "padding-left": "16px"
                                            });
                                            this.byId("Tree").$().find('.sapMTreeItemBase label').css({
                                                // "margin-left": "1rem"
                                            });
                                            baseSelected.css({
                                                // "border-left": "16px solid white",
                                                // "border-right": "32px solid white",
                                                // "padding": "0px !important",
                                                // "padding-left": "0"
                                            });
                                            baseSelectedIcon.css({
                                                "margin-left": "0rem"
                                            });
                                        }

                                        /// Default Label
                                        const sapMLIBLabel = this.byId("Tree").$().find('.sapMLIB');

                                        // Default Label
                                        sapMLIBLabel.find('label').css({
                                            "color": iconStyling[0], // Color of the non selected Item Label
                                            "border-color": iconStyling[0]// Color of the SELECTED Item Label
                                        });
                                        // Selected Label
                                        baseSelected.find('label').css({
                                            "color": iconStyling[1],// Color of the SELECTED Item Label
                                            "border-color": iconStyling[1]// Color of the SELECTED Item Label
                                        });

                                    }, "20")
                                    //#endregion
                                
                                    // ===============================================================================
                                }
                            } // CODE EXECUTED AFTER INITWIDGET === TRUE
                            // ===================================================================================
                            
                            if ( that.widgetno ){
                                // ===================================================================================
                                // ==================== Setting up the display and Selection Type ====================
                                // ===================================================================================
                                
                                if (IDNum[that.widgetno]) {
                                    this.byId("Tree").setMode(that.Selection_Type);
                                    this.byId("Tree").expandToLevel(99);
                                    IDNum[that.widgetno] -= 1;
                                }
                                
                                // ===================================================================================

                                if (that.widgetName && that.Selection_Type && _setModeInfo[that.widgetno]) {
                                    dfnumber = _dfnumber[that.widgetno - 1];
                                    // dfnumber = 0
                                    filterinfo = _filterinfo[that.widgetno - 1];
                                    filtervalue = _filtervalue[that.widgetno - 1];
                                    // filterValueDesc = _filterValueDesc[that.widgetno - 1];
                                    filternode = _filternode[that.widgetno - 1];
                                    dfdesc = _dfdesc[that.widgetno - 1];
                                    var schild = "";
                                    var listselected = [];
                                    var listselecteddec = [];
                                    var ptextid = [];
                                    var ptextdec = [];
                                    var ll_1 = [];
                                    var pi_1 =[];
                                    var ni_1 =[];
                                    var nd_1 = [];

                                    for (var i = 0; i < dfnumber.length; i++) {
                                        this.byId("Tree").setMode(that.Selection_Type);
                                        this.byId("Tree").expandToLevel(99);
                                        this.byId("Tree").getItems()[dfnumber[i]].setSelected(true);
                                        var snode = that.default[i];
                                        listselected.push(snode);
                                        listselecteddec.push(dfdesc[i]); 
                                        for (var x = 0; x < filternode.length; x++) {
                                            if (snode === filternode[x]) {
                                                schild += filtervalue[x];
                                                ptextid.push(filterinfo[x].PARENTID);
                                                ptextdec.push(filterinfo[x].PTDEC);
                                                ll_1.push(filterinfo[x].LEVEL);
                                                pi_1.push(filterinfo[x].PARENTID);
                                                ni_1.push(filterinfo[x].NODEUNIQUE);
                                                nd_1.push(filterinfo[x].NODEDEC);
                                            }
                                        }
                                    };

                                    _SelectedChild = schild.substr(0, schild.length).split(",");
                                    // _SelectedChild = schild;

                                    function removeDuplicates(arr){
                                        return arr.filter((item,
                                            index) => arr.indexOf(item) === index);
                                    }

                                    // ========= Apply topmost-only filter for initial/default selections =========
                                    const isDescendantOf = (childId, potentialAncestorId) => {
                                        if (childId === potentialAncestorId) return false;

                                        let currentId = childId;
                                        let maxIterations = 100;
                                        let iterations = 0;

                                        while (currentId && iterations < maxIterations) {
                                            const nodeInfo = filterinfo.find(item =>
                                                item.IDNAME === currentId || item.NODEID === currentId
                                            );

                                            if (!nodeInfo || !nodeInfo.PARENTID) {
                                                return false;
                                            }

                                            if (nodeInfo.PARENTID === potentialAncestorId || nodeInfo.PTID === potentialAncestorId) {
                                                return true;
                                            }

                                            currentId = nodeInfo.PARENTID || nodeInfo.PTID;
                                            iterations++;
                                        }

                                        return false;
                                    };

                                    // Filter to get topmost selected nodes only
                                    const listselectedUnique = removeDuplicates(listselected);
                                    const listselecteddecUnique = removeDuplicates(listselecteddec);
                                    const topmostNodesId = [];
                                    const topmostNodesDec = [];

                                    for (let i = 0; i < listselectedUnique.length; i++) {
                                        const currentNodeId = listselectedUnique[i];
                                        const currentNodeDec = listselecteddecUnique[i];
                                        let hasSelectedAncestor = false;

                                        for (let j = 0; j < listselectedUnique.length; j++) {
                                            if (i !== j) {
                                                const otherNodeId = listselectedUnique[j];
                                                if (isDescendantOf(currentNodeId, otherNodeId)) {
                                                    hasSelectedAncestor = true;
                                                    break;
                                                }
                                            }
                                        }

                                        if (!hasSelectedAncestor) {
                                            topmostNodesId.push(currentNodeId);
                                            topmostNodesDec.push(currentNodeDec);
                                        }
                                    }

                                    _SelectedNodeDec = topmostNodesDec.length > 0 ? topmostNodesDec : listselecteddecUnique;
                                    _SelectedNode = topmostNodesId.length > 0 ? topmostNodesId : listselectedUnique;
                                    // ========= End topmost-only filter =========

                                    _FF1 = _dfF1[that.widgetno];
                                    _FF2 = _dfF2[that.widgetno];
                                    _ptdec = ptextdec;
                                    _ptid = ptextid;

                                    _SelectedLevel_Value = ll_1;
                                    _SelectedParentId_Value = pi_1;
                                    _SelectedNodeId_Value = ni_1;

                                    _SelectedTextDesc_Value = topmostNodesDec.length > 0 ? topmostNodesDec : listselecteddecUnique;
                                    _SelectedTextId_Value = topmostNodesId.length > 0 ? topmostNodesId : listselectedUnique;

                                    that._firePropertiesChanged();
                                    _setModeInfo[that.widgetno] = 0;
                                }
                            }

                            dynamicHeightCW();
                            // #endregion

                            // REMOVED: Redundant call - setSelection property setter already calls _applySelectionOnly
                            // if (that && that.setSelection) {
                            //     that._applySelectionOnly(that.setSelection);
                            // }

                        
                        },
                        // #endregion

                        /*--------------------------  Set DisplayTitle Node for ID,DEC,ID-DEC ------------------------------------- */
                        handleSelectChange: function (oEvent) {
                            var displaymode = oEvent.getParameter("selectedItem").getKey();
                            this.byId("Tree").expandToLevel(99);

                            for (var i = 0; i < this.getView().byId("Tree").getItems().length; i++) {

                                var node = this.getView().byId("Tree").getItems()[i].getBindingContext(that.widgetName).getObject()[displaymode];

                                this.byId("Tree").getItems()[i].setTitle(node);

                            }
                        },

                        /*-------------------------- OnSelect Event for Tree Hierarchy at Runtime ------------------------------------- */
                        onSelect: function (oEvent) {

                            var listselected = [];
                            var listselecteddec = [];

                            var schild = "";
                            var ptextid = [];
                            var ptextdec = [];
                            var ll_1 = [];
                            var pi_1 = [];
                            var ni_1 = [];
                            var nd_1 = [];
                            var FFF1 = [];
                            var FFF2 = [];

                            let selectedItemsDelay = [];

                            filterinfo = _filterinfo[that.widgetno - 1];
                            filtervalue = _filtervalue[that.widgetno - 1];
                            // filterValueDesc = _filterValueDesc[that.widgetno - 1];
                            filternode = _filternode[that.widgetno - 1];

                            F1 = that.Field1_Name;
                            F2 = that.Field2_Name;


                            // ==============================================================================================
                            // ========= Filter to return only TOPMOST selected nodes (not their children) =========
                            // ==============================================================================================

                            let listselectedtest = [];
                            let listselecteddectest = [];
                            setTimeout(() => {
                                // Step 1: Get all selected items from the tree
                                for (var i = 0; i < this.getView().byId("Tree").getSelectedItems().length; i++) {
                                    var snode = this.getView().byId("Tree").getSelectedItems()[i].getBindingContext(that.widgetName).getObject().nodeid;
                                    var tnode = this.getView().byId("Tree").getSelectedItems()[i].getBindingContext(that.widgetName).getObject().nodedec;

                                    listselectedtest.push(snode);
                                    listselecteddectest.push(tnode);
                                }

                                // Step 2: Build a helper function to check if a node is descendant of another
                                const isDescendantOf = (childId, potentialAncestorId) => {
                                    if (childId === potentialAncestorId) return false; // Same node, not descendant

                                    let currentId = childId;
                                    let maxIterations = 100; // Prevent infinite loops
                                    let iterations = 0;

                                    while (currentId && iterations < maxIterations) {
                                        // Find the node info in filterinfo
                                        const nodeInfo = filterinfo.find(item =>
                                            item.IDNAME === currentId || item.NODEID === currentId
                                        );

                                        if (!nodeInfo || !nodeInfo.PARENTID) {
                                            // Reached root or node not found
                                            return false;
                                        }

                                        // Check if parent matches the potential ancestor
                                        if (nodeInfo.PARENTID === potentialAncestorId || nodeInfo.PTID === potentialAncestorId) {
                                            return true;
                                        }

                                        // Move up the tree
                                        currentId = nodeInfo.PARENTID || nodeInfo.PTID;
                                        iterations++;
                                    }

                                    return false;
                                };

                                // Step 3: Filter out nodes that have selected ancestors (keep only topmost)
                                const topmostNodesId = [];
                                const topmostNodesDec = [];

                                for (let i = 0; i < listselectedtest.length; i++) {
                                    const currentNodeId = listselectedtest[i];
                                    const currentNodeDec = listselecteddectest[i];
                                    let hasSelectedAncestor = false;

                                    // Check if any other selected node is an ancestor of this one
                                    for (let j = 0; j < listselectedtest.length; j++) {
                                        if (i !== j) {
                                            const otherNodeId = listselectedtest[j];
                                            if (isDescendantOf(currentNodeId, otherNodeId)) {
                                                hasSelectedAncestor = true;
                                                break;
                                            }
                                        }
                                    }

                                    // Only include if no selected ancestor found
                                    if (!hasSelectedAncestor) {
                                        topmostNodesId.push(currentNodeId);
                                        topmostNodesDec.push(currentNodeDec);
                                    }
                                }

                                // Step 4: Update the selected node arrays with topmost nodes only
                                _SelectedNode = topmostNodesId.length > 0 ? topmostNodesId : listselectedtest;
                                _SelectedNodeDec = topmostNodesDec.length > 0 ? topmostNodesDec : listselecteddectest;

                                that._firePropertiesChanged();
                            }, "0")    


                            // ==============================================================================================
                            // ==============================================================================================
                            // ==============================================================================================
                            setTimeout(() => {
                                selectedItemsDelay = this.getView().byId("Tree").getSelectedItems();

                                for (var i = 0; i < selectedItemsDelay.length; i++) {
                                    var snode = selectedItemsDelay[i].getBindingContext(that.widgetName).getObject().nodeid;
                                    var tnode = selectedItemsDelay[i].getBindingContext(that.widgetName).getObject().nodedec;
                                

                                    listselected.push(snode);
                                    listselecteddec.push(tnode);

                                    if (F1) {
                                        var F1node = selectedItemsDelay[i].getBindingContext(that.widgetName).getObject()[F1];
                                        FFF1.push(F1node);
                                    }
                                    if (F2) {
                                        var F2node = selectedItemsDelay[i].getBindingContext(that.widgetName).getObject()[F2];
                                        FFF2.push(F2node);
                                    }

                                    for (var x = 0; x < filternode.length; x++) {
                                        if (snode === filternode[x]) {
                                            schild += filtervalue[x];
                                            ptextid.push(filterinfo[x].PARENTID);
                                            ptextdec.push(filterinfo[x].PTDEC);
                                            ll_1.push(filterinfo[x].LEVEL);
                                            pi_1.push(filterinfo[x].PARENTID);
                                            ni_1.push(filterinfo[x].NODEUNIQUE);
                                            nd_1.push(filterinfo[x].NODEDEC);
                                        }
                                    }
                                }

                                var _unit1 = schild.substr(0, schild.length).split(",");
                                _SelectedChild = _unit1.filter((c, index) => {
                                    return _unit1.indexOf(c) === index;
                                });

                                // _SelectedChild = schild;

                            }, "0")

                            currentSelectedItem = listselected;
                            // _SelectedNode = listselected;
                            // _SelectedNodeDec = listselecteddec;
                            // _SelectedNode = _SelectedNode;
                            // _SelectedNodeDec = _SelectedNodeDec;

                            _FF1 = FFF1;
                            _FF2 = FFF2;

                            _SelectedLevel_Value = ll_1;
                            _SelectedParentId_Value = pi_1;
                            _SelectedNodeId_Value = ni_1;
                            _SelectedTextId_Value = listselected;
                            _SelectedTextDesc_Value = listselecteddec;
                            
                            _ptdec = ptextdec;
                            _ptid = ptextid;

                            var fbi = _FontStyle[that.widgetno];

                            let disableParent = _ParentNodes[that.widgetno];
                            let selectNodes = _SelectedNodes[that.widgetno];

                            function hexToRgbA(hex){
                                var c;
                                if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
                                    c= hex.substring(1).split('');
                                    if(c.lenght==3){
                                        c= [c[0], c[0], c[1], c[1], c[2], c[2]];
                                    }
                                    c= '0x'+c.join('');
                                    return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255]. join(',')+',' + disableParent[3] + ')';
                                }
                                throw new Error('Bad Hex');
                            }

                            let iconSize = _iconSize[that.widgetno];
                            let iconStyling = _IconStyling[that.widgetno];
                            let defaultCBStyling = _DefaultCBStyling[that.widgetno];
                            let selectedCBStyling = _SelectedCBStyling[that.widgetno];

                            // ===================================================================================
                            // ================================= Styling Options =================================
                            // ===================================================================================
                            
                            // this.byId("Tree").$().find('.sapMLIB.sapMLIBSelected').css({ "background-color": + "rgb" + selectNodes[3] });
                            setTimeout(() => {
                                if (that.Show_Parent === "Yes") {
                                    // THIS IS SHOW_PARENT === YES

                                    const itemBaseParent = this.byId("Tree").$().find('.sapMTreeItemBase');
                                    this.byId("Tree").$().find('.sapMTreeItemBase').css({ "pointer-events": "none", "background-color": disableParent[4] + "!important" });
                                    itemBaseParent.find('.sapMLIBContent').css({ 
                                        "font-style": disableParent[0], 
                                        "font-weight": disableParent[0], 
                                        "font-size": disableParent[1] + "px", 
                                        "color": "rgba" + hexToRgbA(disableParent[2]) + " !important", 
                                        // "margin-left": "1rem"
                                    });

                                    // This makes the Checkbox hoverable after a change and removes the Checkbox of the 1st item
                                    // this.byId("Tree").$().find('.sapMRb').css('display', "none"); 
                                    const baseItem = this.byId("Tree").$().find('.sapMTreeItemBaseLeaf').css({"pointer-events": "all"});
                                    baseItem.find('.sapMRb').css({ "display": "block", "pointer-events": "all" });
                                    baseItem.find('.sapMLIBContent').css({ 
                                        "font-style": fbi[2],
                                        "font-weight": fbi[2],
                                        "font-size": fbi[1] + "px",
                                        "color": "rgb" + fbi[3]
                                    });

                                    const baseSelected = this.byId("Tree").$().find('.sapMLIBSelected');
                                    baseSelected.find('.sapMLIBContent').css({ "font-style": selectNodes[0],
                                        "font-weight": selectNodes[0],
                                        "font-size": selectNodes[1] + "!important",
                                        "color": selectNodes[2]
                                    });

                                    baseItem.css({ "background-color": "transparent" });
                                    baseSelected.css({ 
                                        "background-color": selectNodes[3] ,
                                        "pointer-events": "all", 
                                        "cursor": "pointer"
                                    });

                                }
                                else {
                                    // THIS IS SHOW_PARENT === NO
                                    const baseItem = this.byId("Tree").$().find('.sapMTreeItemBase');
                                    baseItem.find('.sapMLIBContent').css({ 
                                        "font-style": fbi[2],
                                        "font-weight": fbi[2],
                                        "font-size": fbi[1] + "px",
                                        "color": "rgb" + fbi[3]
                                    });

                                    const baseSelected = this.byId("Tree").$().find('.sapMLIBSelected');
                                    baseSelected.find('.sapMLIBContent').css({ 
                                        "font-style": selectNodes[0],
                                        "font-weight": selectNodes[0],
                                        "font-size": selectNodes[1] + "!important",
                                        "color": selectNodes[2]
                                    });

                                    baseItem.css({ 
                                        "background-color": "transparent" 
                                    });
                                    baseSelected.css({ 
                                        "background-color": selectNodes[3]
                                    });

                                    // this.this.byId("Tree").$().find('.sapMCb').css({ "position": "fixed", "right": "0" });
                                    // byId("Tree").$().find('.sapMLIBContent').css({ "margin-left": "1rem" });
                                }

                                if (that.Selection_Type == "SingleSelectLeft" || that.Selection_Type == "SingleSelectMaster"){
                                    const baseSelected = this.byId("Tree").$().find('.sapMLIBSelected');
                                    const baseSelectedIcon = this.byId("Tree").$().find('.sapMLIBSelected label');
                                    // $('.sapMLIB').css({
                                        // "padding-left": "32px"
                                    // });
                                    
                                    this.byId("Tree").$().find('.sapMTreeItemBase').css({
                                        // "border": "0px",
                                        // "padding-left": "16px"
                                    });
                                    this.byId("Tree").$().find('.sapMTreeItemBase label').css({
                                        // "margin-left": "1rem"
                                    });
                                    baseSelected.css({
                                        // "border-left": "16px solid white",
                                        // "border-right": "32px solid white",
                                        // "padding": "0px !important",
                                        // "padding-left": "0"
                                    });
                                    baseSelectedIcon.css({
                                        "margin-left": "0rem"
                                    });
                                }

                                // Default Label
                                const sapMLIBLabel = this.byId("Tree").$().find('.sapMLIB');
                                const baseSelected = this.byId("Tree").$().find('.sapMLIBSelected');
                                // Default Label
                                sapMLIBLabel.find('label').css({
                                    "color": iconStyling[0], // Color of the non selected Item Label
                                    "border-color": iconStyling[0]// Color of the SELECTED Item Label
                                });
                                // Selected Label
                                baseSelected.find('label').css({
                                    "color": iconStyling[1],// Color of the SELECTED Item Label
                                    "border-color": iconStyling[1]// Color of the SELECTED Item Label
                                });


                            }, "20")

                            setTimeout(() => {
                                that._firePropertiesChanged();
                            }, "50")
                        }

                    });

                    return PageController;

                });

            var foundIndex = Ar.findIndex(x => x.id == widgetName);
            var divfinal = Ar[foundIndex].div;
            //### THE APP: place the XMLView somewhere into DOM ###
            var oView = sap.ui.xmlview({
                viewContent: jQuery(divfinal).html(),
            });
            oView.placeAt(div);
        });
    }

    // ===================================================================================
    // ========== This will add the icon fill for the partially selected option ==========
    // ===================================================================================
    let partiallySelected = (function() {
        let executed = false;
        return function(){
            if (!executed){
                // Check if styles already exist in DOM
                if (document.getElementById('hierarchy-tree-base-styles')) {
                    executed = true;
                    return;
                }

                let numberFontsize = parseInt(_iconSize[0]) - 2 + "px";

                // Create a single style element with all base styles
                const baseStyleEl = document.createElement('style');
                baseStyleEl.id = 'hierarchy-tree-base-styles';
                baseStyleEl.textContent = `
                    .sapMCbMarkChecked { background-color: ${_SelectedCBStyling[0] ? _SelectedCBStyling[0][1] : '#ffffff'} !important; }
                    .sapMCbMarkChecked:before { color: ${_SelectedCBStyling[0] ? _SelectedCBStyling[0][2] : '#0460A9'} !important; }
                    .sapMCbMarkPartiallyChecked:before { content: "\\e17b" !important; font-family: "SAP-icons"; display: inline-block; border: 0 !important; color: ${_SelectedCBStyling[0] ? _SelectedCBStyling[0][2] : '#0460A9'} !important; }
                    .sapMCbBg { border: 1px solid ${_DefaultCBStyling[0] ? _DefaultCBStyling[0][0] : '#9E9E9E'} !important; height: ${_iconSize[0]} !important; width: ${_iconSize[0]} !important; line-height: ${_iconSize[0]} !important; font-size: ${numberFontsize} !important; }
                    .disabled { display: none !important; }
                    .displayed { display: flex; padding-left: 0rem !important; margin: 0 1rem; }
                    .sapMCbNewClass { position: absolute !important; right: 5px !important; }
                    .unselectable { -moz-user-select: -moz-none; -khtml-user-select: none; -webkit-user-select: none; -ms-user-select: none; user-select: none; }
                    label.sapMTreeItemBaseExpander:before { font-family: "SAP-icons" !important; display: inline-block !important; }
                    .sapMLIB label.sapMTreeItemBaseExpander.collapsed:before { content: "\\e1f6" !important; }
                    .sapMLIB label.sapMTreeItemBaseExpander.expanded:before { content: "\\e1f7" !important; }
                    .sapMLIBSelected label.sapMTreeItemBaseExpander.collapsed:before { content: "\\e1f6" !important; }
                    .sapMLIBSelected label.sapMTreeItemBaseExpander.expanded:before { content: "\\e1f7" !important; }
                `;
                document.head.appendChild(baseStyleEl);

                // Fallback: Check if SAP-icons font loaded, if not, use CSS-drawn circles
                setTimeout(() => {
                    if (document.fonts && document.fonts.check) {
                        document.fonts.ready.then(() => {
                            const sapIconsLoaded = document.fonts.check('12px SAP-icons');
                            if (!sapIconsLoaded && !document.getElementById('hierarchy-tree-fallback-styles')) {
                                console.warn('[Hierarchy Tree] SAP-icons font not loaded, using CSS fallback icons');
                                const fallbackStyleEl = document.createElement('style');
                                fallbackStyleEl.id = 'hierarchy-tree-fallback-styles';
                                fallbackStyleEl.textContent = `
                                    .sap-icon-fallback label.sapMTreeItemBaseExpander:before { width: 16px !important; height: 16px !important; line-height: 14px !important; text-align: center !important; border-radius: 50% !important; font-family: Arial, sans-serif !important; font-size: 14px !important; margin-right: 4px !important; border: 1px solid}
                                    .sap-icon-fallback .sapMLIB label.sapMTreeItemBaseExpander.collapsed:before { content: "+" !important; }
                                    .sap-icon-fallback .sapMLIB label.sapMTreeItemBaseExpander.expanded:before { content: "−" !important; }
                                    .sap-icon-fallback .sapMLIBSelected label.sapMTreeItemBaseExpander.collapsed:before { content: "+" !important; }
                                    .sap-icon-fallback .sapMLIBSelected label.sapMTreeItemBaseExpander.expanded:before { content: "−" !important; }
                                `;
                                document.head.appendChild(fallbackStyleEl);
                                document.body.classList.add('sap-icon-fallback');
                            }
                        });
                    }
                }, 1000); // Give fonts 1 second to load
                executed = true;
                }
        };
    })();

})();
