import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        product: {}
    },
    reducers: {
        productRequest(state, action){
            return {
                loading: true
            }
        },
        productSuccess(state, action){
            return {
                loading: false,
                product: action.payload.product
            }
        },
        productFail(state, action){
            return {
                loading: false,
                error:  action.payload
            }
        },
        submitReviewRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        submitReviewSuccess(state, action){
            return {
                loading: false,
                isReviewSubmitted: true
            }
        },
        submitReviewFail(state, action){
            return {
                loading: false,
                error:  action.payload
            }
        },
        clearError(state) {
            return {
                ...state,
                error: null
            }
        }
    }
});

const { actions, reducer } = productSlice;

export const { 
    productRequest, 
    productSuccess, 
    productFail,
    submitReviewFail,
    submitReviewRequest,
    submitReviewSuccess 
} = actions;

export default reducer;

