import { loginFail, 
        loginRequest, 
        loginSuccess, clearError, 
        registerSuccess, 
        registerFail, 
        registerRequest, 
        loadUserRequest,
        loadUserSuccess,
        loadUserFail,
        logoutSuccess,
        logoutFail} from "../slices/authSlice";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest());

        const { data } = await axios.post(`/api/v1/login`,{ email, password });

        dispatch(loginSuccess(data));
    } catch (error) {
        dispatch(loginFail(error.response.data.message || error.message));
    }
}

export const clearAuthError = () => async (dispatch) => {
    dispatch(clearError());
}

// export const register = (userData) => async (dispatch) => {
//     try {
//         dispatch(registerRequest());

//         const config = {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         };

//         const { data } = await axios.post(`/api/v1/register`,{ userData, config });

//         dispatch(registerSuccess(data));
//     } catch (error) {
//         dispatch(registerFail(error.response.data.message || error.message));
//     }
// }

export const register = (userData) => async (dispatch) => {
    try {
        dispatch(registerRequest());

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        const { data } = await axios.post(`/api/v1/register`, userData, config); // ✅ FIXED

        dispatch(registerSuccess(data));
    } catch (error) {
        dispatch(registerFail(error.response.data.message || error.message));
    }
}

export const loadUser = async (dispatch) => {
    try {
        dispatch(loadUserRequest());

        const { data } = await axios.get(`/api/v1/myprofile`); 

        dispatch(loadUserSuccess(data));
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message || error.message));
    }
}

export const logout = async (dispatch) => {
    try {

        await axios.get(`/api/v1/logout`); 

        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logoutFail(error.response.data.message || error.message));
    }
}