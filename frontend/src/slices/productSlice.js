import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        product: {},
        isReviewSubmitted: false,
        isProductCreated: false,
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
        createReviewRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        createReviewSuccess(state, action){
            return {
                ...state,
                loading: false,
                isReviewSubmitted: true
            }
        },
        createReviewFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearReviewSubmitted(state, action) {
            return {
                ...state,
                isReviewSubmitted: false
            }
        },
        clearError(state, action) {
           return{ ...state,
            error: null
           }
        },
        clearProduct(state, action) {
            return{ ...state,
                product : {}
            }
        },
        // reducers for admin creating new product
        newProductRequest(state, action){
            return {
                loading: true
            }
        },
        newProductSuccess(state, action){
            return {
                loading: false,
                //  check postman "Create new product" request getting "product" in response
                product: action.payload.product,
                isProductCreated: true,
            }
        },
        newProductFail(state, action){
            return {
                loading: false,
                error:  action.payload
            }
        },
        clearProductCreated(state, action) {
            return {
                ...state,
                isProductCreated: false
            }
        },

    }
});

const { actions, reducer } = productSlice;

export const { 
    productRequest, 
    productSuccess, 
    productFail,
    createReviewFail,
    createReviewRequest,
    createReviewSuccess,
    clearError,
    clearReviewSubmitted,
    clearProduct,
    newProductRequest,
    newProductFail,
    newProductSuccess,
    clearProductCreated
} = actions;

export default reducer;

