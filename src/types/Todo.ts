export type TodoID = string;

export type EditMode = 'add' | 'edit';

export interface Todo {
  id: TodoID;
  title: string;
  createdAt: number;
}

export interface TodoState {
  todoList: Record<TodoID, Todo>;
  isLoading: boolean;
  error?: any;
  inputMode: EditMode;
}
