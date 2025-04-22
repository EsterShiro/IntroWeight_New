import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";

function BeginnerGuideScreen({ navigation }) {
  const basicExercises = [
    { name: "Chest", description: "บริหารกล้ามเนื้อส่วนหน้าอก" }, // Replace with your image path
    { name: "Arm", description: "บริหารกล้ามเนื้อส่วนแขน" }, // Replace with your image path
    { name: "Back", description: "บริหารกล้ามเนื้อส้วนหลัง" }, // Replace with your image path
    { name: "Leg", description: "บริหารกล้ามส่วนขา" }, // Replace with your image path
    { name: "Abs", description: "บริหารกล้ามเนื้อส่วนหน้าท้อง" }, // Replace with your image path
  ];

  return (
    <ScrollView style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("ButtonTab")}>
          <Icon
            style={styles.icon}
            name="chevron-left"
            size={20}
            color="#000000"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>คู่มือสำหรับผู้เริ่มต้น Weight Training</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ทำความเข้าใจเบื้องต้น</Text>
        <Text style={styles.paragraph}>
          Weight training คือการฝึกความแข็งแรงของกล้ามเนื้อโดยใช้น้ำหนักต่างๆ
          เช่น ดัมเบล บาร์เบล หรือเครื่องออกกำลังกาย...
        </Text>
        <Text style={styles.paragraph}>
          ประโยชน์ของการฝึก Weight Training มีมากมาย เช่น
          เพิ่มความแข็งแรงของกล้ามเนื้อและกระดูก, เผาผลาญแคลอรี่,
          และช่วยให้รูปร่างดีขึ้น...
        </Text>
        <Text style={styles.paragraph}>
          ข้อควรระวัง: ควรปรึกษาแพทย์ก่อนเริ่มโปรแกรมการฝึกใหม่ๆ
          และวอร์มอัพทุกครั้งก่อนออกกำลังกาย...
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ส่วนหลักๆในการเล่นเวท</Text>
        {basicExercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseItem}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseDescription}>
              {exercise.description}
            </Text>
            {/* You can add an Image component here to display the image */}
            {/* <Image source={exercise.image} style={styles.exerciseImage} /> */}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>หลักการฝึกเบื้องต้น</Text>
        <Text style={styles.paragraph}>
          จำนวนเซ็ต: เริ่มต้นที่ 2-3 เซ็ตต่อท่า
        </Text>
        <Text style={styles.paragraph}>
          จำนวนครั้ง (Reps): 8-12 ครั้งต่อเซ็ต
        </Text>
        <Text style={styles.paragraph}>
          ความถี่: ฝึก 2-3 วันต่อสัปดาห์ โดยมีวันพักระหว่างวันฝึก
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>คำแนะนำด้านความปลอดภัย</Text>
        <Text style={styles.paragraph}>
          วอร์มอัพร่างกายประมาณ 5-10 นาทีก่อนเริ่มฝึก และคูลดาวน์หลังฝึก
        </Text>
        <Text style={styles.paragraph}>
          ให้ความสำคัญกับฟอร์มที่ถูกต้องเพื่อป้องกันการบาดเจ็บ หากไม่แน่ใจ
          ควรศึกษาจากแหล่งที่น่าเชื่อถือ
        </Text>
        <Text style={styles.paragraph}>
          ฟังร่างกายตัวเอง หากรู้สึกเจ็บปวด ให้หยุดพักทันที
        </Text>
        <Text style={styles.paragraph}>
          พักผ่อนให้เพียงพอเพื่อให้กล้ามเนื้อฟื้นตัว
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>เริ่มต้นกันเลย!</Text>
        <Text style={styles.paragraph}>
          การเริ่มต้นอาจจะดูท้าทาย แต่ความสม่ำเสมอคือกุญแจสำคัญ
          ขอให้สนุกกับการฝึกของคุณ!
        </Text>
      </View>

      {/* Add the Next button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate("Beginners")} // Replace "NextScreen" with your target screen
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default BeginnerGuideScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 35 : 0,
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  exerciseItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  exerciseName: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5,
  },
  exerciseDescription: {
    fontSize: 15,
    color: "#555",
  },
  exerciseImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginTop: 10,
  },
  icon: {
    color: "black",
    fontSize: 25,
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: 30, // Increased vertical margin for more spacing
  },
  nextButton: {
    backgroundColor: "#007BFF",
    paddingTop: 30,
    paddingLeft: 155, 
    paddingRight: 155,
    paddingBottom: 30,
    borderRadius: 5,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
