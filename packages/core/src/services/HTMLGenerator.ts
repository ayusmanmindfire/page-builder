import { Canvas } from '../canvas/Canvas';

export class HTMLGenerator {
  private canvas: Canvas;
  private styleElement: HTMLStyleElement;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.styleElement = document.createElement('style');
    document.head.appendChild(this.styleElement);
  }

  generateHTML(): string {
    const canvasElement = document.getElementById('canvas');
    if (!canvasElement) {
      console.warn('Canvas element not found!');
      return this.getBaseHTML(); // Return base HTML if canvas is not found
    }

    // Clone the canvas element to avoid modifying the original
    const cleanCanvas = canvasElement.cloneNode(true) as HTMLElement;

    // Remove unwanted attributes and elements from all children
    this.cleanupElements(cleanCanvas);

    // Create a full HTML document
    // Use the canvas's outerHTML to include the element itself
    return this.getBaseHTML(cleanCanvas.innerHTML);
  }

  private getBaseHTML(bodyContent: string = 'children'): string {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Builder</title>
    <style>
      ${this.generateCSS()}
    </style>
 </head>
        <body>
            <div id="page" class="home">
            ${bodyContent}
            </div>
        </body>
      </html>`;
  }

  private cleanupElements(element: HTMLElement) {
    const attributesToRemove = ['contenteditable', 'draggable', 'style'];
    const classesToRemove = [
      'component-controls',
      'delete-icon',
      'component-label',
      'column-label',
      'editable-component',
      'resizers',
      'resizer',
      'upload-btn',
      'component-resizer',
      'drop-preview',
      'edit-link-form',
      'edit-link',
    ];

    Array.from(element.children).forEach(child => {
      const childElement = child as HTMLElement;

      // Remove specified attributes
      attributesToRemove.forEach(attr => {
        childElement.removeAttribute(attr);
      });

      // Remove specified classes
      classesToRemove.forEach(classToRemove => {
        childElement.classList.remove(classToRemove);
      });

      // Remove input elements
      const inputElements = element.querySelectorAll('input');
      inputElements.forEach(input => input.remove());

      // Remove specific child elements
      const elementsToRemove = childElement.querySelectorAll(
        '.component-controls, .delete-icon, .component-label,.column-label, .resizers, .resizer, .drop-preview, .upload-btn, component-resizer,.edit-link, .edit-link-form'
      );
      elementsToRemove.forEach(el => el.remove());

      // Recursively clean up nested elements
      if (childElement.children.length > 0) {
        this.cleanupElements(childElement);
      }
    });
  }

  generateCSS(): string {
    const canvasElement = document.getElementById('canvas');
    if (!canvasElement) return '';
    const backgroundColor = canvasElement
      ? window
          .getComputedStyle(canvasElement)
          .getPropertyValue('background-color')
      : 'rgb(255, 255, 255)'; // Fallback to white if canvas is not found

    const styles: string[] = [];
    // Global and .home styles
    styles.push(`
      body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
      }
      .home {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          min-height:100vh;
          background-color: ${backgroundColor};
          margin: 0;
      }
      `);

    const elements = canvasElement.querySelectorAll('*');

    const stylesToCapture = [
      'position',
      'top',
      'left',
      'right',
      'bottom',
      'width',
      'height',
      'min-width',
      'min-height',
      'max-width',
      'max-height',
      'margin',
      'padding',
      'background-color',
      'background-image',
      'border',
      'border-radius',
      'transform',
      'opacity',
      'z-index',
      'display',
      'flex-direction',
      'justify-content',
      'align-items',
      'flex-wrap',
      'font-size',
      'font-weight',
      'color',
      'text-align',
      'line-height',
      'font-family',
    ];

    const classesToExclude = [
      'component-controls',
      'delete-icon',
      'component-label',
      'resizers',
      'resizer',
      'upload-btn',
      'edit-link-form',
      'edit-link',
    ];

    elements.forEach(component => {
      // Skip excluded elements
      if (classesToExclude.some(cls => component.classList.contains(cls))) {
        return;
      }

      const computedStyles = window.getComputedStyle(component);
      const componentStyles: string[] = [];

      stylesToCapture.forEach(prop => {
        const value = computedStyles.getPropertyValue(prop);
        if (value && value !== 'none' && value !== '') {
          // Exclude "resize" property with any value
          if (prop === 'resize') return;

          componentStyles.push(`${prop}: ${value};`);
        }
      });

      const selector = this.generateUniqueSelector(component);

      if (componentStyles.length > 0) {
        styles.push(`
        ${selector} {
          ${componentStyles.join('\n  ')}
        }`);
      }
    });

    return styles.join('\n');
  }

  private generateUniqueSelector(element: Element): string {
    if (element.id) {
      return `#${element.id}`;
    }

    if (element.className) {
      return `.${element.className.split(' ').join('.')}`;
    }

    // Create a tag-based selector with index for uniqueness
    const parent = element.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children);
      const index = siblings.indexOf(element);
      return `${element.tagName.toLowerCase()}:nth-child(${index + 1})`;
    }

    return element.tagName.toLowerCase();
  }

  applyCSS(css: string) {
    this.styleElement.textContent = css;
  }
}
