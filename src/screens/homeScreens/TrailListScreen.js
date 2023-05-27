import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import TrailApi from '../../api/TrailApi';
import { Context } from '../../context/AuthContext';
import { BackgroundImage } from 'react-native-elements/dist/config';
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

    const navigateToTrailDetail = (trail) => {
        props.navigation.navigate('Trail Details', { trail });
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
                            onPress={() => navigateToTrailDetail(trail)}
                        >
                            <Image source={{ uri: trail.mainImage }} style={styles.image} />
                            <Text style={styles.title}>{trail.name}</Text>
                            <Text style={styles.description}>{trail.difficulty}</Text>
                            <Text style={styles.description}>{trail.length.toFixed(2)} km</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <BackgroundImage
                blurRadius={0.3}
                source={require('../../../assets/background-app.jpg')}
                style={styles.backgroundImageStyle}
            />
            <SafeAreaView style={styles.safeAreaContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderTrailRow(trails, 'Easy')}
                    {renderTrailRow(trails, 'Medium')}
                    {renderTrailRow(trails, 'Hard')}
                </ScrollView>
            </SafeAreaView>
        </View>
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
    row: {
        marginBottom: '7%',
    },
    difficulty: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: '2%',
        color:'#E5E5E5'
    },
    card: {
        backgroundColor: '#d3d3d3d3',
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

        alignItems:'center'
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
        flex: 1,
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

export default TrailListScreen;
