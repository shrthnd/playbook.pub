import { createSignal, onMount } from 'solid-js';
import { render } from 'solid-js/web';
import Tabs from './Tabs';
import Toolbar from './Toolbar';
import Page from './Page';

const App = () => {
  const [pages, setPages] = createSignal([]);
  const [active, setActive] = createSignal(0);
  
  const handleNewPage = (e) => {
    const next = [...pages()];
    const slug = `Untitled ${next.length}`; 
    
    next.push({
      slug,
      document: [
        <custom-canvas />
      ]
    });
    setPages(next);
    
    if (active() === -1)
      setActive(0);
  }
  
  const handleTabRename = (index) => {
    const allPages = [...pages()];
    const page = allPages[index]; 
    const slug = prompt("Page title?", page.slug);
    
    if (slug == null)
      return;

    page.slug = slug.length ? slug : `Untitled ${index}`;
    setPages([...allPages]);
  }

  const handleTabRemove = (index) => {
    const currentIndex = active(); 
    const allPages = [...pages()];
    const page = allPages[index]; 
    const confirmDelete = confirm(`Are you sure you want to delete "${page.slug}"?`);

    if (!confirmDelete) 
      return false;

    allPages.splice(index, 1);
    setPages([...allPages]);      
    if (currentIndex >= allPages.length)
      setActive(allPages.length-1);
  }

  const handleTabClick = (index) => {
    if (active() === index) 
      handleTabRename(index);
    setActive(index);
  }
  
  const handlers = {
    handleTabRename,
    handleTabRemove,
    handleTabClick,
    handleNewPage,
  }

  onMount(() => {
    if (!pages().length) handleNewPage();
  });

  return (
    <>
      <Tabs pages={pages} active={active} handlers={handlers} />
      {/* <Toolbar /> */}
      <Page pages={pages} active={active} handlers={handlers} />
    </>
  );
}

render(() => <App />, document.getElementById('app'));