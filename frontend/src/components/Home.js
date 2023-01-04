import React, { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../actions/productActions"
import MetaData from "./layouts/MetaData"
import Loader from "./Loader"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
    const { loading, products, error, productsCount }  = useSelector(state => state.productsState)

    const dispatch = useDispatch()
    
    useEffect(()=>{
        if(error) {
           return toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        getProducts(dispatch)
    },[error])
    
    return (
        <Fragment>
            <ToastContainer theme="dark"/>
            {loading ? <Loader/> :
            <Fragment>
                <MetaData title={'Buy Best Products'}/>
                <div className="container">
                    <h1 id="products_heading">Latest Products</h1>

                    <section id="products" className="container mt-5">
                    <div className="row">
                        {products && products.map(product => (
                            <div key={product._id} className="col-sm-12 col-md-6 col-lg-3 my-3">
                                <div className="card p-3 rounded">
                                    <img
                                    className="card-img-top mx-auto"
                                    src={product.images[0].image}
                                    />
                                    <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">
                                        <a href="">{product.name}</a>
                                    </h5>
                                    <div className="ratings mt-auto">
                                        <div className="rating-outer">
                                        <div className="rating-inner" style={{width: `${product.ratings/5 * 100}%`}}></div>
                                        </div>
                                        <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                                    </div>
                                    <p className="card-text">${product.price}</p>
                                    <a href="#" id="view_btn" className="btn btn-block">View Details</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    </section>
                </div>
            </Fragment>}
        </Fragment>
    )
}