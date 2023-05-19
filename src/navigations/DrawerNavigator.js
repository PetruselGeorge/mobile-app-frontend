import {createDrawerNavigator} from "@react-navigation/drawer";
import AccountScreen from "../screens/homeScreens/AccountScreen";
import TrailCreateScreen from "../screens/homeScreens/TrailCreateScreen";
import StackNavigator from "./StackNavigator";

const Drawer = createDrawerNavigator()
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={() => ({
                drawerPosition: "left",
                drawerStatusBarAnimation: "slide", headerShown: false
            })}
            backBehavior="history"
        >
            <Drawer.Screen name={"Trails"} component={StackNavigator}/>
            <Drawer.Screen name={"Add your trail!"} component={TrailCreateScreen} options={{headerShown: true}}/>
            <Drawer.Screen
                name={"Account Settings"}
                component={AccountScreen}
                options={{
                    drawerItemStyle: {marginTop: 500},
                    headerShown: true
                }}
            />
        </Drawer.Navigator>
    );
};


export default DrawerNavigator;
