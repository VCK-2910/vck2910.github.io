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
            button: '<button style="padding: 12px 32px; background: #3B82F6; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer;">Click Me</button>',
            image: '<img src="https://via.placeholder.com/800x400" alt="Placeholder" style="width: 100%; height: auto; border-radius: 8px;">',
            divider: '<hr style="border: none; border-top: 2px solid #e0e0e0; margin: 40px 0;">',
            spacer: '<div style="height: 60px;"></div>',
            profileheader: '<div style="text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;"><h1 style="font-size: 36px; margin-bottom: 10px;">John Doe</h1><p style="font-size: 18px; margin-bottom: 5px;">Full Stack Developer</p><p style="font-size: 14px;">Passionate about building beautiful web experiences</p></div>',
            bio: '<section style="padding: 40px; background: white; border-radius: 8px;"><h2 style="color: #333; margin-bottom: 16px;">About Me</h2><p style="color: #666; line-height: 1.8; font-size: 16px;">I am a passionate developer with expertise in web technologies. I love creating beautiful, responsive websites and applications that solve real problems. When Im not coding, you can find me exploring new technologies and contributing to open-source projects.</p></section>',
            avatar: '<div style="text-align: center;"><img src="https://via.placeholder.com/150" alt="Avatar" style="width: 150px; height: 150px; border-radius: 50%; border: 4px solid #3B82F6; object-fit: cover;"></div>',
            stats: '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 30px;"><div style="text-align: center; padding: 20px; background: #f0f4ff; border-radius: 8px;"><div style="font-size: 28px; font-weight: bold; color: #3B82F6;">50+</div><div style="color: #666; margin-top: 8px;">Projects</div></div><div style="text-align: center; padding: 20px; background: #f0f4ff; border-radius: 8px;"><div style="font-size: 28px; font-weight: bold; color: #3B82F6;">5+</div><div style="color: #666; margin-top: 8px;">Years</div></div><div style="text-align: center; padding: 20px; background: #f0f4ff; border-radius: 8px;"><div style="font-size: 28px; font-weight: bold; color: #3B82F6;">100+</div><div style="color: #666; margin-top: 8px;">Clients</div></div></div>',
            skills: '<div style="padding: 30px;"><h3 style="margin-bottom: 20px; color: #333;">Skills</h3><div style="display: flex; flex-wrap: wrap; gap: 10px;"><span style="background: #3B82F6; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px;">HTML/CSS</span><span style="background: #3B82F6; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px;">JavaScript</span><span style="background: #3B82F6; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px;">React</span><span style="background: #3B82F6; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px;">Node.js</span><span style="background: #3B82F6; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px;">MongoDB</span><span style="background: #3B82F6; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px;">Git</span></div></div>',
            timeline: '<div style="padding: 30px;"><h3 style="margin-bottom: 20px; color: #333;">Timeline</h3><div style="border-left: 3px solid #3B82F6; padding-left: 20px;"><div style="margin-bottom: 30px;"><div style="color: #3B82F6; font-weight: bold;">2023 - Present</div><div style="font-size: 16px; color: #333; margin-top: 5px;">Senior Developer</div><div style="color: #666; font-size: 14px;">Tech Company Inc.</div></div><div style="margin-bottom: 30px;"><div style="color: #3B82F6; font-weight: bold;">2020 - 2023</div><div style="font-size: 16px; color: #333; margin-top: 5px;">Mid-level Developer</div><div style="color: #666; font-size: 14px;">Web Solutions Ltd.</div></div></div></div>',
            experience: '<div style="padding: 30px; background: white; border-radius: 8px; margin-bottom: 20px;"><h4 style="color: #333; margin-bottom: 5px;">Senior Developer at Tech Company</h4><p style="color: #666; font-size: 14px;">2023 - Present</p><p style="color: #666; margin-top: 10px;">Led development of multiple web applications using React and Node.js, improving performance by 40%.</p></div>',
            education: '<div style="padding: 30px; background: white; border-radius: 8px; margin-bottom: 20px;"><h4 style="color: #333; margin-bottom: 5px;">Bachelor of Science in Computer Science</h4><p style="color: #666; font-size: 14px;">University of Technology, 2020</p><p style="color: #666; margin-top: 10px;">GPA: 3.8/4.0</p></div>',
            projects: '<div style="padding: 30px;"><h3 style="margin-bottom: 20px; color: #333;">Featured Projects</h3><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;"><div style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden;"><img src="https://via.placeholder.com/300x200" style="width: 100%; height: 200px; object-fit: cover;"><div style="padding: 16px;"><h4 style="margin-bottom: 8px;">Project Name</h4><p style="color: #666; font-size: 14px;">Brief description of the project and its technologies.</p><button style="margin-top: 12px; padding: 8px 16px; background: #3B82F6; color: white; border: none; border-radius: 4px; cursor: pointer;">View Project</button></div></div></div></div>',
            portfolio: '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; padding: 30px;"><img src="https://via.placeholder.com/300" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px; cursor: pointer; transition: transform 0.3s;"><img src="https://via.placeholder.com/300" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px; cursor: pointer; transition: transform 0.3s;"><img src="https://via.placeholder.com/300" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px; cursor: pointer; transition: transform 0.3s;"><img src="https://via.placeholder.com/300" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px; cursor: pointer; transition: transform 0.3s;"></div>',
            testimonial: '<div style="background: #f0f4ff; padding: 32px; border-radius: 8px; border-left: 4px solid #3B82F6;"><p style="font-size: 16px; font-style: italic; margin-bottom: 20px; color: #333; line-height: 1.6;">"Working with John has been an exceptional experience. His attention to detail and creative solutions transformed our project."</p><div style="font-weight: 600; color: #333;">Sarah Johnson</div><div style="color: #666; font-size: 14px;">CEO, Design Studio</div></div>',
            contact: '<form style="max-width: 600px; padding: 30px;"><div style="margin-bottom: 16px;"><label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Name</label><input type="text" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px;"></div><div style="margin-bottom: 16px;"><label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Email</label><input type="email" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px;"></div><div style="margin-bottom: 16px;"><label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Message</label><textarea style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px; min-height: 120px;" rows="5"></textarea></div><button type="submit" style="padding: 12px 32px; background: #3B82F6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; font-weight: 600;">Send Message</button></form>',
            social: '<div style="display: flex; gap: 16px; font-size: 32px; justify-content: center; padding: 30px;"><a href="#" style="color: #1877f2; text-decoration: none;"><i class="fab fa-facebook"></i></a><a href="#" style="color: #1da1f2; text-decoration: none;"><i class="fab fa-twitter"></i></a><a href="#" style="color: #e4405f; text-decoration: none;"><i class="fab fa-instagram"></i></a><a href="#" style="color: #0077b5; text-decoration: none;"><i class="fab fa-linkedin"></i></a><a href="#" style="color: #333; text-decoration: none;"><i class="fab fa-github"></i></a></div>',
            map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5!2d106.6!3d10.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ4JzAwLjAiTiAxMDbCsDQyJzAwLjAiRQ!5e0!3m2!1sen!2s!4v1234567890" width="100%" height="400" style="border: 0; border-radius: 8px; display: block;" allowfullscreen="" loading="lazy"></iframe>'
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
