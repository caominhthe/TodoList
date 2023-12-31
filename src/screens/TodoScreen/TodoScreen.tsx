import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, View, Text, TextInput, Keyboard } from "react-native";
import { useSelector } from "react-redux";
import { RootStackScreenProps, ScreenNames } from "@routers";
import { KeyboardAvoidContainer, TodoInputGroup, TodoItem } from "@components";
import {
  EditMode,
  Todo,
  selectTodoEditMode,
  selectTodos,
  selectDoneTodos,
} from "./store";
import { Palette, spacing, typography } from "@theme";
import { useToDo } from "./useTodo";
import { Colors } from "@root/src/theme/color";
import Animated, { Layout } from "react-native-reanimated";

type TodoScreenProps = RootStackScreenProps<ScreenNames.Todo>;

export const TodoScreen: React.FC<TodoScreenProps> = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>();
  const [content, setContent] = useState("");
  const inputMode = useSelector(selectTodoEditMode);
  const todoList: Todo[] = useSelector(selectTodos);
  const doneTodos: Todo[] = useSelector(selectDoneTodos);

  const isAddMode = inputMode === EditMode.Add;
  const inputRef = useRef<TextInput>(null);

  const { createTodo, updateToDo, deleteTodo, changeInputMode } = useToDo();

  const clearInput = () => {
    setSelectedTodo(null);
    setContent("");
    changeInputMode(EditMode.Add);
    Keyboard.dismiss();
  };

  //Clear input content Items after create new todo item
  const onCreateTodo = useCallback(() => {
    if (content !== "") {
      createTodo(content);
      clearInput();
    }
  }, [content, createTodo]);

  //Clear input content and selected Items after Update new todo item
  const onUpdateTodo = useCallback(() => {
    if (selectedTodo && content !== "") {
      updateToDo({ title: content.trim() }, selectedTodo.id);
      clearInput();
    }
  }, [selectedTodo, content, updateToDo]);

  // Reset content input and inputMode after delete to avoid confuse when edit
  const onPressDelete = useCallback(
    (todo: Todo) => {
      deleteTodo(todo);
    },
    [deleteTodo]
  );

  // Input turn into edit inputMode when click on an item, selected item will be highlight
  const onPressItem = useCallback(
    (todo: Todo) => {
      setSelectedTodo(todo);
      setContent(todo.title);
      changeInputMode(EditMode.Edit);
      inputRef.current?.focus();
    },
    [inputMode]
  );

  const onPressCheckBox = useCallback((todo: Todo) => {
    updateToDo({ isDone: !todo.isDone }, todo.id);
  }, []);

  //If cancel keyboard during edit, it will cancel the edit mode
  const cancelEdit = () => {
    if (!isAddMode) {
      clearInput();
    }
  };

  const renderItem = (todo: Todo) => {
    return (
      <TodoItem
        todo={todo}
        onPress={onPressItem}
        onDelete={onPressDelete}
        onPressCheckBox={onPressCheckBox}
        isSelected={todo.id === selectedTodo?.id}
      />
    );
  };

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{`Let's add some Todo`}</Text>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text>{`Today tasks: ${doneTodos.length} / ${todoList.length} `}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidContainer withSafeKeyboard>
      <Animated.FlatList<Todo>
        showsVerticalScrollIndicator={false}
        data={todoList}
        keyExtractor={(todo) => String(todo.id)}
        renderItem={({ item }) => renderItem(item)}
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={renderEmptyList}
        itemLayoutAnimation={Layout.springify()}
        ListHeaderComponent={renderHeader}
      />
      <View style={styles.inputContainer}>
        <TodoInputGroup
          value={content}
          onChangeText={(text) => setContent(text)}
          onPressButton={isAddMode ? onCreateTodo : onUpdateTodo}
          onBlur={cancelEdit}
          inputRef={inputRef}
          button={
            <Text style={styles.inputButton}>{isAddMode ? "Add" : "Edit"}</Text>
          }
        />
      </View>
    </KeyboardAvoidContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Palette.white,
  },
  flatListContent: {
    flexGrow: 1,
    paddingBottom: spacing.large,
    paddingTop: spacing.medium,
  },
  keyboardAvoidView: {
    flex: 1,
    justifyContent: "space-between",
  },
  inputContainer: {
    borderTopWidth: 1,
    borderColor: Palette.grey,
    paddingTop: spacing.small,
  },
  inputButton: {
    fontWeight: "bold",
    fontSize: typography.fontSize.medium,
    backgroundColor: Colors.Background,
    padding: spacing.medium,
    borderRadius: spacing.small,
    overflow: "hidden",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.medium,
  },
  emptyText: {
    fontSize: typography.fontSize.medium,
    color: "gray",
  },
  header: {
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.small,
  },
});
