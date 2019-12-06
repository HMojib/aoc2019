import fs from "fs";
function ReadInstruction(instruction) {
  instruction = instruction.toString();
  if (instruction.length > 1) {
    const opcode = +instruction.slice(instruction.length - 2);
    const modes = instruction
      .slice(0, instruction.length - 2)
      .split("")
      .map(d => +d);
    return { opcode, modes };
  } else {
    return { opcode: +instruction, modes: [] };
  }
}

function GetParameterLength(opcode) {
  let instructionLength = 1;
  if (opcode === 1 || opcode === 2) {
    instructionLength = 3;
  }

  return instructionLength;
}

function getMode(modes) {
  let mode = 0;
  if (modes.length > 0) {
    mode = modes.pop();
  }
  return mode;
}

function GetInstructionObject(instructions, currentIndex) {
  let { opcode, modes } = ReadInstruction(instructions[currentIndex]);
  const parameterLength = GetParameterLength(opcode);
  const parameters = instructions.slice(
    currentIndex + 1,
    currentIndex + parameterLength + 1
  );
  return GetOperatorParameters(
    {
      opcode,
      parameters: parameters.map(d => ({ mode: getMode(modes), value: +d })),
      nextOpcode: currentIndex + parameterLength + 1
    },
    instructions
  );
}

function ShouldSave(opcode) {
  let shouldSave = true;
  if (opcode === 4) {
    shouldSave = false;
  }

  return shouldSave;
}

function GetSaveParameterIndex(opcode) {
  if (opcode === 3) {
    return 0;
  } else {
    return 2;
  }
}

function GetOperationParemeterIndex(opcode) {
  if (opcode === 3 || opcode === 4) {
    return [0];
  } else {
    return [0, 1];
  }
}

function GetOperationParameters({ opcode, parameters }, instructions) {
  return GetOperationParemeterIndex(opcode)
    .map(d => parameters[d])
    .map(d => {
      let value = d.value;
      if (d.mode === 0) {
        value = +instructions[value];
      }
      return value;
    });
}

function GetSaveLocation(instructions, parameter) {
  let saveLocation = parameter.value;
  if (parameter.mode === 1) {
    saveLocation = instructions[parameter.value];
  }
  return saveLocation;
}
function GetOperatorParameters({ parameters, opcode, ...rest }, instructions) {
  let shouldSave = ShouldSave(opcode);
  let save = false;
  if (shouldSave) {
    const location = GetSaveLocation(
      instructions,
      parameters[GetSaveParameterIndex(opcode)]
    );
    save = location;
  }

  let parameterValues = GetOperationParameters(
    { parameters, opcode },
    instructions
  );

  return { parameters: parameterValues, opcode, save, ...rest };
}

const availableOperations = instructions => ({
  1: (a, b, save) => (instructions[save] = a + b),
  2: (a, b, save) => (instructions[save] = a * b),
  3: (a, save) => (instructions[save] = a),
  4: a => console.log(a)
  // 5: (a, b) => (a !== 0 ? instructions[b] = a : null)
});

function GetOperation(operation, instructions) {
  const operations = availableOperations(instructions);
  return operations[operation];
}

function run(currentIndex, instructions) {
  const { opcode, parameters, save, nextOpcode } = GetInstructionObject(
    instructions,
    currentIndex
  );
  const PerformOperation = GetOperation(opcode);
  const result = PerformOperation(...parameters);
  if (save) {
    instructions[save] = result;
  }

  return nextOpcode;
}

function PartOne() {
  let currentIndex = 0;
  let instructions = fs
    .readFileSync(__dirname + "/input.txt")
    .toString()
    .split(",");
  console.log(instructions);
  let continueRunning = true;
  while (continueRunning) {
    currentIndex = run(currentIndex, instructions);
    if (+instructions[currentIndex] === 99) {
      continueRunning = false;
    }
  }
}

export default PartOne;
