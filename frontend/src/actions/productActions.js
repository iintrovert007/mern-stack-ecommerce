import { 
    productFail,
    productRequest,
    productSuccess, 
    clearErrors as clearProductErrors,
 } from "../slices/product/productSlice"
 import { 
    productsFail,
    productsRequest,
    productsSuccess, 
    clearErrors as clearProductsErrors,
 } from "../slices/product/productsSlice"
import axios from 'axios'

export const getProducts = async (dispatch) => {
    try {
        dispatch(productsRequest())
        const {data} = await axios.get('/api/v1/products');
        console.log(data);
        dispatch(productsSuccess(data))
    } catch (error) {
        dispatch(productsFail(error.response.data.message))
    }
}

export const getProduct = (id) => async (dispatch) => {
    try {
        dispatch(productRequest())
        const {data} = await axios.get(`/api/v1/product/${id}`);
        dispatch(productSuccess(data))
    } catch (error) {
        dispatch(productFail(error.response.data.message))
    }
}


export const clrProductErrors = (dispatch) => {
    dispatch( clearProductErrors())
}
export const clrProductsErrors = (dispatch) => {
    dispatch( clearProductsErrors())
}