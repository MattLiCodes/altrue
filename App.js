import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileFormScreen from "./screens/ProfileFormScreen";
import MainScreen from "./screens/MainScreen";
import AddBlockScreen from "./screens/AddBlockScreen";
import MatchScreen from "./screens/MatchScreen";
import CompareScreen from "./screens/CompareScreen";
import SearchScreen from "./screens/SearchScreen";
import SelectScreen from "./screens/SelectScreen";
import EditBlockScreen from "./screens/EditBlockScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="ProfileFormScreen" component={ProfileFormScreen} />
        <Stack.Screen name="AddBlockScreen" component={AddBlockScreen} />
        <Stack.Screen name="EditBlockScreen" component={EditBlockScreen} />
        <Stack.Screen name="MatchScreen" component={MatchScreen} />
        <Stack.Screen name="CompareScreen" component={CompareScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="SelectScreen" component={SelectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
