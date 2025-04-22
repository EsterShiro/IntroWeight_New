import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const NoticeScreen = () => {
  const [notices, setNotices] = useState([
    { id: '1', title: 'ดื่มน้ำก่อนออกกำลังกาย', description: 'อย่าลืมดื่มน้ำ 1 แก้วก่อนเริ่มออกกำลังกาย' },
    { id: '2', title: 'ยืดกล้ามเนื้อ', description: 'ยืดกล้ามเนื้อ 5-10 นาทีเพื่อป้องกันการบาดเจ็บ' },
    { id: '3', title: 'พักผ่อนให้เพียงพอ', description: 'นอนหลับให้ครบ 7-8 ชั่วโมงเพื่อฟื้นฟูร่างกาย' },
  ]);

  const renderNotice = ({ item }) => (
    <TouchableOpacity style={styles.noticeItem}>
      <Text style={styles.noticeTitle}>{item.title}</Text>
      <Text style={styles.noticeDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>การแจ้งเตือนการออกกำลังกาย</Text>
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
    color: '#333',
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
    color: '#7b61ff',
  },
  noticeDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default NoticeScreen;