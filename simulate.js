// Wraps demo data in a Promise with latency so loading states are real.
// Replace the body of each service with fetch() calls when APIs exist.
export const simulate = (data, ms = 500) =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(data)), ms));
