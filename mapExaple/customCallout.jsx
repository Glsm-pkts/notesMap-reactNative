import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { CloseCircle } from 'iconsax-react-native';

const CustomCallout = ({ marker, updateNote }) => {
  const [note, setNote] = useState(marker.note);
  
  

  return (
    <View style={styles.calloutContainer}>
      
      <Text style={styles.title}>Konum Bilgisi</Text>
      <TextInput 

        style={styles.input}
        placeholder="Not ekleyin..."
        value={note}
        onChangeText={(text) => {
          setNote(text);
          updateNote(marker.id, text);
        }}
      />
    </View>
  );
};

export default CustomCallout;

const styles = StyleSheet.create({
  calloutContainer: {
    width: 200,
    height: 100,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 14,
    paddingVertical: 5,
  },
});
