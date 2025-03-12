import React,{useContext, useEffect, useState} from 'react'
import style from './Orders.module.css'
import Layout from '../../Componenets/Layout/Layout';
import { db } from '../../Utility/firebase';

import { DataContext } from '../../Componenets/DataProvide/DataProvider';
import { setDoc,collection,query,orderBy,onSnapshot } from 'firebase/firestore';
import ProductCard from '../../Componenets/Product/ProductCard';
function Orders() {

  const [{user},dispatch] = useContext(DataContext)
  const [orders,setOrders] = useState([])
  // useEffect(()=>{
  //   if(user){
  //     db.collection("users").doc(user.uid).collection("orders").orderby("created","dec").onSnapshot((snapshot)=>{console.log(snapshot);setOrders(
  //       snapshot.docs.map((doc)=>{
  //         id:doc.id,
  //         data:doc.data()
  //       })
  //     )})
      

  //   }else{

  //   }

  // },[]);
useEffect(()=>{
  if (user){
    const orderRef = collection(db,"users",user.uid,"orders");
    const q = query(orderRef,orderBy("created","desc"));
    const unsubscribe = onSnapshot(q,(snapshot)=>{
      console.log(snapshot);
      setOrders(
        snapshot.docs.map((doc)=>({
          id:doc.id,
          data : doc.data(),
        }))
      )
      
    })
    return ()=>unsubscribe()


  }else {
    setOrders([])

  }




},[])

  return (
    <div>
        <Layout>
       <section className={style.container}>
        <div className={style.order_container}>
          <h2>Your Orders</h2>
          <div>

            {
              orders?.length == 0 && <div style={{padding:"20px"}}>You don't have orders</div>

            }
          </div>
          <div>
            {
              orders?.map((eachOrder,i)=>{

                return (
                  <div key={i}>
                    <hr />
                    <p>OrderID:{eachOrder.id}</p>
                    {
                      eachOrder?.data.basket?.map(order=>{
                        return(
                        <ProductCard
                          flex={true}
                          product={order}
                          key={order.id}
                          
                          />)
                        

                      })
                    }
                  </div>
                )

              })
            }

          </div>
        </div>
       </section>
        </Layout>
      
    </div>
  )
}

export default Orders
