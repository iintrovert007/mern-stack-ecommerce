import { Fragment, useEffect } from "react";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { MDBDataTable} from 'mdbreact'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyOrders  } from "../../actions/orderActions";




export default function MyOrders() {

    const { myOrders, loading } = useSelector(state => state.orderState)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyOrders)
    },[])
    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Number of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }
        myOrders.forEach(order => {
            console.log(order.totalPrice)
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')?
                <p style={{color: 'green'}}>{order.orderStatus}</p>:
                <p style={{color: 'red'}}>{order.orderStatus}</p>,
                actions: <Link to={`/order/${order._id}`}
                    className="btn btn-primary"
                ><i className="fa fa-eye"></i></Link>
            })
        });
        return data;
    
    }
    return (
        <Fragment>
            <MetaData title="My Orders" />
            <h1 className="mt-5">My Orders</h1>
             {loading ? <Loader/>:
             <MDBDataTable
                data={setOrders()}
                className="px-3"
                bordered
                striped
                hover/>
            }
        </Fragment>
    )
}