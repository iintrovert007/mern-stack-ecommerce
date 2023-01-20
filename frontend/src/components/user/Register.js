import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError } from "../../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export  default function Register(){
    const { loading, error,  isAuthenticated } = useSelector(state => state.authState)
    const [userData, setUserData] = useState({
        name : '',
        email: '',
        password: ''
    });
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPReview] = useState('/images/default_avatar.png');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('avatar', avatar);
        dispatch(register(formData));
    }

    const onChange = (e) => {
        if(e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPReview(reader.result);
                    setAvatar(e.target.files[0])
                }
            
            }
            reader.readAsDataURL(e.target.files[0]);
        }else{
            setUserData({...userData, [e.target.name]:e.target.value})
        }
    }

    useEffect(() => {
        if(isAuthenticated) {
            navigate('/')
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
    },[error, isAuthenticated, navigate, dispatch])

    return (
        <Fragment>
            <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}  encType='multipart/form-data'>
                                <h1 className="mb-3">Register</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        id="name_field" 
                                        className="form-control" 
                                        onChange={onChange}
                                        />
                                </div>

                                <div className="form-group">
                                <label htmlFor="email_field">Email</label>
                                <input
                                    name="email"
                                    text="text"
                                    id="email_field"
                                    className="form-control"
                                    onChange={onChange}
                                    
                                />
                                </div>
                    
                                <div className="form-group">
                                <label htmlFor="password_field">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password_field"
                                    className="form-control"
                                    onChange={onChange}
                                    
                                />
                                </div>

                                <div className='form-group'>
                                <label htmlFor='avatar_upload'>Avatar</label>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <figure className='avatar mr-3 item-rtl'>
                                            <img
                                                src={avatarPreview}
                                                className='rounded-circle'
                                                alt='Avatar'
                                            />
                                        </figure>
                                    </div>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='avatar'
                                            className='custom-file-input'
                                            id='customFile'
                                            accept="images/*"
                                            onChange={onChange}
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Avatar
                                        </label>
                                    </div>
                                </div>
                            </div>
                    
                                <button
                                id="register_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled={loading}
                                >
                                REGISTER
                                </button>
                            </form>
                        </div>
            </div>
        </Fragment>
    )

}