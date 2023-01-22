import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Search from './Search';
import { DropdownButton, Dropdown, Image } from 'react-bootstrap';

export default function Header () {

    const { user } = useSelector(state => state.authState);

    return (
    <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img width="150px" alt='JVLcart Logo' src="/images/logo.png" />
            </Link>
            </div>
        </div>
  
        <div className="col-12 col-md-6 mt-2 mt-md-0">
           <Search/>
        </div>
  
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          { user ? (
            <Dropdown className='d-inline' variant="">
            <Dropdown.Toggle variant="default text-white pr-5" id="dropdown-basic">
              <figure className='avatar avatar-nav'>
              <Image width="50px" src="./images/default_avatar.png" fluid   />
              </figure>
              <span>{user.name}</span>
            </Dropdown.Toggle>
          
            <Dropdown.Menu>
              <Dropdown.Item className='text-danger' >Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          ) 
          :
          <Link className="btn" to={"/login"} id="login_btn">Login</Link>
          }
          <span id="cart" className="ml-3">Cart</span>
          <span className="ml-1" id="cart_count">2</span>
        </div>
    </nav>
    )
}