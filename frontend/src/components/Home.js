import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productsActions";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import  {toast} from 'react-toastify';
import Pagination from 'react-js-pagination';
import { useParams } from "react-router-dom";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';




export  default function Home(){
    const {products, loading, error, productsCount, resPerPage} =    useSelector((state) => state.productsState)
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 1000]);
    const [priceChanged, setPriceChanged] = useState(price);
    const { keyword } = useParams();
    const dispatch = useDispatch();
    
    useEffect(()=>{  
        if(error) {
            return toast.error(error,{
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        dispatch(getProducts(keyword, keyword?price:[1, 1000], currentPage)) 
    }, [error,dispatch, currentPage, keyword, priceChanged])

    const setCurrentPageNo = (pageNo) =>{
        setCurrentPage(pageNo);
    }

    return (
        <Fragment>
            {loading ? <Loader/>:
                <Fragment>
                    <MetaData title={'Buy Best Products'} />
                    <h1 id="products_heading">Latest Products</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                        
                                {keyword? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                            <div className="px-5" onMouseUp={() => setPriceChanged(price)} >
                                                <Slider
                                                    range={true}
                                                    marks={{
                                                        1 : "$1",
                                                        1000: "$1000"
                                                    }}
                                                    // value={price}
                                                    min={1}
                                                    max={1000}
                                                    defaultValue={price}
                                                    onChange={
                                                        (price) => { 
                                                           setPrice(price)
                                                        }
                                                    }
                                                    handleRender={renderProps => {
                                                        return (    
                                                                <Tooltip visible={true} overlay={`$${renderProps.props['aria-valuenow']}`} placement="top"><div {...renderProps.props}>{renderProps.props.value}</div></Tooltip>
                                                        );
                                                    }}
                                                    />
                                            </div>
                                    </div>
                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                        { products && products.map(product => (
                                            <Product col={4} key={product._id} product={product}/>
                                        ))}
                                        </div>
                                    </div>
                                </Fragment>

                            
                                ) : products && products.map(product => (
                                    <Product col={3} key={product._id} product={product}/>
                                ))}
                            
                        </div>
                    </section>
                    {productsCount>0 && resPerPage <= productsCount?
                    <div className="d-flex justify-content-center mt-5">
                  
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText= {'Next'}
                            prevPageText = {'Prev'}
                            firstPageText = {'First'}
                            lastPageText = {'Last'}
                            itemClass = {'page-item'}
                            linkClass = {'page-link'}    
                        />
                    </div>
                    :null}
                 
                </Fragment>
           }
        </Fragment>
    )
}