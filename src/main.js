import CustomCanvas from './components/canvas';
import './style.css'

// Define custom web component and append to #app
customElements.define('custom-canvas', CustomCanvas);
const canvas = document.createElement('custom-canvas');
const app = document.querySelector('#app');
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