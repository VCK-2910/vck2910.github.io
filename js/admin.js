// Admin Page Builder JavaScript
class PageBuilder {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.selectedElement = null;
        this.history = [];
        this.historyIndex = -1;
        this.zoom = 100;
        this.components = [];
        this.elementCounter = 0;
        
        this.init();
    }
    
    init() {
        this.setupDragAndDrop();
        this.setupToolbar();
        this.setupPropertiesPanel();
        this.setupModals();
        this.setupKeyboardShortcuts();
    }
    
    // Drag and Drop Setup
    setupDragAndDrop() {
        const componentItems = document.querySelectorAll('.component-item');
        
        componentItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.effectAllowed = 'copy';
                e.dataTransfer.setData('component-type', item.dataset.type);
                item.classList.add('dragging');
            });
            
            item.addEventListener('dragend', (e) => {
                item.classList.remove('dragging');
            });
        });
        
        this.canvas.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            this.canvas.classList.add('drag-over');
        });
        
        this.canvas.addEventListener('dragleave', (e) => {
            if (e.target === this.canvas) {
                this.canvas.classList.remove('drag-over');
            }
        });
        
        this.canvas.addEventListener('drop', (e) => {
            e.preventDefault();
            this.canvas.classList.remove('drag-over');
            
            const componentType = e.dataTransfer.getData('component-type');
            if (componentType) {
                this.addComponent(componentType);
            }
        });
    }
    
    // Add Component to Canvas
    addComponent(type) {
        const emptyCanvas = document.querySelector('.empty-canvas');
        if (emptyCanvas) {
            emptyCanvas.remove();
        }
        
        const component = this.createComponent(type);
        this.canvas.appendChild(component);
        this.components.push(component);
        this.saveHistory();
        this.selectElement(component);
    }
    
    // Create Component Element
    createComponent(type) {
        const element = document.createElement('div');
        element.className = 'canvas-element';
        element.dataset.type = type;
        element.dataset.id = `element-${++this.elementCounter}`;
        
        const controls = document.createElement('div');
        controls.className = 'element-controls';
        controls.innerHTML = `
            <button class="control-btn" onclick="pageBuilder.moveUp(this.parentElement.parentElement)">
                <i class="fas fa-arrow-up"></i>
            </button>
            <button class="control-btn" onclick="pageBuilder.moveDown(this.parentElement.parentElement)">
                <i class="fas fa-arrow-down"></i>
            </button>
            <button class="control-btn" onclick="pageBuilder.duplicateElement(this.parentElement.parentElement)">
                <i class="fas fa-copy"></i>
            </button>
            <button class="control-btn danger" onclick="pageBuilder.deleteElement(this.parentElement.parentElement)">
                <i class="fas fa-trash"></i>
            </button>
        `;
        element.appendChild(controls);
        
        const content = this.getComponentTemplate(type);
        const contentDiv = document.createElement('div');
        contentDiv.className = 'element-content';
        contentDiv.innerHTML = content;
        element.appendChild(contentDiv);
        
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectElement(element);
        });
        
        return element;
    }
    
    // Component Templates
    getComponentTemplate(type) {
        const templates = {
            section: '<section style="padding: 60px 20px; background: #f9f9f9;"><h2>New Section</h2><p>Section content goes here...</p></section>',
            container: '<div class="container" style="max-width: 1200px; margin: 0 auto; padding: 20px;"><p>Container content</p></div>',
            row: '<div style="display: flex; gap: 20px; flex-wrap: wrap;"><div style="flex: 1; min-width: 200px; padding: 20px; background: #f0f0f0;">Column 1</div><div style="flex: 1; min-width: 200px; padding: 20px; background: #f0f0f0;">Column 2</div></div>',
            heading: '<h2 style="color: #333; font-size: 32px; margin-bottom: 16px;">Heading Text</h2>',
            text: '<p style="color: #666; font-size: 16px; line-height: 1.6;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
            button: '<button style="padding: 12px 32px; background: #C41E3A; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer;">Click Me</button>',
            image: '<img src="https://via.placeholder.com/800x400" alt="Placeholder" style="width: 100%; height: auto; border-radius: 8px;">',
            video: '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="about:blank" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allowfullscreen></iframe></div>',
            divider: '<hr style="border: none; border-top: 2px solid #e0e0e0; margin: 40px 0;">',
            spacer: '<div style="height: 60px;"></div>',
            navbar: '<nav style="background: #333; padding: 15px 20px;"><ul style="list-style: none; display: flex; gap: 30px; margin: 0;"><li><a href="#" style="color: white; text-decoration: none;">Home</a></li><li><a href="#" style="color: white; text-decoration: none;">About</a></li><li><a href="#" style="color: white; text-decoration: none;">Menu</a></li><li><a href="#" style="color: white; text-decoration: none;">Contact</a></li></ul></nav>',
            menu: '<div class="menu-tabs" style="display: flex; gap: 10px; margin-bottom: 20px;"><button style="padding: 10px 20px; background: #C41E3A; color: white; border: none; cursor: pointer;">All Items</button><button style="padding: 10px 20px; background: #f0f0f0; border: none; cursor: pointer;">Appetizers</button><button style="padding: 10px 20px; background: #f0f0f0; border: none; cursor: pointer;">Main Course</button></div>',
            form: '<form style="max-width: 600px;"><div style="margin-bottom: 16px;"><label style="display: block; margin-bottom: 8px; font-weight: 600;">Name</label><input type="text" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"></div><div style="margin-bottom: 16px;"><label style="display: block; margin-bottom: 8px; font-weight: 600;">Email</label><input type="email" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"></div><button type="submit" style="padding: 12px 32px; background: #C41E3A; color: white; border: none; border-radius: 4px; cursor: pointer;">Submit</button></form>',
            input: '<input type="text" placeholder="Enter text..." style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px;">',
            textarea: '<textarea placeholder="Enter your message..." rows="5" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px; font-family: inherit;"></textarea>',
            card: '<div style="background: white; border-radius: 8px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"><h3 style="margin-bottom: 12px;">Card Title</h3><p style="color: #666; margin-bottom: 16px;">Card content goes here. You can add any content you want.</p><button style="padding: 10px 24px; background: #C41E3A; color: white; border: none; border-radius: 4px; cursor: pointer;">Learn More</button></div>',
            gallery: '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;"><img src="https://via.placeholder.com/300" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;"><img src="https://via.placeholder.com/300" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;"><img src="https://via.placeholder.com/300" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;"><img src="https://via.placeholder.com/300" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;"></div>',
            testimonial: '<div style="background: #f9f9f9; padding: 32px; border-radius: 8px; text-align: center;"><p style="font-size: 18px; font-style: italic; margin-bottom: 20px; color: #666;">"This is an amazing service! Highly recommended to everyone."</p><div style="font-weight: 600; color: #333;">John Doe</div><div style="color: #999; font-size: 14px;">CEO, Company Name</div></div>',
            icon: '<i class="fas fa-star" style="font-size: 48px; color: #C41E3A;"></i>',
            map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4!2d106.7!3d10.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ4JzAwLjAiTiAxMDbCsDQyJzAwLjAiRQ!5e0!3m2!1sen!2s!4v1234567890" width="100%" height="400" style="border: 0; border-radius: 8px;" allowfullscreen="" loading="lazy"></iframe>',
            social: '<div style="display: flex; gap: 16px; font-size: 24px;"><a href="#" style="color: #1877f2;"><i class="fab fa-facebook"></i></a><a href="#" style="color: #1da1f2;"><i class="fab fa-twitter"></i></a><a href="#" style="color: #e4405f;"><i class="fab fa-instagram"></i></a><a href="#" style="color: #0077b5;"><i class="fab fa-linkedin"></i></a></div>'
        };
        
        return templates[type] || '<p>Unknown component</p>';
    }
    
    // Element Selection
    selectElement(element) {
        if (this.selectedElement) {
            this.selectedElement.classList.remove('selected');
        }
        
        this.selectedElement = element;
        element.classList.add('selected');
        this.showProperties(element);
    }
    
    // Show Properties Panel
    showProperties(element) {
        const propertiesPanel = document.querySelector('.properties-panel');
        const noSelection = document.querySelector('.no-selection');
        const propsContent = document.querySelector('.properties-content');
        
        if (noSelection) noSelection.style.display = 'none';
        propsContent.style.display = 'block';
        
        const contentDiv = element.querySelector('.element-content');
        const firstChild = contentDiv.firstElementChild;
        
        // Update content tab
        document.getElementById('propText').value = contentDiv.innerText;
        
        // Update style tab
        if (firstChild) {
            const computedStyle = window.getComputedStyle(firstChild);
            document.getElementById('propBg').value = this.rgbToHex(computedStyle.backgroundColor);
            document.getElementById('propTextColor').value = this.rgbToHex(computedStyle.color);
            document.getElementById('propFontSize').value = parseInt(computedStyle.fontSize) || '';
            
            const paddingTop = parseInt(computedStyle.paddingTop) || 0;
            const paddingRight = parseInt(computedStyle.paddingRight) || 0;
            const paddingBottom = parseInt(computedStyle.paddingBottom) || 0;
            const paddingLeft = parseInt(computedStyle.paddingLeft) || 0;
            
            document.getElementById('propPaddingTop').value = paddingTop;
            document.getElementById('propPaddingRight').value = paddingRight;
            document.getElementById('propPaddingBottom').value = paddingBottom;
            document.getElementById('propPaddingLeft').value = paddingLeft;
        }
        
        // Update advanced tab
        document.getElementById('propHTML').value = contentDiv.innerHTML;
    }
    
    // RGB to Hex Converter
    rgbToHex(rgb) {
        if (!rgb || rgb === 'rgba(0, 0, 0, 0)') return '#ffffff';
        
        const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!match) return '#ffffff';
        
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    
    // Setup Properties Panel
    setupPropertiesPanel() {
        // Tab switching
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                const tabId = btn.dataset.tab;
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Property inputs
        document.getElementById('propText').addEventListener('input', (e) => {
            if (this.selectedElement) {
                const contentDiv = this.selectedElement.querySelector('.element-content');
                contentDiv.innerText = e.target.value;
                this.saveHistory();
            }
        });
        
        document.getElementById('propBg').addEventListener('change', (e) => {
            if (this.selectedElement) {
                const firstChild = this.selectedElement.querySelector('.element-content').firstElementChild;
                if (firstChild) {
                    firstChild.style.backgroundColor = e.target.value;
                    this.saveHistory();
                }
            }
        });
        
        document.getElementById('propTextColor').addEventListener('change', (e) => {
            if (this.selectedElement) {
                const firstChild = this.selectedElement.querySelector('.element-content').firstElementChild;
                if (firstChild) {
                    firstChild.style.color = e.target.value;
                    this.saveHistory();
                }
            }
        });
        
        document.getElementById('propFontSize').addEventListener('input', (e) => {
            if (this.selectedElement) {
                const firstChild = this.selectedElement.querySelector('.element-content').firstElementChild;
                if (firstChild) {
                    firstChild.style.fontSize = e.target.value + 'px';
                    this.saveHistory();
                }
            }
        });
        
        // Padding inputs
        ['Top', 'Right', 'Bottom', 'Left'].forEach(side => {
            document.getElementById(`propPadding${side}`).addEventListener('input', (e) => {
                if (this.selectedElement) {
                    const firstChild = this.selectedElement.querySelector('.element-content').firstElementChild;
                    if (firstChild) {
                        firstChild.style[`padding${side}`] = e.target.value + 'px';
                        this.saveHistory();
                    }
                }
            });
        });
        
        document.getElementById('propHTML').addEventListener('input', (e) => {
            if (this.selectedElement) {
                const contentDiv = this.selectedElement.querySelector('.element-content');
                contentDiv.innerHTML = e.target.value;
                this.saveHistory();
            }
        });
        
        // Action buttons
        document.querySelector('.btn-duplicate').addEventListener('click', () => {
            if (this.selectedElement) {
                this.duplicateElement(this.selectedElement);
            }
        });
        
        document.querySelector('.btn-delete').addEventListener('click', () => {
            if (this.selectedElement) {
                this.deleteElement(this.selectedElement);
            }
        });
    }
    
    // Setup Toolbar
    setupToolbar() {
        // Undo/Redo
        document.getElementById('btnUndo').addEventListener('click', () => this.undo());
        document.getElementById('btnRedo').addEventListener('click', () => this.redo());
        
        // Device views
        document.querySelectorAll('[id^="btnView"]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('[id^="btnView"]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const viewType = btn.id.replace('btnView', '').toLowerCase();
                this.changeView(viewType);
            });
        });
        
        // Zoom
        document.getElementById('btnZoomOut').addEventListener('click', () => this.changeZoom(-25));
        document.getElementById('btnZoomIn').addEventListener('click', () => this.changeZoom(25));
    }
    
    // Change View
    changeView(type) {
        const widths = {
            desktop: '100%',
            tablet: '768px',
            mobile: '375px'
        };
        
        this.canvas.style.maxWidth = widths[type];
    }
    
    // Change Zoom
    changeZoom(delta) {
        this.zoom = Math.max(50, Math.min(150, this.zoom + delta));
        this.canvas.dataset.zoom = this.zoom;
        document.getElementById('zoomValue').textContent = this.zoom + '%';
    }
    
    // Element Actions
    moveUp(element) {
        const prev = element.previousElementSibling;
        if (prev) {
            this.canvas.insertBefore(element, prev);
            this.saveHistory();
        }
    }
    
    moveDown(element) {
        const next = element.nextElementSibling;
        if (next) {
            this.canvas.insertBefore(next, element);
            this.saveHistory();
        }
    }
    
    duplicateElement(element) {
        const clone = element.cloneNode(true);
        clone.dataset.id = `element-${++this.elementCounter}`;
        
        // Re-attach controls event handlers
        const controls = clone.querySelectorAll('.control-btn');
        controls.forEach(btn => {
            btn.onclick = null;
            const action = btn.querySelector('i').classList.contains('fa-arrow-up') ? 'moveUp' :
                          btn.querySelector('i').classList.contains('fa-arrow-down') ? 'moveDown' :
                          btn.querySelector('i').classList.contains('fa-copy') ? 'duplicateElement' :
                          'deleteElement';
            btn.onclick = () => this[action](btn.parentElement.parentElement);
        });
        
        clone.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectElement(clone);
        });
        
        element.parentNode.insertBefore(clone, element.nextSibling);
        this.components.push(clone);
        this.saveHistory();
        this.selectElement(clone);
    }
    
    deleteElement(element) {
        if (confirm('Are you sure you want to delete this element?')) {
            const index = this.components.indexOf(element);
            if (index > -1) {
                this.components.splice(index, 1);
            }
            
            element.remove();
            this.selectedElement = null;
            
            document.querySelector('.no-selection').style.display = 'flex';
            document.querySelector('.properties-content').style.display = 'none';
            
            if (this.components.length === 0) {
                this.showEmptyCanvas();
            }
            
            this.saveHistory();
        }
    }
    
    showEmptyCanvas() {
        this.canvas.innerHTML = `
            <div class="empty-canvas">
                <i class="fas fa-mouse-pointer"></i>
                <h2>Start Building Your Page</h2>
                <p>Drag and drop components from the left sidebar to begin</p>
            </div>
        `;
    }
    
    // History Management
    saveHistory() {
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push(this.canvas.innerHTML);
        this.historyIndex++;
        
        if (this.history.length > 50) {
            this.history.shift();
            this.historyIndex--;
        }
    }
    
    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.restoreHistory();
        }
    }
    
    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.restoreHistory();
        }
    }
    
    restoreHistory() {
        this.canvas.innerHTML = this.history[this.historyIndex];
        this.reattachEventListeners();
    }
    
    reattachEventListeners() {
        const elements = this.canvas.querySelectorAll('.canvas-element');
        this.components = Array.from(elements);
        
        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectElement(element);
            });
        });
    }
    
    // Modal Setup
    setupModals() {
        // Preview
        document.getElementById('btnPreview').addEventListener('click', () => {
            this.showPreview();
        });
        
        document.getElementById('btnClosePreview').addEventListener('click', () => {
            document.getElementById('previewModal').classList.remove('active');
        });
        
        // Save
        document.getElementById('btnSave').addEventListener('click', () => {
            this.savePage();
        });
        
        // Export
        document.getElementById('btnExport').addEventListener('click', () => {
            this.exportHTML();
        });
        
        // Exit
        document.getElementById('btnExit').addEventListener('click', () => {
            if (confirm('Are you sure you want to exit? Any unsaved changes will be lost.')) {
                window.location.href = '../index.html';
            }
        });
        
        // Click outside modal to close
        document.getElementById('previewModal').addEventListener('click', (e) => {
            if (e.target.id === 'previewModal') {
                document.getElementById('previewModal').classList.remove('active');
            }
        });
    }
    
    // Show Preview
    showPreview() {
        const modal = document.getElementById('previewModal');
        const iframe = document.getElementById('previewFrame');
        
        const fullHTML = this.generateFullHTML();
        
        iframe.srcdoc = fullHTML;
        modal.classList.add('active');
    }
    
    // Generate Full HTML
    generateFullHTML() {
        const canvasContent = this.canvas.innerHTML.replace(/<div class="element-controls">[\s\S]*?<\/div>/g, '')
                                                    .replace(/canvas-element/g, '')
                                                    .replace(/element-content/g, '')
                                                    .replace(/selected/g, '');
        
        return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Page</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    ${canvasContent}
</body>
</html>`;
    }
    
    // Save Page
    savePage() {
        const html = this.generateFullHTML();
        localStorage.setItem('savedPage', html);
        localStorage.setItem('savedPageDate', new Date().toISOString());
        alert('Page saved successfully!');
    }
    
    // Export HTML
    exportHTML() {
        const html = this.generateFullHTML();
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'page_' + Date.now() + '.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('HTML file exported successfully!');
    }
    
    // Keyboard Shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+Z - Undo
            if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                this.undo();
            }
            
            // Ctrl+Shift+Z or Ctrl+Y - Redo
            if ((e.ctrlKey && e.shiftKey && e.key === 'Z') || (e.ctrlKey && e.key === 'y')) {
                e.preventDefault();
                this.redo();
            }
            
            // Ctrl+S - Save
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.savePage();
            }
            
            // Delete - Delete selected element
            if (e.key === 'Delete' && this.selectedElement) {
                e.preventDefault();
                this.deleteElement(this.selectedElement);
            }
            
            // Ctrl+D - Duplicate
            if (e.ctrlKey && e.key === 'd' && this.selectedElement) {
                e.preventDefault();
                this.duplicateElement(this.selectedElement);
            }
        });
        
        // Click on canvas to deselect
        this.canvas.addEventListener('click', (e) => {
            if (e.target === this.canvas) {
                if (this.selectedElement) {
                    this.selectedElement.classList.remove('selected');
                    this.selectedElement = null;
                }
                document.querySelector('.no-selection').style.display = 'flex';
                document.querySelector('.properties-content').style.display = 'none';
            }
        });
    }
}

// Initialize Page Builder
let pageBuilder;

document.addEventListener('DOMContentLoaded', () => {
    pageBuilder = new PageBuilder();
    
    // Load saved page if exists
    const savedPage = localStorage.getItem('savedPage');
    if (savedPage && confirm('A saved page was found. Do you want to load it?')) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = savedPage;
        const body = tempDiv.querySelector('body');
        
        if (body) {
            // Convert saved HTML back to editable elements
            Array.from(body.children).forEach(child => {
                const wrapper = document.createElement('div');
                wrapper.className = 'canvas-element';
                wrapper.dataset.type = 'custom';
                wrapper.dataset.id = `element-${++pageBuilder.elementCounter}`;
                
                const controls = document.createElement('div');
                controls.className = 'element-controls';
                controls.innerHTML = `
                    <button class="control-btn" onclick="pageBuilder.moveUp(this.parentElement.parentElement)">
                        <i class="fas fa-arrow-up"></i>
                    </button>
                    <button class="control-btn" onclick="pageBuilder.moveDown(this.parentElement.parentElement)">
                        <i class="fas fa-arrow-down"></i>
                    </button>
                    <button class="control-btn" onclick="pageBuilder.duplicateElement(this.parentElement.parentElement)">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button class="control-btn danger" onclick="pageBuilder.deleteElement(this.parentElement.parentElement)">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                wrapper.appendChild(controls);
                
                const contentDiv = document.createElement('div');
                contentDiv.className = 'element-content';
                contentDiv.appendChild(child.cloneNode(true));
                wrapper.appendChild(contentDiv);
                
                wrapper.addEventListener('click', (e) => {
                    e.stopPropagation();
                    pageBuilder.selectElement(wrapper);
                });
                
                pageBuilder.canvas.appendChild(wrapper);
                pageBuilder.components.push(wrapper);
            });
            
            const emptyCanvas = pageBuilder.canvas.querySelector('.empty-canvas');
            if (emptyCanvas) {
                emptyCanvas.remove();
            }
            
            pageBuilder.saveHistory();
        }
    }
});
