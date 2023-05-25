import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, SafeAreaView, FlatList, ScrollView } from 'react-native';
import TrailApi from '../../api/TrailApi';
import { Context } from '../../context/AuthContext';

const DetailScreen = ({ navigation, route }) => {
    const { trail } = route.params;
    const { state } = useContext(Context);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [comments, setComments] = useState([]);
    const [displayedComments, setDisplayedComments] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${state.token}`,
            };

            const response = await TrailApi.get(`/comments?trailId=${trail.id}`, { headers });
            setComments(response.data);
            setDisplayedComments(response.data.slice(0, 4));
        } catch (err) {
            console.log(err);
        }
    };

    const handleImagePress = () => {
        if (currentImageIndex < trail.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        } else {
            setCurrentImageIndex(0);
        }
    };

    const currentImage = trail.images[currentImageIndex];
    const base64Image = `data:image/png;base64,${currentImage.image}`;

    const handleStartTrail = () => {
        navigation.navigate('Your Chosen Trail', { trail });
    };

    const handleShowAll = () => {
        const currentIndex = displayedComments.length;
        const nextIndex = currentIndex + 4;
        const nextComments = comments.slice(currentIndex, nextIndex);

        setDisplayedComments((prevComments) => [...prevComments, ...nextComments]);
        setShowAll(true);
    };

    const handleHideAll = () => {
        setDisplayedComments(comments.slice(0, 4));
        setShowAll(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.rowContainer}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={handleImagePress}>
                        <Image style={styles.image} source={{ uri: base64Image }} />
                    </TouchableOpacity>
                </View>

                <View style={styles.detailsButtonContainer}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={handleStartTrail}>
                        <Text style={styles.buttonText}>Start Trail!</Text>
                    </TouchableOpacity>

                    <View style={styles.cardContainer}>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Difficulty</Text>
                            <Text style={styles.cardText}>{trail.difficulty}</Text>
                            <Text style={styles.cardTitle}>Length</Text>
                            <Text style={styles.cardText}>{trail.length.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.commentsContainer}>
                <Text style={styles.commentsTitle}>Comments:</Text>

                <FlatList
                    data={displayedComments}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.commentCard}>
                            <Text>{item.comment}</Text>
                        </View>
                    )}
                />
                {!showAll && comments.length > 4 && displayedComments.length < comments.length && (
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.showMoreButton} onPress={handleShowAll}>
                            <Text style={styles.showMoreButtonText}>Show More</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {showAll && (
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.showMoreButton} onPress={handleHideAll}>
                            <Text style={styles.showMoreButtonText}>Hide All</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: '3%',
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: '5%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    detailsButtonContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: 'green',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        elevation: 2,
        marginBottom: '10%',
        alignItems: 'center',
        marginTop: '7%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '5%',
    },
    card: {
        backgroundColor: '#fff',
        padding: '8%',
        borderRadius: 8,
        elevation: 2,
        flex: 1,
        marginRight: '4%',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: '3%',
    },
    cardText: {
        fontSize: 16,
    },
    commentsContainer: {
        backgroundColor: '#fff',
        padding: 20,
        elevation: 4,
        borderRadius: 8,
        marginTop:'20%',
        marginBottom: '7%',
        marginRight:'4%',
        marginLeft:'4%'
    },
    commentsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commentCard: {
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 4,
        marginBottom: 10,
    },
    buttonsContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    showMoreButton: {
        marginTop: 10,
        alignItems: 'center',
    },
    showMoreButtonText: {
        color: 'blue',
        fontWeight: 'bold',
    },
});

export default DetailScreen;
