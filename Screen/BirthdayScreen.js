import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons'; // นำเข้าไอคอน

export default function BirthdayScreen({ navigation }) {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [blink, setBlink] = useState(false);

  const handleNext = () => {
    if (!day) {
      setErrorMessage('Select a day');
      triggerBlink();
    } else if (!month) {
      setErrorMessage('Select a month');
      triggerBlink();
    } else if (!year) {
      setErrorMessage('Select a year');
      triggerBlink();
    } else {
      setShowError(false);
      setErrorMessage('');
      navigation.navigate('ButtonTab'); // Navigate to the next screen
    }
  };

  const triggerBlink = () => {
    setShowError(true);
    setBlink(true);
    setTimeout(() => setBlink(false), 500); // Stop blinking after 500ms
  };

  const handleValueChange = (type, value) => {
    if (type === 'day') setDay(value);
    if (type === 'month') setMonth(value);
    if (type === 'year') setYear(value);

    // ซ่อนข้อความแจ้งเตือนเมื่อเลือกค่าที่ถูกต้อง
    if (value) {
      setShowError(false);
      setErrorMessage('');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/im1.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('AgeScreen')}>
            <Ionicons name="arrow-back" size={24} color="white" style={styles.backButtonIcon} />
          </TouchableOpacity>
          <View style={styles.progressBar}>
            <View style={styles.progress} />
          </View>
        </View>
        <Text style={styles.title}>When is your birthday?</Text>
        <Text style={styles.subtitle}>Select your birthday</Text>
        <View
          style={[
            styles.pickerContainer,
            showError && blink && styles.blinkingContainer, // Add blinking effect
          ]}
        >
          <Picker
            selectedValue={day}
            style={styles.picker}
            onValueChange={(itemValue) => handleValueChange('day', itemValue)}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Day" value="" />
            {[...Array(31).keys()].map((d) => (
              <Picker.Item key={d} label={`${d + 1}`.padStart(2, '0')} value={`${d + 1}`.padStart(2, '0')} />
            ))}
          </Picker>
          <Picker
            selectedValue={month}
            style={styles.picker}
            onValueChange={(itemValue) => handleValueChange('month', itemValue)}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Month" value="" />
            {[...Array(12).keys()].map((m) => (
              <Picker.Item key={m} label={`${m + 1}`.padStart(2, '0')} value={`${m + 1}`.padStart(2, '0')} />
            ))}
          </Picker>
          <Picker
            selectedValue={year}
            style={styles.picker}
            onValueChange={(itemValue) => handleValueChange('year', itemValue)}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Year" value="" />
            {[...Array(126).keys()].map((y) => (
              <Picker.Item key={y} label={`${1900 + y}`} value={`${1900 + y}`} />
            ))}
          </Picker>
        </View>
        {showError && <Text style={styles.errorText}>{errorMessage}</Text>}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // เพิ่มความโปร่งใสเพื่อให้เห็นพื้นหลัง
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 40,
    backgroundColor: 'rgba(0, 0, 0, 0)', // ทำให้โปร่งใส
  },
  backButtonIcon: {
    marginRight: 10,
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // สีขาวโปร่งๆ
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    width: '100%',
    height: '100%',
    backgroundColor: 'green',
  },
  title: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 80,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '120%', // ลดความกว้างของกรอบ
    marginBottom: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    padding: 13,
  },
  blinkingContainer: {
    borderColor: 'rgba(253, 48, 48, 0.8)', // สีแดงโปร่งๆ
    borderWidth: 2,
  },
  picker: {
    flex: 1, // ใช้ flex เพื่อให้ขนาดปรับอัตโนมัติ
    height: 50,
    color: 'white',
    marginHorizontal: 5, // เพิ่มระยะห่างระหว่าง Picker
  },
  pickerItem: {
    color: 'white',
    fontSize: 18,
  },
  nextButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 25,
    marginTop: 30,
    width: '80%',
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  },
});