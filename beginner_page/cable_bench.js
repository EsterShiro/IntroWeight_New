import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { WebView } from "react-native-webview";
import { fetchExercises } from "../api/exerciseDb";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome6";
import Icon2 from "react-native-vector-icons/Ionicons"; // Ensure FontAwesome 6 is imported

const CACHE_DURATION = 5 * 60 * 1000; // Cache duration: 5 minutes

function CablebenchScreen({ navigation }) {
  const [cablebenchData, setcablebenchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // Initialize as false

  useEffect(() => {
    const loadFavoriteState = async () => {
      try {
        const favoriteState = await AsyncStorage.getItem("cablebenchFavorite");
        if (favoriteState !== null) {
          setIsFavorite(JSON.parse(favoriteState));
        }
      } catch (err) {
        console.error("Error loading favorite state:", err);
      }
    };

    loadFavoriteState();
  }, []);

  const toggleFavorite = async () => {
    try {
      const newFavoriteState = !isFavorite;
      setIsFavorite(newFavoriteState);

      const favoriteKey = "favoriteExercises";
      const cablebenchKey = "cable bench press";

      const existingFavorites =
        JSON.parse(await AsyncStorage.getItem(favoriteKey)) || {};

      if (newFavoriteState) {
        existingFavorites[cablebenchKey] = {
          id: cablebenchKey,
          name: 'cable bench press',
        };
      } else {
        delete existingFavorites[cablebenchKey];
      }

      await AsyncStorage.setItem(
        favoriteKey,
        JSON.stringify(existingFavorites)
      );
      await AsyncStorage.setItem(
        "cablebenchFavorite",
        JSON.stringify(newFavoriteState)
      );
    } catch (err) {
      console.error("Error updating favorite state:", err);
    }
  };

  useEffect(() => {
    const getcablebenchExercise = async () => {
      const now = Date.now();
      const cacheKey = "cablebenchData";
      const cacheTimeKey = "cablebenchLastFetchTime";

      try {
        const cachedData = await AsyncStorage.getItem(cacheKey);
        const cachedTime = await AsyncStorage.getItem(cacheTimeKey);

        if (
          cachedData &&
          cachedTime &&
          now - parseInt(cachedTime) < CACHE_DURATION
        ) {
          setcablebenchData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        setLoading(true);
        const data = await AsyncStorage.getItem("exerciseDbCache");
        let exercises;

        if (data) {
          exercises = JSON.parse(data);
        } else {
          exercises = await fetchExercises("chest");
          await AsyncStorage.setItem(
            "exerciseDbCache",
            JSON.stringify(exercises)
          );
        }

        const cablebenchExercise = exercises.find((exercise) =>
          exercise.name.toLowerCase().includes("cable bench press")
        );

        if (cablebenchExercise) {
          await AsyncStorage.setItem(
            cacheKey,
            JSON.stringify(cablebenchExercise)
          );
          await AsyncStorage.setItem(cacheTimeKey, now.toString());
          setcablebenchData(cablebenchExercise);
        } else {
          const fallbackData = {
            equipment: "cable",
            gifUrl: "https://v2.exercisedb.io/image/UVLES-FVT05gbs",
            name: "cable bench press",
          };
          await AsyncStorage.setItem(cacheKey, JSON.stringify(fallbackData));
          await AsyncStorage.setItem(cacheTimeKey, now.toString());
          setcablebenchData(fallbackData);
        }
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching cablebench exercise:", err);
      }
    };

    getcablebenchExercise();
  }, []);

  if (loading) {
    return <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>;
  }

  if (error) {
    return (
      <Text style={styles.errorText}>
        เกิดข้อผิดพลาดในการโหลดข้อมูล: {error.message}
      </Text>
    );
  }

  if (!cablebenchData) {
    return <Text>ไม่พบข้อมูล cablebench</Text>;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("Beginners")}
      >
        <Icon style={styles.icon} name="chevron-left" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer2} onPress={toggleFavorite}>
        <Icon2
          style={styles.icon2}
          name={isFavorite ? "heart-sharp" : "heart-outline"} // เปลี่ยนชื่อไอคอนตามสถานะ
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          Linking.openURL("https://www.youtube.com/shorts/N_dJChcrxgQ")
        }
      >
        <Text style={styles.title}>{cablebenchData.name}</Text>
      </TouchableOpacity>
      {cablebenchData.gifUrl && (
        <View style={styles.gifContainer}>
          <WebView
            source={{ uri: cablebenchData.gifUrl }}
            style={{ width: 300, height: 300 }}
            javaScriptEnabled={true}
            scrollEnabled={false}
          />
        </View>
      )}
      <View style={styles.detailsContainer}>
        <View style={styles.box1}>
          <Text style={styles.detailTitle}>อุปกรณ์ที่ใช้:</Text>
          <Text style={styles.detailText}>
            Cable Crossover Machine, ม้านั่ง
          </Text>
        </View>

        <View style={styles.box2}>
          <Text style={styles.detailTitle}>กลุ่มกล้ามเนื้อเป้าหมาย:</Text>
          <Text style={styles.detailText}>หน้าอกส่วนกลาง</Text>
        </View>

        <View style={styles.box3}>
          <Text style={styles.detailTitle}>
            กลุ่มกล้ามเนื้อเป้าหมายส่วนรอง:
          </Text>
          <Text style={styles.detailText}>
              หน้าอกส่วนบน/ล่าง, ไหล่ด้านหน้า, หลังแขน
          </Text>
        </View>

        <View style={styles.box4}>
          <Text style={styles.detailTitle}>ระดับความยาก: ปานกลาง</Text>
        </View>

        <View style={styles.box5}>
          <Text style={styles.detailTitle}>วิธีการปฏิบัติ:</Text>

          <Text style={styles.detailText}>
            1. ปรับระดับม้านั่งให้เหมาะสมกับความสูงของผู้ใช้{"\n"}
            2. นอนบนม้านั่ง เท้าแตะพื้น มือกุมมือจับเหนืออกเล็กน้อย แขนงอเล็กน้อย{"\n"}
            3. ดันมือจับเข้าหากันเหนือหน้าอก โดยบีบกล้ามเนื้อหน้าอก{"\n"}
            4. ค่อยๆ คลายมือจับกลับสู่ท่าเริ่มต้น ควบคุมตลอดการเคลื่อนไหว{"\n"}
            5. ทำซ้ำตามจำนวนครั้งที่กำหนด{"\n"}
          </Text>
        </View>

        <View style={styles.box6}>
          <Text style={styles.detailTitle}>ข้อควรระวัง:</Text>

          <Text style={styles.detailText}>
            1. ควรปรับระดับม้านั่งให้เหมาะสมกับความสูงของผู้ใช้{"\n"}
            2. ควรควบคุมการเคลื่อนไหวให้ช้าและมั่นคง{"\n"}
            3. หลีกเลี่ยงการยกน้ำหนักมากเกินไป{"\n"}
            4. หากรู้สึกเจ็บหรือไม่สบาย ให้หยุดทำทันที{"\n"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
export default CablebenchScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 35 : 0,
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  loadingText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  },
  errorText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    color: "red",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 60,
    marginLeft: 100,
    marginBottom: 10,
    position: "absolute",
  },
  gifContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    marginTop: 100,
  },
  detailsContainer: {
    marginTop: 10,
  },
  box1: {
    backgroundColor: "#ffffff",
    marginHorizontal: 10,
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    borderLeftWidth: 5, // เพิ่มเส้นสีด้านซ้าย
    borderLeftColor: "#457b9d",
  },
  box2: {
    backgroundColor: "#ffffff",
    marginHorizontal: 10,
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    borderLeftWidth: 5, // เพิ่มเส้นสีด้านซ้าย
    borderLeftColor: "#36759F",
  },
  box3: {
    backgroundColor: "#ffffff",
    marginHorizontal: 10,
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    borderLeftWidth: 5, // เพิ่มเส้นสีด้านซ้าย
    borderLeftColor: "#31739F",
  },
  box4: {
    backgroundColor: "#ffffff",
    marginHorizontal: 10,
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    borderLeftWidth: 5, // เพิ่มเส้นสีด้านซ้าย
    borderLeftColor: "#1F6C9F",
  },
  box5: {
    backgroundColor: "#ffffff",
    marginHorizontal: 10,
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    borderLeftWidth: 5, // เพิ่มเส้นสีด้านซ้าย
    borderLeftColor: "#176AA1",
  },
  box6: {
    backgroundColor: "#ffffff",
    marginHorizontal: 10,
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    borderLeftWidth: 5, // เพิ่มเส้นสีด้านซ้าย
    borderLeftColor: "#F72525",
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10,
  },
  precautionText: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10,
    color: "orange",
  },
  iconContainer: {
    position: "absolute",
    top: 30,
    left: 20,
  },
  iconContainer2: {
    position: "absolute",
    top: 26,
    right: 20,
  },
  icon: {
    color: "black",
    fontSize: 25,
  },
  icon2: {
    color: "red",
    fontSize: 35,
  },
});
