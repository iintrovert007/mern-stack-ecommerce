import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
    name: 'product',
    initialState: {
      product: null
    },
    reducers: {
      productRequest(state, action) {
          return {
            loading:true,
            product: null
          }
      },
      productSuccess(state, action) {
        return {
          loading: false,
          product: action.payload.product,
        }
      },
     productFail(state, action) {
        return {
          loading: false,
          error: action.payload,
        }
      },
      clearErrors(state, action) {
          return  {
             ...state,
             error: null
          }
      }
    },
})

const {actions, reducer } = productSlice;
export const { productRequest, productSuccess, productFail, clearErrors} = actions;
export default reducer;