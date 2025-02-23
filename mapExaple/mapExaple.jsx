import { StyleSheet, TouchableOpacity, View, Image, Alert } from 'react-native';
import React, { useState, useRef } from 'react';
import MapView, { Callout, Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import CustomMarker from './customMarker';
import CustomCallout from './customCallout';
import { Map1 } from 'iconsax-react-native';
import { MapTypes } from './constants';

const MapExample = () => {
  const [markers, setMarkers] = useState([]);
  const [mapType, setMapType] = useState(MapTypes.STANDARD);
  const [mainMarker, setMainMarker] = useState({
    latitude: 41.015137,
    longitude: 28.97953,
  });

  const mapRef = useRef(null);

  // Kullanıcının anlık konumuna gitme fonksiyonu
  const goToUserLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setMainMarker({ latitude, longitude });

        mapRef.current?.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      error => Alert.alert('Konum Alınamadı', error.message),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // Harita tipini değiştiren fonksiyon
  const toggleMapType = () => {
    const mapTypesArray = Object.values(MapTypes);
    const currentTypeIndex = mapTypesArray.indexOf(mapType);
    const nextType = mapTypesArray[(currentTypeIndex + 1) % mapTypesArray.length];
    setMapType(nextType);
  };

  // Marker'a not ekleme fonksiyonu
  const updateNote = (id, note) => {
    setMarkers(prevMarkers =>
      prevMarkers.map(marker =>
        marker.id === id ? { ...marker, note } : marker
      )
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        onPress={values =>
          setMarkers([...markers, { id: Date.now(), ...values.nativeEvent.coordinate, note: '' }])
        }
        mapType={mapType}
        showsUserLocation
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        region={{
          latitude: mainMarker.latitude,
          longitude: mainMarker.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Kullanıcı eklediği markerları render et */}
        {markers.map((marker, index) => (
          <Marker draggable key={marker.id} coordinate={marker}>
            <CustomMarker />
            <Callout>
              <CustomCallout marker={marker} updateNote={updateNote} />
            </Callout>
          </Marker>
        ))}

        {/* Ana marker */}
        <Marker
          draggable
          coordinate={mainMarker}
          onDragEnd={e => setMainMarker(e.nativeEvent.coordinate)}
        >
          <Callout>
            <CustomCallout marker={mainMarker} updateNote={updateNote} />
          </Callout>
        </Marker>
      </MapView>

      {/* Konum Butonu */}
      <TouchableOpacity style={styles.button} onPress={goToUserLocation}>
        <Image source={require('./location.png')} style={styles.image} />
      </TouchableOpacity>

      {/* Harita tipi değiştirmek için dokunulabilir alan */}
      <TouchableOpacity style={styles.iconButton} onPress={toggleMapType}>
        <Map1 size={32} color='black' variant='Bold'/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 35,
    left: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: 30,
    height: 30,
  },
  iconButton: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 35,
    right: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default MapExample;
