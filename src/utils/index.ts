import { Todo } from "../screens";

export function createTodoItem(content: string) {
  const todo: Todo = {
    id: String(Date.now()),
    title: content,
    createdAt: Date.now(),
    isDone: false,
  };
  return todo;
}
