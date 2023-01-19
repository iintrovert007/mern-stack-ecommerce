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
                user: action.payload
            }
        },
        loginFail(state, action){
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload,
                user: null
            }
        }
    }
});

const { actions, reducer } = authSlice;

export const { loginRequest, loginSuccess, loginFail } = actions;

export default reducer;

