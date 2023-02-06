import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: null,
        loading: false,
        myOrders: []
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
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        myOrdersRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        myOrdersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                myOrders: action.payload
            }
        },
        myOrdersFail(state, action) {
            return {
                ...state,
                loading: false,
                error: null
            }
        }
       
    }
});

const { actions, reducer } = orderSlice;

export const { 
    createOrderRequest, 
    createOrderSuccess,
    createOrderFail,
    clearError,
    myOrdersFail,
    myOrdersRequest,
    myOrdersSuccess
} = actions;

export default reducer;

