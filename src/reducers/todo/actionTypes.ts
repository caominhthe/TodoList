enum ActionTypes {
  CREATE_TODO = '@@mytodo/todo/CREATE_TODO',
  CREATE_TODO_SUCCESS = '@@mytodo/todo/CREATE_TODO_SUCCESS',
  CREATE_TODO_FAIL = '@@mytodo/todo/CREATE_TODO_FAIL',

  UPDATE_TODO = '@@mytodo/todo/UPDATE_TODO',
  UPDATE_TODO_SUCCESS = '@@mytodo/todo/UPDATE_TODO_SUCCESS',
  UPDATE_TODO_FAIL = '@@mytodo/todo/UPDATE_TODO_FAIL',

  DELETE_TODO = '@@mytodo/todo/DELETE_TODO',
  DELETE_TODO_SUCCESS = '@@mytodo/todo/DELETE_TODO_SUCCESS',
  DELETE_TODO_FAIL = '@@mytodo/todo/DELETE_TODO_FAIL',

  SET_INPUT_MODE = '@@mytodo/todo/SET_INPUT_MODE',
}

export default ActionTypes;
