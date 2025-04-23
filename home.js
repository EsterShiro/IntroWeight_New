import React, { useState, useRef, useMemo, memo, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Animated, 
  Platform, 
  BackHandler, 
  Alert, 
  ToastAndroid, 
  AppState,
  Linking, // ใช้สำหรับเปิดลิงก์
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import Icon from "react-native-vector-icons/Ionicons";

const image = require("./assets/RB-remove.png");
const openUrl = (url) => {
  Linking.openURL(url);
};
const workoutImages = [
  require("./assets/adultmember1.jpg"),
  require("./assets/chestmuscle.jpg"),
  require("./assets/armmuscle.jpg"),
  require("./assets/legmuscle.jpg"),
  require("./assets/backmuscle.jpg"),
  require("./assets/abs.jpg"),
  require("./assets/fullbody.jpg"),
];

const workoutTitles = [
  "Beginner \n Workout",
  "Chest Muscle \n Workout",
  "Arm Muscle \n Workout",
  "Leg Muscle \n Workout",
  "Back Muscle \n Workout",
  "Abs Muscle \n Workout",
  "Full Body \n Weight",
];

const filters = ["All", "Chest", "Arm", "Leg", "Back", "Abs"];

const WorkoutItem = memo(({ item, onPress }) => {
  return (
    <View style={styles.workoutItem}>
      <Image source={item.image} style={styles.workoutImage} cache="cache" />
      <Text style={styles.workoutTitle}>{item.title}</Text>
      <TouchableOpacity style={styles.startButton} onPress={onPress}>
        <Text style={styles.startButtonText}>Start Workout</Text>
      </TouchableOpacity>
    </View>
  );
});

function HomeComponent({ navigation }) {
  const images = [
    require("./assets/Protein.png"),
    require("./assets/creatine.jpg"),
    require("./assets/Steroid.jpg"),
    require("./assets/india.jpg"),
    require("./assets/werewolf-muscle.gif"),
  ];
  const [selectedFilter, setSelectedFilter] = useState("All");
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = 0;
  const scrollViewRef = useRef(null);
  const [exitApp, setExitApp] = useState(false); // สถานะสำหรับตรวจสอบการกดปุ่ม Back
  const appState = useRef(AppState.currentState); // ใช้ AppState เพื่อตรวจสอบสถานะของแอป

  // ป้องกันการย้อนกลับด้วย BackHandler
  useEffect(() => {
    const backAction = () => {
      if (exitApp) {
        BackHandler.exitApp(); // ออกจากแอป
      } else {
        setExitApp(true); // ตั้งสถานะว่ากด Back ครั้งแรก
        ToastAndroid.show("กดอีกครั้งเพื่อออกจากแอป", ToastAndroid.SHORT); // แสดงข้อความอักษรลอย

        // รีเซ็ตสถานะหลังจาก 2 วินาที
        setTimeout(() => {
          setExitApp(false); // รีเซ็ตสถานะ
        }, 2000);
      }
      return true; // ป้องกันการย้อนกลับ
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // ลบ listener เมื่อ component ถูก unmount
  }, [exitApp]);

  // ตรวจสอบสถานะของแอปด้วย AppState
  // useEffect(() => {
  //   const handleAppStateChange = (nextAppState) => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === "active"
  //     ) {
  //       // รีเซ็ต navigation stack ไปที่หน้า HomeScreen เมื่อแอปถูกเปิดใหม่
  //       navigation.reset({
  //         index: 0,
  //         routes: [{ name: "HomeScreen" }],
  //       });
  //     }
  //     appState.current = nextAppState;
  //   };

  //   const subscription = AppState.addEventListener(
  //     "change",
  //     handleAppStateChange
  //   );

  //   return () => subscription.remove(); // ลบ listener เมื่อ component ถูก unmount
  // }, [navigation]);

  const handleFilterPress = (filter) => {
    setSelectedFilter(filter);
    if (filter === "All") {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    } else {
      const index = filteredWorkouts.findIndex(
        (item) => item.category.toLowerCase() === filter.toLowerCase()
      );
      if (index !== -1 && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: index * 250, animated: true });
      }
    }
  };

  const filteredWorkouts = useMemo(() => {
    return workoutImages.map((image, index) => ({
      image,
      title: workoutTitles[index],
      category: filters[index % filters.length],
    }));
  }, [workoutImages, workoutTitles, filters]);

  const handleStartWorkout = (title) => {
    if (title.includes("Beginner")) {
      navigation.navigate("Beginner");
    }
  };

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: "clamp",
  });

  

  return (
    <View style={styles.screen}>
      <TouchableOpacity
        style={styles.heartIcon}
        onPress={() => navigation.navigate("Favorite")}
      >
        <Icon name="heart-sharp" size={40} color="red" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>
          openUrl("https://s.shopee.co.th/2B1lQcVKx2")
        }>
      
        <Image style={styles.image} source={image} />
      </TouchableOpacity>
      <Animated.View style={{ transform: [{ translateY: headerTranslateY }] }}>
        <SliderBox
          images={images}
          sliderBoxHeight={200}
          dotColor="gray"
          inactiveDotColor="honeydew"
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
          ImageComponentStyle={styles.sliderImage}
        />
        <Text style={styles.text}>Workout Program</Text>
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
        <View style={{ paddingTop: headerHeight, paddingBottom: 400 }}>
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

export default memo(HomeComponent);

const styles = StyleSheet.create({
  screen: {
    marginTop: Platform.OS === "android" ? 35 : 0,
    backgroundColor: "white",
    opacity: 0.97,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 15,
    zIndex: 10,
  },
  image: {
    marginTop: 10,
    marginLeft: 10,
    width: 100,
    height: 50,
  },
  icons: {
    color: "tomato",
    position: "absolute",
    marginTop: 14,
    marginLeft: 310,
  },
  sliderImage: {
    borderRadius: 20,
    width: "96%",
    alignSelf: "center",
  },
  text: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  filterContainer: {
    paddingVertical: 10,
    marginTop: 10,
  },
  filterButton: {
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  selectedFilterButton: {
    backgroundColor: "royalblue",
  },
  filterText: {
    fontSize: 16,
    color: "#333",
  },
  selectedFilterText: {
    color: "white",
  },
  workoutItem: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  workoutImage: {
    width: "100%",
    height: 229,
    borderRadius: 20,
  },
  workoutTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    position: "absolute",
    marginLeft: 30,
    marginTop: 30,
    color: "white",
  },
  startButton: {
    backgroundColor: "white",
    paddingBottom: 7,
    paddingTop: 7,
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 12,
    alignItems: "center",
    position: "absolute",
    marginTop: 165,
    marginLeft: 30,
    elevation: 5,
  },
  startButtonText: {
    color: "Black",
    fontSize: 14,
    fontWeight: "bold",
  },
});
