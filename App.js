import * as React from 'react';
import {Text, Button, TouchableOpacity, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import TrailListScreen from "./src/screens/TrailListScreen";
import TrailDetailScreen from "./src/screens/TrailDetailScreen";
import {createStackNavigator} from "@react-navigation/stack";
import TrailCreateScreen from "./src/screens/TrailCreateScreen";
import AccountScreen from "./src/screens/AccountScreen";
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import {Ionicons} from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const StackNavigator = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName={"C"}>
            <Stack.Screen name={"TrailListScreen"} component={TrailListScreen} options={{headerShown: false}}/>
            <Stack.Screen
                name={"TrailDetailScreen"}
                component={TrailDetailScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

const DrawerPart = ({navigation}) => {
    return (
        <Drawer.Navigator initialRouteName={"B"}>
            <Drawer.Screen name={"TrailCreateScreen"} component={TrailCreateScreen}/>
            <Drawer.Screen name={"AccountScreen"} component={AccountScreen}/>
            <Drawer.Screen
                name={"Trails"}
                component={StackNavigator}
                options={({route}) => {
                    return {
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('TrailListScreen')}>
                                <Ionicons name="arrow-back" style={{marginRight: 5}} size={24} color="black"/>
                            </TouchableOpacity>
                        )
                    }

                }}
            />
        </Drawer.Navigator>
    )
}

export default () => {
    return (<>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={"A"}>
                    <Stack.Screen name={"SignupScreen"} component={SignupScreen}/>
                    <Stack.Screen name={"SigninScreen"} component={SigninScreen}/>
                    <Stack.Screen name={"DrawerPart"} component={DrawerPart} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>

        </>
    );
}