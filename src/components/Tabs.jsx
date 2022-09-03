const Tabs = (props) => {
  const renderTab = (page, index) => {
    let timer = false;
    let longTap = false;
    return (
      <button 
        class={ index == props.active() ? 'active' : null } 
        onMouseDown={(e) => {
          timer = setTimeout(() => {
            longTap = !longTap; 
            props.handlers.handleTabRemove(index);
          }, 300);
        }}
        onMouseUp={(e) => {
          if (!longTap) props.handlers.handleTabClick(index);
          longTap = false;
          clearTimeout(timer);
        }}
      >
        {page.slug}
      </button>
    )
  }
 
  return (
    <nav id="tabs">
      {props.pages().map(renderTab)}
      <button onclick={props.handlers.handleNewPage} aria-label="New Page">+</button>
    </nav>
  )
}

export default Tabs;