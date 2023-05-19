import createDataContext from "./createDataContext";
import UsersApi from "../api/UsersApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authReducer = (state, action) => {
    switch (action.type) {
        case 'remove_error':
            return { ...state, errorMessage: '' };
        case 'signin':
            return { ...state, token: action.payload };
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};

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
                  },callback) => {
        try {
            dispatch({type: 'remove_error'})
            await UsersApi.post("/register", {
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
            });
            callback()
        } catch (err) {
            dispatch({ type: 'add_error', payload: 'Invalid or already used email' });
        }
    };
};

const signin = (dispatch) => {
    return async ({ email, password },callback) => {
        try {
            dispatch({type: 'remove_error'})

            const response = await UsersApi.post('/login', {
                email,
                password,
            });
            const token = response.headers.get('Authorization');
            await AsyncStorage.setItem('token', token);
            dispatch({ type: 'signin', payload: token });
            callback()
        } catch (err) {
            console.log(err);
            dispatch({ type: 'add_error', payload: 'Invalid or already used email' });
        }
    };
};

const signout = (dispatch) => {
    return ({ email, password }) => {
        // Your signout logic here
    };
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signup, signout },
    {
        token: null,
        errorMessage: ''
    }
);
