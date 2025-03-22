import React from 'react';
import {Platform, View, StyleSheet} from 'react-native';
import ButtomTab from './buttonTab'
import GetStarted from './getstarted'

const app = () => {

  return (
    <View style ={styles.container}>
      
        
        <GetStarted/>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop: Platform.OS === 'android' ? 35 : 0,
    backgroundColor:'white',
    opacity: 0.97,
    
  }

});

export default app;