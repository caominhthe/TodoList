import React from 'react';
import { Text } from 'react-native';
import { TodoInputGroup } from '@root/src/components';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';

describe('TodoInputGroup', () => {
  const onChangeText = jest.fn();
  const onSubmit = jest.fn();

  const button: React.ReactElement = <Text />;
  const tree = renderer.create(
    <TodoInputGroup
      value="test"
      onPressButton={onSubmit}
      onChangeText={onChangeText}
      button={button}
    />,
  );

  it('should render correctly', async () => {
    const treeJSON = tree.toJSON();
    expect(treeJSON).toMatchSnapshot();
  });

  it('has correct values', async () => {
    const { getByTestId } = render(
      <TodoInputGroup
        value="test"
        onPressButton={onSubmit}
        onChangeText={onChangeText}
        button={button}
      />,
    );
    const submitButton = getByTestId('submit-button');
    fireEvent.press(submitButton);
    expect(onSubmit).toBeCalled();
  });
});
