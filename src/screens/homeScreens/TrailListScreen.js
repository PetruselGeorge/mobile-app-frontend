import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import SignupScreen from "../authenticationScreens/SignupScreen";

const TrailListScreen = (props) => {
  return <Button title={"Go to list detail"} onPress={()=>props.navigation.navigate("Your Chosen Trail")} />;
};

const styles = StyleSheet.create({});

export default TrailListScreen;
