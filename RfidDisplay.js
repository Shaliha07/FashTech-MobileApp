// RfidDisplay.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { database } from './firebaseConfig';
import { ref, onValue } from 'firebase/database';

const RfidDisplay = () => {
  const [rfidData, setRfidData] = useState([]);

  useEffect(() => {
    const rfidRef = ref(database, 'rfid-cards/');
    onValue(rfidRef, (snapshot) => {
      const data = snapshot.val();
      const rfidList = data ? Object.values(data) : [];
      setRfidData(rfidList);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanned RFID Tags</Text>
      <FlatList
        data={rfidData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item}</Text>
          </View>
        )}
      />
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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  cardText: {
    fontSize: 18,
  },
});

export default RfidDisplay;
