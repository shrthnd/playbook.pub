const Toolbar = (props) => {
  return (
    <nav id="toolbar">
      <button>Select</button>
      <button>Pen</button>
      <button>Square</button>
      <button>Circle</button>

      <label htmlFor="colorPrimary">Primary Color</label>
      <input 
        id="colorPrimary" 
        type="color" 
        value={props.primary()}
        onInput={(e) => {
          const theme = props.activeCanvas().theme; 
          theme[theme.active].primary = e.target.value;
          props.setPrimary(theme[theme.active].primary);
        }}
      />  

      <label htmlFor="colorsSecondary">Secondary Color</label>
      <input 
        id="colorsSecondary" 
        type="color" 
        value={props.secondary()}
        onInput={(e) => {
          const theme = props.activeCanvas().theme; 
          theme[theme.active].secondary = e.target.value;
          props.setSecondary(theme[theme.active].secondary);
        }}
      />
    </nav>
  )
}

export default Toolbar;