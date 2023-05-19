import React, {useContext, useState} from 'react';
import {
    Dimensions,
    Keyboard,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import {Context as AuthContext} from '../../context/AuthContext';
import {BackgroundImage} from 'react-native-elements/dist/config';
import {Text} from 'react-native-elements';
import CustomInput from '../../components/CustomInput';
import {
    MaterialCommunityIcons,
    MaterialIcons,
} from '@expo/vector-icons';
import Spacer from "../../components/Spacer";

const SigninScreen = ({navigation}) => {
    const {state, signin} = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleError = (errorMessage, input) => {
        setErrors((prevErrors) => ({...prevErrors, [input]: errorMessage}));
    };

    const login = () => {
        signin({email, password},()=>{navigation.navigate('Home')});
    }

    const validate = () => {
        Keyboard.dismiss();
        let valid = true;
        let errors = {};

        if (!email) {
            errors.email = 'Please input Email';
            valid = false;
        } else if (!email.match(/^\S+@\S+\.\S+$/)) {
            errors.email = 'Please input a valid Email';
            valid = false;
        }

        if (!password) {
            errors.password = 'Please input Password';
            valid = false;
        } else {
            if (!password.match(/(?=.*[0-9])/)) {
                errors.password = 'You need to have at least one digit (0-9)';
                valid = false;
            }
            if (!password.match(/(?=.*[a-z])/)) {
                errors.password = 'You need to have at least one lowercase letter (a-z)';
                valid = false;
            }
            if (!password.match(/(?=.*[A-Z])/)) {
                errors.password = 'You need to have at least one uppercase letter (A-Z)';
                valid = false;
            }
            if (!password.match(/.*[*.!@$%^&(){}[\]:;<>,?/~_+\-=|].*/)) {
                errors.password = 'You need to have at least one special character e.g $';
                valid = false;
            }
        }

        setErrors(errors);
        return valid;
    };

    return (
        <SafeAreaView>
            <BackgroundImage
                blurRadius={0.3}
                source={require('../../../assets/background-app.jpg')}
                style={styles.backgroundImageStyle}
            />
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.headerStyle}>Start Your Journey!</Text>
                <View style={styles.formContainer}>
                    <CustomInput
                        label={'Email'}
                        iconName={
                            <MaterialIcons
                                name="alternate-email"
                                style={styles.iconStyle}
                            />
                        }
                        autoCorrect={false}
                        autoCapitalize={'words'}
                        error={errors.email}
                        onFocus={() => {
                            handleError(null, 'email');
                        }}
                        value={email}
                        onChangeText={(newEmail) => setEmail(newEmail)}
                    />
                    <CustomInput
                        label={'Password'}
                        iconName={
                            <MaterialCommunityIcons
                                name="incognito"
                                style={styles.iconStyle}
                            />
                        }
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        keyboardType={'default'}
                        value={password}
                        password={true}
                        onChangeText={(newPassword) => setPassword(newPassword)}
                        error={errors.password}
                        onFocus={() => {
                            handleError(null, 'password');
                        }
                        }


                    />
                    {state.errorMessage ? <Text style={styles.textErrorStyle}>{state.errorMessage}</Text> : null}

                    <TouchableOpacity
                        onPress={() => {
                            if (validate()) {
                                login();
                            }
                        }}
                    >
                        <Text style={styles.text1Style}>Login!</Text>
                    </TouchableOpacity>
                    <Spacer/>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignupScreen')}
                    >
                        <Text style={styles.text1Style}>
                            You don't have an account? Signup!
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
        ;
};

const styles = StyleSheet.create({
    textErrorStyle: {
        alignSelf: "center",
        color: 'red',
        fontSize: 12,
        marginBottom:'1%'
    },
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: '15%',
        paddingBottom: '15%',
    },
    formContainer: {
        width: '81%',
    },
    labelContainerStyle: {
        justifyContent: 'center',
    },
    iconStyle: {
        position: 'absolute',
        right: '85%',
        fontSize: 20,
        opacity: 0.5,
        color: 'white',
    },
    inputStyle: {
        textAlign: 'center',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 15,
        marginVertical: '2%',
        shadowColor: 'transparent',
        color: 'black',
        opacity: 0.7,
        paddingHorizontal: '15%',
    },
    headerStyle: {
        color: 'white',
        alignSelf: 'center',
        marginBottom: '15%',
        marginTop: '10%',
        fontSize: 30,
        opacity: 0.9,
    },
    text1Style: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 15,
    },
    inputContainerStyle: {
        borderBottomWidth: 0,
    },
    backgroundImageStyle: {
        position: 'absolute',
        resizeMode: 'cover',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        backgroundColor: `rgba(0, 0, 0, 1)`,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.7,
    },
    labelStyle: {
        color: 'white',
        opacity: 0.8,
    },
});

export default SigninScreen;
