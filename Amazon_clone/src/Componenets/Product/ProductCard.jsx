import React, { useContext } from 'react'
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import style from './Product.module.css'
import { Link } from 'react-router-dom';
import { Type } from '../../Utility/action.type';
import { DataContext } from '../DataProvide/DataProvider';


function ProductCard({product,flex,renderDes,renderAdd}) {
    const{title,image,id,rating={},price,description} = product;
    const [state,dispatch]=useContext(DataContext)

    // console.log(product);
    
    
    const addToCart=()=>{
      dispatch({
        type:Type.ADD_TO_BASKET,
        item:{
          image,title,price,id,description,rating
        }
      })
    }

  return (
    <div className={`${style.card_container} ${flex?style.product_flexed:''}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDes && <div style={{maxWidth:"750px"}}>{description}</div>}
        <div className={style.rating}>
            {/**rating */}
            <Rating value={rating?.rate} precision={0.1}/>
            {/**count */}
            <small>{rating?.count}</small>
        </div>
        <div>
            {/**price */}
            <CurrencyFormat amount={price}/>
        </div>
        {

          renderAdd&&  <button className={style.button} onClick={addToCart}>
          Add to Cart
      </button>
        }
       
      </div>
    </div>
  )
}

export default ProductCard
