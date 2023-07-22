import { useAppDispatch } from "@root/src/hooks/useAppDispatch";
import {
  Todo,
  TodoID,
  createTodo as createAction,
  deleteTodo as deleteAction,
  updateTodo as updateAction,
  changeInputMode as changeInputAction,
  EditMode,
} from "./store";

export const useToDo = () => {
  const dispatch = useAppDispatch();

  const createTodo = (content: string) => {
    if (content !== "") {
      dispatch(createAction(content.trim() as string));
    }
  };

  const updateToDo = (partialTodo: Partial<Todo>, todoID: TodoID) => {
    if (todoID && partialTodo) {
      dispatch(updateAction({ partialTodo, id: todoID }));
    }
  };

  const deleteTodo = (todo: Todo) => {
    dispatch(deleteAction(todo.id));
  };

  const changeInputMode = (input: EditMode) => {
    dispatch(changeInputAction(input));
  };

  return { createTodo, updateToDo, deleteTodo, changeInputMode };
};
