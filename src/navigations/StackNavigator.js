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
                        return <DrawerToggleButton tintColor={'white'}/>
                    },
                    headerBackground: () => (
                        <View style={{flex: 1, backgroundColor: '#738B92'}}>
                        </View>
                    ),
                    headerShadowVisible: false,
                    headerTitleStyle: {color: '#E5E5E5'},

                }}
            />
            <Stack.Screen
                name={"Your Chosen Trail"}
                component={TrailDetailScreen}
                options={({navigation}) => ({
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="md-arrow-back-outline" style={{marginRight:'10%'}} size={26}  color="white"/>
                        </TouchableOpacity>
                    ),
                    headerLeft: () => <DrawerToggleButton tintColor={'white'}/>,
                    headerShown: true,
                    drawerItemStyle: {marginTop: 500},
                    headerBackground: () => (
                        <View style={{flex: 1, backgroundColor: '#738B92'}}>
                        </View>
                    ),
                    headerTitleStyle: {color: '#E5E5E5'},

                })}
            />

            <Stack.Screen
                name={"Trail Details"}
                component={DetailScreen}
                options={({navigation}) => ({
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="md-arrow-back-outline" style={{marginRight:'10%'}} size={26} color="white"/>
                        </TouchableOpacity>
                    ),
                    headerLeft: () => <DrawerToggleButton tintColor={'white'}/>,
                    headerBackground: () => (
                        <View style={{flex: 1, backgroundColor: '#738B92'}}>
                        </View>
                    ),

                    headerShown: true,
                    drawerItemStyle: {marginTop: 500},
                    headerTitleStyle: {color: '#E5E5E5'},

                })}
            />

        </Stack.Navigator>
    );
};

export default StackNavigator;