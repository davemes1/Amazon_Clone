import React, { useContext } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import style from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvide/DataProvider";
import { auth } from "../../Utility/firebase";

function Header() {

    const [{basket,user},state,dispatch]=useContext(DataContext)
    const totalItem = basket?.reduce((amount,item)=>{
        return item.amount + amount
    },0)
    
  return (
    <section className={style.fixed}>
    
    <section >
      <div className ={style.header_container}>
        <div className ={style.logo_container} >
            {/**logo */}
            <Link to="/">
                <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" />
            </Link>
            <div className={style.delivery}>
                {/**Delivery */}
            <span>
                {/**icon */}
                <SlLocationPin />
                
            </span>
            <div>
                <p>Delivered to</p>
                <span>USA</span>

            </div>
            
            </div>
        </div>
        <div className={style.search}>
           {/**Search */}
           <select name="" id="">
            <option value="">All</option>
            <option value="">Computer</option>
            <option value="">Book</option>
            <option value="">Electronics</option>
           </select>
           <input type="text" name=""  id=""  placeholder= "search products"/>
           {/**icon */}
           <IoSearchOutline size={35} aria-label="Search icon"/>
        </div>
        <div className={style.order_container}>
           
            <Link to="" className={style.language}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Flag_of_the_United_States_%28Pantone%29.svg/1024px-Flag_of_the_United_States_%28Pantone%29.svg.png" alt="" />
                <select>
                    <option value="">EN</option>
                </select>

            </Link>
            {/**three componenets*/}
            <Link to={!user&& "/auth"}>
            <div>
                { user?(
                    <>
                     <p>Hello {user?.email?.split("@")[0]}</p>
                     <span onClick={()=>auth.signOut()}>Sign Out</span>
                    </>
                   
                ):(
                    <>
                    <p>Hello Sign In</p>
                    <span>Accounts & Lists</span>
                    </>
                
                
                  )     
                }
            

            </div>
           
           
                
            </Link>
            {/**orders */}
            <Link to="/orders">
                <p>Returns</p>
                <span>& Orders</span> 
            </Link>
            {/**carts */}
            <Link to="/cart" className={style.cart} >
            <BiCart size={35} />
                  <span>{totalItem}</span>
            </Link>
        </div>
      </div>
      </section>
      <LowerHeader/>
      </section>
  );
}

export default Header;
