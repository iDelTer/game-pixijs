import { Application, Sprite, Assets } from 'pixi.js';
import { first } from './src/maps/maps';

const app = new Application();

await app.init({ 
  background: '#1099bb', 
  resizeTo: window,
  antialias: true,
});

document.body.appendChild(app.canvas);

const textures = {
  0: './assets/sprites/sprite0.png', // Ruta al sprite 0
  1: './assets/sprites/sprite1.png', // Ruta al sprite 1
};

// Función para cargar texturas
async function loadTextures() {
  const loadedTextures = {};
  for (const [key, path] of Object.entries(textures)) {
    loadedTextures[key] = await Assets.load(path);
  }
  return loadedTextures;
}

// Función para crear el grid
function createGrid(map, loadedTextures) {
  const rows = map.length;
  const cols = map[0].length;

  // Calculamos el tamaño de cada celda
  const cellSize = app.renderer.width / cols;

  map.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const sprite = new Sprite(loadedTextures[cell]);
      sprite.width = cellSize;
      sprite.height = cellSize;
      sprite.x = colIndex * cellSize;
      sprite.y = rowIndex * cellSize;

      // Agregamos el sprite al escenario
      app.stage.addChild(sprite);
    });
  });
}

// Cargar texturas y luego dibujar el grid
async function setup() {
  const loadedTextures = await loadTextures();
  createGrid(first, loadedTextures);

  // Ajustar el canvas al cambiar el tamaño de la ventana
  window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    app.stage.removeChildren();
    createGrid(first, loadedTextures);
  });
}

// Ejecutar configuración
setup();