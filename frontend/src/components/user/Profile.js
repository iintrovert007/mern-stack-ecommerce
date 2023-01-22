import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login,clearError } from "../../actions/userActions";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { toast } from 'react-toastify';

export  default function Profile(){
    const {  isAuthenticated, user } = useSelector(state=>state.authState)
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated) {
          navigate('/')
        }
    }, [ isAuthenticated, navigate])

    return (
        user?(<Fragment>
            <MetaData title={'My Profile'} />
            <div className="row justify-content-around mt-5 user-info">
                <div className="col-12 col-md-3">
                    <figure className='avatar avatar-profile'>
                        <img className="rounded-circle img-fluid" src={user.avatar??'./images/default_avatar.png'} alt='' />
                    </figure>
                    <Link to="/myprofile/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                        Edit Profile
                    </Link>
                </div>
        
                <div className="col-12 col-md-5">
                    <h4>Full Name</h4>
                    <p>{user.name}</p>
        
                    <h4>Email Address</h4>
                    <p>{user.email}</p>

                    <h4>Joined On</h4>
                    <p>{String(user.createdAt).substring(0, 10)}</p>

                    <Link to="/myorders" className="btn btn-danger btn-block mt-5">
                        My Orders
                    </Link>

                    <Link to="/change-password" className="btn btn-primary btn-block mt-3">
                        Change Password
                    </Link>
                </div>
            </div>
        </Fragment>):null
    )

}