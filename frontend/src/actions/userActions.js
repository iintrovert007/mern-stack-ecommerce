import axios from 'axios';
import { loginFail, loginRequest, loginSuccess } from '../slices/authSlice';

export const login = (email, password) => async (dispatch) => {

    try {  
        dispatch(loginRequest()) 
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data }  =  await axios.get(`/api/v1/login`, {email, password}, config);
        dispatch(loginSuccess(data))
    } catch (error) {
        //handle error
        dispatch(loginFail(error.response.data.message))
    }
    
}