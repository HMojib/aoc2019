import { ReadFile } from "../../utils";

let orbits = {
  count: 0,
  list: {}
};

function getInput() {
  return ReadFile(__dirname + "/input.txt").split("\n");
}

function splitOrbitString(orbitString) {
  const [largeObject, littleObject] = orbitString.split(")");
  return { largeObject, littleObject };
}
function populateDirectOrbits(input) {
  input.forEach(orbit => {
    orbits.count = orbits.count + 1;
    const { largeObject, littleObject } = splitOrbitString(orbit);
    orbits.list[largeObject] = littleObject;
  });
}

function countIndirectOrbits() {
  const { list } = orbits;
  let indirectOrbits = 0;
  let keys = Object.keys(list);
  let results = keys.map(d => list[d]);
  keys.forEach(orbit => {
    let littleObject = list[orbit];
    console.log("LITTLE OBJECT: ", littleObject);

    let largeObject = orbit;
    console.log("LARGE OBJECT: ", largeObject);
    let result = results.filter(d => d === largeObject);
    console.log(result);
  });
}
function PartOne() {
  const input = getInput();
  populateDirectOrbits(input);
  countIndirectOrbits();

  return orbits.count;
}

export default PartOne;
