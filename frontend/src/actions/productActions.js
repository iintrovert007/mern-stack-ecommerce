import { allProductsFail, allProductsRequest, allProductsSuccess, clearErrors } from "../slices/productsSlice"
import axios from 'axios'

export const getProducts = async (dispatch) => {
    try {
        dispatch(allProductsRequest())
        const {data} = await axios.get('/api/v1/products');
        dispatch(allProductsSuccess(data))
    } catch (error) {
        dispatch(allProductsFail(error.response.data.message))
    }
}

export const clearProductErrors = (dispatch) => {
    dispatch( clearErrors())
}