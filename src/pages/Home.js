import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../redux/slices/productSlice";
import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar";
import SponsoredCard from "../components/SponsoredCard";

// ---------------------------
// Base64 Gradient Background
// ---------------------------
const bgGradient = {
  uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wCEAAkGBxISEhUTEhIVFRUXGBcYGBgYFxcXGBcYFxUXFxcYFxUYHSggGBolHRUWITEiJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKMBNwMBIgACEQEDEQH/xAAbAAADAQEBAQEAAAAAAAAAAAAABQYBAwQCB//EADkQAAIBAwIDBgQFAwQDAQAAAAECAwAEEQUSITEGEyJBUWEUMnGBkaEUQlKCscHR4fAzQ1NicuHx/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECBAMFBv/EACIRAQEAAgICAwEBAAAAAAAAAAABAhEDIRIxBBNBUWFxIv/aAAwDAQACEQMRAD8A",
};

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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

  const renderItem = ({ item, index }) => {
    if (index === 2) {
      return (
        <>
          <View style={styles.sponsoredContainer}>
            <SponsoredCard />
          </View>
          <ProductCard product={item} />
        </>
      );
    }
    return <ProductCard product={item} />;
  };

  if (loading) {
    return (
      <ImageBackground source={bgGradient} style={styles.bg}>
        <Header />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#E94057" />
        </View>
      </ImageBackground>
    );
  }

  if (error) {
    return (
      <ImageBackground source={bgGradient} style={styles.bg}>
        <Header />
        <View style={styles.centered}>
          <Text style={styles.error}>Error: {error}</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={bgGradient} style={styles.bg}>
      <Header />

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <Text style={styles.sectionTitle}>Featured Products</Text>

      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text>No products found</Text>
          </View>
        }
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#FFF",
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    marginLeft: 14,
    marginTop: 10,
    marginBottom: 6,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  sponsoredContainer: {
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 14,
  },
});
