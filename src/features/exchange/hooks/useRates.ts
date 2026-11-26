import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchLatestRates } from '../api/rates';
import { RateSnapshot, RateStatus } from '../types/rates';

export function useRates() {
  const [snapshot, setSnapshot] = useState<RateSnapshot | null>(null);
  const [status, setStatus] = useState<RateStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const requestRef = useRef<AbortController | null>(null);
  const hasSnapshotRef = useRef(false);

  const load = useCallback(async () => {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setStatus(hasSnapshotRef.current ? 'refreshing' : 'loading');
    setError(null);

    try {
      const nextSnapshot = await fetchLatestRates(controller.signal);
      if (controller.signal.aborted) return;
      hasSnapshotRef.current = true;
      setSnapshot(nextSnapshot);
      setStatus('success');
    } catch (reason) {
      if (controller.signal.aborted) return;
      setError(reason instanceof Error ? reason.message : 'Unable to load exchange rates.');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    const scheduledLoad = setTimeout(() => void load(), 0);
    return () => {
      clearTimeout(scheduledLoad);
      requestRef.current?.abort();
    };
  }, [load]);

  return { snapshot, status, error, refresh: load };
}
