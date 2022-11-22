const path = require('path');
const { createCanvas, loadImage } = require("@napi-rs/canvas");
const textBreaker = require('../textGenerator/textBreaker');


const WIDTH = 1080;
const HEIGHT = 1080;
const ORIGIN = path.join(__dirname, '..', '..', 'public', 'assets', `timer.png`);
const USERNAME = '@ContadorQueda';

async function imageGenerator(text) {
  const newText = textBreaker(text);

  const canvas = createCanvas(WIDTH, HEIGHT);
  const context = canvas.getContext('2d');
  context.fillStyle = "white";
  context.fillRect(0, 0, WIDTH, HEIGHT);

  context.fillStyle = "#000";
  context.font = "60px Calibri, Arial, sans-serif";
  context.textAlign = "center";
  context.antialias = 'subpixel'
  context.fillText(newText[0], 540, 500, 1080);
  context.fillText(newText[1], 540, 570, 1080);
  context.fillText(USERNAME, 540, 890, 1080);

  const image = await loadImage(ORIGIN)

  context.drawImage(image, 465, 175);
  const buffer = canvas
    .toDataURL("image/png", { quality: 0.95 })
    .replace(/^data:image\/png;base64,/, "");

  return buffer;
}

module.exports = {
  imageGenerator,
};
