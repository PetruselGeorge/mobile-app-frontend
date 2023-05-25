import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, SafeAreaView, FlatList, ScrollView, TextInput, Button } from 'react-native';
import TrailApi from '../../api/TrailApi';
import { Context } from '../../context/AuthContext';
import UsersApi from "../../api/UsersApi";

const DetailScreen = ({ navigation, route }) => {
    const { trail } = route.params;
    const { state } = useContext(Context);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        fetchComments();
        fetchUser();
    }, []);

    const fetchComments = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${state.token}`,
            };

            const response = await TrailApi.get(`/comments?trailId=${trail.id}`, { headers });
            const sortedComments = response.data.sort((a, b) => b.id - a.id);
            setComments(sortedComments);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchUser = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${state.token}`,
            };

            const response = await UsersApi.get(`/${state.userId}`, { headers });
            setName(response.data.lastName);
        } catch (err) {
            console.log(err);
        }
    };

    const addComment = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${state.token}`,
            };

            await TrailApi.post(`/addComment?trailId=${trail.id}`, { comment: newComment }, { headers });
            setNewComment('');
            fetchComments(); // Fetch the updated comments after adding a new comment
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
                <View style={styles.addCommentContainer}>
                    <View style={styles.commentInputContainer}>
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Add a comment..."
                            value={newComment}
                            onChangeText={setNewComment}
                        />
                    </View>
                    <Button title="Add Comment" onPress={addComment} />
                </View>
                <Text style={styles.commentsTitle}>Comments:</Text>

                <FlatList
                    data={comments}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.commentCard}>
                            <Text>{item.comment}</Text>
                        </View>
                    )}
                />
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
        marginTop: '20%',
        marginBottom: '7%',
        marginRight: '4%',
        marginLeft: '4%',
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
        marginTop: 10,
        marginBottom:'8%',
    },
    addCommentContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
    },
    commentInputContainer: {
        flex: 1,
        marginRight: 10,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
    },
});

export default DetailScreen;
