class Toolbar extends HTMLElement {
  element = null;

  constructor() {
    super();
  }
  
  connectedCallback() {
    this.addControls();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(this.element);
    this.appendStyle();
    console.log(this);
  }

  addControls() {
    this.element = document.createElement('nav');
    this.element.id = 'toolbar'; 

    const theme = document.createElement('select');
    theme.options[0] = new Option('light');
    theme.options[1] = new Option('dark');
    
    const text = document.createElement('input');
    text.type = 'color';
    // text.value = this.element.parent.theme[this.element.parent.theme.active].text;
    
    const background = document.createElement('input');
    background.type = 'color';
    // background.value = this.theme[this.theme.active].bg;

    this.element.append(theme);
    this.element.append(text);
    this.element.append(background);
  }

  appendStyle() {
    const style = document.createElement('style');
    style.textContent = `
      #toolbar {
        position: absolute;
        top: auto; 
        left: 10px;
        right: 10px;
        bottom: 10px;
        z-index: 1;
        width: auto;
        height: auto;
        padding: 10px;
        background: #000;
      }
    `;
    this.element.parentNode.append(style);
  }

}
export default Toolbar;