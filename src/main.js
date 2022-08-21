import HyperCanvas from './components/canvas';
import './style.css'

customElements.define('hyper-canvas', HyperCanvas);
const canvas = document.createElement('hyper-canvas');
const app = document.querySelector('#app'); 
// app.innerHTML = `<h1>playbook.pub</h1>`;
app.append(canvas);


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {scope: './'}).then(
    (registration) => {
      // console.log('Service worker registration succeeded:', registration);
    }, 
    (error) => {
      console.error(`Service worker registration failed: ${error}`);
    }
  );
} else {
  console.error('Service workers are not supported.');
}