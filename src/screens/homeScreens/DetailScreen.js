import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    SafeAreaView,
    FlatList,
    TextInput,
    Button,
    Dimensions, ScrollView
} from 'react-native';
import TrailApi from '../../api/TrailApi';
import {Context} from '../../context/AuthContext';
import UsersApi from "../../api/UsersApi";
import {BackgroundImage} from "react-native-elements/dist/config";

const DetailScreen = ({navigation, route}) => {
    const {trail} = route.params;
    const {state} = useContext(Context);
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

            const response = await TrailApi.get(`/comments?trailId=${trail.id}`, {headers});
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

            const response = await UsersApi.get(`/${state.userId}`, {headers});
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

            await TrailApi.post(`/addComment?trailId=${trail.id}`, {comment: newComment}, {headers});
            setNewComment('');
            fetchComments();
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
        navigation.navigate('Your Chosen Trail', {trail});
    };

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
                            <Image style={styles.image} source={{uri: base64Image}}/>
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
                        data={comments}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <View style={styles.commentCard}>
                                <Text style={styles.commentText}>{item.comment}</Text>
                            </View>
                        )}
                        scrollEnabled={false}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
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
        marginTop: '5%'
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
        marginTop: '15%',
    },

    addButton: {
        backgroundColor: '#5D767D',
        paddingVertical: '3%',
        paddingHorizontal: '3%',
        borderRadius: 8,
        elevation: 2,
        alignItems: 'center',
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
        marginRight: '4%',
        marginLeft: '4%',
        marginBottom: '7%',
    },
    commentsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: '3%',
        marginTop: '7%',
    },
    commentCard: {
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 4,
        marginBottom: '4%',
        marginTop: '4%',
        flexDirection: 'row',
    },
    commentText: {
        flex: 1,
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
        padding: '4%',
    },
});

export default DetailScreen;
