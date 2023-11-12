import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { BACKEND_URL } from '@env';

const ApartmentDetails = ({ route }) => {
  const { id } = route.params;
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL ? BACKEND_URL : "http://192.168.1.109:3001"}/apartments/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        setApartment(data);
      })
      .catch(error => console.error('Error fetching apartment details:', error))
      .finally(() => setLoading(false)); 
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!apartment) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Apartment not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{apartment.name}</Text>
      <Text style={styles.description}>Description: {apartment.description}</Text>
      <Text style={styles.price}>Price: ${apartment.price}</Text>
      <Text style={styles.location}>Location: {apartment.location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    marginBottom: 8,
  },
  location: {
    fontSize: 18,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default ApartmentDetails;
