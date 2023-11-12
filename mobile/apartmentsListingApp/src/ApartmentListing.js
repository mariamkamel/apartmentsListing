import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { BACKEND_URL } from '@env';

const ApartmentListing = ({ navigation }) => {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL? BACKEND_URL:  "http://192.168.1.109:3001" }/apartments`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        setApartments(data);
      })
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ApartmentDetails', { id: item._id })}
      style={{ padding: 16, borderBottomWidth: 1, borderColor: '#ccc' }}
    >
      <Text>{item.name}</Text>
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={apartments}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
};

export default ApartmentListing;
