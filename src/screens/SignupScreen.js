import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import SigninScreen from "./SigninScreen";

const SignupScreen = ({navigation}) => {
    return <>
        <Text>Sign up page</Text>
        <Button title={"go to signin page"} onPress={()=>navigation.navigate("SigninScreen")} />
        <Button title={"go to main flow"} onPress={()=>navigation.navigate("DrawerPart")} />

    </>
};

const styles = StyleSheet.create({});

export default SignupScreen;
