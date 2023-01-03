import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import productsReducer from './slices/productsSlice';

const reducer = combineReducers({
    products: productsReducer
})

const store = configureStore({
    reducer,
    middleware: [thunk],
});

export default store;