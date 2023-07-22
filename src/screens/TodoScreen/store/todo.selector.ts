import { RootState } from "@root/src/store";
import { createSelector } from "reselect";
import { Todo } from "./todo.interface";
import { initialState } from "./todo.slice";

const todoSelector = (state: RootState) => {
  return state.todo ?? initialState;
};

export const selectTodos = createSelector(
  todoSelector,
  (state) => state.todoList ?? ([] as Todo[])
);

export const selectDoneTodos = createSelector(
  todoSelector,
  (state) => state.todoList.filter((todo) => todo.isDone) ?? ([] as Todo[])
);

export const selectTodoEditMode = createSelector(
  todoSelector,
  (state) => state.inputMode
);

export const selectTodoByID = createSelector(
  [todoSelector, (_, id) => id],
  (state, id) => state.todoList.find((item) => item.id === id)
);
