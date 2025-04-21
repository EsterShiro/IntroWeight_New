import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome6";
import { fetchExercises } from "../api/exerciseDb"; // Import fetchExercises (assuming it exists)

const FavoriteScreen = () => {
    const [favoriteExerciseIds, setFavoriteExerciseIds] = useState([]);
    const [favoriteExercises, setFavoriteExercises] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
      loadFavoriteItems();
  }, []);
  
  useEffect(() => {
      const fetchFavoriteExercises = async () => {
          console.log("favoriteExerciseIds:", favoriteExerciseIds); // <--- เพิ่มตรงนี้
          if (favoriteExerciseIds.length > 0) {
              const allExercises = await fetchExercises();
              console.log("allExercises:", allExercises); // <--- เพิ่มตรงนี้
              const filteredExercises = allExercises.filter(exercise =>
                  favoriteExerciseIds.includes(exercise.id)
              );
              console.log("filteredExercises:", filteredExercises); // <--- เพิ่มตรงนี้
              setFavoriteExercises(filteredExercises);
          } else {
              setFavoriteExercises([]);
          }
      };
  
      fetchFavoriteExercises();
  }, [favoriteExerciseIds]);
  
  const loadFavoriteItems = async () => {
      try {
          const favorites = JSON.parse(await AsyncStorage.getItem("favorites")) || [];
          console.log("favorites from AsyncStorage:", favorites); // <--- เพิ่มตรงนี้
          setFavoriteExerciseIds(favorites);
      } catch (error) {
          console.error("Error loading favorites:", error);
      }
  };
  
  const renderItem = ({ item }) => (
      <TouchableOpacity
          style={styles.box}
          onPress={() => console.log("Pressed:", item.name)} // ลองเปลี่ยนเป็น console.log ก่อน
      >
          <Text style={styles.text}>{item.name}</Text>
          <TouchableOpacity
              style={styles.trashIcon}
              onPress={() => handleRemoveFavorite(item.id)}
          >
              <Icon name="trash" size={24} color="red" />
          </TouchableOpacity>
      </TouchableOpacity>
  );

    return (
        <View style={styles.container}>
            {favoriteExercises.length === 0 ? (
                <Text>ไม่มีท่าออกกำลังกายที่ถูกใจควย</Text>
            ) : (
                <FlatList
                    data={favoriteExercises}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
};

export const saveFavoriteItem = async (key) => {
    try {
        const favorites = JSON.parse(await AsyncStorage.getItem("favorites")) || [];
        if (!favorites.includes(key)) {
            favorites.push(key);
            await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
        }
    } catch (error) {
        console.error("Error saving favorite:", error);
    }
};

export const removeFavoriteItem = async (key) => {
    try {
        const favorites = JSON.parse(await AsyncStorage.getItem("favorites")) || [];
        const updatedFavorites = favorites.filter((item) => item !== key);
        await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
        console.error("Error removing favorite:", error);
    }
};

export const loadFavoriteItems = async () => {
    try {
        return JSON.parse(await AsyncStorage.getItem("favorites")) || [];
    } catch (error) {
        console.error("Error loading favorites:", error);
        return [];
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    box: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
    },
    trashIcon: {
        padding: 5,
    },

});

export default FavoriteScreen;