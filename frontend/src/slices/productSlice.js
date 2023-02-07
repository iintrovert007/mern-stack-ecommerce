import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        product: {},

    },
    reducers: {
        productRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        productSuccess(state, action){
            return {
                ...state,
                loading: false,
                product: action.payload.product
            }
        },
        productFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        submitReviewRequest(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        submitReviewSuccess(state, action){
            return {
                ...state,
                loading: false,
                isReviewSubmitted: true,
            }
        },
        submitReviewFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearError(state) {
            return {
                ...state,
                error: null,
            }
        },
        clearIsReviewSubmitted(state, action) {
            return {
                ...state,
                isReviewSubmitted: false
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
    submitReviewSuccess,
    clearError,
    clearIsReviewSubmitted
} = actions;

export default reducer;

