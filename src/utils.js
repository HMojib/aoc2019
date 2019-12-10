import fs from "fs";

export function ReadFile(path) {
  try {
    return fs.readFileSync(path).toString();
  } catch (err) {
    throw err;
  }
}
