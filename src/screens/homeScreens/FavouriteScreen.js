import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/AuthContext";
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FavouriteTrailsApi from "../../api/FavouriteTrailsApi";
import { BackgroundImage } from "react-native-elements/dist/config";
import { useIsFocused } from '@react-navigation/native';

const FavouriteScreen = (props) => {
    const { state } = useContext(Context);
    const [trails, setTrails] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        fetchTrails();
    }, [isFocused]);

    const fetchTrails = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${state.token}`,
            };

            const response = await FavouriteTrailsApi.get(`/favouriteTrails?userId=${state.userId}`, { headers });
            const transformedTrails = response.data.map((trail) => ({
                ...trail,
                mainImage: `data:image/jpeg;base64,${trail.mainImage}`,
            }));

            setTrails(transformedTrails);
        } catch (error) {
            console.error('Error fetching trails:', error);
        }
    };

    const renderTrailColumn = (trails) => {
        return trails.map((trail) => (
            <View style={styles.card} key={trail.id}>
                <Image source={{ uri: trail.mainImage }} style={styles.image} />
                <Text style={styles.title}>{trail.name}</Text>
                <Text style={styles.description}>{trail.difficulty}</Text>
                <Text style={styles.description}>{trail.length.toFixed(2)} km</Text>
            </View>
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackgroundImage
                blurRadius={0.3}
                source={require('../../../assets/background-app.jpg')}
                style={styles.backgroundImageStyle}
            />
            <SafeAreaView style={styles.safeAreaContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.column}>
                        {renderTrailColumn(trails)}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a9a9a9',
    },
    safeAreaContainer: {
        flex: 1,
        paddingHorizontal: '4%',
        paddingTop: '4%',
        backgroundColor: 'transparent',
    },
    column: {
        marginBottom: '7%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#d3d3d3d3',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: Dimensions.get('screen').width - 100,
        height: Dimensions.get('screen').height - 650,
        borderRadius: 8,
        alignSelf: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        alignSelf: 'center',
    },
    description: {
        fontSize: 14,
        color: '#000000',
    },
    backgroundImageStyle: {
        position: 'absolute',
        resizeMode: 'cover',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.3,
    },
});

export default FavouriteScreen;
