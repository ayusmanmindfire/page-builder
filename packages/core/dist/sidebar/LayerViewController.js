import { Canvas } from '../canvas/Canvas.js'; // Assuming a Canvas management class
import { HTMLGenerator } from '../services/HTMLGenerator.js';
class LayersViewController {
  constructor(
    layersViewSelector = '#layers-view',
    canvasRootSelector = '#page'
  ) {
    // Ensure elements exist before assignment
    this.initializeElements(layersViewSelector, canvasRootSelector);
  }
  /**
   * Initialize layers view and canvas root elements
   */
  initializeElements(layersViewSelector, canvasRootSelector) {
    // Try to find layers view
    LayersViewController.layersView =
      document.querySelector(layersViewSelector);
    if (!LayersViewController.layersView) {
      // Create layers view if it doesn't exist
      LayersViewController.layersView = document.createElement('div');
      LayersViewController.layersView.id = 'layers-view';
      LayersViewController.layersView.className = 'layers-view';
      // Optional: Add the layers view to the document
      // You might want to append this to a specific container
      document.body.appendChild(LayersViewController.layersView);
      console.warn(`Layers view element created: ${layersViewSelector}`);
    }
    // Try to find canvas root
    LayersViewController.canvasRoot =
      document.querySelector(canvasRootSelector);
    if (!LayersViewController.canvasRoot) {
      console.error(`Canvas root element not found: ${canvasRootSelector}`);
      // Fallback to body if no specific root is found
      LayersViewController.canvasRoot = document.body;
    }
  }
  /**
   * Recursive function to build layer hierarchy from DOM
   */
  static buildLayerHierarchyFromDOM(rootElement) {
    const htmlGenerator = new HTMLGenerator(new Canvas());
    const generatedHTML = htmlGenerator.generateHTML();
    // Parse the generated HTML into a DOM tree
    const parser = new DOMParser();
    const doc = parser.parseFromString(generatedHTML, 'text/html');
    // Recursively traverse the DOM to build LayerItem hierarchy
    const traverseDom = (element, depth = 0) => {
      var _a;
      const htmlElement = element; // Assert the element is an HTMLElement
      // Skip elements without an `id` attribute
      if (!htmlElement.id) {
        return null;
      }
      const layer = {
        id: htmlElement.id,
        isVisible:
          ((_a = htmlElement.style) === null || _a === void 0
            ? void 0
            : _a.display) !== 'none', // Check visibility only for HTMLElements
        isLocked: htmlElement.getAttribute('data-locked') === 'true',
        depth,
        children: [],
      };
      Array.from(element.children).forEach(child => {
        const childLayer = traverseDom(child, depth + 1);
        if (childLayer) {
          layer.children.push(childLayer);
        }
      });
      return layer;
    };
    const rootElements = Array.from(doc.body.children);
    // Build the hierarchy and filter out any `null` layers
    return rootElements
      .map(element => traverseDom(element))
      .filter(layer => layer !== null);
  }
  /**
   * Render the layers view with nested structure
   */
  static updateLayersView() {
    if (!this.layersView || !this.canvasRoot) {
      console.error('Layers view or canvas root not initialized');
      return;
    }
    // Clear existing layers
    this.layersView.innerHTML = '';
    // Build hierarchy from DOM
    const hierarchy = this.buildLayerHierarchyFromDOM(this.canvasRoot);
    // Create layers list
    const layersList = document.createElement('ul');
    layersList.className = 'layers-list';
    // Render layer items
    this.renderLayerItems(layersList, hierarchy);
    // Append to layers view
    this.layersView.appendChild(layersList);
  }
  /**
   * Render layer items recursively
   */
  static renderLayerItems(parentElement, layers, depth = 0) {
    const list = document.createElement('ul');
    list.className = 'layer-list';
    parentElement.appendChild(list);
    layers.forEach(layer => {
      // List item to contain everything related to this layer
      const listItem = document.createElement('li');
      listItem.className = 'layer-item-container';
      list.appendChild(listItem);
      // The actual layer item element
      const layerItem = this.createLayerItemElement(layer);
      layerItem.style.paddingLeft = `${depth * 12}px`;
      listItem.appendChild(layerItem);
      // Handle nested children
      if (layer.children && layer.children.length > 0) {
        const expandToggle = document.createElement('span');
        expandToggle.className = 'layer-expand-toggle';
        expandToggle.textContent = '▶';
        layerItem.insertBefore(expandToggle, layerItem.firstChild);
        // Created a container for children
        const childContainer = document.createElement('div');
        childContainer.className = 'child-container';
        childContainer.style.display = 'none';
        listItem.appendChild(childContainer);
        // Recursively render children
        this.renderLayerItems(childContainer, layer.children, depth + 1);
        // Toggle expand/collapse
        expandToggle.addEventListener('click', () => {
          const isExpanded = childContainer.style.display === 'block';
          if (isExpanded) {
            childContainer.style.display = 'none';
            expandToggle.textContent = '▶';
          } else {
            childContainer.style.display = 'block';
            expandToggle.textContent = '▼';
          }
        });
      }
    });
  }
  /**
   * Create a layer item element with advanced interactions
   */
  static createLayerItemElement(layer) {
    const layerItem = document.createElement('li');
    layerItem.className = 'layer-item';
    layerItem.dataset.layerId = layer.id;
    // Visibility toggle
    const visibilityToggle = document.createElement('span');
    visibilityToggle.className = 'layer-visibility';
    visibilityToggle.innerHTML = layer.isVisible ? '👁️' : '👁️‍🗨️';
    visibilityToggle.addEventListener('click', () =>
      this.toggleLayerVisibility(layer)
    );
    // Layer name with type
    const layerName = document.createElement('span');
    layerName.className = 'layer-name';
    layerName.textContent = `${layer.id}`;
    layerName.addEventListener('click', () => this.selectLayer(layer));
    // Lock toggle
    const lockToggle = document.createElement('span');
    lockToggle.className = 'layer-lock';
    lockToggle.innerHTML = layer.isLocked ? '🔒' : '🔓';
    lockToggle.addEventListener('click', () => this.toggleLayerLock(layer));
    // Drag and drop functionality
    layerItem.draggable = true;
    layerItem.addEventListener('dragstart', e =>
      this.handleDragStart(e, layer)
    );
    layerItem.addEventListener('dragover', this.handleDragOver);
    layerItem.addEventListener('drop', e => this.handleDrop(e, layer));
    // Append elements
    layerItem.appendChild(visibilityToggle);
    layerItem.appendChild(layerName);
    layerItem.appendChild(lockToggle);
    return layerItem;
  }
  /**
   * Toggle layer visibility
   */
  static toggleLayerVisibility(layer) {
    const component = document.getElementById(layer.id);
    if (!component) return;
    if (component.style.display === 'none') {
      component.style.display = component.dataset.originalDisplay || '';
      layer.isVisible = true;
    } else {
      component.dataset.originalDisplay = component.style.display;
      component.style.display = 'none';
      layer.isVisible = false;
    }
    this.updateLayersView();
  }
  /**
   * Toggle layer lock state
   */
  static toggleLayerLock(layer) {
    const component = document.getElementById(layer.id);
    if (!component) return;
    layer.isLocked = !layer.isLocked;
    if (layer.isLocked) {
      component.setAttribute('data-locked', 'true');
      component.style.pointerEvents = 'none';
    } else {
      component.removeAttribute('data-locked');
      component.style.pointerEvents = 'auto';
    }
    this.updateLayersView();
  }
  /**
   * Select and customize a specific layer
   */
  static selectLayer(layer) {
    // Switch to customize mode for the selected layer
    this.switchToCustomizeMode(layer.id);
  }
  /**
   * Drag and drop handling methods
   */
  static handleDragStart(e, layer) {
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', layer.id);
      this.draggedItem = e.target;
    }
  }
  static handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  static handleDrop(e, targetLayer) {
    var _a;
    e.preventDefault();
    e.stopPropagation();
    if (!e.dataTransfer) return;
    const fromIndex = parseInt(
      ((_a = e.dataTransfer) === null || _a === void 0
        ? void 0
        : _a.getData('text/plain')) || '-1'
    );
    const toIndex = parseInt(targetLayer.id || '-1');
    // Implement complex reordering logic
    Canvas.reorderComponent(fromIndex, toIndex);
    // Refresh the layers view
    this.updateLayersView();
  }
  /**
   * Switch to layer customization mode
   */
  static switchToCustomizeMode(layerId) {
    // Implement layer-specific customization
    // This could open a sidebar, highlight the component, etc.
    const sidebar = document.getElementById('customize-sidebar');
    if (sidebar) {
      sidebar.style.display = 'block';
      // Load specific layer properties
      this.loadLayerProperties(layerId);
    }
  }
  /**
   * Load layer-specific properties into the sidebar
   */
  static loadLayerProperties(layerId) {
    const component = document.getElementById(layerId);
    if (!component) return;
    // Example: Populate sidebar with component properties
    const propertiesContainer = document.getElementById('layer-properties');
    if (propertiesContainer) {
      propertiesContainer.innerHTML = `
        <h3>Layer Properties: ${layerId}</h3>
        <div>Visibility: ${component.style.display !== 'none' ? 'Visible' : 'Hidden'}</div>
        <div>Locked: ${component.getAttribute('data-locked') === 'true' ? 'Yes' : 'No'}</div>
      `;
    }
  }
}
LayersViewController.layersView = null;
LayersViewController.canvasRoot = null;
LayersViewController.draggedItem = null;
export default LayersViewController;
