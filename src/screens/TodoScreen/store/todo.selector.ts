import { RootState } from "@root/src/store";
import { createSelector } from "reselect";
import { Todo } from "./todo.interface";
import { initialState } from "./todo.slice";

const todoSelector = (state: RootState) => {
  return state.todo ?? initialState;
};

export const selectTodos = createSelector(
  todoSelector,
  (state) => (Object.values(state.todoList) ?? []) as Todo[]
);

export const selectTodoEditMode = createSelector(
  todoSelector,
  (state) => state.inputMode
);
