import { useEffect } from 'react';

function useAbortableEffect(effect: (arg0: {}) => any, dependencies: any) {
  const status = { aborted: false };
  useEffect(() => {
    status.aborted = false;
    const cleanUpFn = effect(status);
    return () => {
      status.aborted = true;
      if (typeof cleanUpFn === 'function') {
        cleanUpFn();
      }
    };
  }, [...dependencies]);
}

export default useAbortableEffect;
