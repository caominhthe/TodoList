import React, { useMemo } from "react";
import {
  View,
  ViewProps,
  StyleSheet,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Palette } from "../theme";

interface SafeAreaContainerProps extends ViewProps {
  withSafeKeyboard?: boolean;
  keyboardOffset?: number;
}

const SafeAreaContainer: React.FC<SafeAreaContainerProps> = ({
  style,
  children,
  withSafeKeyboard = false,
  keyboardOffset = 100,
  ...props
}) => {
  const insets = useSafeAreaInsets();

  const margin = useMemo(
    () => ({
      marginBottom: insets.bottom,
    }),
    [insets.bottom, insets.top]
  );

  if (withSafeKeyboard) {
    return (
      <KeyboardAvoidingView
        enabled={Platform.OS === "ios"}
        behavior={"padding"}
        style={styles.keyboard}
        pointerEvents={"box-none"}
        keyboardVerticalOffset={-insets.bottom + keyboardOffset}
      >
        <View
          style={[styles.container, margin, style]}
          pointerEvents={"box-none"}
          {...props}
        >
          {children}
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View
      style={[styles.container, margin, style]}
      pointerEvents={"box-none"}
      {...props}
    >
      {children}
    </View>
  );
};

export default SafeAreaContainer;
export type { SafeAreaContainerProps };

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    backgroundColor: Palette.white,
  },
  container: {
    flex: 1,
    backgroundColor: Palette.white,
  },
});
