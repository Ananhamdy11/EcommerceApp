import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // استخدمنا expo-linear-gradient
import Icon from "react-native-vector-icons/Feather";
import styles from "./styles";

const Header = ({
  onMenuPress,
  onProfilePress,
  showBackButton = false,
  onBackPress,
}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.headerContent}>
        {/* Left Icon - Menu or Back */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={showBackButton ? onBackPress : onMenuPress}
          activeOpacity={0.7}
        >
          <Icon
            name={showBackButton ? "arrow-left" : "menu"}
            size={24}
            color="#000000"
          />
        </TouchableOpacity>

        {/* Center Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            <LinearGradient
              colors={["#4A90E2", "#E94057", "#8E44AD"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.logoGradient}
            >
              <Icon name="aperture" size={20} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.logoText}>Stylish</Text>
          </View>
        </View>

        {/* Right Profile Button */}
        <TouchableOpacity
          style={styles.profileButton}
          onPress={onProfilePress}
          activeOpacity={0.7}
        >
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
