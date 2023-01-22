import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError, updateProfile } from "../../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export  default function UpdateProfile(){
    const { loading, error, user, isUpdated } = useSelector(state => state.authState)
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPReview] = useState('/images/default_avatar.png');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('avatar', avatar);
        dispatch(updateProfile(formData));
    }

    const onChangeAvatar = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPReview(reader.result);
                setAvatar(e.target.files[0])
            }
        
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(() => {
        if(user) {
            setName(user.name);
            setEmail(user.email);
            if(user.avatar) {
                setAvatarPReview(user.avatar)
            }
        }
        if(isUpdated) {
            toast('Profile Updated Successfully!',{
                    type: 'success',
                    position: toast.POSITION.BOTTOM_CENTER,
                }
            );
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
    },[user, isUpdated, error])

    return (
        <Fragment>
          <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input 
								type="text" 
								id="name_field" 
								className="form-control"
                                name='name'
                                value={name}
                                onChange={e=>setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="text"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
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
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        onChange={onChangeAvatar}
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                </label>
                                </div>
                            </div>
                        </div>

                        <button  disabled={loading} type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                    </form>
                </div>
        </div>
        </Fragment>
    )

}