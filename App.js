import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import AuthenticationNavigator from "./src/navigations/AuthenticationNavigator";
import {Provider as AuthProvider} from "./src/context/AuthContext"

const App = () => {
    return (
        <NavigationContainer>
            <AuthenticationNavigator/>
        </NavigationContainer>
    )
}
export default () => {
    return <AuthProvider>
        <App/>
    </AuthProvider>


}

