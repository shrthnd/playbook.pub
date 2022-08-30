const Tabs = (props) => {
  const {
    active,
    setActive,
    pages,
    setPages,
  } = props;

  const handleNewPage = (e) => {
    const next = [...pages()];
    const slug = prompt("Page title?", `Untitled ${next.length}`);
    next.push({
      slug,
      document: <custom-canvas width="" height="" />
    });
    setPages(next);
  }
  const handleTabClick = (index) => {
    setActive(index);
  }

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