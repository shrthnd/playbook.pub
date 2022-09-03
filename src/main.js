import './style.css'
import './components/App';

import CustomCanvas from './components/canvas';
customElements.define('custom-canvas', CustomCanvas);

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