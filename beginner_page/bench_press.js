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

function BenchPressScreen({ navigation }) {
  const [benchPressData, setBenchPressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // Initialize as false

  useEffect(() => {
    const loadFavoriteState = async () => {
      try {
        const favoriteState = await AsyncStorage.getItem("benchPressFavorite");
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
      await AsyncStorage.setItem(
        "benchPressFavorite",
        JSON.stringify(newFavoriteState)
      );
    } catch (err) {
      console.error("Error saving favorite state:", err);
    }
  };

  useEffect(() => {
    const getBenchPressExercise = async () => {
      const now = Date.now();
      const cacheKey = "barbellBenchPressData";
      const cacheTimeKey = "barbellBenchPressLastFetchTime";

      try {
        const cachedData = await AsyncStorage.getItem(cacheKey);
        const cachedTime = await AsyncStorage.getItem(cacheTimeKey);

        if (
          cachedData &&
          cachedTime &&
          now - parseInt(cachedTime) < CACHE_DURATION
        ) {
          setBenchPressData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        setLoading(true);
        const data = await fetchExercises("chest");
        const benchPressExercise = data.find((exercise) =>
          exercise.name.toLowerCase().includes("barbell bench press")
        );

        if (benchPressExercise) {
          await AsyncStorage.setItem(
            cacheKey,
            JSON.stringify(benchPressExercise)
          );
          await AsyncStorage.setItem(cacheTimeKey, now.toString());
          setBenchPressData(benchPressExercise);
        } else {
          setError(new Error("ไม่พบข้อมูล Barbell Bench Press"));
        }
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching bench press exercise:", err);
      }
    };

    getBenchPressExercise();
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

  if (!benchPressData) {
    return <Text>ไม่พบข้อมูล Barbell Bench Press</Text>;
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
          Linking.openURL("https://www.youtube.com/watch?v=4Y2ZdHCOXok")
        }
      >
        <Text style={styles.title}>{benchPressData.name}</Text>
      </TouchableOpacity>
      {benchPressData.gifUrl && (
        <View style={styles.gifContainer}>
          <WebView
            source={{ uri: benchPressData.gifUrl }}
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
            บาร์เบล, ม้านั่งยกน้ำหนัก, แร็ค หรือ เสายกน้ำหนัก
          </Text>
        </View>

        <View style={styles.box2}>
          <Text style={styles.detailTitle}>กลุ่มกล้ามเนื้อเป้าหมาย:</Text>
          <Text style={styles.detailText}>กล้ามเนื้อส่วนอกกลาง</Text>
        </View>

        <View style={styles.box3}>
          <Text style={styles.detailTitle}>
            กลุ่มกล้ามเนื้อเป้าหมายส่วนรอง:
          </Text>
          <Text style={styles.detailText}>
            กล้ามเนื้อ อกส่วนบน, กล้ามเนื้อไหล่ส่วนหน้า, กล้ามเนื้อหลังแขน
          </Text>
        </View>

        <View style={styles.box4}>
          <Text style={styles.detailTitle}>ระดับความยาก: ง่าย</Text>
        </View>

        <View style={styles.box5}>
          <Text style={styles.detailTitle}>วิธีการปฏิบัติ:</Text>

          <Text style={styles.detailText}>
            1. นอนหงายบนม้านั่งยกน้ำหนัก โดยให้เท้าวางราบบนพื้น{"\n"}
            2. จับบาร์เบลให้กว้างกว่าช่วงไหล่เล็กน้อย{"\n"}
            3. ยกบาร์เบลขึ้นจากแร็คและยืดแขนให้ตรง{"\n"}
            4. หายใจเข้าและค่อยๆ ลดบาร์เบลลงไปที่หน้าอก
            โดยให้ข้อศอกอยู่ในแนวเดียวกับลำตัว{"\n"}
            5. หายใจออกและดันบาร์เบลกลับขึ้นไปที่ตำแหน่งเริ่มต้น{"\n"}
            6. ทำซ้ำตามจำนวนครั้งที่กำหนด{"\n"}
          </Text>
        </View>

        <View style={styles.box6}>
          <Text style={styles.detailTitle}>ข้อควรระวัง:</Text>

          <Text style={styles.detailText}>
            1. ควรมีผู้ช่วยยกน้ำหนักในกรณีที่ยกน้ำหนักมาก{"\n"}
            2. ควรใช้ฟอร์มที่ถูกต้องเพื่อป้องกันการบาดเจ็บ{"\n"}
            3. หลีกเลี่ยงการยกน้ำหนักมากเกินไปในช่วงเริ่มต้น{"\n"}
            4. ควรมีการวอร์มอัพก่อนการฝึก{"\n"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
export default BenchPressScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 35 : 0,
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingText: {
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
    backgroundColor: "#f0f0f0",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  box2: {
    backgroundColor: "#f0f0f0",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  box3: {
    backgroundColor: "#f0f0f0",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  box4: {
    backgroundColor: "#f0f0f0",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  box5: {
    backgroundColor: "#f0f0f0",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  box6: {
    backgroundColor: "#f0f0f0",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginBottom: 10,
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
