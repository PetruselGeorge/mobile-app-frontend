import {createStackNavigator} from "@react-navigation/stack";
import TrailDetailScreen from "../screens/homeScreens/TrailDetailScreen";
import TrailListScreen from "../screens/homeScreens/TrailListScreen";
import {ImageBackground, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {DrawerToggleButton} from "@react-navigation/drawer";
import DetailScreen from "../screens/homeScreens/DetailScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={"The Trails"}
                component={TrailListScreen}

                options={{
                    headerLeft: () => {
                        return <View><DrawerToggleButton color={'white'}/></View>
                    },
                    headerBackground: () => (
                        <View style={{flex: 1,backgroundColor: '#5D767D'}}>
                        </View>
                    ),
                headerShadowVisible:false,
                headerTitleStyle:{color:'#E5E5E5'}
                }}
            />
            <Stack.Screen
                name={"Your Chosen Trail"}
                component={TrailDetailScreen}
                options={({navigation}) => ({
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="md-arrow-back-outline" size={24} color="black"/>
                        </TouchableOpacity>
                    ),
                    headerLeft: () => <DrawerToggleButton/>,
                    headerShown: true,
                    drawerItemStyle: {marginTop: 500},
                    headerBackground: () => (
                        <View style={{flex: 1,backgroundColor: '#5D767D'}}>
                        </View>
                    ),
                    headerTitleStyle:{color:'#E5E5E5'},

                })}
            />

            <Stack.Screen
                name={"Trail Details"}
                component={DetailScreen}
                options={({navigation}) => ({
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="md-arrow-back-outline" size={24} color="black"/>
                        </TouchableOpacity>
                    ),
                    headerLeft: () => <DrawerToggleButton/>,
                    headerBackground: () => (
                        <View style={{flex: 1,backgroundColor: '#5D767D'}}>
                        </View>
                    ),
                    headerTitleStyle:{color:'#E5E5E5'},

                    headerShown: true,
                    drawerItemStyle: {marginTop: 500},
                })}
            />

        </Stack.Navigator>
    );
};

export default StackNavigator;