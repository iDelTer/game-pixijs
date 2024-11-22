import { Application, Graphics } from 'pixi.js';

const app = new Application();

await app.init({ 
  background: '#1099bb', 
  resizeTo: window,
  antialias: true,
});

document.body.appendChild(app.canvas);

// Configuración de la aplicación PixiJS
// const app = new Application({
// width: window.innerWidth,
// height: window.innerHeight,
// backgroundColor: 0x1099bb, // Fondo azul
// resolution: window.devicePixelRatio || 1,
// antialias: true,
// });