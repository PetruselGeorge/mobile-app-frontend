import {createStackNavigator} from "@react-navigation/stack";
import SigninScreen from "../screens/authenticationScreens/SigninScreen";
import SignupScreen from "../screens/authenticationScreens/SignupScreen";
import DrawerNavigator from "./DrawerNavigator";
import ResolveAuthScreen from "../screens/utils/ResolveAuthScreen";


const Stack = createStackNavigator()

const AuthenticationNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={"ResolveAuthScreen"} >
            <Stack.Screen name={"ResolveAuthScreen"} component={ResolveAuthScreen} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name={"SignupScreen"} component={SignupScreen} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name={"SigninScreen"} component={SigninScreen} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name={"Home"} component={DrawerNavigator} options={{headerShown:false}}></Stack.Screen>
        </Stack.Navigator>
    )

}


export default AuthenticationNavigator