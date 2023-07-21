import { AppState, AppStateStatus } from 'react-native';
import { useEffect, useState } from 'react';

export default function useAppState() {
  const [appState, setAppState] = useState<AppStateStatus | null>(null);

  useEffect(() => {
    function handleAppStateChanged(newState: AppStateStatus) {
      setAppState(newState);
    }
    AppState.addEventListener('change', handleAppStateChanged);

    return () => {
      AppState.removeEventListener('change', handleAppStateChanged);
    };
  }, []);

  return appState;
}