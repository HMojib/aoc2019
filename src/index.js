import { PartOne } from "./DayFive";

const RunDaySixPartOne = () => require("./DaySix").PartOne();
const RunDayEightPartOne = () => require("./DayEight").PartOne();

const RunDayFivePartOne = () => PartOne();

(() => {
  console.log(RunDayEightPartOne());
})();
