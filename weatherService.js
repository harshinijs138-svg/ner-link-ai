import { weather } from "../data/demoData.js";
import { simulate } from "./simulate.js";
export const weatherService = { current: () => simulate(weather) };
