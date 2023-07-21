import { useAppDispatch } from "@root/src/hooks/useAppDispatch";
import {
  Todo,
  createTodo as createAction,
  deleteTodo as deleteAction,
  updateTodo,
} from "./store";
import { useCallback } from "react";

export const useToDo = () => {
  const dispatch = useAppDispatch();

  //Clear input content Items after create new todo item
  const createTodo = useCallback(
    (content: string) => {
      if (content !== "") {
        dispatch(createAction(content.trim() as string));
      }
    },
    [dispatch]
  );

  //Clear input content and selected Items after Update new todo item
  const updateToDo = useCallback(
    (content: string, selectedTodo: Todo) => {
      if (selectedTodo && content !== "") {
        const updatedTodo: Todo = {
          ...selectedTodo,
          title: content.trim(),
        };
        dispatch(updateTodo(updatedTodo));
      }
    },
    [dispatch]
  );

  // Reset content input and inputMode after delete to avoid confuse when edit
  const deleteTodo = useCallback((todo: Todo) => {
    dispatch(deleteAction(todo.id));
  }, []);

  return { createTodo, updateToDo, deleteTodo };
};
