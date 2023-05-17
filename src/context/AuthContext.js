import createDataContext from "./createDataContext";
import axios from "axios";
import UsersApi from "../api/UsersApi";


const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return {...state,errorMessage:action.payload}
        default:
            return state
    }
}

const signup = (dispatch) => {
        return async ({
                          firstName,
                          lastName,
                          email,
                          password,
                          city,
                          country,
                          streetName,
                          postalCode,
                      }) => {
            try {
                const response = await UsersApi.post("/register", {
                            firstName,
                            lastName,
                            email,
                            password,
                            address: {
                                city,
                                country,
                                streetName,
                                postalCode
                            }
                        }
                    )
                ;
            } catch
                (err) {
                dispatch({type:'add_error', payload:'Something went wrong with signup'})
            }
        };
    }
;
const signin = (dispatch) => {
    return ({email, password}) => {

    }
}
const signout = (dispatch) => {
    return ({email, password}) => {

    }
}
export const {Provider, Context} = createDataContext(authReducer, {signin, signup, signout}, {isSignedIn: false, errorMessage:''})