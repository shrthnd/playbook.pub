const Tabs = (props) => {
  const {
    active,
    pages,
    handleNewPage,
    handleTabClick,
  } = props;

  const renderTab = (page, index) => {
    return (
      <button 
        class={ index == active() ? 'active' : null } 
        onclick={(e) => handleTabClick(index)}
      >
        {page.slug}
      </button>
    )
  }
 

  return (
    <nav id="tabs">
      {pages().map(renderTab)}
      <button onclick={handleNewPage}>New</button>
    </nav>
  )
}

export default Tabs;