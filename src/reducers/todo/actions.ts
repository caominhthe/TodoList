import { Todo } from '@root/src/types';
import ActionTypes from './actionTypes';

export const setTodoMode = (inputMode: string) => (dispatch: Function) => {
  dispatch({ type: ActionTypes.SET_INPUT_MODE, payload: { inputMode } });
};

export const resetEditMode = () => (dispatch: Function) => {
  dispatch(setTodoMode('add'));
};

export const updateTodo = (item: Todo) => (dispatch: Function) => {
  try {
    dispatch(resetEditMode());
    dispatch({
      type: ActionTypes.UPDATE_TODO_SUCCESS,
      payload: { todo: item },
    });
  } catch (err) {
    dispatch({ type: ActionTypes.UPDATE_TODO_FAIL, err });
  }
};

export const createTodo = (content: string) => (dispatch: Function) => {
  try {
    const newItem = {
      id: String(Date.now()),
      title: content,
      createdAt: Date.now(),
    };
    dispatch({
      type: ActionTypes.CREATE_TODO_SUCCESS,
      payload: { todo: newItem },
    });
  } catch (error) {
    dispatch({ type: ActionTypes.UPDATE_TODO_FAIL, payload: { error } });
  }
};

export const deleteTodos = (todoId: string) => (dispatch: Function) => {
  try {
    dispatch({
      type: ActionTypes.DELETE_TODO_SUCCESS,
      payload: { todoID: todoId },
    });
    dispatch(resetEditMode());
  } catch (err) {
    dispatch({ type: ActionTypes.DELETE_TODO_FAIL, err });
  }
};
