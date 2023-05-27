import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Communications from "react-native-communications";

const TrailDetailScreen = ({ navigation, route }) => {
    const { trail } = route.params;
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [timerRunning, setTimerRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [isAlertShown, setIsAlertShown] = useState(false);
    const [timerAlertTimeout, setTimerAlertTimeout] = useState(null);

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

    const startTimer = () => {
        setTimerRunning(true);
    };

    const stopTimer = () => {
        setTimerRunning(false);
    };

    const resetTimer = () => {
        setSeconds(0);
        setMinutes(0);
        setHours(0);
    };

    const phoneToRescueTeams = () => {
        clearTimeout(timerAlertTimeout);

        const phoneNumber = '0755493422';
        Communications.phonecall(phoneNumber)
    };


    useEffect(() => {
        let interval = null;

        if (timerRunning) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerRunning]);

    useEffect(() => {
        if (
            minutes > 0 &&
            minutes % 10 === 0 &&
            seconds === 0 &&
            !isAlertShown
        ) {
            setIsAlertShown(true);
            Alert.alert(
                'Timer Alert',
                `Just making sure you are good. Please press the OK button within 90 seconds, or rescue teams will be notified.`,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            setIsAlertShown(false);
                        },
                    },
                ]

            );

            const timeout = setTimeout(phoneToRescueTeams, 90000);
            setTimerAlertTimeout(timeout);
        }

        if (seconds === 60) {
            setSeconds(0);
            setMinutes((prevMinutes) => prevMinutes + 1);
        }
        if (minutes === 60) {
            setMinutes(0);
            setHours((prevHours) => prevHours + 1);
        }
    }, [seconds, minutes, isAlertShown]);

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

            <View style={styles.timerContainer}>
                {!timerRunning ? (
                    <TouchableOpacity onPress={startTimer} style={styles.startButton}>
                        <Text style={styles.buttonText}>Start</Text>
                    </TouchableOpacity>
                ) : (
                    <>
                        <View style={styles.timerTextContainer}>
                            <Text style={styles.timerText}>
                                {hours.toString().padStart(2, '0')}:
                            </Text>
                            <Text style={styles.timerText}>
                                {minutes.toString().padStart(2, '0')}:
                            </Text>
                            <Text style={styles.timerText}>
                                {seconds.toString().padStart(2, '0')}
                            </Text>
                        </View>
                        <View style={styles.stopResetContainer}>
                            <TouchableOpacity onPress={stopTimer} style={styles.stopButton}>
                                <Text style={styles.buttonText}>Stop</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={resetTimer} style={styles.resetButton}>
                                <Text style={styles.buttonText}>Reset</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
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
    timerContainer: {
        position: 'absolute',
        bottom: '3%',
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: '4%',
        paddingVertical: '1%',
        borderRadius: 20,
    },
    startButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '2%',
        paddingHorizontal: '8%',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
    },
    stopResetContainer: {
        flexDirection: 'row',
        marginTop: '6%',
        alignItems: 'center',
        marginHorizontal: '10%',
    },
    stopButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '2%',
        paddingHorizontal: '8%',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        marginRight: '10%',
    },
    resetButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '2%',
        paddingHorizontal: '8%',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    timerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '4%',
    },
    timerText: {
        color: '#fff',
        fontSize: 24,
    },
});

export default TrailDetailScreen;
