import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // นำเข้าไอคอน

export default function AgeScreen({ navigation }) {
  const [selectedAge, setSelectedAge] = useState(null);
  const [showError, setShowError] = useState(false);
  const [blink, setBlink] = useState(false);

  const handleNext = () => {
    if (!selectedAge) {
      setShowError(true); // Show error
      setBlink(true); // Trigger blinking effect
      setTimeout(() => setBlink(false), 500); // Stop blinking after 500ms
    } else {
      setShowError(false); // Hide error
      navigation.navigate('BirthdayScreen', { selectedAge }); // Pass selected age to the next screen
    }
  };

  const handleAgeSelect = (age) => {
    setSelectedAge(age);
    setShowError(false); // Hide error when an age is selected
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('GenderScreen')}>
          <Ionicons name="arrow-back" size={24} color="white" style={styles.backButtonIcon} />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>
      </View>
      <Text style={styles.title}>How old are you?</Text>
      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedAge === 'Under 18' && styles.selectedButton,
          showError && !selectedAge && blink && styles.blinkingButton,
        ]}
        onPress={() => handleAgeSelect('Under 18')}
      >
        <Text style={styles.optionText}>Under 18</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedAge === '18-24' && styles.selectedButton,
          showError && !selectedAge && blink && styles.blinkingButton,
        ]}
        onPress={() => handleAgeSelect('18-24')}
      >
        <Text style={styles.optionText}>18-24</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedAge === '25-34' && styles.selectedButton,
          showError && !selectedAge && blink && styles.blinkingButton,
        ]}
        onPress={() => handleAgeSelect('25-34')}
      >
        <Text style={styles.optionText}>25-34</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedAge === '35-44' && styles.selectedButton,
          showError && !selectedAge && blink && styles.blinkingButton,
        ]}
        onPress={() => handleAgeSelect('35-44')}
      >
        <Text style={styles.optionText}>35-44</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedAge === '45+' && styles.selectedButton,
          showError && !selectedAge && blink && styles.blinkingButton,
        ]}
        onPress={() => handleAgeSelect('45+')}
      >
        <Text style={styles.optionText}>45+</Text>
      </TouchableOpacity>
      {showError && <Text style={styles.errorText}>Please select an age group before proceeding.</Text>}
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
    marginRight: 10,
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    width: '66%',
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
    backgroundColor: 'rgba(253, 48, 48, 0.4)', // สีแดงโปร่งๆ
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