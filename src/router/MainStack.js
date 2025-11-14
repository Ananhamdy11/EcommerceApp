import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";
import LoginScreen from "../pages/LoginScreen";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";
import CartBadge from "../components/CartBadge";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
         options={({ navigation }) => ({
    title: "Hello Anan",
    headerRight: () => (
      <View style={{ marginRight: 15 }}>
        <View>
          <FontAwesome
            name="shopping-cart"
            size={28}
            color="#000"
            onPress={() => navigation.navigate("Cart")}
          />

          <CartBadge/>
        </View>
      </View>
    ),
  })}
      />

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
}
