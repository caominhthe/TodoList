import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextStyle,
  Pressable,
} from "react-native";
import React, { useMemo } from "react";
import { useCallback } from "react";
import { spacing, typography } from "../theme";
import Animated, {
  ExitAnimationsValues,
  SlideInDown,
  withTiming,
} from "react-native-reanimated";
import { Todo } from "../screens";
import Checkbox from "./Checkbox";
import { Colors } from "../theme/color";

interface TodoItemProps {
  todo: Todo;
  isSelected: boolean;
  onDelete: (todo: Todo) => void;
  onPressCheckBox: (todo: Todo) => void;
  onPress: (todo: Todo) => void;
}

const ITEM_HEIGHT = 65;

const EXIT_ANIMATION_DURATION = 200;

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onPress,
  onDelete,
  onPressCheckBox,
  isSelected,
}) => {
  const onPressTodo = useCallback(() => {
    onPress?.(todo);
  }, [onPress, todo]);

  const onPressDelete = useCallback(() => {
    onDelete?.(todo);
  }, [onDelete, todo]);

  const textStyle = useMemo((): TextStyle => {
    return todo.isDone ? { textDecorationLine: "line-through" } : {};
  }, [todo.isDone]);

  const exiting = (values: ExitAnimationsValues) => {
    "worklet";
    const animations = {
      originX: withTiming(0, { duration: EXIT_ANIMATION_DURATION }),
      opacity: withTiming(0.5, { duration: EXIT_ANIMATION_DURATION }),
      height: withTiming(0, { duration: EXIT_ANIMATION_DURATION }),
    };
    const initialValues = {
      originX: values.currentOriginX,
      height: values.currentHeight,
      opacity: 1,
    };
    return {
      initialValues,
      animations,
    };
  };

  return (
    <Pressable onPress={onPressTodo}>
      <Animated.View
        style={[styles.container, isSelected && styles.isSelected]}
        key={todo.id}
        entering={SlideInDown.duration(200)}
        exiting={exiting}
      >
        <Checkbox onChange={() => onPressCheckBox(todo)} value={todo.isDone} />
        <View testID="todo-item" style={styles.titleButton}>
          <Text testID="item-title" style={[styles.title, textStyle]}>
            {todo.title}
          </Text>
        </View>
        <TouchableOpacity testID="delete-button" onPress={onPressDelete}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    </Pressable>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.small,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: spacing.small,
    paddingHorizontal: spacing.large,
    paddingTop: spacing.small,
    marginTop: spacing.small,
    marginHorizontal: spacing.large,
    overflow: "hidden",
    height: ITEM_HEIGHT,
  },
  delete: {
    color: Colors.Error,
    fontSize: typography.fontSize.medium,
  },
  rightIcon: {
    marginRight: spacing.medium,
    marginLeft: "auto",
  },
  leftIcon: {
    marginLeft: spacing.medium,
  },
  title: {
    paddingHorizontal: spacing.medium,
    fontSize: typography.fontSize.medium,
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  titleButton: {
    flex: 1,
  },
  isSelected: {
    backgroundColor: Colors.Background,
  },
});
