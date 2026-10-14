import { vehicles } from "../data/demoData.js";
import { simulate } from "./simulate.js";
export const vehicleService = { list: () => simulate(vehicles) };
