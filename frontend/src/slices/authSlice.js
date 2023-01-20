import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        isAuthenticated: false
    },
    reducers: {
     
        loginRequest(state, action){
            return {
                loading: true,
                isAuthenticated: false
            }
        }, 
        loginSuccess(state, action){
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        loginFail(state, action){
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload,
                user: null
            }
        },
        registerRequest(state, action){
            return {
                loading: true,
                isAuthenticated: false
            }
        }, 
        registerSuccess(state, action){
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        registerFail(state, action){
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload,
                user: null
            }
        },
        clearAuthError(state, action){
            return {
                error: null,
            }
        }
    }
});

const { actions, reducer } = authSlice;

export const { 
    loginRequest,
    loginSuccess, 
    loginFail,
    registerRequest,
    registerSuccess,
    registerFail,
    clearAuthError  
} = actions;

export default reducer;

