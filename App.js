import React, {forwardRef} from "react";
import {NavigationContainer} from "@react-navigation/native";
import AuthenticationNavigator from "./src/navigations/AuthenticationNavigator";
import {Provider as AuthProvider} from "./src/context/AuthContext"
import {setNavigator} from "./src/utils/NavigationRef";

const App = forwardRef((props, ref) => {
    return (
        <NavigationContainer>
            <AuthenticationNavigator/>
        </NavigationContainer>
    )
})
export default () => {
    return <AuthProvider>
        <App ref={(navigator)=>{setNavigator({navigator})}} />
    </AuthProvider>


}

