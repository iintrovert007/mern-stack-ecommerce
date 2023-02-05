import { Fragment, useState } from "react"
import {countries } from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../slices/cartSlice";
import MetaData from "../layouts/MetaData";
import CheckoutSteps from "./CheckoutSteps";

export default function Shipping () {
    const { shippingInfo } = useSelector(state => state.cartState)

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [phone, setPhone] = useState(shippingInfo.phone);
    const [postcode, setPostcode] = useState(shippingInfo.postcode);
    const [country, setCountry] = useState(shippingInfo.country);
    const countryList = Object.values(countries)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({address, city, country, phone, postcode}))
        navigate('/confirm')
    }

    return (
        <Fragment>
            <MetaData title="Shipping Info" />
            <CheckoutSteps shipping />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={e=>setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={e=>setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phone}
                                onChange={e=>setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postcode}
                                onChange={e=>setPostcode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                onChange={e=>setCountry(e.target.value)}
                                required
                            >
                                {
                                countryList.map((country,i) => (
                                    <option key={i} value={country}>
                                    {country.name}
                                    </option>
                                    )
                                )
                                }
                                    


                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}