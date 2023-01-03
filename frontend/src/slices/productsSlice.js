import { createSlice } from "@reduxjs/toolkit"

const productsSlice = createSlice({
    name: 'products',
    initialState: {
      products: []
    },
    reducers: {
      allProductsRequest(state, action) {
          return {
            loading:true,
            products: []
          }
      },
      allProductsSuccess(state, action) {
        return {
          loading: false,
          products: action.payload.products,
          productsCount: action.payload.productsCount
        }
      },
      allProductsFail(state, action) {
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
export const { allProductsRequest,allProductsFail, allProductsSuccess, clearErrors} = actions;
export default reducer;