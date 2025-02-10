import { Component, Input, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageBuilder } from '@mindfiredigital/page-builder-core/dist/PageBuilder.js';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class PageBuilderComponent {
    elementRef;
    onInitialize;
    customStyles = {};
    pageBuilder = null;
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        // Initial setup if needed
    }
    ngAfterViewInit() {
        this.setupPageBuilder();
    }
    ngOnDestroy() {
        this.pageBuilder = null;
    }
    getWrapperStyles() {
        return {
            margin: 'auto',
            width: '100%',
            height: '100%',
            ...this.customStyles.wrapper,
        };
    }
    setupDOMStructure() {
        const wrapper = this.elementRef.nativeElement.querySelector('div');
        if (!wrapper)
            return;
        // Clear existing content
        wrapper.innerHTML = '';
        // Create the main app container
        const appDiv = document.createElement('div');
        appDiv.id = 'app';
        // Create required inner elements
        appDiv.innerHTML = `
      <div id="sidebar"></div>
      <div id="canvas" class="canvas"></div>
      <div id="customization">
        <h4 id="component-name">Component: None</h4>
        <div id="controls"></div>
        <div id="layers-view" class="hidden"></div>
      </div>
      <div id="notification" class="notification hidden"></div>
      <div id="dialog" class="dialog hidden">
        <div class="dialog-content">
          <p id="dialog-message"></p>
          <button id="dialog-yes" class="dialog-btn">Yes</button>
          <button id="dialog-no" class="dialog-btn">No</button>
        </div>
      </div>
    `;
        wrapper.appendChild(appDiv);
    }
    setupPageBuilder() {
        try {
            if (!this.pageBuilder) {
                this.setupDOMStructure();
                // Create new PageBuilder instance
                const pageBuilder = new PageBuilder();
                this.pageBuilder = pageBuilder;
                if (this.onInitialize) {
                    this.onInitialize(pageBuilder);
                }
                // Trigger DOMContentLoaded to initialize PageBuilder
                const event = new Event('DOMContentLoaded');
                document.dispatchEvent(event);
            }
        }
        catch (error) {
            console.error('Error initializing PageBuilder:', error);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: PageBuilderComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: PageBuilderComponent, isStandalone: true, selector: "mf-page-builder", inputs: { onInitialize: "onInitialize", customStyles: "customStyles" }, ngImport: i0, template: ` <div #wrapper [ngStyle]="getWrapperStyles()"></div> `, isInline: true, styles: ["body,html{margin:0;padding:0;font-family:Arial,sans-serif;display:flex;flex-direction:column;background-color:#f4f4f9ab;overflow:hidden}#preview-navbar{background-color:#f5f5f5;display:flex;justify-content:space-between;align-items:center;padding:10px;box-shadow:0 4px 4px -2px #0000001a}.preview-btn{border:none;padding:8px;cursor:pointer;border-radius:4px;background-color:transparent}.preview-btn:hover{background-color:#bdc3c7}#app{display:flex;height:calc(100vh - 85px);box-shadow:0 4px 8px #0000001a;background-color:#ffffff0a}#sidebar{width:auto;flex-shrink:0;background-color:#f5f5f5;padding:8px;overflow-y:auto;box-shadow:0 2px 4px #0000001a;margin-top:4px}#canvas{width:100%;background-color:#fff;padding:5px;overflow-y:auto;overflow-x:auto;box-sizing:border-box;background-size:20px 20px;background-image:linear-gradient(to right,#efefef 1px,transparent 1px),linear-gradient(to bottom,#efefef 1px,transparent 1px)}#customization{display:none;right:0;width:240px;background-color:#fff;box-shadow:0 2px 4px #0000001a;padding:15px;margin-top:4px;border:1px solid #ecf0f1;overflow:auto}#sidebar h3{text-align:center;font-size:1.2em;margin-bottom:15px;color:#ecf0f1}.draggable{border-radius:8px;padding:8px;text-align:center;cursor:grab;transition:background-color .3s;box-sizing:border-box;max-width:100%;overflow:hidden}.draggable:hover{background-color:#bdc3c7;outline:none;box-shadow:0 0 5px #0003}.draggable:active{cursor:grabbing;opacity:.8}.component{padding:15px;border:1px solid #ddd;background-color:#f9f9f9;border-radius:5px;cursor:pointer;position:absolute;transition:box-shadow .3s}.component:hover{box-shadow:0 2px 8px #0003}.text-component{font-size:16px;color:#333}.button-component{padding:10px 20px;background-color:#3498db;color:#fff;border:none;border-radius:5px;cursor:pointer;transition:background-color .3s}.button-component:hover{background-color:#2980b9}.header-component{font-size:24px;font-weight:700;color:#333;margin:10px 0}.image-component{max-width:100%;border-radius:5px;position:relative;display:flex;justify-content:center;width:300px;height:300px}.preview-desktop{max-width:100%}.preview-tablet{max-width:768px;margin-left:auto;margin-right:auto}.preview-mobile{max-width:375px;margin-left:auto;margin-right:auto}.editable-component{border:1px solid #ddd;padding:10px;margin:5px;border-radius:4px;cursor:text;position:relative;pointer-events:auto}.component-resizer{overflow:hidden!important;resize:both!important}.container-highlight{outline:1px solid #3498db}.container-component .editable-component{pointer-events:auto}.container-component{min-height:100px;padding:10px;margin:5px;border:.5px dashed #ccc;display:flex;flex-direction:column;position:relative;pointer-events:auto}.component-icon{width:40px;height:40px;object-fit:contain}.nav-icon{width:24px;height:24px;object-fit:contain}.left-buttons,.right-buttons{display:flex;gap:10px}.center-text{font-size:18px;font-weight:700;color:#000708;text-align:center;flex-grow:1;display:flex;justify-content:center}.component-label,.column-label{position:absolute;top:1px;left:0;background:#000000b3;color:#fff;font-size:12px;padding:2px 4px;border-radius:3px;display:none;z-index:10;pointer-events:none}.editable-component:hover .component-label,.column:hover .column-label{display:block}.upload-btn{position:absolute;top:10px;left:10px;background-color:transparent;color:#fff;border:none;padding:5px;border-radius:50%;cursor:pointer;font-size:18px;display:none;opacity:.5;z-index:10;transition:opacity .2s ease}.image-component:hover .upload-btn{display:block}.upload-btn:hover{opacity:1;background-color:#00000041}.notification{position:fixed;bottom:20px;right:20px;background-color:#4caf50;color:#fff;padding:10px 20px;border-radius:5px;font-size:16px;box-shadow:0 4px 8px #0003;opacity:0;transition:opacity .3s ease-in-out}.notification.visible{opacity:1}.notification.hidden{opacity:0}.dialog{position:fixed;top:0;left:0;width:100%;height:100%;background:#00000080;display:flex;align-items:center;justify-content:center;z-index:1000}.dialog.hidden{display:none}.dialog-content{background:#fff;padding:20px;border-radius:8px;text-align:center;width:300px}.dialog-btn{margin:10px;padding:10px 20px;border:none;border-radius:4px;cursor:pointer}#dialog-yes{background-color:#e74c3c;color:#fff}#dialog-no{background-color:#95a5a6;color:#fff}.component-controls{display:none;position:absolute;top:1px;right:1px;align-items:center;z-index:10;cursor:pointer}.delete-icon{width:16px;height:16px;vertical-align:middle;cursor:pointer}.editable-component:hover .component-controls{display:flex;gap:2px}.control-wrapper{display:flex;align-items:center;margin-bottom:10px;gap:10px}#controls{display:flex;flex-direction:column}.control-wrapper label{display:block;margin-bottom:6px;font-size:14px;font-weight:500;color:#333}.control-wrapper input[type=number]{width:40px;padding:4px 8px;font-size:14px;margin-right:4px;border:1px solid #ccc;border-radius:4px}.control-wrapper input[type=color]{width:25px;height:25px;border:none;cursor:pointer;border-radius:100%;padding:1px;margin:0;overflow:hidden}.control-wrapper select{width:60px;padding:8px;font-size:14px;border:1px solid #ccc;border-radius:4px;background-color:#fff;-webkit-appearance:none;appearance:none}.control-wrapper .step-buttons{display:inline-flex;flex-direction:column;justify-content:center}.control-wrapper .step-buttons button{width:40px;height:20px;border:1px solid #ccc;border-radius:2px;background-color:#f1f1f1;cursor:pointer;font-size:12px;text-align:center;padding:0;line-height:20px;-webkit-user-select:none;user-select:none}.control-wrapper .step-buttons button:hover{background-color:#e7e7e7}.control-wrapper .step-buttons button:active{background-color:#ddd}#component-name{background-color:#f5f5f5;padding:3px;margin-bottom:20px;border:2px solid #ddd;border-radius:5px;font-weight:700;font-size:12px;color:#333;box-shadow:0 2px 4px #0000001a;width:auto}#component-name span{font-size:12px;color:#666}#color-value{display:inline-block;font-size:13px;border:1px solid #ccc;border-radius:4px;color:#333}.close-button{position:absolute;top:90px;right:10px;background-color:transparent;color:#070707;border:none;border-radius:50%;width:30px;height:30px;cursor:pointer;font-size:30px;text-align:center;line-height:30px;display:flex;justify-content:center;align-items:center;transition:transform .2s}.close-button:hover{transform:scale(1.1);background-color:#706e6e42}#preview-modal{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#fff;z-index:9999;overflow:auto}#close-modal-btn{position:absolute;top:10px;left:10px;background-color:#f5f5f5;color:#0a0909;border:none;border-radius:50%;width:30px;height:30px;font-size:18px;cursor:pointer;z-index:10000;transition:transform .2s}#close-modal-btn:hover{transform:scale(1.1);background-color:#bebebe}.modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;justify-content:center;align-items:center;z-index:1000;transition:opacity .3s ease}.modal.show{display:flex;opacity:1}.modal.hide{opacity:0}.modal-content{position:relative;background-color:#fff;width:90%;height:70%;max-width:1000px;max-height:600px;display:flex;border-radius:8px;box-shadow:0 4px 6px #0000001a;padding:10px}.modal-section{width:50%;padding:10px}.modal-section h2{font-size:18px;font-weight:700;margin-bottom:10px}.code-block{width:95%;height:80%;font-family:Courier New,monospace;font-size:14px;padding:10px;border-radius:4px;border:1px solid #ccc;color:#de8f5f;background-color:#342931;overflow-y:auto;white-space:pre-wrap;line-height:1.5}.tag{color:#66d9ef}.attribute{color:#a6e22e}.string{color:#e6db74}.property{color:#66d9ef}.value{color:#e6db74}.bracket{color:#ec8305}.button-wrapper{display:flex;flex-direction:column;padding:20px}.export-btn{position:absolute;bottom:15px;right:15px;padding:10px 20px;font-size:14px;color:#fff;background-color:#007bff;border:none;border-radius:5px;cursor:pointer;text-align:center;outline:none;transition:background-color .2s ease-in-out}.export-btn:hover{background-color:#0056b3}.layers-mode-toggle{display:flex;margin-bottom:10px}.layers-mode-toggle button{flex:1;padding:10px;background-color:#f0f0f0;border:none;cursor:pointer}.layers-mode-toggle button.active{background-color:#e0e0e0;font-weight:700}.hidden{display:none}ul{margin:0;padding:0;list-style:none}.layer-item{display:flex;align-items:center;justify-content:space-between;list-style:none;padding:8px 12px;border-bottom:1px solid #ddd;transition:background-color .3s ease}.layer-item:hover{background-color:#f9f9f9;transform:scale(1.02)}.layer-children{margin:0;max-height:0;padding:0;list-style:none;transition:max-height .3s ease,opacity .3s ease}.layer-expand-toggle{cursor:pointer;margin-right:8px}.layer-children.expanded{max-height:none;opacity:1}.drop-preview{border:2px dashed rgba(0,0,255,.7);background-color:#0000ff1a;position:absolute;pointer-events:none;display:none}.drop-preview.visible{display:block}.close-btn{position:absolute;top:10px;right:10px;background:transparent;border:none;font-size:24px;cursor:pointer;color:#333}.close-btn:hover{color:red}.categoryHeading{margin:0%;text-align:center}.video-component{width:300px;height:300px;position:relative;background-color:#f0f0f0;display:flex;justify-content:center;align-items:center;border:1px solid #ccc}.video-component video{display:none}.pencil-button{position:absolute;top:10px;left:10px;background:transparent;border:none;cursor:pointer;font-size:24px}.upload-text{color:#666;text-align:center}.table-component .button-container{opacity:0;transition:opacity .3s ease;pointer-events:none}.table-component:hover .button-container{opacity:1;pointer-events:auto}.link-component{border:none;display:flex;gap:8px;align-items:center;padding:8px}.link-component-label{text-decoration:none;color:#00f;font-size:14px;cursor:pointer;margin:10px}.edit-link{background-color:transparent!important;position:absolute;bottom:1px;left:4px;text-decoration:none;padding:4px 8px;cursor:pointer;display:none;border:none;font-size:12px}.link-component:hover .edit-link{display:block}.edit-link-form{display:none;flex-direction:column;gap:8px;padding:8px}.input-field{padding:4px;margin-bottom:4px}.save-button{padding:4px 8px;cursor:pointer}.checkbox-label{display:flex;align-items:center}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: PageBuilderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mf-page-builder', standalone: true, imports: [CommonModule], template: ` <div #wrapper [ngStyle]="getWrapperStyles()"></div> `, styles: ["body,html{margin:0;padding:0;font-family:Arial,sans-serif;display:flex;flex-direction:column;background-color:#f4f4f9ab;overflow:hidden}#preview-navbar{background-color:#f5f5f5;display:flex;justify-content:space-between;align-items:center;padding:10px;box-shadow:0 4px 4px -2px #0000001a}.preview-btn{border:none;padding:8px;cursor:pointer;border-radius:4px;background-color:transparent}.preview-btn:hover{background-color:#bdc3c7}#app{display:flex;height:calc(100vh - 85px);box-shadow:0 4px 8px #0000001a;background-color:#ffffff0a}#sidebar{width:auto;flex-shrink:0;background-color:#f5f5f5;padding:8px;overflow-y:auto;box-shadow:0 2px 4px #0000001a;margin-top:4px}#canvas{width:100%;background-color:#fff;padding:5px;overflow-y:auto;overflow-x:auto;box-sizing:border-box;background-size:20px 20px;background-image:linear-gradient(to right,#efefef 1px,transparent 1px),linear-gradient(to bottom,#efefef 1px,transparent 1px)}#customization{display:none;right:0;width:240px;background-color:#fff;box-shadow:0 2px 4px #0000001a;padding:15px;margin-top:4px;border:1px solid #ecf0f1;overflow:auto}#sidebar h3{text-align:center;font-size:1.2em;margin-bottom:15px;color:#ecf0f1}.draggable{border-radius:8px;padding:8px;text-align:center;cursor:grab;transition:background-color .3s;box-sizing:border-box;max-width:100%;overflow:hidden}.draggable:hover{background-color:#bdc3c7;outline:none;box-shadow:0 0 5px #0003}.draggable:active{cursor:grabbing;opacity:.8}.component{padding:15px;border:1px solid #ddd;background-color:#f9f9f9;border-radius:5px;cursor:pointer;position:absolute;transition:box-shadow .3s}.component:hover{box-shadow:0 2px 8px #0003}.text-component{font-size:16px;color:#333}.button-component{padding:10px 20px;background-color:#3498db;color:#fff;border:none;border-radius:5px;cursor:pointer;transition:background-color .3s}.button-component:hover{background-color:#2980b9}.header-component{font-size:24px;font-weight:700;color:#333;margin:10px 0}.image-component{max-width:100%;border-radius:5px;position:relative;display:flex;justify-content:center;width:300px;height:300px}.preview-desktop{max-width:100%}.preview-tablet{max-width:768px;margin-left:auto;margin-right:auto}.preview-mobile{max-width:375px;margin-left:auto;margin-right:auto}.editable-component{border:1px solid #ddd;padding:10px;margin:5px;border-radius:4px;cursor:text;position:relative;pointer-events:auto}.component-resizer{overflow:hidden!important;resize:both!important}.container-highlight{outline:1px solid #3498db}.container-component .editable-component{pointer-events:auto}.container-component{min-height:100px;padding:10px;margin:5px;border:.5px dashed #ccc;display:flex;flex-direction:column;position:relative;pointer-events:auto}.component-icon{width:40px;height:40px;object-fit:contain}.nav-icon{width:24px;height:24px;object-fit:contain}.left-buttons,.right-buttons{display:flex;gap:10px}.center-text{font-size:18px;font-weight:700;color:#000708;text-align:center;flex-grow:1;display:flex;justify-content:center}.component-label,.column-label{position:absolute;top:1px;left:0;background:#000000b3;color:#fff;font-size:12px;padding:2px 4px;border-radius:3px;display:none;z-index:10;pointer-events:none}.editable-component:hover .component-label,.column:hover .column-label{display:block}.upload-btn{position:absolute;top:10px;left:10px;background-color:transparent;color:#fff;border:none;padding:5px;border-radius:50%;cursor:pointer;font-size:18px;display:none;opacity:.5;z-index:10;transition:opacity .2s ease}.image-component:hover .upload-btn{display:block}.upload-btn:hover{opacity:1;background-color:#00000041}.notification{position:fixed;bottom:20px;right:20px;background-color:#4caf50;color:#fff;padding:10px 20px;border-radius:5px;font-size:16px;box-shadow:0 4px 8px #0003;opacity:0;transition:opacity .3s ease-in-out}.notification.visible{opacity:1}.notification.hidden{opacity:0}.dialog{position:fixed;top:0;left:0;width:100%;height:100%;background:#00000080;display:flex;align-items:center;justify-content:center;z-index:1000}.dialog.hidden{display:none}.dialog-content{background:#fff;padding:20px;border-radius:8px;text-align:center;width:300px}.dialog-btn{margin:10px;padding:10px 20px;border:none;border-radius:4px;cursor:pointer}#dialog-yes{background-color:#e74c3c;color:#fff}#dialog-no{background-color:#95a5a6;color:#fff}.component-controls{display:none;position:absolute;top:1px;right:1px;align-items:center;z-index:10;cursor:pointer}.delete-icon{width:16px;height:16px;vertical-align:middle;cursor:pointer}.editable-component:hover .component-controls{display:flex;gap:2px}.control-wrapper{display:flex;align-items:center;margin-bottom:10px;gap:10px}#controls{display:flex;flex-direction:column}.control-wrapper label{display:block;margin-bottom:6px;font-size:14px;font-weight:500;color:#333}.control-wrapper input[type=number]{width:40px;padding:4px 8px;font-size:14px;margin-right:4px;border:1px solid #ccc;border-radius:4px}.control-wrapper input[type=color]{width:25px;height:25px;border:none;cursor:pointer;border-radius:100%;padding:1px;margin:0;overflow:hidden}.control-wrapper select{width:60px;padding:8px;font-size:14px;border:1px solid #ccc;border-radius:4px;background-color:#fff;-webkit-appearance:none;appearance:none}.control-wrapper .step-buttons{display:inline-flex;flex-direction:column;justify-content:center}.control-wrapper .step-buttons button{width:40px;height:20px;border:1px solid #ccc;border-radius:2px;background-color:#f1f1f1;cursor:pointer;font-size:12px;text-align:center;padding:0;line-height:20px;-webkit-user-select:none;user-select:none}.control-wrapper .step-buttons button:hover{background-color:#e7e7e7}.control-wrapper .step-buttons button:active{background-color:#ddd}#component-name{background-color:#f5f5f5;padding:3px;margin-bottom:20px;border:2px solid #ddd;border-radius:5px;font-weight:700;font-size:12px;color:#333;box-shadow:0 2px 4px #0000001a;width:auto}#component-name span{font-size:12px;color:#666}#color-value{display:inline-block;font-size:13px;border:1px solid #ccc;border-radius:4px;color:#333}.close-button{position:absolute;top:90px;right:10px;background-color:transparent;color:#070707;border:none;border-radius:50%;width:30px;height:30px;cursor:pointer;font-size:30px;text-align:center;line-height:30px;display:flex;justify-content:center;align-items:center;transition:transform .2s}.close-button:hover{transform:scale(1.1);background-color:#706e6e42}#preview-modal{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#fff;z-index:9999;overflow:auto}#close-modal-btn{position:absolute;top:10px;left:10px;background-color:#f5f5f5;color:#0a0909;border:none;border-radius:50%;width:30px;height:30px;font-size:18px;cursor:pointer;z-index:10000;transition:transform .2s}#close-modal-btn:hover{transform:scale(1.1);background-color:#bebebe}.modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;justify-content:center;align-items:center;z-index:1000;transition:opacity .3s ease}.modal.show{display:flex;opacity:1}.modal.hide{opacity:0}.modal-content{position:relative;background-color:#fff;width:90%;height:70%;max-width:1000px;max-height:600px;display:flex;border-radius:8px;box-shadow:0 4px 6px #0000001a;padding:10px}.modal-section{width:50%;padding:10px}.modal-section h2{font-size:18px;font-weight:700;margin-bottom:10px}.code-block{width:95%;height:80%;font-family:Courier New,monospace;font-size:14px;padding:10px;border-radius:4px;border:1px solid #ccc;color:#de8f5f;background-color:#342931;overflow-y:auto;white-space:pre-wrap;line-height:1.5}.tag{color:#66d9ef}.attribute{color:#a6e22e}.string{color:#e6db74}.property{color:#66d9ef}.value{color:#e6db74}.bracket{color:#ec8305}.button-wrapper{display:flex;flex-direction:column;padding:20px}.export-btn{position:absolute;bottom:15px;right:15px;padding:10px 20px;font-size:14px;color:#fff;background-color:#007bff;border:none;border-radius:5px;cursor:pointer;text-align:center;outline:none;transition:background-color .2s ease-in-out}.export-btn:hover{background-color:#0056b3}.layers-mode-toggle{display:flex;margin-bottom:10px}.layers-mode-toggle button{flex:1;padding:10px;background-color:#f0f0f0;border:none;cursor:pointer}.layers-mode-toggle button.active{background-color:#e0e0e0;font-weight:700}.hidden{display:none}ul{margin:0;padding:0;list-style:none}.layer-item{display:flex;align-items:center;justify-content:space-between;list-style:none;padding:8px 12px;border-bottom:1px solid #ddd;transition:background-color .3s ease}.layer-item:hover{background-color:#f9f9f9;transform:scale(1.02)}.layer-children{margin:0;max-height:0;padding:0;list-style:none;transition:max-height .3s ease,opacity .3s ease}.layer-expand-toggle{cursor:pointer;margin-right:8px}.layer-children.expanded{max-height:none;opacity:1}.drop-preview{border:2px dashed rgba(0,0,255,.7);background-color:#0000ff1a;position:absolute;pointer-events:none;display:none}.drop-preview.visible{display:block}.close-btn{position:absolute;top:10px;right:10px;background:transparent;border:none;font-size:24px;cursor:pointer;color:#333}.close-btn:hover{color:red}.categoryHeading{margin:0%;text-align:center}.video-component{width:300px;height:300px;position:relative;background-color:#f0f0f0;display:flex;justify-content:center;align-items:center;border:1px solid #ccc}.video-component video{display:none}.pencil-button{position:absolute;top:10px;left:10px;background:transparent;border:none;cursor:pointer;font-size:24px}.upload-text{color:#666;text-align:center}.table-component .button-container{opacity:0;transition:opacity .3s ease;pointer-events:none}.table-component:hover .button-container{opacity:1;pointer-events:auto}.link-component{border:none;display:flex;gap:8px;align-items:center;padding:8px}.link-component-label{text-decoration:none;color:#00f;font-size:14px;cursor:pointer;margin:10px}.edit-link{background-color:transparent!important;position:absolute;bottom:1px;left:4px;text-decoration:none;padding:4px 8px;cursor:pointer;display:none;border:none;font-size:12px}.link-component:hover .edit-link{display:block}.edit-link-form{display:none;flex-direction:column;gap:8px;padding:8px}.input-field{padding:4px;margin-bottom:4px}.save-button{padding:4px 8px;cursor:pointer}.checkbox-label{display:flex;align-items:center}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { onInitialize: [{
                type: Input
            }], customStyles: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1idWlsZGVyLWFuZ3VsYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9wYWdlLWJ1aWxkZXItYW5ndWxhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFJVCxLQUFLLEdBRU4sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3REFBd0QsQ0FBQzs7O0FBVXJGLE1BQU0sT0FBTyxvQkFBb0I7SUFNWDtJQUxYLFlBQVksQ0FBc0M7SUFDbEQsWUFBWSxHQUFpQixFQUFFLENBQUM7SUFFakMsV0FBVyxHQUF1QixJQUFJLENBQUM7SUFFL0MsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFHLENBQUM7SUFFOUMsUUFBUTtRQUNOLDBCQUEwQjtJQUM1QixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVNLGdCQUFnQjtRQUNyQixPQUFPO1lBQ0wsTUFBTSxFQUFFLE1BQU07WUFDZCxLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxNQUFNO1lBQ2QsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU87U0FDN0IsQ0FBQztJQUNKLENBQUM7SUFFTyxpQkFBaUI7UUFDdkIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTztRQUVyQix5QkFBeUI7UUFDekIsT0FBTyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFFdkIsZ0NBQWdDO1FBQ2hDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFFbEIsaUNBQWlDO1FBQ2pDLE1BQU0sQ0FBQyxTQUFTLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQmxCLENBQUM7UUFFRixPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTyxnQkFBZ0I7UUFDdEIsSUFBSSxDQUFDO1lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBRXpCLGtDQUFrQztnQkFDbEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7Z0JBRS9CLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNqQyxDQUFDO2dCQUVELHFEQUFxRDtnQkFDckQsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDNUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQyxDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFELENBQUM7SUFDSCxDQUFDO3dHQWxGVSxvQkFBb0I7NEZBQXBCLG9CQUFvQixtSkFIckIsdURBQXVELGdvVUFEdkQsWUFBWTs7NEZBSVgsb0JBQW9CO2tCQVBoQyxTQUFTOytCQUNFLGlCQUFpQixjQUNmLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxZQUNiLHVEQUF1RDsrRUFJeEQsWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBFbGVtZW50UmVmLFxyXG4gIElucHV0LFxyXG4gIEFmdGVyVmlld0luaXQsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFBhZ2VCdWlsZGVyIH0gZnJvbSAnQG1pbmRmaXJlZGlnaXRhbC9wYWdlLWJ1aWxkZXItY29yZS9kaXN0L1BhZ2VCdWlsZGVyLmpzJztcclxuaW1wb3J0IHsgQ3VzdG9tU3R5bGVzIH0gZnJvbSAnLi9tb2RlbHMvY3VzdG9tLXN0eWxlcy5pbnRlcmZhY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtZi1wYWdlLWJ1aWxkZXInLFxyXG4gIHN0YW5kYWxvbmU6IHRydWUsXHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgdGVtcGxhdGU6IGAgPGRpdiAjd3JhcHBlciBbbmdTdHlsZV09XCJnZXRXcmFwcGVyU3R5bGVzKClcIj48L2Rpdj4gYCxcclxuICBzdHlsZVVybHM6IFsnLi9zdHlsZXMvX3N0eWxlcy5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQYWdlQnVpbGRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcclxuICBASW5wdXQoKSBvbkluaXRpYWxpemU/OiAocGFnZUJ1aWxkZXI6IFBhZ2VCdWlsZGVyKSA9PiB2b2lkO1xyXG4gIEBJbnB1dCgpIGN1c3RvbVN0eWxlczogQ3VzdG9tU3R5bGVzID0ge307XHJcblxyXG4gIHByaXZhdGUgcGFnZUJ1aWxkZXI6IFBhZ2VCdWlsZGVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAvLyBJbml0aWFsIHNldHVwIGlmIG5lZWRlZFxyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZXR1cFBhZ2VCdWlsZGVyKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMucGFnZUJ1aWxkZXIgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFdyYXBwZXJTdHlsZXMoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtYXJnaW46ICdhdXRvJyxcclxuICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgaGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgIC4uLnRoaXMuY3VzdG9tU3R5bGVzLndyYXBwZXIsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXR1cERPTVN0cnVjdHVyZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdkaXYnKTtcclxuICAgIGlmICghd3JhcHBlcikgcmV0dXJuO1xyXG5cclxuICAgIC8vIENsZWFyIGV4aXN0aW5nIGNvbnRlbnRcclxuICAgIHdyYXBwZXIuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgLy8gQ3JlYXRlIHRoZSBtYWluIGFwcCBjb250YWluZXJcclxuICAgIGNvbnN0IGFwcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgYXBwRGl2LmlkID0gJ2FwcCc7XHJcblxyXG4gICAgLy8gQ3JlYXRlIHJlcXVpcmVkIGlubmVyIGVsZW1lbnRzXHJcbiAgICBhcHBEaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICA8ZGl2IGlkPVwic2lkZWJhclwiPjwvZGl2PlxyXG4gICAgICA8ZGl2IGlkPVwiY2FudmFzXCIgY2xhc3M9XCJjYW52YXNcIj48L2Rpdj5cclxuICAgICAgPGRpdiBpZD1cImN1c3RvbWl6YXRpb25cIj5cclxuICAgICAgICA8aDQgaWQ9XCJjb21wb25lbnQtbmFtZVwiPkNvbXBvbmVudDogTm9uZTwvaDQ+XHJcbiAgICAgICAgPGRpdiBpZD1cImNvbnRyb2xzXCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBpZD1cImxheWVycy12aWV3XCIgY2xhc3M9XCJoaWRkZW5cIj48L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgaWQ9XCJub3RpZmljYXRpb25cIiBjbGFzcz1cIm5vdGlmaWNhdGlvbiBoaWRkZW5cIj48L2Rpdj5cclxuICAgICAgPGRpdiBpZD1cImRpYWxvZ1wiIGNsYXNzPVwiZGlhbG9nIGhpZGRlblwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJkaWFsb2ctY29udGVudFwiPlxyXG4gICAgICAgICAgPHAgaWQ9XCJkaWFsb2ctbWVzc2FnZVwiPjwvcD5cclxuICAgICAgICAgIDxidXR0b24gaWQ9XCJkaWFsb2cteWVzXCIgY2xhc3M9XCJkaWFsb2ctYnRuXCI+WWVzPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGlkPVwiZGlhbG9nLW5vXCIgY2xhc3M9XCJkaWFsb2ctYnRuXCI+Tm88L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICBgO1xyXG5cclxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoYXBwRGl2KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0dXBQYWdlQnVpbGRlcigpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmICghdGhpcy5wYWdlQnVpbGRlcikge1xyXG4gICAgICAgIHRoaXMuc2V0dXBET01TdHJ1Y3R1cmUoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIG5ldyBQYWdlQnVpbGRlciBpbnN0YW5jZVxyXG4gICAgICAgIGNvbnN0IHBhZ2VCdWlsZGVyID0gbmV3IFBhZ2VCdWlsZGVyKCk7XHJcbiAgICAgICAgdGhpcy5wYWdlQnVpbGRlciA9IHBhZ2VCdWlsZGVyO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vbkluaXRpYWxpemUpIHtcclxuICAgICAgICAgIHRoaXMub25Jbml0aWFsaXplKHBhZ2VCdWlsZGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRyaWdnZXIgRE9NQ29udGVudExvYWRlZCB0byBpbml0aWFsaXplIFBhZ2VCdWlsZGVyXHJcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoJ0RPTUNvbnRlbnRMb2FkZWQnKTtcclxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW5pdGlhbGl6aW5nIFBhZ2VCdWlsZGVyOicsIGVycm9yKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19