import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const NoticeScreen = () => {
  const [notices, setNotices] = useState([
    { id: '1', title: 'ประกาศที่ 1', description: 'รายละเอียดของประกาศที่ 1' },
    { id: '2', title: 'ประกาศที่ 2', description: 'รายละเอียดของประกาศที่ 2' },
    { id: '3', title: 'ประกาศที่ 3', description: 'รายละเอียดของประกาศที่ 3' },
  ]);

  const renderNotice = ({ item }) => (
    <View style={styles.noticeItem}>
      <Text style={styles.noticeTitle}>{item.title}</Text>
      <Text style={styles.noticeDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>หน้า Notice</Text>
      <FlatList
        data={notices}
        renderItem={renderNotice}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 16,
  },
  noticeItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noticeDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default NoticeScreen;