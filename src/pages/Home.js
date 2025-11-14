import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../redux/slices/productSlice";
import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar"; // استدعاء SearchBar

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  // State للبحث
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // فلترة المنتجات حسب البحث
  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const handleMenuPress = () => {
    console.log("Menu pressed");
  };

  const handleProfilePress = () => {
    console.log("Profile pressed");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header
          onMenuPress={handleMenuPress}
          onProfilePress={handleProfilePress}
        />
        <View style={styles.centered}>
          <ActivityIndicator size={"large"} color="#E94057" />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header
          onMenuPress={handleMenuPress}
          onProfilePress={handleProfilePress}
        />
        <View style={styles.centered}>
          <Text style={styles.error}>Error: {error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        onMenuPress={handleMenuPress}
        onProfilePress={handleProfilePress}
      />
      {/* SearchBar */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Products List */}
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text>No products found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "#E94057",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingTop: 12,
    paddingBottom: 20,
  },
});
