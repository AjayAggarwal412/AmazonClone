import React from "react";
import { useParams } from "react-router-dom";
import "./ProductDetailPage.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

function ProductDetailPage({ products, addToCart }) {
  const { name } = useParams();

  const product = products.filter((item) => {
    if (item.name == name) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <>
      <div>
        <Grid container>
          <Grid item xs={5}>
            <img className="placeorder__image" src={product[0]?.image.url} />
          </Grid>
          <Grid item xs={4}>
            <div className="placeholder__description">
              <div
                style={{
                  fontSize: "24px",
                  lineHeight: "32px",
                  fontWeight: 500,
                }}
              >
                {product[0]?.name}
              </div>
              <div>⭐⭐⭐⭐ ratings | 1000+ answered questions</div>
              <br />
              <hr></hr>
              <div>
                <div className="textgap">
                  Price:
                  <span className="pricetag">
                    {product[0]?.price.formatted_with_symbol}
                  </span>
                </div>
                <div className="textgap">
                  FREE delivery: <strong>Wednesday,Aug 6</strong>
                </div>
                <div className="textgap">
                  EMI starts at ₹ 2401. No Cost EMI available
                </div>
                <div
                  style={{ color: "#007600", fontSize: "20px" }}
                  className="textgap"
                >
                  In stock
                </div>
                <div className="textgap">
                  Sold by <strong>cloudtails</strong> and Fulfilled by Amazon.
                </div>
              </div>
              <div>
                <br></br>
                <div style={{ fontSize: "24px" }} className="textgap">
                  About this item
                </div>
                <div>
                  {/* {product[0].description != undefined ? (
                      product[0].description.map((item) => <li>{item}</li>)
                    ) : (
                      <span></span>
                    )} */}
                  {/* {product[0]?.description} */}

                  <ul>
                    <li>
                      6.1-inch (15.5 cm diagonal) Liquid Retina HD LCD display
                    </li>
                    <li>
                      Water and dust resistant (2 meters for up to 30 minutes,
                      IP68)
                    </li>
                    <li>
                      Dual-camera system with 12MP Ultra Wide and Wide cameras;
                      Night mode, Portrait mode, and 4K video up to 60fps
                    </li>
                    <li>
                      12MP TrueDepth front camera with Portrait mode, 4K video,
                      and Slo-Mo
                    </li>
                    <li>Face ID for secure authentication</li>
                    <li>A13 Bionic chip with third-generation Neural Engine</li>
                    <li>Fast-charge capable</li>
                  </ul>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <Paper variant="outlined" className="placeorder__order">
              <div>
                <div>
                  <strong>Without Exchange</strong>
                </div>
                <div>50,999</div>
                <div style={{ marginTop: "10px" }}>
                  <strong>Add an Accessory</strong>
                </div>
                <div>
                  <label>
                    <input type="checkbox"></input>Apple Airpods
                  </label>
                  <br></br>
                  <label>
                    <input type="checkbox"></input>Apple 20W USB Power Adapter
                  </label>
                </div>
                <div>
                  <button
                    className="placeorder__button addtocart"
                    onClick={() => addToCart(product[0].id, 1)}
                  >
                    Add to Cart
                  </button>

                  <Link to="/checkout">
                    <button className="placeorder__button buynow">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default ProductDetailPage;
