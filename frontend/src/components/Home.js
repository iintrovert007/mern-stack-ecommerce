import React, { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../actions/productActions"
import MetaData from "./layouts/MetaData"
import Loader from "./Loader"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify"; 
import Product from "./product/Product"

export default function Home() {
    const { loading, products, error, productsCount }  = useSelector(state => state.productsState)

    const dispatch = useDispatch()
    
    useEffect(()=>{
        if(error) {
           return toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        dispatch(getProducts)
    },[error])
    
    return (
        <Fragment>
            {loading ? <Loader/> :
            <Fragment>
                <MetaData title={'Buy Best Products'}/>
                <div className="container">
                    <h1 id="products_heading">Latest Products</h1>

                    <section id="products" className="container mt-5">
                    <div className="row">
                        {products && products.map(product => (
                            <Product key={product._id} product={product}/>
                        ))}
                    </div>
                    </section>
                </div>
            </Fragment>}
        </Fragment>
    )
}