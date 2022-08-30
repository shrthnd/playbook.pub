import Toolbar from './toolbar';
customElements.define('custom-canvas-toolbar', Toolbar);
class CustomCanvas extends HTMLElement {
  canvas = null;
  ctx = null;
  
  theme = {
    active: 'light',
    dark: {
      bg: '#123456',
      text: '#fedcba',
    },
    light: {
      bg: '#fedcba',
      text: '#123456',
    }
  }

  brush = {
    strokeStyle: this.theme[this.theme.active].text,
    fillStyle: 'transparent',
    lineWidth: 10,
    lineCap: 'round',
  }

  layers = [];
  activeLayer = 0;
  painting = false;
  
  createCanvas() {
    this.canvas = document.createElement('canvas');
    // this.canvas.style.display = 'block';
    this.ctx = this.canvas.getContext('2d');
  }

  // called when component is invoked
  constructor() {
    super();
    this.createCanvas(); 
    window.addEventListener('resize', this.setCanvasDimensions);
    // window.addEventListener('keyup', (e) => { console.log(e); });

    this.canvas.addEventListener('mousedown', this.handleBrushDown);
    this.canvas.addEventListener('touchstart', this.handleTouchStart, { passive: true });

    this.canvas.addEventListener('mouseup', this.handleBrushUp);
    this.canvas.addEventListener('touchend', this.handleTouchEnd);
    
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.canvas.addEventListener('touchmove', this.handleTouchMove, { passive: true });

    this.canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault(); 
      // return false; 
    });
  }

  // called when element is attached to the DOM
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(this.canvas);
    this.addStyle(); 
    // this.addToolbar(); 
    this.setCanvasDimensions();
    this.draw();
    
  }

  addStyle() {
    const style = document.createElement('style');
    style.textContent = `
      canvas { 
        position: relative; 
        display: block;
      }
    `;
    this.canvas.parentNode.append(style);
  }

  addToolbar() {
    const toolbar = document.createElement('custom-canvas-toolbar'); 
    this.canvas.parentNode.append(toolbar);
  }

  setCanvasDimensions = () => {
    this.canvas.width = this.parentElement.offsetWidth;
    this.canvas.height = this.parentElement.offsetHeight;
  }

  handleMouseMove = (e) => {
    // push point to activeLayer if mouseDown
    if (this.painting) {
      const x = e.clientX;
      const y = e.clientY;
      this.layers[this.activeLayer].push({ x, y });
    }
  }

  handleBrushUp = (e) => {
    this.painting = false;
    this.activeLayer += 1;
  }

  handleBrushDown = (e) => {
    this.painting = true;
    // create a new layer if activeLayer is not empty
    const x = e.clientX || e.touches[0].pageX - this.canvas.offsetLeft;
    const y = e.clientY || e.touches[0].pageY - this.canvas.offsetTop;
    // add first point
    this.layers[this.activeLayer] = [{ x, y }];
  }

  handleTouchMove = (e) => {
    // push point to activeLayer if mouseDown
    if (this.painting) {
      const x = e.changedTouches[0].clientX;
      const y = e.changedTouches[0].clientY;
      this.layers[this.activeLayer].push({ x, y });
    }
  }

  handleTouchStart = this.handleBrushDown;

  handleTouchEnd = this.handleBrushUp;

  controlPoints = (layer, i) => {
    return Object.values({
      x: layer[i+1].x,
      y: layer[i+1].y,
      mx1: (layer[i+1].x + layer[i+2].x) / 2,
      my1: (layer[i+1].y + layer[i+2].y) / 2
    });
  }

  paintCurves = (layer) => {
    this.ctx.strokeStyle = this.brush.strokeStyle; 
    this.ctx.lineCap = this.brush.lineCap;
    this.ctx.lineWidth = this.brush.lineWidth;
    for(let i = 0; i <= layer.length; i++) {
      if (i === 0) {
        this.ctx.beginPath();
        this.ctx.moveTo(layer[0].x, layer[0].y);
        if (layer.length === 1) 
         this.ctx.arc(layer[0].x, layer[0].y, 0, 0, 2 * Math.PI, true);
        if (layer.length === 2 || layer.length === 3)
         this.ctx.lineTo(layer[layer.length-1].x, layer[layer.length-1].y); 
      }

      if (i > 0 && i < layer.length - 3) {
        const q = this.controlPoints(layer, i); 
        this.ctx.quadraticCurveTo(...q);
      }
    }
    this.ctx.stroke();
  }

  draw = () => {
    this.ctx.fillStyle = this.theme[this.theme.active].bg;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fill();
    for (let j = 0; j < this.layers.length; j++) {
      const layer = this.layers[j];
      // draw quadraticCurveTo through points
      this.paintCurves(layer);
    }
    requestAnimationFrame(this.draw);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
  }

  disconnectedCallback() {

  }

  adoptedCallback() {

  }
}

export default CustomCanvas;