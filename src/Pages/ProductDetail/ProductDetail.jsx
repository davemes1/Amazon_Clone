import React, { useEffect, useState } from "react";
import style from "./ProductDetail.module.css";
import Layout from "../../Componenets/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Componenets/Product/ProductCard";
import Loader from "../../Componenets/Loader/Loader";


function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading,setIsLoading]=useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
      .then((res) => {
        // console.log(res.data)

        setProduct(res.data);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      });
  }, []);

  return (
    <Layout>

      {isLoading?(<Loader/>):(<ProductCard product={product} 
      flex={true}
      renderDes={true}
      renderAdd={true}
      
      />)}
      
      
    </Layout>
  )
}

export default ProductDetail;
