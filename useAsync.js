import { useCallback, useEffect, useState } from "react";
/** Generic loader for a Promise-returning function (used by later stages). */
export function useAsync(fn) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const run = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));
    fn().then((data) => setState({ data, loading: false, error: null }))
        .catch((error) => setState({ data: null, loading: false, error }));
  }, [fn]);
  useEffect(() => { run(); }, [run]);
  return { ...state, reload: run };
}
