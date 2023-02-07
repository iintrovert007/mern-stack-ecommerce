import { Fragment, useEffect } from "react";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrderDetail  } from "../../actions/orderActions";




export default function OrderDetail() {
 
    const { order, loading } = useSelector(state => state.orderState)
    const { shippingInfo={}, user={}, orderStatus='Processing', orderItems=[], totalPrice=0, paymentInfo={} } = order;
    const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true: false;
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getOrderDetail(id))
    },[id])
    
    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode},
    ${shippingInfo.country}`;

    return (
        <Fragment>
            <MetaData title="My Orders" />
            {loading ? <Loader/>:
                <Fragment>
                    <div class="row d-flex justify-content-between">
                        <div class="col-12 col-lg-8 mt-5 order-details">

                            <h1 class="my-5">Order # 4543f34f545</h1>

                            <h4 class="mb-4">Shipping Info</h4>
                            <p><b>Name:</b> {user.name}</p>
                            <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                            <p class="mb-4"><b>Address:</b>{shippingDetails}</p>
                            <p><b>Amount:</b> ${totalPrice}</p>

                            <hr />

                            <h4 class="my-4">Payment</h4>
                            <p class={isPaid ? "greenColor": "redColor"}><b>{isPaid ? "PAID": "NOT PAID"}</b></p>


                            <h4 class="my-4">Order Status:</h4>
                            <p class={orderStatus && orderStatus.includes('Delivered') ? "greenColor": "redColor"} ><b>{isPaid ? "PAID": "NOT PAID"}</b></p>


                            <h4 class="my-4">Order Items:</h4>

                            <hr />
                            <div class="cart-item my-1">
                                    {orderItems && orderItems.map( item => (
                                        <div key={item.product} class="row my-5">
                                            <div class="col-4 col-lg-2">
                                                <img src={item.image} alt={item.name} height="45" width="65" />
                                            </div>

                                            <div class="col-5 col-lg-5">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>


                                            <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p>${item.price}</p>
                                            </div>

                                            <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <p>{item.quantity} Piece(s)</p>
                                            </div>
                                        </div>
                                        ))
                                    }
                            </div>
                            <hr />
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}