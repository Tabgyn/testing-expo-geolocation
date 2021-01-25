import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const initialRegion = {
  latitude: -11.2917661,
  longitude: -90.3138658,
  latitudeDelta: 100,
  longitudeDelta: 100,
};

export default function App() {
  const [region, setRegion] = useState<Region>();

  useEffect(() => {
    getCurrentPosition();
  }, []);

  const getCurrentPosition = async () => {
    let { status } = await Location.requestPermissionsAsync();

    if (status !== "granted") {
      return <Text>Ops!", "Permissão de acesso a localização negada.</Text>
    }

    let {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();

    setRegion({ latitude, longitude, latitudeDelta: 0.008, longitudeDelta: 0.008 });
    console.log(region);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        initialRegion={initialRegion}
        zoomEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        loadingEnabled={true}
      >
        <Marker
          coordinate={{
            latitude: region ? region.latitude : initialRegion.latitude,
            longitude: region ? region.longitude : initialRegion.longitude,
          }}
        >
          <MaterialCommunityIcons name="map-marker" size={48} color="red" />
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
