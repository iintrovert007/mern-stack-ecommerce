import { createSlice } from "@reduxjs/toolkit"

const productsSlice = createSlice({
    name: 'products',
    initialState: {
      products: []
    },
    reducers: {
      productsRequest(state, action) {
          return {
            loading:true,
            products: []
          }
      },
      productsSuccess(state, action) {
        return {
          loading: false,
          products: action.payload.products,
          productsCount: action.payload.count
        }
      },
      productsFail(state, action) {
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

const {actions, reducer } = productsSlice;
export const { productsRequest,productsFail, productsSuccess, clearErrors} = actions;
export default reducer;