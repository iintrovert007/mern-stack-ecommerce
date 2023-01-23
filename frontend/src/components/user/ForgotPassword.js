import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, forgotPassword, } from "../../actions/userActions";
import { toast } from "react-toastify";


export  default function ForgotPassword(){
    const { loading, error, user, message } = useSelector(state => state.authState)
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        dispatch(forgotPassword(formData));
    }

    

    useEffect(() => {
        if(message) {
            toast(message,{
                    type: 'success',
                    position: toast.POSITION.BOTTOM_CENTER,
                }
            );
            setEmail("");
            return;
        }
        if(error) {
            toast(error,{
                    type: 'error',
                    position: toast.POSITION.BOTTOM_CENTER,
                    onOpen: () => dispatch(clearError)
                }
            );
            return;
        }
    },[user, message, error])

    return (
        <Fragment>
            <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form onSubmit={submitHandler} className="shadow-lg">
                            <h1 className="mb-3">Forgot Password</h1>
                            <div className="form-group">
                                <label htmlFor="email_field">Enter Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    value={email}
                                    onChange={e=>setEmail(e.target.value)}
                                />
                            </div>

                            <button
                                disabled={loading}
                                id="forgot_password_button"
                                type="submit"
                                className="btn btn-block py-3">
                                Send Email
                        </button>

                        </form>
                    </div>
            </div>
        </Fragment>
    )

}