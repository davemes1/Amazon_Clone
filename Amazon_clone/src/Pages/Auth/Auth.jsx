import React, { useState ,useContext} from 'react'
import style from './Auth.module.css'
import Layout from '../../Componenets/Layout/Layout'
import {auth} from '../../Utility/firebase'/**utility firebase */
import { Link,useNavigate } from 'react-router-dom'
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth"
import {DataContext} from'../../Componenets/DataProvide/DataProvider'
import{ClipLoader } from 'react-spinners'
import { Type } from '../../Utility/action.type'

function Auth() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError] =useState('')
  const [loading,setLoading] = useState({
    signIn:false,
    signUp:false
  })

  // console.log(email,password);
  
 
  const[{user},dispatch]=useContext(DataContext)

  const navigate= useNavigate()
  const authHandler = (e)=>{
    e.preventDefault()
    // console.log(e.target.name);
    
    if(e.target.name == "signIn"){
      setLoading({...loading,signIn:true})
      
      signInWithEmailAndPassword(auth,email,password)
      .then((userCredential)=>{
        console.log(user)
        dispatch({
          type:Type.SET_USER,
          user:userCredential.user
        });
        setLoading({...loading,signIn:false})
        navigate("/")
        console.log(navigate);
        
         
        
      }).catch((err)=>{
        setError(err.message)
        setLoading({...loading,signIn:false})
      })
    
    }else{
      setLoading({...loading,signUp:true})

      createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential)=>{ 
        console.log(user)
        dispatch({
        type:Type.SET_USER,
        user:userCredential.user
      });
      setLoading({...loading,signUp:false})
      navigate("/")
       
      }).catch((err)=>{
        setError(err.message)
        setLoading({...loading,signUp:false})
      /**create account */
    })
  }
}

  return (
    <section className={style.login}>
      <Link to="/">
      <img src="../../../public/amazon-logo-rgb.png" alt="" /></Link>
      <div className={style.LoginContainer}>
        <h3>Sign In</h3>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password"  id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <button type="submit"  onClick={authHandler} name ="signIn" className={style.login_signInBtn}>{
            loading.signIn ? <ClipLoader size={15}/>   :("Sign In")}
            </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice
        </p>
        <button type="submit"  onClick={authHandler}  name ="signUp"  className={style.login_registerBtn}>
          
        {
            loading.signUp ? <ClipLoader size={15}/>   :("Create Your Amazon Account")}</button>
        {
          error&& <small style={{paddingTop:"5px",color:"red"}}>{error}</small>
        }
      </div>
      
      



    </section>
  )
}

export default Auth
