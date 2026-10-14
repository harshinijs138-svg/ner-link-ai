/**
 * Data models (JSDoc). Real APIs should return these shapes.
 * @typedef {{rainfall:number,landslide:number,flood:number,incidents:number,history:number,roadCondition:number,traffic:number}} RiskFactors  values 0..1, higher = worse
 * @typedef {{id:string,name:string,corridor:string,origin:string,destination:string,distanceKm:number,baseTimeMin:number,factors:RiskFactors}} Route
 * @typedef {{id:string,cargo:string,routeId:string,priority:'Critical'|'High'|'Normal',status:string,speedKmh:number,etaMin:number,lastUpdated:string}} Vehicle
 * @typedef {{id:string,cargo:string,origin:string,destination:string,vehicleId:string,priority:string,status:'In Transit'|'Delivered'|'Delayed'|'At Risk'|'Disrupted',etaMin:number,riskPct:number}} Delivery
 * @typedef {{id:string,severity:'CRITICAL'|'HIGH PRIORITY'|'WARNING'|'INFO',title:string,location:string,routeId:string,timestamp:string,action:string}} Alert
 * @typedef {{id:string,type:string,location:string,severity:string,description:string,timestamp:string,officer:string}} Incident
 * @typedef {{id:string,name:string,access:{road:number,emergency:number,hospital:number,supplies:number}}} District
 */
export {};
