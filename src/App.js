import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Product from "./components/Product";
import Login from "./components/Login";
import commerce from "./lib/commerce";
import "./App.css";
import Checkout from "./components/Checkout";
import Thankyou from "./components/Thankyou";
import useLoader from "./components/useLoader";
import ProductDetailPage from "./components/ProductDetailPage";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";

function App() {
  const [productsList, setProductsList] = useState([]);
  const [cart, setCart] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [productsListByCategory, setProductsListByCategory] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const [loader, showLoader, hideLoader] = useLoader();

  const fetchProducts = async () => {
    showLoader();
    const response = await commerce.products.list();
    hideLoader();
    console.log(response);
    setProductsList(response.data);
  };

  const fetchProductsByCategory = async (category) => {
    const response = await commerce.products.list({
      category_slug: [category],
    });
    // console.log(response.data);

    setProductsListByCategory(response.data);
  };

  const addToCart = async (productId, qty) => {
    showLoader();
    const response = await commerce.cart.add(productId, qty);
    hideLoader();
    console.log(productId);
    console.log(response);
    setCart(response.cart);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
    console.log();
  };

  const removeFromCart = async (productId) => {
    showLoader();
    const response = await commerce.cart.remove(productId);
    hideLoader();
    setCart(response.cart);
  };

  const decrementQuantity = async (id, qty) => {
    if (qty > 1) {
      showLoader();
      const response = await commerce.cart.update(id, {
        quantity: qty - 1,
      });
      hideLoader();
      setCart(response.cart);
    } else {
      removeFromCart(id);
    }
  };

  const incrementQuantity = async (id, qty) => {
    showLoader();
    const response = await commerce.cart.update(id, { quantity: qty + 1 });
    hideLoader();
    setCart(response.cart);
  };

  const fetchCategory = async () => {
    const response = await commerce.categories.list();
    setCategoryList(response.data);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const setOrder = (order) => {
    showLoader();
    setOrderDetails(order);
    hideLoader();
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
    fetchCategory();
  }, []);

  return (
    <Router>
      <Switch>
        {loader}
        <Route path="/" exact>
          <Header cart={cart} categoryList={categoryList}></Header>
          <div className="banner">
            <img src="https://m.media-amazon.com/images/I/71UPhOgl2sL._SX3000_.jpg"></img>
          </div>
          <Product products={productsList} addToCart={addToCart} />
          <Footer />
        </Route>

        <Route path="/cart">
          <Header cart={cart} categoryList={categoryList}></Header>
          <Cart
            cart={cart}
            decrementQuantity={decrementQuantity}
            incrementQuantity={incrementQuantity}
            removeFromCart={removeFromCart}
          />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/category/:slug" exact>
          <Header cart={cart} categoryList={categoryList}></Header>
          <div style={{ marginBottom: "300px" }}></div>
          <Product
            products={productsListByCategory}
            fetchProductsByCategory={fetchProductsByCategory}
            addToCart={addToCart}
          />
        </Route>

        <Route path="/checkout">
          <Header cart={cart} categoryList={categoryList}></Header>
          <Checkout cart={cart} setOrder={setOrder} refreshCart={refreshCart} />
        </Route>

        <Route path="/thankyou">
          <Thankyou orderDetails={orderDetails} />
        </Route>

        <Route path="/productdetailpage/:name">
          <Header cart={cart} categoryList={categoryList}></Header>

          <ProductDetailPage products={productsList} addToCart={addToCart} />
        </Route>

        <Route path="/sign-up">
          <SignUp />
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
