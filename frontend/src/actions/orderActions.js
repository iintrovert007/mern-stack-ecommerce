import { createOrderFail, createOrderRequest, createOrderSuccess, myOrdersFail, myOrdersRequest, myOrdersSuccess, orderDetailFail, orderDetailRequest, orderDetailSuccess } from "../slices/orderSlice";
import axios from "axios";
export const createOrder = order => async (dispatch) => {
    try {
        dispatch(createOrderRequest())
        const { data }  = await axios.post(`/api/v1/order/new`,order);
        dispatch(createOrderSuccess(data))
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message))
    }
}

export const getMyOrders = async (dispatch) => {
    try {
        dispatch(myOrdersRequest())
        const { data }  = await axios.get(`/api/v1/myorders`);
        dispatch(myOrdersSuccess(data.orders))
    } catch (error) {
        dispatch(myOrdersFail(error.response.data.message))
    }
}

export const getOrderDetail = id => async (dispatch) => {
    try {
        dispatch(orderDetailRequest())
        const { data }  = await axios.get(`/api/v1/order/${id}`);
        dispatch(orderDetailSuccess(data.order))
    } catch (error) {
        dispatch(orderDetailFail(error.response.data.message))
    }
}

