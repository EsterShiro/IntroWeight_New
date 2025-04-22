import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // นำเข้าไอคอน

export default function GenderScreen({ navigation }) {
  const [selectedGender, setSelectedGender] = useState(null);
  const [showError, setShowError] = useState(false);
  const [blink, setBlink] = useState(false);

  const handleNext = () => {
    if (!selectedGender) {
      setShowError(true); // Show error
      setBlink(true); // Trigger blinking effect
      setTimeout(() => setBlink(false), 500); // Stop blinking after 500ms
    } else {
      setShowError(false); // Hide error
      navigation.navigate('AgeScreen', { selectedGender }); // Pass selected gender to the next screen
    }
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setShowError(false); // Hide error when a gender is selected
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" style={styles.backButtonIcon} />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>
      </View>
      <Text style={styles.title}>What's your Gender?</Text>
      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedGender === 'Male' && styles.selectedButton,
          showError && !selectedGender && blink && styles.blinkingButton,
        ]}
        onPress={() => handleGenderSelect('Male')}
      >
        <Text style={styles.optionText}>Male</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedGender === 'Female' && styles.selectedButton,
          showError && !selectedGender && blink && styles.blinkingButton,
        ]}
        onPress={() => handleGenderSelect('Female')}
      >
        <Text style={styles.optionText}>Female</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedGender === 'Unspecified' && styles.selectedButton,
          showError && !selectedGender && blink && styles.blinkingButton,
        ]}
        onPress={() => handleGenderSelect('Unspecified')}
      >
        <Text style={styles.optionText}>Unspecified</Text>
      </TouchableOpacity>
      {showError && <Text style={styles.errorText}>Please select a gender before proceeding.</Text>}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
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
    backgroundColor: 'rgba(0, 0, 0, 0)', // Make it transparent
  },
  backButtonIcon: {
    marginRight: 15, // เพิ่มระยะห่างระหว่างปุ่มย้อนกลับกับ ProgressBar
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    width: '33%',
    height: '100%',
    backgroundColor: 'green',
  },
  title: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 80,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  blinkingButton: {
    backgroundColor: 'rgba(253, 65, 65, 0.34)', // สีแดงโปร่งๆ
  },
  optionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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