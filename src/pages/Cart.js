import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from "../redux/slices/cartSlice";

export default function CartScreen() {
  const dispatch = useDispatch();
  
  // اضافه
  const { carts, currentUserId } = useSelector(state => state.cart);
  const userCart = carts.find(c => c.userId === currentUserId);
  const cart = userCart?.products || []; // اضافه

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => dispatch(decreaseQuantity(item.id))}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{item.quantity}</Text>
          
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => dispatch(increaseQuantity(item.id))}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <Text style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => dispatch(removeFromCart(item.id))}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={cart} 
        renderItem={renderItem} 
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
            <Text style={styles.emptyCartSubtext}>Add some products to get started!</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
      
      {cart.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Price:</Text>
            <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => dispatch(clearCart())}
          >
            <Text style={styles.clearButtonText}>Clear Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
 
  userInfoText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  listContent: {
    padding: 10,
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: "contain",
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F83758",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#F83758",
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  rightSection: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  removeButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#F83758",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removeButtonText: {
    color: "#F83758",
    fontSize: 12,
    fontWeight: "600",
  },
  emptyCart: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyCartText: {
    fontSize: 18,
    color: "#999",
    fontWeight: "600",
  },
  
  emptyCartSubtext: {
    fontSize: 14,
    color: "#bbb",
    marginTop: 8,
  },
  footer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F83758",
  },
  clearButton: {
    backgroundColor: "#F83758",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});