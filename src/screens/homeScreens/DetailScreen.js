import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    SafeAreaView,
    FlatList,
    TextInput,
    Dimensions,
    ScrollView,
} from 'react-native';
import TrailApi from '../../api/TrailApi';
import { Context } from '../../context/AuthContext';
import { BackgroundImage } from 'react-native-elements/dist/config';
import FavouriteTrailsApi from '../../api/FavouriteTrailsApi';

const DetailScreen = ({ navigation, route }) => {
    const { trail } = route.params;
    const { state } = useContext(Context);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showAllComments, setShowAllComments] = useState(false);
    const [displayedComments, setDisplayedComments] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [trails, setTrails] = useState([]);

    useEffect(() => {
        fetchComments();
        fetchFavouriteTrails();
    }, []);

    useEffect(() => {
        const isTrailFavorite = trails.some((favTrail) => favTrail.id === trail.id);
        setIsFavorite(isTrailFavorite);
    }, [trails]);

    const fetchComments = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${state.token}`,
            };

            const response = await TrailApi.get(`/comments?trailId=${trail.id}`, {
                headers,
            });
            const sortedComments = response.data.sort((a, b) => b.id - a.id);
            setComments(sortedComments);
            setDisplayedComments(sortedComments.slice(0, 4));
        } catch (err) {
            console.log(err);
        }
    };


    const addComment = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${state.token}`,
            };

            await TrailApi.post(
                `/addComment?trailId=${trail.id}`,
                { comment: newComment },
                { headers }
            );
            setNewComment('');
            fetchComments();
        } catch (err) {
            console.log(err);
        }
    };

    const addToFavourite = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${state.token}`,
            };
            const params = {
                trailId: trail.id,
                userId: state.userId,
            };

            if (isFavorite) {
                await FavouriteTrailsApi.delete(`/removeFavouriteTrail`, {
                    headers,
                    params,
                });
            } else {
                await FavouriteTrailsApi.post(`/addFavouriteTrail`, null, {
                    headers,
                    params,
                });
            }

            setIsFavorite(!isFavorite);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchFavouriteTrails = async () => {
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

    const handleShowMoreComments = () => {
        const remainingComments = comments.slice(displayedComments.length);
        setDisplayedComments([
            ...displayedComments,
            ...remainingComments.slice(0, 4),
        ]);
        if (displayedComments.length + 4 >= comments.length) {
            setShowAllComments(true);
        }
    };

    const handleHideComments = () => {
        setDisplayedComments(comments.slice(0, 4));
        setShowAllComments(false);
    };

    const remainingCommentsCount = comments.length - displayedComments.length;

    return (
        <SafeAreaView style={styles.container}>
            <BackgroundImage
                blurRadius={0.3}
                source={require('../../../assets/background-app.jpg')}
                style={styles.backgroundImageStyle}
            />
            <ScrollView style={styles.contentContainer}>
                <View style={styles.rowContainer}>
                    <View style={styles.imageContainer}>
                        <TouchableOpacity onPress={handleImagePress}>
                            <Image style={styles.image} source={{ uri: base64Image }} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.detailsButtonContainer}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={handleStartTrail}
                        >
                            <Text style={styles.buttonText}>Start Trail!</Text>
                        </TouchableOpacity>

                        <View style={styles.cardContainer}>
                            <View style={styles.card}>
                                <Text style={styles.cardTitle}>Difficulty</Text>
                                <Text style={styles.cardText}>{trail.difficulty}</Text>
                                <Text style={styles.cardTitle}>Length</Text>
                                <Text style={styles.cardText}>{trail.length.toFixed(2)} km</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={addToFavourite}
                    >
                        <Text style={styles.favoriteButtonText}>
                            {isFavorite ? '★' : '☆'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.commentsContainer}>
                    <View style={styles.addCommentContainer}>
                        <View style={styles.commentInputContainer}>
                            <TextInput
                                style={styles.commentInput}
                                placeholder="Add a comment..."
                                value={newComment}
                                onChangeText={setNewComment}
                            />
                        </View>
                        <TouchableOpacity style={styles.addButton} onPress={addComment}>
                            <Text style={styles.buttonText}>Add Comment</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.commentsTitle}>Comments:</Text>

                    <FlatList
                        data={displayedComments}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.commentCard}>
                                <Text style={styles.commentText}>{item.comment}</Text>
                            </View>
                        )}
                        scrollEnabled={false}
                    />

                    {remainingCommentsCount > 0 && !showAllComments && (
                        <TouchableOpacity
                            style={styles.showMoreButton}
                            onPress={handleShowMoreComments}
                        >
                            <Text style={styles.buttonText}>Show More</Text>
                        </TouchableOpacity>
                    )}

                    {showAllComments && (
                        <TouchableOpacity
                            style={styles.showMoreButton}
                            onPress={handleHideComments}
                        >
                            <Text style={styles.buttonText}>Hide All</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a9a9a9',
    },
    contentContainer: {
        flex: 1,
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
        marginTop: '5%',
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
        paddingVertical: '5%',
        paddingHorizontal: '9%',
        borderRadius: 8,
        elevation: 2,
        marginBottom: '10%',
        alignItems: 'center',
        marginTop: '30%',
        flex:1
    },
    favoriteButton: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:'38%',
        marginTop:'38%'
    },
    favoriteButtonText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFD700',
    },
    addButton: {
        backgroundColor: '#5D767D',
        paddingVertical: '2%',
        paddingHorizontal: '2%',
        borderRadius: 8,
        elevation: 2,
        marginBottom: '4%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop:'2%'
    },
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 2,
        paddingVertical: '5%',
        paddingHorizontal: '5%',
        marginBottom: '5%',
    },
    card: {
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: '2%',
    },
    cardText: {
        fontSize: 14,
    },
    commentsContainer: {
        flex: 1,
        paddingHorizontal: '3%',
        marginTop: '5%',
    },
    addCommentContainer: {
        flexDirection: 'row',
        marginBottom: '3%',
    },
    commentInputContainer: {
        flex: 1,
        marginRight: '2%',
        paddingVertical: '2%',
        paddingHorizontal: '1%',
    },
    commentInput: {
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 2,
        paddingHorizontal: '3%',
    },
    commentCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 2,
        padding: '3%',
        marginBottom: '3%',
    },
    commentText: {
        fontSize: 16,
    },
    commentsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: '2%',
    },
    showMoreButton: {
        alignItems: 'center',
        marginBottom: '5%',
    },
});

export default DetailScreen;
