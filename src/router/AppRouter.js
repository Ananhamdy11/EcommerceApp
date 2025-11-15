import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./MainStack";
import { persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator, View } from "react-native";


export default function AppRouter() {
  return (
    <NavigationContainer>
      
      <PersistGate
        loading={
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#E94057" />
          </View>
        }
        persistor={persistor}
      >
        <MainStack />
      </PersistGate>
    </NavigationContainer>
  );
}
