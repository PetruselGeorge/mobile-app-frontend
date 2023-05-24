import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const TrailDetailScreen = ({ navigation, route }) => {
    const { trail } = route.params;
    const [initialRegion, setInitialRegion] = useState(null);

    useEffect(() => {
        setInitialRegion({
            latitude: 46.7732,
            longitude:23.6214 ,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    }, []);

    const renderCoordinates = () => {
        if (trail.coordinates && trail.coordinates.length > 0) {
            return (
                <Polyline
                    coordinates={trail.coordinates}
                    strokeColor="#FF0000"
                    strokeWidth={3}
                />
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            {initialRegion && (
                <MapView style={styles.map} initialRegion={initialRegion}>
                    {renderCoordinates()}
                </MapView>
            )}
            <TouchableOpacity
                onPress={() => {
                    return navigation.navigate('The Trails');
                }}
            >
                <Text>Search for more trails</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
      flex:1
    },
});

export default TrailDetailScreen;
