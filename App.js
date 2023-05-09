import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import TrailListScreen from "./src/screens/TrailListScreen";
import TrailDetailScreen from "./src/screens/TrailDetailScreen";
import {createStackNavigator} from "@react-navigation/stack";
import TrailCreateScreen from "./src/screens/TrailCreateScreen";
import AccountScreen from "./src/screens/AccountScreen";
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";

function HomeScreen({navigation}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button
                onPress={() => navigation.navigate('Notifications')}
                title="Go to notifications"
            />
        </View>
    );
}

function NotificationsScreen({navigation}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button onPress={() => navigation.goBack()} title="Go back home"/>
        </View>
    );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"TrailListScreen"} component={TrailListScreen}/>
            <Stack.Screen name={"TrailDetailScreen"} component={TrailDetailScreen}/>
        </Stack.Navigator>
    )
}

const DrawerPart = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name={"stackNavigator"} component={StackNavigator}/>
            <Drawer.Screen name={"TrailCreateScreen"} component={TrailCreateScreen}/>
            <Drawer.Screen name={"AccountScreen"} component={AccountScreen}/>
        </Drawer.Navigator>
    )
}

export default () => {
    return (<>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={"SignupScreen"} component={SignupScreen}/>
                    <Stack.Screen name={"SigninScreen"} component={SigninScreen}/>
                    <Stack.Screen name={"drawerPart"} component={DrawerPart}/>
                </Stack.Navigator>
            </NavigationContainer>

        </>
    );
}