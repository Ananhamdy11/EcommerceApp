import { Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function CartBadge() {
  const { carts, currentUserId } = useSelector((state) => state.cart);


  const userCart = carts.find(c => c.userId === currentUserId);
  const count = userCart?.products?.length || 0;  

  
  if (count === 0) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: -5,
        right: -10,
        backgroundColor: "red",
        paddingHorizontal: 5,
        paddingVertical: 1,
        borderRadius: 10,
        minWidth: 18,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
        {count}
      </Text>
    </View>
  );
}
