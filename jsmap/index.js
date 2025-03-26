const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const dpr = window.devicePixelRatio || 1;

canvas.width = 1024 * dpr;
canvas.height = 576 * dpr;

const MAP_COLS = 40;
const MAP_ROWS = 36;
const MAP_HEIGHT = 16 * MAP_ROWS;
const MAP_WIDTH = 16 * MAP_COLS;
const MAP_SCALE = dpr + 2; //cambio la scala del gioco
const VIEWPORT_WIDTH = canvas.width / MAP_SCALE;
const VIEWPORT_HEIGHT = canvas.height / MAP_SCALE;
const VIEWPORT_CENTER_X = VIEWPORT_WIDTH / 2;
const VIEWPORT_CENTER_Y = VIEWPORT_HEIGHT / 2;
const MAX_SCROLL_X = MAP_WIDTH - VIEWPORT_WIDTH;
const MAX_SCROLL_Y = MAP_HEIGHT - VIEWPORT_HEIGHT;

const layersData = {
  l_New_Layer_1: l_New_Layer_1,
  l_New_Layer_2: l_New_Layer_2,
  l_New_Layer_3: l_New_Layer_3,
  l_New_Layer_4: l_New_Layer_4,
  l_New_Layer_5: l_New_Layer_5,
  l_New_Layer_6: l_New_Layer_6,
  l_New_Layer_7: l_New_Layer_7,
  l_New_Layer_9: l_New_Layer_9,
  l_New_Layer_8: l_New_Layer_8,
};

const tilesets = {
  l_New_Layer_1: { imageUrl: "./images/terrain.png", tileSize: 16 },
  l_New_Layer_2: { imageUrl: "./images/decorations.png", tileSize: 16 },
  l_New_Layer_3: { imageUrl: "./images/decorations.png", tileSize: 16 },
  l_New_Layer_4: { imageUrl: "./images/decorations.png", tileSize: 16 },
  l_New_Layer_5: { imageUrl: "./images/decorations.png", tileSize: 16 },
  l_New_Layer_6: { imageUrl: "./images/decorations.png", tileSize: 16 },
  l_New_Layer_7: { imageUrl: "./images/decorations.png", tileSize: 16 },
  l_New_Layer_9: { imageUrl: "./images/characters.png", tileSize: 16 },
  l_New_Layer_8: { imageUrl: "./images/decorations.png", tileSize: 16 },
};

const guide = new Guide({
  position: {
    x: 150,
    y: 100,
  },
  imageSrc: "./img/guide.png",
  frameBuffer: 6,
  frameRate: 11,
  loop: true,
  dialog: [],
  missions: [],
  answer: [],
  width: 20,
  height: 10,
});

// Tile setup
const collisionBlocks = [];
const blockSize = 16; //  16x16 pixels

collisions.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 1) {
      collisionBlocks.push(
        new CollisionBlock({
          x: x * blockSize,
          y: y * blockSize,
          size: blockSize,
        })
      );
    }
  });
});

const renderLayer = (tilesData, tilesetImage, tileSize, context) => {
  tilesData.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol !== 0) {
        const srcX =
          ((symbol - 1) % (tilesetImage.width / tileSize)) * tileSize;
        const srcY =
          Math.floor((symbol - 1) / (tilesetImage.width / tileSize)) * tileSize;

        context.drawImage(
          tilesetImage, //
          srcX,
          srcY,
          tileSize,
          tileSize,
          x * 16,
          y * 16,
          16,
          16
        );
      }
    });
  });
};

const renderStaticLayers = async () => {
  const offscreenCanvas = document.createElement("canvas");
  offscreenCanvas.width = canvas.width;
  offscreenCanvas.height = canvas.height;
  const offscreenContext = offscreenCanvas.getContext("2d");

  for (const [layerName, tilesData] of Object.entries(layersData)) {
    const tilesetInfo = tilesets[layerName];
    if (tilesetInfo) {
      try {
        const tilesetImage = await loadImage(tilesetInfo.imageUrl);
        renderLayer(
          tilesData,
          tilesetImage,
          tilesetInfo.tileSize,
          offscreenContext
        );
      } catch (error) {
        console.error(`Failed to load image for layer ${layerName}:`, error);
      }
    }
  }

  return offscreenCanvas;
};
// END - Tile setup

const player = new Player({
  x: 100,
  y: 100,
  size: 15,
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

let lastTime = performance.now();
function animate(backgroundCanvas) {
  const currentTime = performance.now();
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  // Update player position
  player.handleInput(keys);
  player.update(deltaTime, collisionBlocks);
  guide.position.x = 500;
  guide.position.y = 60;

  guide.draw();

  const horizontalScrollDistance = Math.min(
    Math.max(0, player.center.x - VIEWPORT_CENTER_X),
    MAX_SCROLL_X
  );

  const verticallScrollDistance = Math.min(
    Math.max(0, player.center.y - VIEWPORT_CENTER_Y),
    MAX_SCROLL_Y
  );

  // Render scene

  c.save();
  c.scale(MAP_SCALE, MAP_SCALE); // il + n serve per ingrandire la mappa
  c.translate(-horizontalScrollDistance, -verticallScrollDistance);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.drawImage(backgroundCanvas, 0, 0);
  player.draw(c);
  guide.draw();
  c.restore();

  checkGuideInteraction();
  requestAnimationFrame(() => animate(backgroundCanvas));
}

const startRendering = async () => {
  try {
    const backgroundCanvas = await renderStaticLayers();
    if (!backgroundCanvas) {
      console.error("Failed to create the background canvas");
      return;
    }

    animate(backgroundCanvas);
  } catch (error) {
    console.error("Error during rendering:", error);
  }
};
const dialogoBox = document.getElementById("dialogueBox");
function checkGuideInteraction() {
  const dx = player.x - guide.position.x;
  const dy = player.y - guide.position.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 50) {
    dialogoBox.style.display = "block";
    avviaDialogo();
  } else {
    dialogoBox.style.display = "none";
  }
}

function avviaDialogo() {
  if (dialogoBox) {
    dialogoBox.style.display = "block";
    dialogoBox.innerText = "Ciao! Ho qualcosa da dirti.";
  }
}

startRendering();
