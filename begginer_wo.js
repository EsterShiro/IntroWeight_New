import React, { useState, useRef, memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome6";

const workoutImages = [
  require('./assets/im4.jpg'),
  require('./assets/arm_bg.jpg'),
  require('./assets/leg_bg.jpg'),
  require('./assets/im2.jpg'),
];

const workoutTitles = ["Chest Muscle", "Arm Muscle", "Back Muscle","Leg Muscle"];
const workoutTitles2 = ["Weight", "Weight", "Weight", "Weight"];

const filters = ["All", "Chest", "Arm", "Back", "Leg"];

const WorkoutItem = memo(({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.workoutItem} activeOpacity={1}>
      <Image source={item.image} style={styles.workoutImage} cache="cache" />
      <Text style={styles.workoutTitle}>{item.title}</Text>
      <Text style={styles.workoutTitle2}>{item.title2}</Text>
    </TouchableOpacity>
  );
});

function BegginerScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = 0;
  const scrollViewRef = useRef(null);

  const handleFilterPress = (filter) => {
    setSelectedFilter(filter);
    if (filter === "All") {
      scrollViewRef.current.scrollTo({ y: 0, animated: true }); // เลื่อนไปด้านบนสุดเมื่อเลือก "All"
    } else {
      const index = filteredWorkouts.findIndex(
        (item) => item.category.toLowerCase() === filter.toLowerCase()
      );
      if (index !== -1 && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: index * 250, animated: true }); // เลื่อนไปยังรายการที่ตรงกับตัวกรอง
      }
    }
  };
  const filteredWorkouts = workoutImages.map((image, index) => ({
    image,
    title: workoutTitles[index],
    title2: workoutTitles2[index],
    category: workoutTitles[index].split(' ')[0], // แยกคำแรกจาก title เพื่อใช้เป็น category
  }));

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY: headerTranslateY }] }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("ButtonTab")}>
            <Icon style={styles.icon} name="chevron-left" size={20} color="#000000" />
          </TouchableOpacity>
        </View>

        <View style={styles.Textcontainer}>
          <Text style={styles.title}>Full Body Weight</Text>

          <View>
            <Text style={styles.title2}>With Beginner</Text>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.selectedFilterButton,
              ]}
              onPress={() => handleFilterPress(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.selectedFilterText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  )}
>
      <View style={{ paddingTop: headerHeight, paddingBottom: 200 }}>
          {filteredWorkouts.map((item, index) => (
          <WorkoutItem
            key={index}
            item={item}
            onPress={() => handleStartWorkout(item.title)}
      />
    ))}
      </View>
</ScrollView>
    </View>
  );
}
export default memo(BegginerScreen);

const styles = StyleSheet.create({
  container: {},
  Textcontainer: {
    marginTop: 20,
    marginLeft: 50, // ปรับระยะห่างจากขอบซ้าย
  },
  title: {
    color: "rgb(171, 171, 171 )",
    fontSize: 28, // ปรับขนาดตัวอักษร
    fontWeight: "bold",
  },
  title2: {
    fontSize: 28, // ปรับขนาดตัวอักษร
    fontWeight: "bold",
  },
  icon: {
    color: "black",
    fontSize: 25,
    top: 50,
    left: 20,
  },
  filterContainer: {
    paddingVertical: 10,
    marginTop: 10,
    marginLeft: 20, // ปรับระยะห่างจากขอบซ้าย
  },
  filterButton: {
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 15,
    paddingVertical: 13,
    paddingHorizontal: 25, // ปรับขนาด padding
    marginHorizontal: 5,
  },
  selectedFilterButton: {
    backgroundColor: "rgb(45, 138, 244)",
  },
  filterText: {
    fontSize: 16,
    color: "rgb(137,130, 130)",
  },
  selectedFilterText: {
    color: "white",
  },
  workoutImage: {
    width: "90%", // ปรับขนาดรูปภาพ
    height: 220, // ปรับขนาดรูปภาพ
    borderRadius: 20,
    marginVertical: 10,
    alignSelf: "center", // จัดให้อยู่กึ่งกลาง
  },
  workoutTitle: {
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    marginLeft: 30,
    marginTop: 30,
    color: "white",
  },
  workoutTitle2: {
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    marginLeft: 55,
    marginTop: 60, // ปรับตำแหน่ง title2
    color: "rgb(171, 171, 171 )",
  },
  workoutItem: {
    marginBottom: 20,
  },
});