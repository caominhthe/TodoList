import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { EditMode, Todo as ITodo, TodoID, TodoState } from "./todo.interface";
import { createTodoItem } from "@root/src/utils";

export const initialState: TodoState = {
  todoList: [],
  error: undefined,
  inputMode: EditMode.Add,
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    updateTodo: (
      state,
      action: PayloadAction<{ partialTodo: Partial<ITodo>; id: TodoID }>
    ) => {
      const index = state.todoList.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.todoList[index] = {
          ...state.todoList[index],
          ...action.payload.partialTodo,
        };
      }
    },
    deleteTodo: (state, action: PayloadAction<TodoID>) => {
      state.todoList = state.todoList.filter(
        (todo: ITodo) => todo.id !== action.payload
      );
    },
    createTodo: (state, action: PayloadAction<string>) => {
      const newTodo = createTodoItem(action.payload);
      state.todoList.push(newTodo);
    },
    changeInputMode: (state, action: PayloadAction<EditMode>) => {
      state.inputMode = action.payload;
    },
  },
});

export const { updateTodo, deleteTodo, createTodo, changeInputMode } =
  todoSlice.actions;
