import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { spacing, typography } from '../theme';

interface TodoInputGroup {
  value?: string;
  onChangeText?: (text: string) => void;
  onPressButton?: () => void;
  button: React.ReactNode | any;
}

const TodoInputGroup: React.FC<TodoInputGroup> = ({
  value,
  onChangeText,
  onPressButton,
  button,
}) => {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        placeholder="Add new todo"
        onChangeText={onChangeText}
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

const { width: windowWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: spacing.medium,
    paddingBottom: spacing.tiny,
    width: windowWidth,
  },
  textInput: {
    flex: 1,
    fontSize: typography.fontSize.large,
    fontWeight: '700',
    flexShrink: 1,
    borderWidth: 1,
    borderColor: 'black',
  },
});
