import { Todo } from '../types';

export function createTodo(content: string) {
  const todo: Todo = {
    id: String(Date.now()),
    title: content,
    createdAt: Date.now(),
  };
  return todo;
}
