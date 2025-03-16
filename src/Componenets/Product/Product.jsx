import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import style from "./Product.module.css";
import { productUrl } from "../../Api/endPoints";
import Loader from "../Loader/Loader";

function Product() {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products`)
      .then((res) => {
        // console.log(res.data)
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (

    <>
    {
        isLoading?(<Loader/>):(<section className={style.product_container}>
            {products?.map((singleProduct) => {
              return <ProductCard product={singleProduct} renderAdd={true} key={singleProduct.id} />;
            })}
          </section>)
    }
    
    
    </>
    
  );
}

export default Product;
