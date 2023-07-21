import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootStackScreenProps, ScreenNames } from "@routers";
import { SafeAreaContainer, TodoInputGroup, TodoItem } from "@components";
import { Todo, selectTodoEditMode, selectTodos, setTodoMode } from "./store";
import { Palette, spacing, typography } from "@theme";
import { useAppDispatch } from "@root/src/hooks/useAppDispatch";
import { useToDo } from "./useTodo";

type TodoScreenProps = RootStackScreenProps<ScreenNames.Todo>;

export const TodoScreen: React.FC<TodoScreenProps> = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>();
  const [content, setContent] = useState("");
  const inputMode = useSelector(selectTodoEditMode);
  const todoList: Todo[] = useSelector(selectTodos);

  const { createTodo, updateToDo, deleteTodo } = useToDo();

  //Clear input content Items after create new todo item
  const onCreateTodo = useCallback(() => {
    if (content !== "") {
      createTodo(content);
      setSelectedTodo(null);
      setContent("");
    }
  }, [content]);

  //Clear input content and selected Items after Update new todo item
  const onUpdateTodo = useCallback(() => {
    if (selectedTodo && content !== "") {
      updateToDo(content, selectedTodo);
      setContent("");
      setSelectedTodo(null);
    }
  }, [selectedTodo, content]);

  // Reset content input and inputMode after delete to avoid confuse when edit
  const onPressDelete = useCallback((todo: Todo) => {
    setContent("");
    deleteTodo(todo);
  }, []);

  // Input turn into edit inputMode when click on an item, selected item will be highlight
  const onPressItem = useCallback(
    (todo: Todo) => {
      setSelectedTodo(todo);
      setContent(todo.title);
      // dispatch(setTodoMode("edit"));
    },
    [inputMode]
  );

  const renderItem = (todo: Todo) => {
    return (
      <TodoItem
        todo={todo}
        onPress={onPressItem}
        onDelete={onPressDelete}
        isSelected={todo.id === selectedTodo?.id}
      />
    );
  };

  return (
    <SafeAreaContainer withSafeKeyboard>
      <FlatList<Todo>
        showsVerticalScrollIndicator={false}
        data={todoList}
        keyExtractor={(todo) => String(todo.id)}
        renderItem={({ item }) => renderItem(item)}
        contentContainerStyle={styles.flatListContent}
      />
      <View style={styles.inputContainer}>
        <TodoInputGroup
          value={content}
          onChangeText={(text) => setContent(text)}
          onPressButton={inputMode === "add" ? onCreateTodo : onUpdateTodo}
          button={
            <Text style={styles.inputButton}>
              {inputMode === "add" ? "Add" : "Edit"}
            </Text>
          }
        />
      </View>
    </SafeAreaContainer>
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
    backgroundColor: "#e5e5e5",
    padding: spacing.medium,
    borderRadius: 8,
    overflow: "hidden",
  },
});
