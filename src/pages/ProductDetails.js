import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { addToCart } from "../redux/slices/cartSlice";

export default function ProductDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const product = route.params?.product;

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  function getStars(rating) {
    if (!rating) return "No rating";
    const rounded = Math.round(rating);
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Product Information */}
        <View style={styles.infoContainer}>
          {/* Category */}
          <Text style={styles.category}>
            {product.category?.toUpperCase() || "PRODUCT"}
          </Text>

          {/* Product Name */}
          <Text style={styles.productName}>{product.title}</Text>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Text style={styles.stars}>{getStars(product.rating?.rate)}</Text>
            <Text style={styles.reviews}>
              {product.rating?.rate?.toFixed(1) || "0.0"} ({product.rating?.count || 0} reviews)
            </Text>
          </View>

          {/* Price */}
          <Text style={styles.price}>${product.price}</Text>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText} numberOfLines={4}>
              {product.description}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <FontAwesome name="shopping-cart" size={20} color="#fff" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    width: "100%",
    height: 280,
    backgroundColor: "#F9F9F9",
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  category: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4A90E2",
    marginBottom: 8,
    letterSpacing: 1,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222222",
    marginBottom: 12,
    lineHeight: 32,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  stars: {
    fontSize: 18,
    color: "#F1C40F",
    marginRight: 8,
  },
  reviews: {
    fontSize: 14,
    color: "#666666",
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4A90E2",
    marginBottom: 24,
  },
  descriptionContainer: {
    marginTop: 8,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222222",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    color: "#666666",
    lineHeight: 24,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  addToCartButton: {
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 10,
  },
  addToCartText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  errorText: {
    fontSize: 16,
    color: "#E94057",
    textAlign: "center",
    marginTop: 50,
  },
});
