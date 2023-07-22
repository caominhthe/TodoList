import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { PersistGate } from "redux-persist/integration/react";

import { Navigator } from "@routers";
import { persistor, store } from "@store";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Navigator />
          <StatusBar />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
