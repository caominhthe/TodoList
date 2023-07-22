import React from "react";
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { spacing, typography } from "../theme";
import { Colors } from "../theme/color";

interface TodoInputGroup {
  value?: string;
  onChangeText?: (text: string) => void;
  onPressButton?: () => void;
  onBlur?: () => void;
  button: React.ReactNode | any;
  inputRef?: React.Ref<TextInput>;
}

const TodoInputGroup: React.FC<TodoInputGroup> = ({
  value,
  onChangeText,
  onPressButton,
  onBlur,
  button,
  inputRef,
}) => {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        ref={inputRef}
        placeholder="Add new todo here"
        onChangeText={onChangeText}
        onBlur={onBlur}
        style={styles.textInput}
        multiline
        value={value}
      />
      <TouchableOpacity testID="submit-button" onPress={onPressButton}>
        {button}
      </TouchableOpacity>
    </View>
  );
};

export default TodoInputGroup;

const { width: windowWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.medium,
    paddingBottom: spacing.tiny,
    width: windowWidth,
  },
  textInput: {
    flex: 1,
    fontSize: typography.fontSize.large,
    lineHeight: 30,
    borderWidth: 1,
    borderColor: Colors.BackgroundDark,
    borderRadius: spacing.small,
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.small,
    marginRight: spacing.small,
  },
});
