import { createSignal, onMount } from 'solid-js';
import { render } from 'solid-js/web';
import Tabs from './Tabs';
// import Toolbar from './Toolbar';

const App = () => {
  const [pages, setPages] = createSignal([]);
  const [active, setActive] = createSignal(0);
  const activePage = () => pages()[active()]?.document;

  const handleNewPage = (e) => {
    const next = [...pages()];
    const slug = `Untitled ${next.length}`; 
    next.push({
      slug,
      document: <custom-canvas />
    });
    setPages(next);
  }
  
  const handleTabRename = (index) => {
    const allPages = [...pages()];
    const page = allPages[index]; 
    const slug = prompt("Page title?", page.slug);
    page.slug = slug.length ? slug : `Untitled ${index}`;
    setPages([...allPages]);
  }

  const handleTabClick = (index) => {
    if (active() === index) handleTabRename(index); 
    setActive(index);
  }
  
  onMount(() => {
    if (!pages().length) handleNewPage();
  });

  return (
    <>
      <Tabs {...{ active, pages, handleNewPage, handleTabClick }} />
      {/* <Toolbar /> */}
      {activePage()}
    </>
  );
}

render(() => <App />, document.getElementById('app'));