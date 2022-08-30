import { createSignal } from 'solid-js';
import { render } from 'solid-js/web';
import Tabs from './Tabs';
// import Toolbar from './Toolbar';

const App = () => {
  const [pages, setPages] = createSignal([]);
  const [active, setActive] = createSignal(0);
  const activePage = () => pages()[active()]?.document
  return (
    <>
      <Tabs 
        active={active} 
        setActive={setActive} 
        pages={pages} 
        setPages={setPages}
      />
      {/* <Toolbar /> */}
      {activePage()}
    </>
  );
}

render(() => <App />, document.getElementById('app'));