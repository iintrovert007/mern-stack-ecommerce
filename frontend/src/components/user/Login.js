import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/userActions";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { toast } from 'react-toastify';

export  default function Login(){
    const { loading, error, isAuthenticated } = useSelector(state=>state.authState)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }


    useEffect(() => {
        if(isAuthenticated) {
            navigate('/')
        }
        if(error) {
            toast.error(error,{
                position: toast.POSITION.BOTTOM_CENTER
            });
            return;
        }
    }, [dispatch, isAuthenticated, error, navigate])

    return (
        <Fragment>
            {loading ? <Loader/> :
            <Fragment>
                <MetaData title={'Login'} />
                <div className="row wrapper"> 
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler}>
                            <h1 className="mb-3">Login</h1>
                            <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                            />
                            </div>
                
                            <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                            />
                            </div>

                            <a href="/#" className="float-right mb-4">Forgot Password?</a>
                
                            <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            >
                            LOGIN
                            </button>

                            <a href="/#" className="float-right mt-3">New User?</a>
                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )

}