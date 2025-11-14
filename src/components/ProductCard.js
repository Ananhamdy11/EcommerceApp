import { FontAwesome } from "@expo/vector-icons";
import { Button, Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useDispatch } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import {addToCart}from'../redux/slices/cartSlice'
export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  }

  function getStars(rating) {
    if (!rating) return "No rating";
    const rounded = Math.round(rating);

    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
  }


  return (
    <TouchableOpacity style={styles.card} >
      <Image
        source={{ uri: product.image }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>

          {product.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        <Text style={styles.price}>${product.price}</Text>
        <View style={styles.rating}>
          <Text style={styles.rate}>{getStars(product.rating?.rate)}</Text>
          <Text style={styles.count}>{product.rating?.count || 0} reviews</Text>
        </View>


        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <FontAwesome name="shopping-cart" size={16} color="#fff" style={{ marginRight: 10 }} />
          <Text style={styles.buttonText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

// Card Styling
const styles = StyleSheet.create({
  card: {
    width:150,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    margin: 8,
    flex: 1,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    backgroundColor: "#f9f9f9",
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: "grey",
    marginBottom: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 6,
  },
  rating: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rate: {
    color: "#f1c40f",
    fontWeight: "bold",
  },
  count: {
    color: "#888",
    fontSize: 12,
  },
  noRating: {
    color: "#888",
    fontSize: 12,
    marginBottom: 8,
  },
  button: {
    flexDirection: "row",
    justifyContent: 'center',
    backgroundColor: "#000",
    paddingVertical: 6,
    color: "white",
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
