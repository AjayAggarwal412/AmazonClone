import React, { useEffect, useState } from "react";
import { Input } from "@material-ui/core";
import "./Checkout.css";
import commerce from "../lib/commerce";
import { useHistory } from "react-router-dom";

function Checkout({ cart, setOrder, refreshCart }) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();

  const [generatedToken, setToken] = useState({});
  const [countriesList, setCountriesList] = useState([]);
  const [subdivisonsList, setSubdivisionsList] = useState([]);
  const [shippingOptions, setShippingOptions] = useState();
  const [country, setCountry] = useState();
  const [subdivisions, setSubdivisions] = useState();
  const [shipping, setShipping] = useState();

  const history = useHistory();

  const getShippingCountry = async (tokenID) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      tokenID
    );
    setCountriesList(Object.entries(countries));
  };

  useEffect(() => {
    const generateCartToken = async (cartID) => {
      const token = await commerce.checkout.generateToken(cartID, {
        type: "cart",
      });
      setToken(token);
      console.log(token);
      getShippingCountry(token.id);
    };

    generateCartToken(cart?.id);
  }, [cart]);

  useEffect(() => {
    if (subdivisions) {
      getShippingOptions(generatedToken, country, subdivisions);
    }
  }, [subdivisions]);

  useEffect(() => {
    if (country) {
      getShippingSubDivision(country);
    }
  }, [country]);

  const getShippingSubDivision = async (country) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      country
    );
    setSubdivisionsList(Object.entries(subdivisions));
    setSubdivisions(Object.keys(subdivisions)[0]);
  };

  const getShippingOptions = async (tokenID, country, subdivisions) => {
    const response = await commerce.checkout.getShippingOptions(tokenID.id, {
      country: country,
      subdivisions: subdivisions,
    });
    setShipping(response[0].id);
    setShippingOptions(response);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // alert(firstName);
    try {
      if (generatedToken) {
        const incomingOrder = await commerce.checkout.capture(
          generatedToken.id,
          {
            line_items: generatedToken.live.line_items,
            customer: {
              firstname: firstName,
              lastname: lastName,
              email: email,
            },
            shipping: {
              name: "Primary",
              street: address,
              town_city: city,
              county_state: subdivisions,
              postal_zip_code: zip,
              country: country,
            },
            fulfillment: {
              shipping_method: shipping,
            },
            payment: {
              gateway: "test_gateway",
              card: {
                number: "4242424242424242",
                expiry_month: "02",
                expiry_year: "24",
                cvc: "123",
                postal_zip_code: "94107",
              },
            },
          }
        );

        console.log(incomingOrder);
        setOrder(incomingOrder);
        refreshCart();
        history.push("/thankyou");
      }
    } catch (e) {}
  };

  return (
    <>
      <div className="checkout_wrap">
        <h2>Shipping Details</h2>
        <br />
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="checkout__form">
            <div className="checkout__column">
              <label>First Name</label>
              <Input
                required
                name="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="checkout__column">
              <label>Last Name</label>
              <Input
                required
                name="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="checkout__column">
              <label>Address</label>
              <Input
                required
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="checkout__column">
              <label>Email</label>
              <Input
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="checkout__column">
              <label>City</label>
              <Input
                required
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="checkout__column">
              <label>Zip Code</label>
              <Input
                required
                name="zipcode"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
            <div className="checkout__column">
              <label>Shipping Country</label>
              <select
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {countriesList?.map((country) => {
                  return <option value={country[0]}>{country[1]}</option>;
                })}
              </select>
            </div>
            <div className="checkout__column">
              <label>Shipping Subdivision</label>
              <select
                name="subdivision"
                value={subdivisions}
                onChange={(e) => setSubdivisions(e.target.value)}
              >
                {subdivisonsList?.map((subdivision) => {
                  return (
                    <option value={subdivision[0]}>{subdivision[1]}</option>
                  );
                })}
              </select>
            </div>
            <div className="checkout__column">
              <label>Shipping Options</label>
              <select
                name="shipping"
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
              >
                {shippingOptions?.map((item) => {
                  return (
                    <option value={item.id}>
                      {item.description} {item.price.formatted_with_symbol}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="checkout__column">
              <label>&nbsp;</label>
              <button>Pay Now</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Checkout;
