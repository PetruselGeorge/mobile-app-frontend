import React, {useContext, useState} from 'react';
import {Dimensions, Keyboard, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from "react-native-elements"
import {Context as AuthContext} from "../../context/AuthContext";
import {BackgroundImage} from "react-native-elements/dist/config";
import {Feather} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import CustomInput from "../../components/CustomInput";
import Spacer from "../../components/Spacer";

const SignupScreen = ({navigation}) => {
    const {state, signup} = useContext(AuthContext)
    const [errors, setErrors] = useState({})
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [streetName, setStreetName] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const createAccount = () => signup({
        firstName,
        lastName,
        email,
        password,
        city,
        country,
        streetName,
        postalCode
    }, () => {
        navigation.navigate('SigninScreen')
    })

    const handleError = (errorMessage, input) => {
        setErrors(prevState => ({...prevState, [input]: errorMessage}))
    }


    const validate = () => {
        Keyboard.dismiss()
        let valid = true
        let errors = {}

        if (!email) {
            errors.email = 'Please input Email';
            valid = false;
        } else if (!email.match(/^\S+@\S+\.\S+$/)) {
            errors.email = 'Please input valid Email';
            valid = false;
        }
        if (!firstName) {
            errors.firstName = 'Please input First Name'
            valid = false
        }

        if (!lastName) {
            errors.lastName = 'Please input Last Name'
            valid = false
        }

        if (!password) {
            errors.password = 'Please input Password'
            valid = false
        } else {
            if (!password.match(/(?=.*[0-9])/)) {
                errors.password = 'You need to have at least one digit (0-9)'
                valid = false
            }
            if (!password.match(/(?=.*[a-z])/)) {
                errors.password = 'You need to have at least one lowercase letter (a-z)'
                valid = false
            }
            if (!password.match(/(?=.*[A-Z])/)) {
                errors.password = 'You need to have at least one uppercase letter (A-Z)'
                valid = false
            }
            if (!password.match(/.*[*.!@$%^&(){}[\]:;<>,?/~_+\-=|].*/)) {
                errors.password = 'You need to have at least one special character e.g $'
                valid = false
            }

        }

        if (!confirmPassword) {
            errors.confirmPassword = 'Please input Password'
            valid = false
        } else {

            if (!confirmPassword.match(/(?=.*[0-9])/)) {
                errors.confirmPassword = 'You need to have at least one digit (0-9)'
                valid = false
            }
            if (!confirmPassword.match(/(?=.*[a-z])/)) {
                errors.confirmPassword = 'You need to have at least one lowercase letter (a-z)'
                valid = false
            }
            if (!confirmPassword.match(/(?=.*[A-Z])/)) {
                errors.confirmPassword = 'You need to have at least one uppercase letter (A-Z)'
                valid = false
            }
            if (!confirmPassword.match(/.*[*.!@$%^&(){}[\]:;<>,?/~_+\-=|].*/)) {
                errors.confirmPassword = 'You need to have at least one special character e.g $'
                valid = false
            }

            if (password !== confirmPassword) {
                errors.confirmPassword = "Passwords don't match"
                valid = false
            }
        }

        if (!city) {
            errors.city = "Please input City"
            valid = false
        }
        if (!country) {
            errors.country = "Please input Country"
            valid = false
        }
        if (!streetName) {
            errors.streetName = "Please input Street Name"
            valid = false
        }
        if (!postalCode) {
            errors.postalCode = "Please input Postal Code"
            valid = false
        }

        setErrors(errors)
        return valid
    }

    return (<SafeAreaView>
            <BackgroundImage blurRadius={0.3} source={require("../../../assets/background-app.jpg")}
                             style={styles.backgroundImageStyle}/>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                <Text style={styles.headerStyle}>Start Your Journey!</Text>

                <View style={styles.formContainer}>

                    <CustomInput label={'First Name'}
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

                    <CustomInput label={'Last Name'}
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
                    <CustomInput label={'Email'}
                                 iconName={<MaterialIcons name="alternate-email" style={styles.iconStyle}/>}
                                 autoCorrect={false}
                                 autoCapitalize={'words'}
                                 error={errors.email}
                                 onFocus={() => {
                                     handleError(null, 'email')
                                     state.errorMessage = ''
                                 }}
                                 value={email}
                                 onChangeText={(newEmail) => setEmail(newEmail)}
                    />
                    {state.errorMessage ? <Text style={styles.textErrorStyle}>{state.errorMessage}</Text> : null}

                    <CustomInput label={'Password'}
                                 iconName={<MaterialCommunityIcons name="incognito" style={styles.iconStyle}/>}
                                 autoCorrect={false}
                                 autoCapitalize={'none'}
                                 keyboardType={"default"}
                                 value={password}
                                 password={true}
                                 onChangeText={(newPassword) => setPassword(newPassword)}
                                 error={errors.password}
                                 onFocus={() => {
                                     handleError(null, 'password')
                                 }}
                    />

                    <CustomInput label={'Confirm Password'}
                                 iconName={<MaterialCommunityIcons name="incognito" style={styles.iconStyle}/>}
                                 autoCorrect={false}
                                 autoCapitalize={'none'}
                                 keyboardType={"default"}
                                 password={true}
                                 value={confirmPassword}
                                 onChangeText={(newConfirmPassword) => setConfirmPassword(newConfirmPassword)}
                                 error={errors.confirmPassword}
                                 onFocus={() => {
                                     handleError(null, 'confirmPassword')
                                 }}
                    />


                    <CustomInput label={'City'}
                                 iconName={<Feather name="home" style={styles.iconStyle}/>}
                                 autoCorrect={false}
                                 autoCapitalize={'words'}
                                 value={city}
                                 onChangeText={(newCity) => setCity(newCity)}
                                 error={errors.city}
                                 onFocus={() => {
                                     handleError(null, 'city')
                                 }}
                    />

                    <CustomInput label={'Country'}
                                 iconName={<Feather name="flag" style={styles.iconStyle}/>}
                                 autoCorrect={false}
                                 autoCapitalize={'words'}
                                 value={country}
                                 onChangeText={(newCountry) => setCountry(newCountry)}
                                 error={errors.country}
                                 onFocus={() => {
                                     handleError(null, 'country')
                                 }}
                    />


                    <CustomInput label={'Street Name'}
                                 iconName={<MaterialCommunityIcons name="road" style={styles.iconStyle}/>}
                                 autoCorrect={false}
                                 autoCapitalize={'words'}
                                 value={streetName}
                                 onChangeText={(newStreet) => setStreetName(newStreet)}
                                 error={errors.streetName}
                                 onFocus={() => {
                                     handleError(null, 'streetName')
                                 }}
                    />

                    <CustomInput label={'Postal Code'}
                                 keyboardType={'numeric'}
                                 iconName={<MaterialIcons name="local-post-office" style={styles.iconStyle}/>}
                                 autoCorrect={false}
                                 autoCapitalize={'words'}
                                 value={postalCode}
                                 onChangeText={(newPostalCode) => setPostalCode(newPostalCode)}
                                 error={errors.postalCode}
                                 onFocus={() => {
                                     handleError(null, 'postalCode')
                                 }}
                    />
                    <TouchableOpacity onPress={() => {
                        if (validate()) {
                            createAccount();
                        }
                    }}>
                        <Text style={styles.text1Style}>Create Your Account!</Text>
                    </TouchableOpacity>
                    <Spacer/>

                    <TouchableOpacity onPress={() => navigation.navigate("SigninScreen")}>
                        <Text style={styles.text1Style}>Already having an account? Login!</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    textErrorStyle: {
        alignSelf: "center",
        color: 'red',
        fontSize: 12,
        marginBottom: '1%'
    },
    buttonContainer: {
        alignItems: 'center',
        borderWidth: 1,

    },
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
