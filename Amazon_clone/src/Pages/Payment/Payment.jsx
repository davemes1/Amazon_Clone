import React, { useContext,useState } from "react";
import style from "./Payment.module.css";
import Layout from "../../Componenets/Layout/Layout";
import { DataContext } from "../../Componenets/DataProvide/DataProvider";
import ProductCard from "../../Componenets/Product/ProductCard";
import {useStripe, useElements,CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from "../../Componenets/CurrencyFormat/CurrencyFormat";
function Payment() {
  const [{ basket, user }] = useContext(DataContext);
  // console.log(user);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError,setCardError]= useState(null)

  const stripe = useStripe();
  const slements = useElements();

  const handleChange=(e)=>{
    console.log(e);
    e.error?.message? setCardError(e.error?.message):setCardError("")
    

  }

  return (
    <div>
      <Layout>
        <div className={style.payment_Header}>Checkout ({totalItem}) Items</div>
        <section className={style.payment}>
          <div className={style.flex}>
            <h3>Delivery Address</h3>
            <div>
              <div>{user?.email}</div>
              <div>123 Paradise Lane</div>
              <div>Alexindra, VA</div>
            </div>
          </div>
          <hr />

          <div className={style.flex}>
            <h3>Review Item and delivery</h3>
            <div>
              {basket?.map((item) => (
                <ProductCard product={item} flex={true} />
              ))}
            </div>
          </div>
          <hr />
          <div className={style.flex}>
            <h3>Payment Methods</h3>
            <div className={style.payment_card_container}>
              <div className={style.payment_details}>
                <form action="">
                  {cardError&& <small style={{color:"red"}}>{cardError}</small>}
                  <CardElement onChange={handleChange}/>

                  <div className={style.payment_price}>
                    <div >
                      <span style={{display:"flex",gap:"10px"}}>
                      <p>Total Order |</p>   <CurrencyFormat amount={total}/>
                      </span>
                    </div>
                    <button>Pay Now</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}

export default Payment;
