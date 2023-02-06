import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: null,
        loading: false
    },
    reducers: {
        createOrderRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        createOrderSuccess(state, action){
            return {
                ...state,
                loading: false,
                order: action.payload
            }
        },
        createOrderFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearError() {
            return {
                ...state,
                error: null
            }
        }
    }
});

const { actions, reducer } = cartSlice;

export const { 
    createOrderRequest, 
    createOrderSuccess,
    createOrderFail,
    clearError
} = actions;

export default reducer;

