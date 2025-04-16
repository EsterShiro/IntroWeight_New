// screens/BenchPressScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { WebView } from "react-native-webview"; // Import WebView for animated GIFs
import { fetchExercises } from "../../api/exerciseDb";

const CACHE_DURATION = 5 * 60 * 1000; // Cache duration: 5 minutes

const BenchPressScreen = () => {
  const [benchPressExercises, setBenchPressExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  useEffect(() => {
    const getBenchPressExercises = async () => {
      const now = Date.now();

      // Check if cached data is still valid
      if (lastFetchTime && now - lastFetchTime < CACHE_DURATION) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchExercises("chest"); // Fetch exercises for "chest"
        // Filter exercises related to Bench Press
        const benchPressData = data.filter((exercise) =>
          exercise.name.toLowerCase().includes("chest dip")
        );
        setBenchPressExercises(benchPressData);
        setLastFetchTime(now); // Update the last fetch time
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching bench press exercises:", err);
      }
    };

    getBenchPressExercises();
  }, [lastFetchTime]); // Re-run effect if `lastFetchTime` changes

  if (loading) {
    return <Text>กำลังโหลดข้อมูล...</Text>;
  }

  if (error) {
    return <Text>เกิดข้อผิดพลาดในการโหลดข้อมูล: {error.message}</Text>;
  }

  return (
    <View>
      <Text>ท่า Bench Press</Text>
      <FlatList
        data={benchPressExercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            {/* Display GIF using WebView if available */}
            {item.gifUrl && (
              <WebView
                source={{ uri: item.gifUrl }}
                style={{ width: 200, height: 200 }}
                javaScriptEnabled={true}
                scrollEnabled={false}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default BenchPressScreen;
