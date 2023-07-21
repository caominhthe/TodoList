import { render } from "@testing-library/react-native";
import * as ReactRedux from "react-redux";
import { TodoScreen } from "../TodoScreen";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
const mockNavigate = jest.fn();
const baseProps = {
  route: {},
  navigation: {
    navigate: mockNavigate,
  },
} as any;

describe("Given Todo Screen", () => {
  let store: any;

  it("should render correctly with todo items", () => {
    store = mockStore({
      todo: {
        todoList: {
          id: {
            id: "id",
            title: "test",
            createdAt: Date.now(),
          },
        },
      },
    });
    const { toJSON } = render(
      <ReactRedux.Provider store={store as any}>
        <TodoScreen {...baseProps} />
      </ReactRedux.Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
