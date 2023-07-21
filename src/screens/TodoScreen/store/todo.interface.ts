export type TodoID = string;

export enum EditMode {
  Add = "add",
  Edit = "edit",
}

export interface Todo {
  id: TodoID;
  title: string;
  createdAt: number;
}

export interface TodoState {
  todoList: Todo[];
  error?: any;
  inputMode: EditMode;
}
