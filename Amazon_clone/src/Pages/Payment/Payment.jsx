import React, { useContext,useState } from "react";
import style from "./Payment.module.css";
import Layout from "../../Componenets/Layout/Layout";
import { DataContext } from "../../Componenets/DataProvide/DataProvider";
import ProductCard from "../../Componenets/Product/ProductCard";
import {useStripe, useElements,CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from "../../Componenets/CurrencyFormat/CurrencyFormat";
import{axiosInstance}from '../../Api/axios'
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import {doc,setDoc,collection} from 'firebase/firestore';
import{useNavigate} from'react-router-dom';




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
  const[processing,setProcessing] = useState(false)

  const stripe = useStripe();
  const elements = useElements();
  const navigate= useNavigate()

  const handleChange=(e)=>{
    console.log(e);
    e.error?.message? setCardError(e.error?.message):setCardError("")
    

  }
  /**Step 1 backend function contact why---contact to the clinet secret
     * step 2 react side confirmation using stripe
     * step3 after confirmation---> order firestore databse save, then clear basket
     */

  const handlePayment=async(e) => {
    e.preventDefault();
    if (!user?.uid) {
      console.error("User not authenticated");
      return;
    }


    try{
      setProcessing(true)
      const response = await axiosInstance({
        method:"POST",
        url:`/payment/create?total=${total*100}`,

      });
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      const {paymentIntent} = await stripe.confirmCardPayment
      (
        clientSecret,
        {
          payment_method:{
            card:elements.getElement(CardElement),
          },

        }
        
      );
      await setDoc(doc(collection(db, "users", user.uid, "orders"), paymentIntent.id), {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      // await db
      // .collection("users")
      // .doc(user.uid)
      // .collection("orders")
      // .doc(paymentIntent.id)
      // .set({
      //   basket:basket,
      //   amount:paymentIntent.amount,
      //   created:paymentIntent.created,
      // });

      console.log(paymentIntent);
      setProcessing(false)
      navigate("/orders",{state:{msg:"you have placed new order"}})

      

    }catch(error){
      console.log(error);
      setProcessing(false)
      

    }
    
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
                <form onSubmit={handlePayment}>
                  {cardError&& <small style={{color:"red"}}>{cardError}</small>}
                  <CardElement onChange={handleChange}/>

                  <div className={style.payment_price}>
                    <div >
                      <span style={{display:"flex",gap:"10px"}}>
                      <p>Total Order |</p>   <CurrencyFormat amount={total}/>
                      </span>
                    </div>
                    <button type="submit">
                      {
                        processing?(
                          <div className={style.loading}>
                            <ClipLoader color="grey" size={12}/>
                            <p>Please wait...</p>
                          </div>

                        ):" Pay Now"
                      }
                     
                      
                      </button>
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
