import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import TrailApi from '../../api/TrailApi';
import { Context } from '../../context/AuthContext';

const TrailListScreen = (props) => {
    const { state } = useContext(Context);
    const [trails, setTrails] = useState([]);

    useEffect(() => {
        fetchTrails();
    }, []);

    const fetchTrails = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${state.token}`,
            };

            const response = await TrailApi.get('/getTrails', { headers });
            const transformedTrails = response.data.map((trail) => ({
                ...trail,
                mainImage: `data:image/jpeg;base64,${trail.mainImage}`,
            }));

            // Sort trails based on difficulty (Easy, Medium, Hard)
            const sortedTrails = transformedTrails.sort((a, b) => {
                const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
                return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
            });

            setTrails(sortedTrails);
        } catch (error) {
            console.error('Error fetching trails:', error);
        }
    };

    const navigateToTrailDetail = (trailName) => {
        props.navigation.navigate('Your Chosen Trail', { trailName });
    };

    const renderTrailRow = (trails, difficulty) => {
        const trailsInRow = trails.filter((trail) => trail.difficulty === difficulty);

        return (
            <View style={styles.row} key={difficulty}>
                <Text style={styles.difficulty}>{difficulty}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {trailsInRow.map((trail) => (
                        <TouchableOpacity
                            key={trail.name}
                            style={styles.card}
                            onPress={() => navigateToTrailDetail(trail.name)}
                        >
                            <Image source={{ uri: trail.mainImage }} style={styles.image} />
                            <Text style={styles.title}>{trail.name}</Text>
                            <Text style={styles.description}>{trail.difficulty}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderTrailRow(trails, 'Easy')}
                {renderTrailRow(trails, 'Medium')}
                {renderTrailRow(trails, 'Hard')}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '4%',
        paddingTop: '4%',
    },
    row: {
        marginBottom: '7%',
    },
    difficulty: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: '2%',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 10,
        marginRight: 10,
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
        width: 200,
        height: 120,
        borderRadius: 8,
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#888888',
    },
});

export default TrailListScreen;
