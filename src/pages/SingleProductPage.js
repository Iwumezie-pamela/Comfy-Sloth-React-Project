import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    single_product_loading,
    single_product_error,
    fetchSingleProduct,
    singleProductPage,
  } = useProductsContext();

  //handle the single product api url
  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
    // eslint-disable-next-line
  }, [id]);

  //navigate to the homepage if there is an error
  useEffect(() => {
    if (single_product_error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    // eslint-disable-next-line
  }, [single_product_error]);

  if (single_product_loading) {
    return <Loading />;
  } else if (single_product_error) {
    return <Error />;
  }

  const {
    stars,
    images,
    name,
    price,
    reviews,
    colors,
    description,
    id: productId,
    stock,
    company,
  } = singleProductPage;

 console.log(singleProductPage);
  return (
    <Wrapper>
      <PageHero title={name} product />

      <div className="section-center section page">
        <Link to="/product" className="btn">
          Back to products
        </Link>

        <div className="product-center">
          <ProductImages images={images} />

          <section className="content">
            <h2>{name}</h2>
            <Stars reviews={reviews} stars={stars} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>available :</span>
              {stock > 0 ? "In Stock" : "Out Of Stock"}
            </p>
            <p className="info">
              <span>SKU :</span>
              {productId}
            </p>
            <p className="info">
              <span>brand :</span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart singleProductPage={singleProductPage} />}
            {/*if the stock  is less than 0,do not display the colors and the add to cart functionality*/}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
