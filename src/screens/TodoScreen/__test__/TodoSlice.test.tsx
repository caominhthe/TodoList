import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { createTodo, updateTodo, deleteTodo, todoSlice } from "../store";

describe("Todo slice", () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({ reducer: { todos: todoSlice.reducer } });
  });

  it("should add a new todo", () => {
    store.dispatch(createTodo("Do some workout"));
    const state = store.getState().todos;

    expect(state.todoList).toHaveLength(1);
    expect(state.todoList[0].title).toEqual("Do some workout");
  });

  it("should update an existing todo", () => {
    store.dispatch(createTodo("Do some workout"));
    const state = store.getState().todos;

    const todoUpdate = {
      title: "Do some workout and jogging",
      isDone: true,
    };

    store.dispatch(
      updateTodo({
        partialTodo: todoUpdate,
        id: state.todoList[0].id,
      })
    );

    const newState = store.getState().todos;

    expect(newState.todoList[0]).toMatchObject(todoUpdate);
  });

  it("should delete a todo", () => {
    store.dispatch(createTodo("Do some workout"));

    const state = store.getState().todos;

    expect(state.todoList).toHaveLength(1);

    store.dispatch(deleteTodo(state.todoList[0].id));

    const newState = store.getState().todos;

    expect(newState.todoList).toHaveLength(0);
  });
});
