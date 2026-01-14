import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const SponsoredCard = ({ backgroundImage }) => {
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.sponsoredLabel}>Sponsored</Text>

      <TouchableOpacity activeOpacity={0.95} style={styles.cardContainer}>
        <View style={styles.card}>
          {backgroundImage ? (
            <ImageBackground
              source={{ uri: backgroundImage }}
              style={styles.imageBackground}
              resizeMode="cover"
            >
              <View style={styles.imageOverlay} />

              <ContentLayer pulseAnim={pulseAnim} />
            </ImageBackground>
          ) : (
            <LinearGradient
              colors={["#78350f", "#c2410c", "#451a03"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBackground}
            >
              <View style={styles.bokehContainer}>
                <View style={[styles.bokehCircle, styles.bokeh1]} />
                <View style={[styles.bokehCircle, styles.bokeh2]} />
                <View style={[styles.bokehCircle, styles.bokeh3]} />
              </View>

              <View style={styles.darkOverlay} />

              <ContentLayer pulseAnim={pulseAnim} />
            </LinearGradient>
          )}

          <View style={styles.bottomSection}>
            <View style={styles.bottomContent}>
              <View>
                <Text style={styles.bottomTitle}>up to 50% Off</Text>
                <Text style={styles.bottomSubtitle}>Premium Collection</Text>
              </View>
              <View style={styles.arrowButton}>
                <Text style={styles.arrowIcon}>›</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.ctaContainer}>
          <LinearGradient
            colors={["#f97316", "#dc2626"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaButton}
          >
            <Text style={styles.ctaText}>Shop Now</Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ContentLayer = ({ pulseAnim }) => (
  <>
    <View style={styles.badgeContainer}>
      <View style={styles.badge}>
        <View style={styles.tagIcon} />
        <Text style={styles.badgeText}>LIMITED OFFER</Text>
      </View>
    </View>

    <View style={styles.pulseContainer}>
      <Animated.View
        style={[styles.pulseOuter, { transform: [{ scale: pulseAnim }] }]}
      />
      <View style={styles.pulseInner} />
    </View>

    <View style={styles.contentContainer}>
      <View style={styles.decorativeRow}>
        <View style={styles.line} />
        <Text style={styles.upToText}>UP TO</Text>
        <View style={styles.line} />
      </View>

      <Text style={styles.discountText}>50% OFF</Text>

      <View style={styles.productContainer}>
        <View style={styles.shoeShowcase}>
          <View style={styles.shoesRow}>
            <View style={styles.shoeWrapper}>
              <LinearGradient
                colors={["#b45309", "#78350f"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.shoe, styles.shoeLeft]}
              >
                <View style={[styles.shoeDetail, styles.shoeTop]} />
                <View style={[styles.shoeDetail, styles.shoeSole]} />
                <View style={[styles.shoeLace, { left: 12 }]} />
                <View style={[styles.shoeLace, { left: 20 }]} />
                <View style={[styles.shoeLace, { left: 28 }]} />
              </LinearGradient>
            </View>

            <View style={styles.shoeWrapper}>
              <LinearGradient
                colors={["#0284c7", "#1e40af"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.shoe, styles.shoeRight]}
              >
                <View style={[styles.shoeDetail, styles.shoeTopBlue]} />
                <View style={[styles.shoeDetail, styles.shoeSole]} />
                <View style={[styles.shoeLaceBlue, { left: 12 }]} />
                <View style={[styles.shoeLaceBlue, { left: 20 }]} />
                <View style={[styles.shoeLaceBlue, { left: 28 }]} />
              </LinearGradient>
            </View>
          </View>
        </View>
      </View>
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  sponsoredLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 8,
  },
  cardContainer: {
    width: "100%",
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  imageBackground: {
    height: 280,
    width: "100%",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  gradientBackground: {
    height: 280,
    position: "relative",
  },
  bokehContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
  },
  bokehCircle: {
    position: "absolute",
    borderRadius: 1000,
  },
  bokeh1: {
    top: 40,
    left: 40,
    width: 120,
    height: 120,
    backgroundColor: "#fb923c",
    opacity: 0.6,
  },
  bokeh2: {
    bottom: 40,
    right: 40,
    width: 150,
    height: 150,
    backgroundColor: "#fbbf24",
    opacity: 0.5,
  },
  bokeh3: {
    top: "50%",
    left: "33%",
    width: 90,
    height: 90,
    backgroundColor: "#fde047",
    opacity: 0.4,
  },
  darkOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  badgeContainer: {
    position: "absolute",
    top: 24,
    left: 24,
    zIndex: 10,
  },
  badge: {
    backgroundColor: "#dc2626",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  tagIcon: {
    width: 10,
    height: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    marginRight: 6,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  pulseContainer: {
    position: "absolute",
    top: 24,
    right: 24,
    zIndex: 10,
    width: 12,
    height: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  pulseOuter: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ef4444",
    opacity: 0.6,
  },
  pulseInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#dc2626",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    zIndex: 5,
  },
  decorativeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  line: {
    width: 48,
    height: 2,
    backgroundColor: "#FFFFFF",
  },
  upToText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 2,
    marginHorizontal: 12,
  },
  discountText: {
    fontSize: 56,
    fontWeight: "900",
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
    marginBottom: 24,
  },
  productContainer: {
    width: "100%",
    alignItems: "center",
  },
  shoeShowcase: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  shoesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  shoeWrapper: {
    position: "relative",
  },
  shoe: {
    width: 90,
    height: 75,
    borderRadius: 8,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  shoeLeft: {
    transform: [{ rotate: "-12deg" }],
  },
  shoeRight: {
    transform: [{ rotate: "6deg" }],
  },
  shoeDetail: {
    position: "absolute",
  },
  shoeTop: {
    top: 8,
    left: 8,
    width: 60,
    height: 8,
    backgroundColor: "#78350f",
    borderRadius: 20,
  },
  shoeTopBlue: {
    top: 8,
    left: 8,
    width: 60,
    height: 8,
    backgroundColor: "#1e40af",
    borderRadius: 20,
  },
  shoeSole: {
    bottom: 8,
    left: 8,
    right: 8,
    height: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  shoeLace: {
    position: "absolute",
    top: 16,
    width: 4,
    height: 32,
    backgroundColor: "#b45309",
  },
  shoeLaceBlue: {
    position: "absolute",
    top: 16,
    width: 4,
    height: 32,
    backgroundColor: "#0ea5e9",
  },
  bottomSection: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bottomContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  bottomSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowIcon: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  ctaContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  ctaButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});

export default SponsoredCard;
c;
