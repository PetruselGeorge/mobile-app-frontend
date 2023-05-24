import {createDrawerNavigator} from "@react-navigation/drawer";
import AccountScreen from "../screens/homeScreens/AccountScreen";
import TrailCreateScreen from "../screens/homeScreens/TrailCreateScreen";
import StackNavigator from "./StackNavigator";

import {ImageBackground, View} from "react-native";

const Drawer = createDrawerNavigator()
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={() => ({
                drawerPosition: "left",
                drawerStatusBarAnimation: "slide", headerShown: false,

            })}
            backBehavior="history"


        >
            <Drawer.Screen name={"Trails"} component={StackNavigator} options={{headerShown: false}}/>
            <Drawer.Screen name={"Add your trail!"} component={TrailCreateScreen} options={{headerShown: true}}/>
            <Drawer.Screen
                name={"Account Settings"}
                component={AccountScreen}
                options={{
                    drawerItemStyle: {marginTop: '180%'},
                    headerShown: true,
                    headerBackground: () => (
                        <View style={{flex: 1,backgroundColor: '#5D767D'}}>

                        </View>
                    ),
                    headerShadowVisible:false,
                    headerTitleStyle:{color:'#E5E5E5'}
                }}
            />
        </Drawer.Navigator>
    );
};


export default DrawerNavigator;
