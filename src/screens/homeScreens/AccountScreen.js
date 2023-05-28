import React, {useContext, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    Keyboard, Alert
} from 'react-native';
import {Context} from "../../context/AuthContext";
import Spacer from "../../components/Spacer";
import {BackgroundImage} from "react-native-elements/dist/config";
import CustomInput from "../../components/CustomInput";
import {Feather} from "@expo/vector-icons";

const AccountScreen = ({navigation}) => {
    const {state, signout, updateUser} = useContext(Context)
    const [errors, setErrors] = useState({})
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')


    const updateAccount = () => {
        updateUser(
            {
                firstName,
                lastName,
            },
            () => {
                Alert.alert('Update Successful', 'Your account has been updated successfully.', [
                    { text: 'OK', onPress: () => navigation.navigate('Home') }
                ]);
            }
        );
        setLastName('')
        setFirstName('')
    };



    const handleError = (errorMessage, input) => {
        setErrors(prevState => ({...prevState, [input]: errorMessage}))
    }
    const validate = () => {
        Keyboard.dismiss()
        let valid = true
        let errors = {}

        if (!firstName) {
            errors.firstName = 'Please input First Name'
            valid = false
        }

        if (!lastName) {
            errors.lastName = 'Please input Last Name'
            valid = false
        }

        setErrors(errors)
        return valid
    }

    return (<SafeAreaView style={styles.container}>
            <BackgroundImage
                blurRadius={0.3}
                source={require('../../../assets/background-app.jpg')}
                style={styles.backgroundImageStyle}
            />
            <Spacer/>
            <Spacer/>
            <CustomInput label={'New First Name'}
                         iconName={<Feather name="user" style={styles.iconStyle}/>}
                         autoCorrect={false}
                         autoCapitalize={'words'}
                         value={firstName}
                         onChangeText={(newFirstName) => setFirstName(newFirstName)}
                         error={errors.firstName}
                         onFocus={() => {
                             handleError(null, 'firstName')
                         }}
            />

            <CustomInput label={'New Last Name'}
                         iconName={<Feather name="user" style={styles.iconStyle}/>}
                         autoCorrect={false}
                         autoCapitalize={'words'}
                         value={lastName}
                         onChangeText={(newLastName) => setLastName(newLastName)}
                         error={errors.lastName}
                         onFocus={() => {
                             handleError(null, 'lastName')
                         }}
            />

            <TouchableOpacity onPress={() => {
                if (validate()) {
                    updateAccount();
                }
            }}>
                <Text style={styles.text1Style} >Update Your Account!</Text>
            </TouchableOpacity>
            <Spacer/>
            <Spacer/>
            <Spacer/>
            <Spacer/>
            <Spacer/>
            <Spacer/>
            <Spacer/>
            <Spacer/>
            <Spacer/>
            <Spacer/>


            <View>
                <TouchableOpacity onPress={() => {
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
        flex: 1,
        backgroundColor: '#a9a9a9',
        alignItems: 'center'
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
    iconStyle: {
        position: "absolute",
        right: "85%",
        fontSize: 20,
        opacity: 0.5,
        color: "white",
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
        paddingHorizontal: "15%",
    },
    headerStyle: {
        color: "white",
        alignSelf: "center",
        marginBottom: "15%",
        marginTop: "10%",
        fontSize: 30,
        opacity: 0.9,

    },
    text1Style: {
        color: "white",
        alignSelf: "center",
        fontSize: 15,
    },
    inputContainerStyle: {
        borderBottomWidth: 0,
    },
    logoutStyle:{

        color: "white",
        alignSelf: "flex-start",
        fontSize: 20,
    }

});

export default AccountScreen;
