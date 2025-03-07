import React, { useContext } from "react";
import style from "./Cart.module.css";
import Layout from "../../Componenets/Layout/Layout";
import { DataContext } from "../../Componenets/DataProvide/DataProvider";
import ProductCard from "../../Componenets/Product/ProductCard";
import CurrencyFormat from "../../Componenets/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  // console.log(basket);
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <div>
      <Layout>
        <section className={style.container}>
          <div className={style.cart_container}>
            <h2>Hello</h2>
            <h3>Your Shopping basket</h3>
            <hr />
            {basket?.length === 0 ? (
              <p>Opps ! No Item in your cart</p>
            ) : (
              basket?.map((item, i) => {
                return (
                  <section className={style.cart_product}>
                    <ProductCard
                      key={i}
                      product={item}
                      renderDes={true}
                      renderAdd={false}
                      flex={true}
                    />
                    ;
                    <div className={style.button_container}>
                      <button
                        className={style.btn}
                        onClick={() => increment(item)}
                      >
                        <IoIosArrowUp size={30} />
                      </button>
                      <span>{item.amount}</span>
                      <button
                        className={style.btn}
                        onClick={() => decrement(item.id)}
                      >
                        <IoIosArrowDown size={30} />
                      </button>
                    </div>
                    <hr />
                  </section>
                );
              })
            )}
          </div>

          {basket?.length !== 0 && (
            <div className={style.subtotal}>
              <div>
                <p>Subtotal({basket?.length} items)</p>
                <CurrencyFormat amount={total} />
              </div>
              <span>
                <input type="checkbox" />
                <small>This order contains a gift</small>
              </span>
              <Link to="/Payment">Continue to Checkout</Link>
            </div>
          )}
        </section>
      </Layout>
    </div>
  );
}

export default Cart;
