import {createStackNavigator} from "@react-navigation/stack";
import SigninScreen from "../screens/authenticationScreens/SigninScreen";
import SignupScreen from "../screens/authenticationScreens/SignupScreen";
import DrawerNavigator from "./DrawerNavigator";


const Stack = createStackNavigator()

const AuthenticationNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={"SigninScreen"} >
            <Stack.Screen name={"SigninScreen"} component={SigninScreen}></Stack.Screen>
            <Stack.Screen name={"SignupScreen"} component={SignupScreen}></Stack.Screen>
            <Stack.Screen name={"Home"} component={DrawerNavigator} options={{headerShown:false}}></Stack.Screen>
        </Stack.Navigator>
    )

}


export default AuthenticationNavigator