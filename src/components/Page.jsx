const Empty = (props) => {
  return (
    <>
      <h1>Playbook.pub</h1>
      <button onclick={props.clickHandler}>New</button>
    </>
  )
}

const Page = (props) => {
  let page = () => {
    const elements = props.pages()[props.active()]?.document || [];
    
    if (elements.length === 0)
      return <Empty clickHandler={props.handlers.handleNewPage} />;

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const handleClick = (e) => {
        // console.log(e.target.innerHTML);
        // e.target.setAttribute('contenteditable', true);
        e.target.focus();
      }
      element.addEventListener('click', handleClick);
      element.addEventListener('blur', (e) => {
        // e.target.removeAttribute('contenteditable');
      });
    }
    return elements;
  }
  
  return (
    <main id="page">
      {page()}
    </main>
  );
}

export default Page;