import { deliveries } from "../data/demoData.js";
import { simulate } from "./simulate.js";
export const logisticsService = { list: () => simulate(deliveries) };
