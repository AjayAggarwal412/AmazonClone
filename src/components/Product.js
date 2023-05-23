import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./product.css";
import { Link } from "react-router-dom";

function Product({ products, addToCart, fetchProductsByCategory }) {
  let { slug } = useParams();
  // console.log(slug);

  useEffect(() => {
    if (slug) {
      fetchProductsByCategory(slug);
    }
  });

  return (
    <>
      <div className="product__wrap">
        {products?.map((items) => {
          return (
            <div className="product" key={items.id}>
              <div className="product__info">
                <Link to={`/ProductDetailPage/${items.name}`}>
                  <img src={items.image.url}></img>
                </Link>
                <p className="name">{items.name}</p>
                <p className="price">
                  <strong>{items.price.formatted_with_symbol}</strong>
                </p>

                {/* <FontAwesomeIcon icon={faHeart} /> */}

                <button onClick={() => addToCart(items.id, 1)}>
                  Add to cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Product;
