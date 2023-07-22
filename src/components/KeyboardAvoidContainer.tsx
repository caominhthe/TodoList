import React, { useMemo } from "react";
import {
  View,
  ViewProps,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Palette } from "../theme";

interface KeyboardAvoidContainerProps extends ViewProps {
  withSafeKeyboard?: boolean;
  keyboardOffset?: number;
}

const KeyboardAvoidContainer: React.FC<KeyboardAvoidContainerProps> = ({
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
    [insets.bottom]
  );

  if (withSafeKeyboard) {
    return (
      <KeyboardAvoidingView
        style={styles.keyboard}
        enabled={Platform.OS === "ios"}
        behavior={"padding"}
        pointerEvents={"box-none"}
        keyboardVerticalOffset={-insets.bottom + keyboardOffset}
      >
        <View style={[styles.container, margin, style]} {...props}>
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

export default KeyboardAvoidContainer;
export type { KeyboardAvoidContainerProps };

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
