import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import AuthenticationNavigator from "./src/navigations/AuthenticationNavigator";

export default () => {
    return (
        <NavigationContainer>
            <AuthenticationNavigator/>
        </NavigationContainer>
    )
}

