// index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { database } from './firebaseconfig'; // Import the database you initialized in firebaseConfig.js
import { ref, onValue } from 'firebase/database';

const IndexScreen = () => {
  const [rfidData, setRfidData] = useState<{ uid: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch RFID data from Firebase on component mount
  useEffect(() => {
    const rfidRef = ref(database, 'rfid-cards');
    
    // Listen for changes in the Firebase Realtime Database
    onValue(rfidRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // Convert the Firebase data structure into an array of objects for easier rendering
        const formattedData = Object.keys(data).map((key) => ({
          uid: data[key],
        }));
        setRfidData(formattedData);
      }

      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>RFID UID Data</Text>
      {rfidData.length > 0 ? (
        <FlatList
          data={rfidData}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>UID: {item.uid}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No RFID data available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IndexScreen;