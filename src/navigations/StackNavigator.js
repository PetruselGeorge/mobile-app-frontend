import {createStackNavigator} from "@react-navigation/stack";
import TrailDetailScreen from "../screens/homeScreens/TrailDetailScreen";
import TrailListScreen from "../screens/homeScreens/TrailListScreen";
import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {DrawerToggleButton} from "@react-navigation/drawer";

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={"The Trails"}
                component={TrailListScreen}
                options={{
                    headerLeft: () => {
                        return <DrawerToggleButton/>
                    }
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
                })}
            />

        </Stack.Navigator>
    );
};

export default StackNavigator;