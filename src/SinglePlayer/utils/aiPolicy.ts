// aiPolicy.ts
export type PolicyEntry = { idx: number; w: number };
type Policy = Record<string, PolicyEntry[]>;

let policyCache: Policy | null = null;
let loadingPromise: Promise<Policy | null> | null = null;

/** Call this once at app start (e.g., in SinglePlayer route effect) */
export function initPolicy(url = "/game_engine/policy.json") {
  if (policyCache || loadingPromise) return loadingPromise;
  loadingPromise = fetch(url)
    .then((r) => (r.ok ? r.json() : null))
    .then((data: Policy | null) => {
      policyCache = data ?? null;
      return policyCache;
    })
    .catch(() => (policyCache = null));
  return loadingPromise;
}

export function getPolicy(): Policy | null {
  return policyCache;
}
