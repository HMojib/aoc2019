import { ReadFile } from "../../utils";

const height = 6;
const width = 25;

function getInput() {
  return ReadFile(__dirname + "/input.txt")
    .split("")
    .map(d => +d);
}

function getFewestZeroDigits(layers) {
  let zeroCount = 999999999999999999999999999;
  let minIndex = null;
  layers.forEach((layer, index) => {
    let zeroCounter = 0;
    layer.forEach(pixels => {
      zeroCounter += pixels.filter(pixel => pixel === 0).length;
    });

    if (zeroCounter < zeroCount) {
      zeroCount = zeroCounter;
      minIndex = index;
    }
  });

  return minIndex;
}

function Calculate(layer) {
  let oneCounter = 0;
  let twoCounter = 0;

  layer.forEach(pixels => {
    oneCounter += pixels.filter(pixel => pixel === 1).length;
    twoCounter += pixels.filter(pixel => pixel === 2).length;
  });

  return oneCounter * twoCounter;
}

function getLayers(input) {
  let layers = [];
  let newLayer = [];
  let counter = 0;
  let hCounter = height;

  while (counter < input.length) {
    newLayer.push(input.slice(counter, counter + width));
    counter += width;
    hCounter--;

    if (hCounter === 0 && newLayer.length > 0) {
      layers.push(newLayer);
      newLayer = [];
      hCounter = height;
    }
  }

  return layers;
}
function PartOne() {
  const input = getInput();
  let layers = getLayers(input);
  console.log("LAYERS: ", layers);
  let index = getFewestZeroDigits(layers);
  return Calculate(layers[index]);
}

export default PartOne;
