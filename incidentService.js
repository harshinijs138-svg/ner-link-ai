import { incidents } from "../data/demoData.js";
import { simulate } from "./simulate.js";
export const incidentService = { list: () => simulate(incidents) };
