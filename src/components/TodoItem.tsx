import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import React from 'react';
import { useCallback } from 'react';
import { Todo } from '../types';
import { spacing, typography } from '../theme';

interface TodoItemProps {
  todo: Todo;
  onDelete: (todo: Todo) => void;
  onPress: (todo: Todo) => void;
  isSelected: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onPress,
  onDelete,
  isSelected,
}) => {
  const onPressTodo = useCallback(() => {
    onPress?.(todo);
  }, [onPress, todo]);

  const onPressDelete = useCallback(() => {
    onDelete?.(todo);
  }, [onDelete, todo]);

  return (
    <View
      style={[styles.container, isSelected && styles.isSelected]}
      key={todo.id}
    >
      <TouchableOpacity
        testID="todo-item"
        style={styles.titleButton}
        onPress={onPressTodo}
      >
        <Text testID="item-title" style={styles.title}>
          {todo.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity testID="delete-button" onPress={onPressDelete}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 40,
    paddingVertical: spacing.small,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: spacing.small,
    paddingHorizontal: spacing.large,
    paddingTop: spacing.small,
    marginTop: spacing.small,
    marginHorizontal: spacing.large,
  },
  delete: {
    color: 'blue',
    fontSize: typography.fontSize.medium,
  },
  rightIcon: {
    marginRight: spacing.medium,
    marginLeft: 'auto',
  },
  leftIcon: {
    marginLeft: spacing.medium,
  },
  title: {
    paddingHorizontal: spacing.medium,
    fontSize: typography.fontSize.medium,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  titleButton: {
    flex: 1,
  },
  isSelected: {
    backgroundColor: 'grey',
  },
});
