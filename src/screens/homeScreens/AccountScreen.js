import React, {useContext} from 'react';
import {View, StyleSheet, Text, Button, SafeAreaView, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import {Context} from "../../context/AuthContext";
import Spacer from "../../components/Spacer";
import {BackgroundImage} from "react-native-elements/dist/config";

const AccountScreen = ({navigation}) => {
    const {state, signout} = useContext(Context)

    return (<SafeAreaView style={styles.container}>
            <BackgroundImage style={styles.backgroundImageStyle}/>
            <View>
                <TouchableOpacity style={styles.viewStyle} onPress={() => {
                    signout(() => {
                        navigation.navigate('SigninScreen')
                    })
                }}>
                    <Text style={styles.logoutStyle}>Sign out</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>

    )
};


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'flex-start',
        paddingLeft: '15%',
        paddingRight: '15%',
    },
    backgroundImageStyle: {
        position: 'absolute',
        resizeMode: 'cover',
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        justifyContent: 'center',
        backgroundColor: `#FFFFFF`,
    },
    viewStyle: {
        marginTop: '10%'
    },
    logoutStyle: {
        color: 'black',
        fontSize: 18,
    },

});

export default AccountScreen;
