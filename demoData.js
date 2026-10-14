// DEMO / SIMULATED DATA. Illustrative only, not from any live government feed.
// Replace by changing the service files in src/services (same return shapes).
export const DATA_LABEL = "Demo / Simulated Data";

export const routes = [
  { id: "A", name: "Route A", corridor: "Primary highway corridor", origin: "Guwahati", destination: "Remote District Hospital", distanceKm: 312, baseTimeMin: 290,
    factors: { rainfall: 0.62, landslide: 0.55, flood: 0.3, roadCondition: 0.35, traffic: 0.3, history: 0.5, incidents: 0.4 } },
  { id: "B", name: "Route B", corridor: "Alternative valley corridor", origin: "Guwahati", destination: "Remote District Hospital", distanceKm: 341, baseTimeMin: 320,
    factors: { rainfall: 0.3, landslide: 0.15, flood: 0.25, roadCondition: 0.3, traffic: 0.1, history: 0.2, incidents: 0.0 } },
  { id: "C", name: "Route C", corridor: "Northern hill road", origin: "Guwahati", destination: "Border Sub-division", distanceKm: 268, baseTimeMin: 340,
    factors: { rainfall: 0.4, landslide: 0.3, flood: 0.1, roadCondition: 0.5, traffic: 0.1, history: 0.35, incidents: 0.1 } },
  { id: "D", name: "Route D", corridor: "Southern plains link", origin: "Silchar", destination: "District Headquarters", distanceKm: 190, baseTimeMin: 210,
    factors: { rainfall: 0.15, landslide: 0.05, flood: 0.2, roadCondition: 0.15, traffic: 0.2, history: 0.1, incidents: 0.0 } },
];

export const vehicles = [
  { id: "NER-104", cargo: "Medical Supplies", routeId: "A", priority: "Critical", status: "On Route", speedKmh: 46, etaMin: 134, lastUpdated: "2 min ago" },
  { id: "NER-221", cargo: "Food Supplies", routeId: "B", priority: "High", status: "On Route", speedKmh: 38, etaMin: 210, lastUpdated: "1 min ago" },
  { id: "NER-309", cargo: "Construction Materials", routeId: "A", priority: "Normal", status: "Delayed", speedKmh: 22, etaMin: 380, lastUpdated: "6 min ago" },
  { id: "NER-412", cargo: "Agricultural Produce", routeId: "D", priority: "Normal", status: "On Route", speedKmh: 52, etaMin: 95, lastUpdated: "3 min ago" },
  { id: "NER-517", cargo: "Emergency Supplies", routeId: "C", priority: "Critical", status: "On Route", speedKmh: 34, etaMin: 240, lastUpdated: "1 min ago" },
];

export const deliveries = [
  { id: "DL-2041", cargo: "Medicine", origin: "Guwahati", destination: "District Hospital", vehicleId: "NER-104", priority: "Critical", status: "At Risk", etaMin: 134, riskPct: 58 },
  { id: "DL-2042", cargo: "Food Supplies", origin: "Guwahati", destination: "Block Depot", vehicleId: "NER-221", priority: "High", status: "In Transit", etaMin: 210, riskPct: 27 },
  { id: "DL-2043", cargo: "Construction Materials", origin: "Guwahati", destination: "Bridge Site", vehicleId: "NER-309", priority: "Normal", status: "Delayed", etaMin: 380, riskPct: 61 },
  { id: "DL-2044", cargo: "Agricultural Produce", origin: "Silchar", destination: "Regional Market", vehicleId: "NER-412", priority: "Normal", status: "In Transit", etaMin: 95, riskPct: 12 },
  { id: "DL-2045", cargo: "Emergency Supplies", origin: "Guwahati", destination: "Relief Camp", vehicleId: "NER-517", priority: "Critical", status: "In Transit", etaMin: 240, riskPct: 36 },
  { id: "DL-2046", cargo: "Medicine", origin: "Dibrugarh", destination: "Community Health Centre", vehicleId: "NER-088", priority: "High", status: "Delivered", etaMin: 0, riskPct: 8 },
  { id: "DL-2047", cargo: "Food Supplies", origin: "Silchar", destination: "Village Cluster", vehicleId: "NER-190", priority: "High", status: "Disrupted", etaMin: 0, riskPct: 82 },
];

export const alerts = [
  { id: "AL-301", severity: "CRITICAL", title: "Road blockage reported on Route A", location: "Km 118, Route A", routeId: "A", timestamp: "10 min ago", action: "Review Route B for affected deliveries" },
  { id: "AL-302", severity: "HIGH PRIORITY", title: "NER-104 (Medical Supplies) is entering a high-risk corridor", location: "Route A", routeId: "A", timestamp: "14 min ago", action: "Consider diverting via Route B" },
  { id: "AL-303", severity: "WARNING", title: "Heavy rainfall may increase disruption probability", location: "Central hills sector", routeId: "C", timestamp: "32 min ago", action: "Monitor Route C conditions" },
  { id: "AL-304", severity: "INFO", title: "Alternative route available for Guwahati to District Hospital", location: "Route B", routeId: "B", timestamp: "40 min ago", action: "Compare with Route A" },
];

export const incidents = [
  { id: "FR-118", type: "Landslide", location: "Km 118, Route A", severity: "High", description: "Partial debris on carriageway; one lane open.", timestamp: "18 min ago", officer: "Field Officer 07" },
  { id: "FR-117", type: "Road Damage", location: "Km 54, Route C", severity: "Medium", description: "Potholes after rain, speed restricted.", timestamp: "1 h ago", officer: "Field Officer 03" },
  { id: "FR-116", type: "Traffic Blockage", location: "Town entry, Route D", severity: "Low", description: "Market-day congestion, clears by noon.", timestamp: "2 h ago", officer: "Field Officer 11" },
];

export const districts = [
  { id: "d1", name: "District X", access: { road: 58, emergency: 41, hospital: 73, supplies: 65 } },
  { id: "d2", name: "District Y", access: { road: 82, emergency: 76, hospital: 88, supplies: 79 } },
  { id: "d3", name: "District Z", access: { road: 69, emergency: 55, hospital: 62, supplies: 71 } },
  { id: "d4", name: "District W", access: { road: 90, emergency: 84, hospital: 91, supplies: 88 } },
];

export const weather = { summary: "Heavy rainfall advisory, central hills", rainfallMm24h: 96, updated: "Simulated" };
