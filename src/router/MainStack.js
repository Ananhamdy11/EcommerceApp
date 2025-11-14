import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";
import LoginScreen from "../pages/LoginScreen";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
      />
    </Stack.Navigator>
  );
}
