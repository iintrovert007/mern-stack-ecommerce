import axios from 'axios';
import {
    clearAuthError, 
    loadUserRequest, 
    loadUserSuccess, 
    loginFail, 
    loginRequest, 
    loginSuccess, 
    logoutFail, 
    logoutSuccess,
    registerFail, 
    registerRequest, 
    registerSuccess, 
    updatePasswordFail, 
    updatePasswordRequest, 
    updatePasswordSuccess, 
    updateProfileFail, 
    updateProfileRequest,
    updateProfileSuccess} from '../slices/authSlice';

export const login = (email, password) => async (dispatch) => {

    try {  
        dispatch(loginRequest()) 
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data }  =  await axios.post(`/api/v1/login`, {email, password}, config);
        dispatch(loginSuccess(data))
    } catch (error) {
        //handle error
        dispatch(loginFail(error.response.data.message))
    }
    
}

export const register = (userData) => async (dispatch) => {

    try {  
        dispatch(registerRequest()) 
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data }  =  await axios.post(`/api/v1/register`,userData, config);
        dispatch(registerSuccess(data))
    } catch (error) {
        //handle error
        dispatch(registerFail(error.response.data.message))
    }
    
    
}

export const  clearError= dispatch => {
    dispatch(clearAuthError()) 
}

export const  loadUser= async dispatch => {
    try {  
        dispatch(loadUserRequest()) 
      
        const { data }  =  await axios.get(`/api/v1/myprofile`);
        dispatch(loadUserSuccess(data))
    } catch (error) {
        //handle error
    }
    
}

export const  logout = async dispatch => {
    try {  
      
        await axios.get(`/api/v1/logout`);
        dispatch(logoutSuccess())
    } catch (error) {
        //handle error
        dispatch(logoutFail())
    }
    
}


export const updateProfile = (userData) => async (dispatch) => {

    try {  
        dispatch(updateProfileRequest()) 
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data }  =  await axios.put(`/api/v1/update`,userData, config);
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        //handle error
        dispatch(updateProfileFail(error.response.data.message))
    }
    
    
}
export const UpdatePassword = (formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {  
        dispatch(updatePasswordRequest()) 
        await axios.put(`/api/v1/password/change`,formData, config);
        dispatch(updatePasswordSuccess())
    } catch (error) {
        //handle error
        dispatch(updatePasswordFail(error.response.data.message))
    }
    
    
}