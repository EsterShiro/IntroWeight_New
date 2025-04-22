import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

const activities = [
  
  
];

const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Calendar</Text>

      {/* Calendar */}
      <Text style={styles.sectionTitle}>Add Activity</Text>
      <Calendar
        style={styles.calendar}
        onDayPress={(day) => {
          console.log('Selected day', day);
        }}
        markedDates={{
          '2023-01-11': { selected: true, marked: true, selectedColor: '#6200EE' },
        }}
      />

      {/* Added Activities */}
      <Text style={styles.sectionTitle}>Added Activity</Text>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.activityCard}>
            <Image source={{ uri: item.image }} style={styles.activityImage} />
            <View>
              <Text style={styles.activityTitle}>{item.title}</Text>
              <Text style={styles.activityDetails}>{item.details}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  calendar: {
    borderRadius: 10,
    elevation: 2,
    marginBottom: 16,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    elevation: 2,
  },
  activityImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityDetails: {
    fontSize: 14,
    color: '#666',
  },
});

export default CalendarScreen;