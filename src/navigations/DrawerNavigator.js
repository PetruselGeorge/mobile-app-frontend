import {createDrawerNavigator} from "@react-navigation/drawer";
import AccountScreen from "../screens/homeScreens/AccountScreen";
import DetailScreen from "../screens/homeScreens/DetailScreen";
import StackNavigator from "./StackNavigator";

import {ImageBackground, View} from "react-native";
import FavouriteScreen from "../screens/homeScreens/FavouriteScreen";

const Drawer = createDrawerNavigator()
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={() => ({
                drawerPosition: "left",
                drawerStatusBarAnimation: "slide", headerShown: false,
                headerTintColor:'white'
            })}
            backBehavior="history"


        >
            <Drawer.Screen name={"Trails"} component={StackNavigator} options={{headerShown: false}}/>
            <Drawer.Screen name={"Favourites"} component={FavouriteScreen} options={{
                headerShown: true, headerBackground: () => (
                    <View style={{flex: 1, backgroundColor: '#738B92'}}>

                    </View>
                ),
                headerShadowVisible: false,
            }}/>

            <Drawer.Screen
                name={"Account Settings"}
                component={AccountScreen}
                options={{
                    drawerItemStyle: {marginTop: '180%'},
                    headerShown: true,
                    headerBackground: () => (
                        <View style={{flex: 1, backgroundColor: '#738B92'}}>

                        </View>
                    ),
                    headerShadowVisible: false,
                }}
            />
        </Drawer.Navigator>
    );
};


export default DrawerNavigator;
