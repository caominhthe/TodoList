import { TodoItem } from "@root/src/components";

import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";
import { createTodoItem } from "@root/src/utils";

describe("TodoItem", () => {
  const randomTodo = createTodoItem("test");
  const onPressEvent = jest.fn();
  const onDeleteEvent = jest.fn();
  const onPressCheckBox = jest.fn();

  it("should render correctly", async () => {
    const todo = renderer.create(
      <TodoItem
        todo={randomTodo}
        onPress={onPressEvent}
        onDelete={onDeleteEvent}
        isSelected={false}
        onPressCheckBox={onPressCheckBox}
      />
    );
    const todoJSON = todo.toJSON();
    expect(todoJSON).toMatchSnapshot();
  });

  it("should call action on Press", async () => {
    const { getByTestId } = render(
      <TodoItem
        todo={randomTodo}
        onPress={onPressEvent}
        onDelete={onDeleteEvent}
        isSelected={false}
        onPressCheckBox={onPressCheckBox}
      />
    );
    expect(getByTestId("item-title").props.children).toBe(randomTodo.title);

    const deleteButton = getByTestId("delete-button");
    fireEvent.press(deleteButton);

    expect(onDeleteEvent.mock.calls.length).toBe(1);

    const item = getByTestId("todo-item");
    fireEvent.press(item);
    expect(onPressEvent.mock.calls.length).toBe(1);
  });
});
