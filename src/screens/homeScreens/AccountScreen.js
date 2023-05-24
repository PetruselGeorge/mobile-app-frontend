import React, {useContext} from 'react';
import {View, StyleSheet, Text, Button, SafeAreaView, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import {Context} from "../../context/AuthContext";
import Spacer from "../../components/Spacer";
import {BackgroundImage} from "react-native-elements/dist/config";

const AccountScreen = ({navigation}) => {
    const {state, signout} = useContext(Context)

    return (<SafeAreaView style={styles.container}>
            <BackgroundImage
                blurRadius={0.3}
                source={require('../../../assets/background-app.jpg')}
                style={styles.backgroundImageStyle}
            />







            <View>
                <TouchableOpacity onPress={() => {
                    signout(() => {
                        navigation.navigate('SigninScreen')
                    })
                }}>
                    <Text >Sign out</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>

    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        alignItems:'center'
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

export default AccountScreen;
