import { useEffect } from "react";
import { ActivityIndicator, FlatList, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../redux/slices/productSlice";

export default function Home() {
    const dispatch = useDispatch();
    const{items:products, loading , error } =useSelector((state) => state.products)
     useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if(loading){
    return <ActivityIndicator size={"large"} />
  }
  if (error) {
    return <Text style={styles.error}>Error: {error}</Text>;
  }

  return(
    <FlatList
  data={products}
  renderItem={({ item }) => (
    <ProductCard
      product={item}
    />
  )}
  keyExtractor={(item) => item.id.toString()}
  numColumns={2}
/>

  )

    
};
