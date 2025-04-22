import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const TimerScreen = () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [lastLapTime, setLastLapTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setMilliseconds((prevMilliseconds) => prevMilliseconds + 10);

        // อัปเดตเวลาของรอบล่าสุดให้เดินไปพร้อมกับเวลาหลัก
        setLaps((prevLaps) => {
          if (prevLaps.length > 0) {
            const updatedLaps = [...prevLaps];
            const lastLapIndex = updatedLaps.length - 1;
            updatedLaps[lastLapIndex] = {
              ...updatedLaps[lastLapIndex],
              lapTime: milliseconds - lastLapTime + 10, // เพิ่ม 10ms
              totalTime: milliseconds + 10, // เพิ่ม 10ms
            };
            return updatedLaps;
          }
          return prevLaps;
        });
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, milliseconds, lastLapTime]);

  const handleStartStop = () => {
    if (!isRunning) {
      // เพิ่มรอบแรกเมื่อเริ่มจับเวลา
      if (laps.length === 0) {
        setLaps([{ lap: 1, lapTime: 0, totalTime: 0 }]);
      }
    }
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMilliseconds(0);
    setLaps([]);
    setLastLapTime(0);
  };

  const handleLap = () => {
    const lapTime = milliseconds - lastLapTime; // เวลาของรอบปัจจุบัน
    setLaps((prevLaps) => [
      ...prevLaps,
      { lap: prevLaps.length + 1, lapTime, totalTime: milliseconds },
    ]);
    setLastLapTime(milliseconds); // อัปเดตเวลาของรอบล่าสุด
  };

  const formatTime = (totalMilliseconds) => {
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const millis = totalMilliseconds % 1000;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(millis).padStart(3, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(milliseconds)}</Text>
      <FlatList
        data={laps}
        keyExtractor={(item) => item.lap.toString()}
        renderItem={({ item }) => (
          <View style={styles.lapRow}>
            <Text style={styles.lapColumn}>{item.lap}</Text>
            <Text style={styles.lapColumn}>{formatTime(item.lapTime)}</Text>
            <Text style={styles.lapColumn}>{formatTime(item.totalTime)}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.lapRow}>
            <Text style={[styles.lapColumn, styles.headerText]}>รอบ</Text>
            <Text style={[styles.lapColumn, styles.headerText]}>เวลารอบ</Text>
            <Text style={[styles.lapColumn, styles.headerText]}>เวลารวม</Text>
          </View>
        )}
        style={styles.lapList}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.circleButton,
            { backgroundColor: isRunning ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 255, 0, 0.3)' },
          ]}
          onPress={handleStartStop}
        >
          <Text style={styles.buttonText}>{isRunning ? 'หยุด' : 'เริ่ม'}</Text>
        </TouchableOpacity>
        {isRunning ? (
          <TouchableOpacity style={[styles.circleButton, styles.lapButton]} onPress={handleLap}>
            <Text style={styles.buttonText}>รอบ</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.circleButton,
              styles.lapButton,
              { backgroundColor: 'rgba(128, 128, 128, 0.3)' },
            ]}
            onPress={handleReset}
          >
            <Text style={styles.buttonText}>รีเซ็ต</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  timerText: {
    fontSize: 48,
    marginBottom: 20,
    textAlign: 'center',
  },
  lapList: {
    width: '100%',
    maxHeight: '40%',
    marginBottom: 20,
  },
  lapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  lapColumn: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  circleButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: 'rgba(128, 128, 128, 0.3)',
  },
  lapButton: {
    marginLeft: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TimerScreen;