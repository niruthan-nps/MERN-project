import { createOrderFail, createOrderRequest, createOrderSuccess, userOrdersFail, userOrdersRequest, userOrdersSuccess } from "../slices/orderSlice"
import axios from "axios"

export const createOrder = order => async(dispatch) => {
    try{
        dispatch(createOrderRequest())
        const { data } = await axios.post(`/api/v1/orders/new`, order)
        dispatch(createOrderSuccess(data))
    
    }
    catch(error){
        dispatch(createOrderFail(error.response.data.message))
    }
}

export const userOrder = order => async(dispatch) => {
    try{
        dispatch(userOrdersRequest())
        const { data } = await axios.post(`/api/v1/myorders`)
        dispatch(userOrdersSuccess(data))
    
    }
    catch(error){
        dispatch(userOrdersFail(error.response.data.message))
    }
}