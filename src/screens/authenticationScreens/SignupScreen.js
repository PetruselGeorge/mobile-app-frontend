import React, {useContext, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, Input} from "react-native-elements"
import Spacer from "../../components/Spacer";
import {Context as AuthContext} from "../../context/AuthContext";
import {BackgroundImage} from "react-native-elements/dist/config";
import {Feather, FontAwesome5, Ionicons} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const  SignupScreen = ({navigation}) => {

    const {state,signup} = useContext(AuthContext)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [streetName, setStreetName] = useState('')
    const [postalCode, setPostalCode] = useState('')

    return (<>
        <BackgroundImage blurRadius={0.3} source={require("../../../assets/background-app.jpg")}
                         style={styles.backgroundImageStyle}/>
        <ScrollView contentContainerStyle={styles.container}>


            <Spacer>

                <Text style={styles.headerStyle}>Start Your Journey!</Text>

            </Spacer>

            <View style={styles.formContainer}>
                <View style={styles.labelContainerStyle}>
                    <Feather name="user" style={styles.iconStyle}/>
                    <Input
                        labelStyle={styles.labelStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        underlineColorAndroid={'transparent'}
                        style={styles.inputStyle}
                        label={'First Name'}
                        autoCorrect={false}
                        autoCapitalize={'words'}
                        value={firstName}
                        onChangeText={(newFirstName) => setFirstName(newFirstName)}
                    />
                </View>

                <Spacer/>

                <View style={styles.labelContainerStyle}>
                    <Feather name="user" style={styles.iconStyle}/>
                    <Input labelStyle={styles.labelStyle}
                           inputContainerStyle={styles.inputContainerStyle}
                           underlineColorAndroid={"transparent"}
                           style={styles.inputStyle}
                           label={"Last Name"}
                           autoCorrect={false}
                           autoCapitalize={"words"}
                           value={lastName}
                           onChangeText={(newLastName) => setLastName(newLastName)}
                    />
                </View>

                <Spacer/>

                <View style={styles.labelContainerStyle}>
                    <MaterialIcons name="alternate-email" style={styles.iconStyle}/>
                    <Input labelStyle={styles.labelStyle}
                           inputContainerStyle={styles.inputContainerStyle}
                           underlineColorAndroid={"transparent"}
                           style={styles.inputStyle}
                           label={"Email"}
                           autoCorrect={false}
                           autoCapitalize={"none"}
                           value={email}
                           onChangeText={(newEmail) => setEmail(newEmail)}/>
                </View>

                <Spacer/>

                <View style={styles.labelContainerStyle}>
                    <MaterialCommunityIcons name="incognito" style={styles.iconStyle}/>
                    <Input labelStyle={styles.labelStyle}
                           inputContainerStyle={styles.inputContainerStyle}
                           underlineColorAndroid={"transparent"}
                           style={styles.inputStyle} secureTextEntry={true}
                           autoCorrect={false}
                           autoCapitalize={"none"}
                           label={"Password"}
                           value={password}
                           onChangeText={(newPassword) => setPassword(newPassword)}/>
                </View>

                <Spacer/>
                <View style={styles.labelContainerStyle}>
                    <FontAwesome5 name="city" style={styles.iconStyle}/>
                    <Input labelStyle={styles.labelStyle}
                           inputContainerStyle={styles.inputContainerStyle}
                           underlineColorAndroid={"transparent"}
                           style={styles.inputStyle}
                           label={"City"}
                           autoCapitalize={"words"} value={city}
                           onChangeText={(newCity) => setCity(newCity)}/>
                </View>

                <Spacer/>

                <View style={styles.labelContainerStyle}>
                    <Ionicons name="ios-flag-outline" style={styles.iconStyle}/>
                    <Input labelStyle={styles.labelStyle}
                           inputContainerStyle={styles.inputContainerStyle}
                           underlineColorAndroid={"transparent"}
                           style={styles.inputStyle}
                           label={"Country"}
                           autoCapitalize={"words"}
                           value={country}
                           onChangeText={(newCountry) => setCountry(newCountry)}/>
                </View>

                <Spacer/>

                <View style={styles.labelContainerStyle}>
                    <MaterialCommunityIcons name="road" style={styles.iconStyle} />
                    <Input labelStyle={styles.labelStyle}
                           inputContainerStyle={styles.inputContainerStyle}
                           underlineColorAndroid={"transparent"}
                           style={styles.inputStyle}
                           label={"Street Name"}
                           autoCapitalize={"words"}
                           value={streetName}
                           onChangeText={(newStreetName) => setStreetName(newStreetName)}/>
                </View>

                <Spacer/>

                <View style={styles.labelContainerStyle}>
                    <MaterialIcons name="local-post-office" style={styles.iconStyle}/>
                    <Input labelStyle={styles.labelStyle}
                           underlineColorAndroid={"transparent"}
                           inputContainerStyle={styles.inputContainerStyle}
                           style={styles.inputStyle}
                           label={"Postal Code"}
                           value={postalCode}
                           onChangeText={(newPostalCode) => setPostalCode(newPostalCode)}/>
                </View>

                <Spacer/>
                    <TouchableOpacity onPress={() => signup({
                        firstName,
                        lastName,
                        email,
                        password,
                        city,
                        country,
                        streetName,
                        postalCode
                    })}>
                        <Text style={styles.text1Style}>Create Your Account!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>navigation.navigate("SigninScreen")}>
                        <Text style={styles.text2Style}>Already having an account? Login!</Text>
                    </TouchableOpacity>
            </View>
        </ScrollView>
    </>
    )
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: "15%",
        paddingBottom: "15%",
    },
    formContainer: {
        width: "81%",

    },
    labelContainerStyle: {
        justifyContent: "center"
    },
    iconStyle: {
        position: "absolute",
        right: "85%",
        fontSize: 20,
        opacity: 0.5,
        color: "white"
    },
    inputStyle: {
        textAlign: "center",
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 15,
        marginVertical: "2%",
        shadowColor: "transparent",
        color: "black",
        opacity: 0.7,
        paddingHorizontal:"15%"


    },
    headerStyle: {
        color: "white",
        alignSelf: "center",
        marginBottom: "15%",
        marginTop:"10%",
        fontSize: 30,
        opacity:0.9,

    },
    text2Style: {
        color: "white",
        alignSelf: "center",
        fontSize: 15
    },
    text1Style: {
        color: "white",
        alignSelf: "center",
        marginTop: "10%",
        marginBottom: "10%",
        fontSize: 15
    },
    inputContainerStyle: {
        borderBottomWidth: 0,
    },
    backgroundImageStyle: {
        position: 'absolute',
        resizeMode: 'cover',
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        backgroundColor: `rgba(0, 0, 0, 1)`,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.7,
    },
    labelStyle: {
        color: "white",
        opacity: 0.8
    },
});

export default SignupScreen;
