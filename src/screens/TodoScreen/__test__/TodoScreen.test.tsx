import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";
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
jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

const mockTodo = {
  id: "id",
  title: "test",
  createdAt: "1690031534767",
  isDone: false,
};

describe("Given Todo Screen", () => {
  let store: any;

  it("should render correctly with todo items", () => {
    store = mockStore({
      todo: {
        todoList: [mockTodo],
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
