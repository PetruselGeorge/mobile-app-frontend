import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import header from "@react-navigation/stack/src/views/Header/Header";

const TrailDetailScreen = ({navigation}) => {
    return <TouchableOpacity onPress={() => {
        return navigation.navigate("The Trails")
    }}>
        <Text>Search for more trails</Text>
    </TouchableOpacity>
};

const styles = StyleSheet.create({});


export default TrailDetailScreen;
