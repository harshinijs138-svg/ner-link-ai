import { alerts } from "../data/demoData.js";
import { simulate } from "./simulate.js";
export const alertService = { list: () => simulate(alerts) };
