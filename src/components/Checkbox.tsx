import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Palette, spacing } from "../theme";
import { Colors } from "../theme/color";

interface CheckBoxProps {
  onChange?: (checked: boolean) => void;
  value?: boolean;
}

const Checkbox: React.FC<CheckBoxProps> = ({ value = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(value);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <TouchableOpacity onPress={toggleCheckbox} style={styles.container}>
      <View style={[styles.checkbox, isChecked ? styles.checked : null]}>
        {isChecked && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.BackgroundDark,
    borderRadius: spacing.tiny,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: Colors.BackgroundDark,
  },
  checkmark: {
    color: Palette.white,
    fontSize: 12,
  },
});

export default Checkbox;
