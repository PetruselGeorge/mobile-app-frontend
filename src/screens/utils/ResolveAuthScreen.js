import React from "react";
import {Context as AuthContext} from "../../context/AuthContext";
import {useEffect} from "react";

const ResolveAuthScreen=({navigation})=>{
const {tryLocalSignin}=React.useContext(AuthContext)

    useEffect(() => {
        tryLocalSignin(() => {
            navigation.navigate('Home')
        }, () => {
            navigation.navigate('SigninScreen')
        }, [])
    })

    return null
}




export default ResolveAuthScreen