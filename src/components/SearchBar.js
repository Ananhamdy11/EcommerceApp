import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const SearchBar = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#B0B0B0" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search any Product..."
        placeholderTextColor="#C7C7CD"
        value={value}
        onChangeText={onChange}
      />
      <MaterialIcons
        name="keyboard-voice"
        size={20}
        color="#B0B0B0"
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 44,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
    elevation: 1,
  },
  icon: {
    marginHorizontal: 6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#222",
  },
});

export default SearchBar;
