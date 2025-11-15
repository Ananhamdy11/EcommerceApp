import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Feather";

const bgGradient = {
  uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wCEAAkGBxISEhUTEhIVFRUXGBcYGBgYFxcXGBcYFxUXFxcYFxUYHSggGBolHRUWITEiJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKMBNwMBIgACEQEDEQH/xAAbAAADAQEBAQEAAAAAAAAAAAAABQYBAwQCB//EADkQAAIBAwIDBgQFAwQDAQAAAAECAwAEEQUSITEGEyJBUWEUMnGBkaEUQlKxwdHR4fAzQ1NicuHx/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECBAMFBv/EACIRAQEAAgICAwEBAAAAAAAAAAABAhEDIRIxBBNBUWFxIv/aAAwDAQACEQMRAD8A",
};

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "please fill fields");
      return;
    }

    setLoading(true);
    try {
      const resultAction = await dispatch(
        login({ username, password })
      );

      if (login.fulfilled.match(resultAction)) {
        
      } else {
        Alert.alert("Error", "failed");
      }
    } catch (error) {
      Alert.alert("error", "something wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={bgGradient} style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={["#4A90E2", "#E94057", "#8E44AD"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.logoGradient}
          >
            <Icon name="aperture" size={40} color="#FFFFFF" />
          </LinearGradient>
          <Text style={styles.logoText}>Stylish</Text>
          <Text style={styles.subtitle}>Welcome Back!</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            <LinearGradient
              colors={["#E94057", "#F83758"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loginGradient}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 55,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  loginButton: {
    marginTop: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  loginGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  demoContainer: {
    marginTop: 30,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  accountBox: {
    backgroundColor: "#F0F8FF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#4A90E2",
  },
  accountTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  demoText: {
    fontSize: 13,
    color: "#666",
    marginVertical: 2,
  },
  nameText: {
    fontSize: 12,
    color: "#888",
    fontStyle: "italic",
    marginTop: 4,
  },
});