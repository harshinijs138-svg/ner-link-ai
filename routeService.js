import { routes } from "../data/demoData.js";
import { simulate } from "./simulate.js";
export const routeService = { list: () => simulate(routes) };
