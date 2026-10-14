# NER-LINK AI - Stage 1

AI-Powered Logistics & Accessibility Intelligence Platform for the North Eastern Region.
Stage 1 delivers the design system, app shell, Overview dashboard, demo data layer, Promise-based services,
AppState context and the transparent weighted risk engine.

All values are **Demo / Simulated Data** and are labelled as such in the UI.

## Setup
Requires Node.js 18 or newer.

    npm install
    npm run dev

Open the URL printed in the terminal (usually http://localhost:5173).

## Structure
- src/data/demoData.js - all demo data (single place to replace)
- src/services/* - Promise-returning services; swap bodies for real APIs later
- src/services/aiService.js - rule-based weighted risk scoring (not a trained ML model)
- src/context/AppState.jsx - loads services, derives KPIs and insights
- src/components, src/layouts, src/pages - UI

## Troubleshooting
- `npm install` fails: check `node -v` (need 18+), delete node_modules and retry.
- Port busy: `npm run dev -- --port 3000`.
- Blank page: check the browser console and confirm you ran the commands inside the ner-link-ai folder.
- Font not loading offline: the UI falls back to system fonts.
