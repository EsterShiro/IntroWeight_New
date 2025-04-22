import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import CheckBox from 'expo-checkbox';

export default function HomeScreen({ navigation }) {
  const [isSelected, setSelection] = React.useState(false);

  return (
    <ImageBackground
      source={require('../assets/im4.jpg')} // เพิ่มรูปพื้นหลัง
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Weight Training</Text>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (isSelected) {
                navigation.navigate('GenderScreen');
              } else {
                alert('Please agree to the terms and conditions before proceeding.');
              }
            }}
          >
            <Text style={styles.buttonText}>Get started</Text>
          </TouchableOpacity>

          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />
            <Text style={styles.label}>I have read and agreed to the terms and conditions</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // ปรับให้รูปครอบคลุมพื้นที่ทั้งหมด
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // เพิ่มความโปร่งใสให้พื้นหลัง
    paddingVertical: 50,
  },
  title: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 50,
  },
  bottomContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    color: 'white',
  },
});