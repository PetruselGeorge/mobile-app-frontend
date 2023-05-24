import React, { useEffect, useState } from 'react';
import { View, StyleSheet, } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const TrailDetailScreen = ({ navigation, route }) => {
    const { trail } = route.params;
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        requestLocationPermission();
    }, []);

    const requestLocationPermission = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    distanceInterval: 10,
                    timeInterval: 5000,
                },
                (location) => {
                    setLocation(location);
                }
            );
        } catch (error) {
            console.error('Error requesting location permission:', error);
        }
    };

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
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: trail.coordinates[trail.coordinates.length - 1].latitude,
                    longitude: trail.coordinates[trail.coordinates.length - 1].longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                {renderCoordinates()}

                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="Current Location"
                        description="You are here"
                    />
                )}
            </MapView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export default TrailDetailScreen;
