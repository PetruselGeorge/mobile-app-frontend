import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import SignupScreen from "./SignupScreen";

const TrailListScreen = (props) => {
  return <Button title={"Go to list detail"} onPress={()=>props.navigation.navigate("TrailDetailScreen")} />;
};

const styles = StyleSheet.create({});

export default TrailListScreen;
