import React, { useCallback, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackScreenProps, ScreenNames } from '@routers';
import { TodoInputGroup, TodoItem } from '@components';
import { selectTodoEditMode, selectTodos } from '@selectors';
import { Todo } from '@types';
import {
  createTodo,
  deleteTodos,
  setTodoMode,
  updateTodo,
} from '@root/src/reducers';
import { Palette, spacing, typography } from '@theme';

type TodoScreenProps = RootStackScreenProps<ScreenNames.Todo>;

export const TodoScreen: React.FC<TodoScreenProps> = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>();
  const [content, setContent] = useState('');
  const inputMode = useSelector(selectTodoEditMode);
  const todoList: Todo[] = useSelector(selectTodos);
  const dispatch = useDispatch();

  //Clear input content Items after create new todo item
  const onCreateTodo = useCallback(() => {
    if (content !== '') {
      dispatch(createTodo(content.trim()));
      setSelectedTodo(null);
      setContent('');
    }
  }, [content, dispatch]);

  //Clear input content and selected Items after Update new todo item
  const onUpdateTodo = useCallback(() => {
    if (selectedTodo && content !== '') {
      const updatedTodo: Todo = {
        ...selectedTodo,
        title: content.trim(),
      };
      setContent('');
      setSelectedTodo(null);
      dispatch(updateTodo(updatedTodo));
    }
  }, [selectedTodo, content, dispatch]);

  // Input turn into edit inputMode when click on an item, selected item will be highlight
  const onPressItem = useCallback(
    (todo: Todo) => {
      setSelectedTodo(todo);
      setContent(todo.title);
      dispatch(setTodoMode('edit'));
    },
    [dispatch, inputMode],
  );

  // Reset content input and inputMode after delete to avoid confuse when edit
  const onPressDelete = useCallback((todo: Todo) => {
    setContent('');
    dispatch(deleteTodos(todo.id));
  }, []);

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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
      >
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
            onPressButton={inputMode === 'add' ? onCreateTodo : onUpdateTodo}
            button={
              <Text style={styles.inputButton}>
                {inputMode === 'add' ? 'Add' : 'Edit'}
              </Text>
            }
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Palette.white,
  },
  scrollView: {
    flex: 1,
  },
  flatListContent: {
    flexGrow: 1,
    paddingBottom: spacing.large,
    paddingTop: spacing.medium,
  },
  keyboardAvoidView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  inputContainer: {
    borderTopWidth: 1,
    borderColor: Palette.grey,
    paddingTop: spacing.small,
  },
  inputButton: {
    fontWeight: 'bold',
    fontSize: typography.fontSize.medium,
    backgroundColor: '#e5e5e5',
    padding: spacing.medium,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
