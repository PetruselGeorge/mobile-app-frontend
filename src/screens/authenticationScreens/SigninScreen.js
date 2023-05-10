import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

const SigninScreen = ({navigation}) => {
  return <>
    <Text>Sign in page</Text>
    <Button title={"go to signin page"} onPress={()=>navigation.navigate("SignupScreen")} />
      <Button title={"go to main flow"} onPress={()=>navigation.navigate("Home")} />

  </>
};

const styles = StyleSheet.create({});

export default SigninScreen;
