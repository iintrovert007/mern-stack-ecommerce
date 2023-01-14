import axios from 'axios';
import { productsFail, productsSuccess, productsRequest } from '../slices/productsSlice';

export const getProducts = (keyword = null, price = [], category = null, currentPage = 1) => async (dispatch) => {
    try {  
        dispatch(productsRequest()) 
        let link = `/api/v1/products?page=${currentPage}`;
        if(keyword) {
            link += `&keyword=${keyword}`;
        }
        if(price) {
            link += `&price[lte]=${price[1]}&price[gte]=${price[0]}`;
        }
        if(category) {
            link += `&category=${category}`;
        }
        
        const { data }  =  await axios.get(link);
        dispatch(productsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(productsFail(error.response.data.message))
    }
    
}