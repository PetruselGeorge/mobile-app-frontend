import createDataContext from "./createDataContext";
import UsersApi from "../api/UsersApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authReducer = (state, action) => {
    switch (action.type) {
        case 'remove_error':
            return {...state, errorMessage: ''};
        case 'signin':
            return {...state, token: action.payload.token, userId: action.payload.userId};
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'signout':
            return {token: null, errorMessage: ''}
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
                  }, callback) => {
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
            dispatch({type: 'add_error', payload: 'Invalid or already used email'});
        }
    };
};


const updateUser=()=>{
    return async ({
                      firstName,
                      lastName
                  }, callback) => {
        try {
            const userId = await AsyncStorage.getItem('userId')
            const token=await AsyncStorage.getItem('token')
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            await UsersApi.put(`/${userId}`, {
                firstName,
                lastName
            },{headers});
            console.log(userId)
            callback()
        } catch (err) {
            console.log(err)
        }
    };

}

const signin = (dispatch) => {
    return async ({email, password}, callback) => {
        try {
            dispatch({type: 'remove_error'})

            const response = await UsersApi.post('/login', {
                email,
                password,
            });
            const token = response.headers.get('Authorization');
            const userId = response.headers.get('UserID');

            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('userId', userId);

            dispatch({type: 'signin', payload: {token, userId}});
            callback()
        } catch (err) {
            console.log(err);
            dispatch({type: 'add_error', payload: 'Invalid email or password'});
        }
    };
};


const tryLocalSignin = (dispatch) => async (valid, invalid) => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');

    if (token) {
        dispatch({type: 'signin', payload: {token, userId}})
        valid()
    } else {
        invalid()
    }
}

const signout = (dispatch) => async (callback) => {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('userId')

    dispatch({type: 'signout'})
    callback()
};

const deleteUser = (dispatch) => async (callback) => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    try{
        await UsersApi.delete(`/${userId}`,{headers})

    }catch (err){
        console.log(err)
    }

    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('userId')

    dispatch({type: 'signout'})
    callback()
};

export const {Provider, Context} = createDataContext(
    authReducer,
    {signin, signup, signout, tryLocalSignin,updateUser,deleteUser},
    {
        token: null,
        errorMessage: '',
        userId: null,
    }
);
