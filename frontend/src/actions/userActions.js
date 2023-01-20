import axios from 'axios';
import {clearAuthError, loginFail, loginRequest, loginSuccess, registerFail, registerRequest, registerSuccess } from '../slices/authSlice';

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