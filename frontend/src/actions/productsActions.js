import axios from 'axios';
import { productsFail, productsSuccess, productsRequest } from '../slices/productsSlice';

export const getProducts = (keyword = '', currentPage = 1) => async (dispatch) => {

    try {  
        dispatch(productsRequest()) 
        const { data }  =  await axios.get(`/api/v1/products?page=${currentPage}&keyword=${keyword}`);
        dispatch(productsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(productsFail(error.response.data.message))
    }
    
}