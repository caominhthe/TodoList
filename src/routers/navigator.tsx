import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "./types";
import ScreenNames from "./Routes";
import { TodoScreen } from "@screens";
import { useAppState } from "@hooks";

const Navigator = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenNames.Todo}
        component={TodoScreen}
        options={{ title: "Todo Items" }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
