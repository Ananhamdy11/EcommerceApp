import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppRouter from "./src/router/AppRouter";
import { Provider } from "react-redux";
import store from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}
