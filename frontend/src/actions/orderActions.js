import { createOrderFail, createOrderRequest, createOrderSuccess } from "../slices/orderSlice";

export const createOrder = async (order) => {
    try {
        dispatch(createOrderRequest())
        const { data }  = await axios.put(`/api/v1/order/new`,order);
        dispatch(createOrderSuccess(data))
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message))
    }
}

