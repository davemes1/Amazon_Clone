import React, { useEffect,useState } from 'react'
import axios from 'axios';  
import ProductCard from './ProductCard'
import style from './Product.module.css'


function Product() {
    const[products,setProducts]=useState()
    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
        .then((res)=>{
            console.log(res.data)
            setProducts(res.data)
        }).catch((err)=>{
            console.log(err)
        })



    },[])


  return (
    <section className={style.product_container}>

        {
            products?.map((singleProduct)=>{

                return <ProductCard product={singleProduct} key={singleProduct.id}/>
            }
                
            )
        }
    </section>
  )
}

export default Product
