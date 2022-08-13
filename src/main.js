import './style.css'

document.querySelector('#app').innerHTML = `
  <h1>playbook.pub</h1>
`

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {scope: './'}).then(
    (registration) => {
      console.log('Service worker registration succeeded:', registration);
    }, 
    (error) => {
      console.error(`Service worker registration failed: ${error}`);
    }
  );
} else {
  console.error('Service workers are not supported.');
}