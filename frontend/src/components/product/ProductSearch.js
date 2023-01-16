import { useEffect, useState } from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import Search from "../layouts/Search";
import { useParams } from "react-router-dom";
import { Fragment } from "react"; 
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import { getProducts } from "../../actions/productsActions";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import Loader from "../layouts/Loader";



export default function ProductSearch() {
    const {products, loading, error, productsCount, resPerPage} =    useSelector((state) => state.productsState)

    const [currentPage, setCurrentPage] = useState(1);
    const { keyword } = useParams();
    const [price, setPrice] = useState([1, 1000]);
    const [priceChanged, setPriceChanged] = useState(price);
    const [category, setCategory] = useState(null);
    const [rating, setRating] = useState(0);


    const dispatch = useDispatch();

    const setCurrentPageNo = (pageNo) =>{
        setCurrentPage(pageNo);
    }

    const categories = [
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    useEffect(() => {
        if(error) {
            return toast.error(error,{
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        dispatch(getProducts(keyword, price, category, rating, currentPage)) 
    },[keyword, priceChanged, category, rating])


return(  
    <Fragment>
        <MetaData title={'Buy Best Products'} />
        <h1>Search Products</h1>
        <section id="products" className="container mt-5">
                        <div className="row">
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
                                                        <Tooltip  overlay={`$${renderProps.props['aria-valuenow']}`} placement="top"><div {...renderProps.props}>{renderProps.props.value}</div></Tooltip>
                                                );
                                            }}
                                            />
                                    </div>
                                    <hr className="my-5" />
                                    <div className="mt-5">
                                            <h4 className="mb-3">Categories</h4>
                                            <ul className="pl-0">
                                                {
                                                    categories.map(category => 
                                                        <li 
                                                            style={{cursor: "pointer",listStyleType: "none"}}
                                                            key={category} 
                                                            onClick={() => {setCategory(category)}}
                                                            
                                                            >{category}</li>
                                                    )
                                                }
                                            </ul>
                                    </div>
                                    <hr className="my-5" />
                                    <div className="mt-5">
                                            <h4 className="mb-3">Ratings</h4>
                                            <ul className="pl-0">
                                                {
                                                    [5, 4, 3, 2, 1].map(star => 
                                                        <li 
                                                            style={{cursor: "pointer",listStyleType: "none"}}
                                                            key={star} 
                                                            onClick={() => {setRating(star)}}
                                                            
                                                            >
                                                           <div className="rating-outer">
                                                                <div 
                                                                className="rating-inner"
                                                                style={{
                                                                    width: `${star * 20}%`
                                                                }}
                                                                >

                                                                </div>
                                                            </div>     
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                    </div>
                            </div>
                            <div className="col-6 col-md-9">
                                <div className="row">
                                { loading ? <Loader/>: products && products.map(product => (
                                    <Product col={4} key={product._id} product={product}/>
                                ))}
                                </div>
                            </div>
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
    )
}