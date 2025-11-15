import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Home from "../pages/Home";
import LoginScreen from "../pages/LoginScreen";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import { FontAwesome } from "@expo/vector-icons";
import { View, TouchableOpacity, Text } from "react-native";
import CartBadge from "../components/CartBadge";
import { logout } from "../redux/slices/authSlice";
import { setCurrentUser } from "../redux/slices/cartSlice";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const dispatch = useDispatch();
  const { isAuthenticated, name, userId } = useSelector((state) => state.auth); 

  useEffect(() => {
    if (userId) {
      dispatch(setCurrentUser(userId));
    }
  }, [userId, dispatch]);

  const handleLogout = (navigation) => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  if (!isAuthenticated) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: `Hello ${name || "User"}`, 
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center", marginRight: 15 }}>
              
              <TouchableOpacity
                onPress={() => handleLogout(navigation)}
                style={{
                  marginRight: 20,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  backgroundColor: "#F83758",
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600", fontSize: 12 }}>
                  Logout
                </Text>
              </TouchableOpacity>

              <View>
                <FontAwesome
                  name="shopping-cart"
                  size={28}
                  color="#000"
                  onPress={() => navigation.navigate("Cart")}
                />
                <CartBadge />
              </View>
            </View>
          ),
        })}
      />





      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
}


