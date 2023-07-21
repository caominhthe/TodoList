import { createTodo } from '@root/src/utils';
import todoReducer from '../todo';
import ActionTypes from '../actionTypes';
import { todoInitialState } from '../todo';

describe('todoReducer', () => {
  it('should return initial state correctly', () => {
    expect(todoReducer(undefined, {})).toEqual(todoInitialState);
  });

  it('should handle loadingState', () => {
    const type = ActionTypes.CREATE_TODO;
    const action = { type };
    const reducerReturnValue = todoReducer(todoInitialState, action);
    expect(reducerReturnValue.isLoading).toBe(true);
    expect(reducerReturnValue.error).toBe(undefined);
  });

  it('should handle CREATE_TODO_SUCCESS correctly', () => {
    const todo = createTodo('create todo');

    const action = {
      type: ActionTypes.CREATE_TODO_SUCCESS,
      payload: { todo: todo },
    };

    const reducerReturnValue = todoReducer(todoInitialState, action);
    expect(reducerReturnValue.isLoading).toEqual(false);
    expect(reducerReturnValue.todoList[todo.id]).toBeTruthy();
  });

  it('should handle UPDATE_TODO_SUCCESS correctly', () => {
    const todo = createTodo('create todo');

    const action = {
      type: ActionTypes.UPDATE_TODO_SUCCESS,
      payload: { todo: { ...todo, title: 'New title' } },
    };

    const reducerReturnValue = todoReducer(
      { ...todoInitialState, todoList: { [todo.id]: todo } },
      action,
    );
    expect(reducerReturnValue.isLoading).toEqual(false);
    expect(reducerReturnValue.todoList[todo.id].title).toBe('New title');
  });

  it('should handle DELETE_TODO_SUCCESS correctly', () => {
    const todo = createTodo('create todo');

    const action = {
      type: ActionTypes.DELETE_TODO_SUCCESS,
      payload: { todoID: todo.id },
    };

    const reducerReturnValue = todoReducer(
      { ...todoInitialState, todoList: { [todo.id]: todo } },
      action,
    );
    expect(reducerReturnValue.isLoading).toEqual(false);
    expect(reducerReturnValue.todoList[todo.id]).toBeFalsy();
  });
});
