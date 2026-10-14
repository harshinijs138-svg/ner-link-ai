import { districts } from "../data/demoData.js";
import { simulate } from "./simulate.js";
export const accessibilityService = { list: () => simulate(districts) };
