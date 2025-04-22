import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the trash icon
import Icon from "react-native-vector-icons/FontAwesome6";

function FavoriteScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [showTrashIcons, setShowTrashIcons] = useState(false); // Toggle trash icons visibility

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoriteKey = "favoriteExercises";
        const storedFavorites =
          JSON.parse(await AsyncStorage.getItem(favoriteKey)) || {};
        setFavorites(Object.values(storedFavorites));
      } catch (err) {
        console.error("Error loading favorites:", err);
      }
    };

    const unsubscribe = navigation.addListener("focus", loadFavorites);
    return unsubscribe;
  }, [navigation]);

  const removeFavorite = async (id) => {
    try {
      const favoriteKey = "favoriteExercises";
      const storedFavorites =
        JSON.parse(await AsyncStorage.getItem(favoriteKey)) || {};
      delete storedFavorites[id];
      await AsyncStorage.setItem(favoriteKey, JSON.stringify(storedFavorites));

      // Remove benchPressFavorite if the removed item is BenchPress
      if (id === "barbell bench press") {
        await AsyncStorage.removeItem("benchPressFavorite");
      } else if (id === "assisted chest dip (kneeling)") {
        await AsyncStorage.removeItem("dipFavorite");
      } else if (id === "cable bench press") {
        await AsyncStorage.removeItem("cablebenchFavorite");
      } else if (id === "dumbbell alternate biceps curl") {
        await AsyncStorage.removeItem("bicepcurlFavorite");
      } else if (id === "cable wrist curl") {
        await AsyncStorage.removeItem("cablecurlFavorite");
      } else if (id === "barbell deadlift") {
        await AsyncStorage.removeItem("barbelldeadFavorite");
      }

      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.id !== id)
      ); // Update state to remove the item visually

      // Reset trash icon visibility if no favorites remain
      if (Object.keys(storedFavorites).length === 0) {
        setShowTrashIcons(false);
      }
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {item.name === "barbell bench press" && (
        <Image
          source={require("../assets/image_chest/BenchPress.jpg")} // Add image for barbell bench press
          style={styles.itemImage}
        />
      )}
      {item.name === "assisted chest dip (kneeling)" && (
        <Image
          source={require("../assets/image_chest/Dip.jpg")} // Add image for assisted chest dip
          style={styles.itemImage}
        />
      )}
      {item.name === "cable bench press" && (
        <Image
          source={require("../assets/image_chest/cablebench.png")} // Add image for cable bench press
          style={styles.itemImage}
        />
      )}
      {item.name === "dumbbell alternate biceps curl" && (
        <Image
          source={require("../assets/image_arms/bicepcurl.png")} // Add image for dumbbell alternate biceps curl
          style={styles.itemImage}
        />
      )}
      {item.name === "cable wrist curl" && (
        <Image
          source={require("../assets/image_arms/cablewistcurl.png")} // Add image for cable wrist curl
          style={styles.itemImage}
        />
      )}
      {item.name === "barbell deadlift" && (
        <Image
          source={require("../assets/image_legs/dead.jpg")} // Add image for barbell deadlift
          style={styles.itemImage}
        />
      )}
      <View style={styles.textContainer}>
        <TouchableOpacity
          onPress={() => {
            if (item.name === "barbell bench press") {
              navigation.navigate("BenchPress", { item });
            } else if (item.name === "assisted chest dip (kneeling)") {
              navigation.navigate("Dip", { item });
            } else if (item.name === "cable bench press") {
              navigation.navigate("Cablebench", { item });
            } else if (item.name === "dumbbell alternate biceps curl") {
              navigation.navigate("Bicepcurl", { item });
            } else if (item.name === "cable wrist curl") {
              navigation.navigate("Cablecurl", { item });
            } else if (item.name === "barbell deadlift") {
              navigation.navigate("Barbelldead", { item });
            }
          }}
        >
          <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
      </View>
      {showTrashIcons && (
        <TouchableOpacity
          style={styles.trashIconContainer}
          onPress={() => removeFavorite(item.id)}
        >
          <Ionicons name="trash-sharp" size={24} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.heartIcon}
        onPress={() => navigation.navigate("ButtonTab")}
      >
        <Icon style={styles.icon} name="chevron-left" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.globalTrashIcon}
        onPress={() => setShowTrashIcons((prev) => !prev)} // Toggle trash icons
      >
        <Ionicons
          name={showTrashIcons ? "trash-outline" : "trash-outline"}
          size={28}
          color="gray"
        />
      </TouchableOpacity>
      <Text style={styles.title}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFavoriteItem}
      />
    </View>
  );
}

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 35 : 0,
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    left : 40,
  },
  itemContainer: {
    position: "relative",
    flexDirection: "row", // Align items in a row
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
  },
  globalTrashIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  trashIconContainer: {
    marginLeft: 10,
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 10, // Add spacing between the image and text
  },
  textContainer: {
    flex: 1,
    marginLeft: 20, // Allow text to take remaining space
  },
  icon: {
    color: "black",
    fontSize: 25,
    top: 3,
    left: 5,
    position: "absolute",
  },
});
