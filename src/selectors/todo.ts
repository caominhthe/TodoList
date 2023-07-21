import { RootState, Todo } from '@types';
import { createSelector } from 'reselect';
import { todoInitialState } from '../reducers/todo/todo';

const todoSelector = (state: RootState) => {
  return state.todo ?? todoInitialState;
};

export const selectTodos = createSelector(
  todoSelector,
  (state) => (Object.values(state.todoList) ?? []) as Todo[],
);

export const selectTodoEditMode = createSelector(
  todoSelector,
  (state) => state.inputMode,
);
