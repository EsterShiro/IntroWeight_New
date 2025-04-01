import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';

const BeginnerChest = () => {
  const [gifUrl, setGifUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBenchPressGif = async () => {
      setLoading(true);
      try {
        // ตรวจสอบข้อมูล GIF ที่แคชไว้
        const cachedGif = await AsyncStorage.getItem('benchPressGif');
        if (cachedGif) {
          setGifUrl(cachedGif);
          setLoading(false);
          return;
        }

        // หากไม่มีข้อมูลแคช เรียก API ด้วย fetch
        const response = await fetch(
          'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back?limit=10&offset=0',
          {
            headers: {
              'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY', // แทนที่ด้วยคีย์ API ของคุณ
              'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.length > 0) {
          const newGifUrl = data[0].gifUrl;
          setGifUrl(newGifUrl);
          // แคชข้อมูล GIF
          await AsyncStorage.setItem('benchPressGif', newGifUrl);
        } else {
          setError('ไม่พบข้อมูล bench press');
        }
      } catch (err) {
        setError('เกิดข้อผิดพลาดในการดึงข้อมูล');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBenchPressGif();
  }, []);

  if (loading) {
    return <Text>กำลังโหลด...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!gifUrl) {
    return <Text>ไม่พบภาพ GIF</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <WebView
        source={{ uri: gifUrl }}
        style={styles.gif}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  gif: {
    width: 300,
    height: 200,
  },
});

export default BeginnerChest;