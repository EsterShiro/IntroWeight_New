import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const SettingScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('ไทย');
  const [gender, setGender] = useState('ไม่ระบุ');
  const [age, setAge] = useState('ไม่ระบุ');
  const [birthday, setBirthday] = useState('ไม่ระบุ');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const changeLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'ไทย' ? 'English' : 'ไทย'));
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>หน้าโปรไฟล์</Text>
      <TouchableOpacity onPress={pickImage}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.profileImage} />
        ) : (
          <View style={[styles.imagePlaceholder, isDarkMode ? styles.darkBorder : styles.lightBorder]}>
            <Text style={isDarkMode ? styles.darkText : styles.lightText}>เพิ่มรูป</Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.settingsContainer}>
        <View style={styles.settingItem}>
          <Text style={isDarkMode ? styles.darkText : styles.lightText}>เปลี่ยนภาษา: {language}</Text>
          <Button title="เปลี่ยนภาษา" onPress={changeLanguage} />
        </View>
        <View style={styles.settingItem}>
          <Text style={isDarkMode ? styles.darkText : styles.lightText}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </View>
        <View style={styles.settingItem}>
          <Text style={isDarkMode ? styles.darkText : styles.lightText}>เพศ: {gender}</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={isDarkMode ? styles.darkText : styles.lightText}>อายุ: {age}</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={isDarkMode ? styles.darkText : styles.lightText}>วันเกิด: {birthday}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lightText: {
    color: '#000000',
  },
  darkText: {
    color: '#ffffff',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
  },
  lightBorder: {
    borderColor: '#000000',
  },
  darkBorder: {
    borderColor: '#ffffff',
  },
  settingsContainer: {
    width: '100%',
    marginTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default SettingScreen;