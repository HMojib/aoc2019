import { ReadFile } from "../utils";
import path from "path";

class Day {
  constructor(props) {
    const { input = "input.txt" } = props;

    this.input = ReadFile(path.join(path.dirname, input));
    console.log();
  }
}

export default Day;
