import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import ButtonTab from './buttonTab';

const BegginerScreen = () => {
  return (
    <View style={styles.container}>
      <Text>หน้า Begginer</Text>
      <Text>หน้านี้จะเป็นหน้าที่แสดงการออกกำลังกายสำหรับผู้ที่เริ่มต้น</Text>
      
        
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default BegginerScreen;