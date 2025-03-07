import React, { useState ,DataContext,useContext} from 'react'
import style from './Auth.module.css'
import Layout from '../../Componenets/Layout/Layout'
import {auth} from '../../Utility/firebase'/**utility firebase */
import { Link } from 'react-router-dom'
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth"

function Auth() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError] =useState('')
  // /** import {DataContext} */
  const[{user},dispatch]=useContext(DataContext)
  const authHandler = (e)=>{
    e.preventDefault()
    if(email.target.name==="signIn"){
      
      signInWithEmailAndPassword(auth,email,password)
      .then((userCredential)=>{
         user = userCredential.user
        console.log(user)
      }).catch((err)=>{
        setError(err)
      })
    
    }else{

      createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential)=>{
        const user = userCredential.user
        console.log(user)
      }).catch((err)=>{
        setError(err)
      /**create account */
    })
  }
}

  return (
    <section className={style.login}>
      <Link to="/amazon-clone">
      <img src="amazon logo" alt="" />
      <div className={style.LoginContainer}>
        <h1>Sign In</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password"  id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <button type="submit"  onClick={authHandler}className={style.login_signInButton}>Sign In</button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice
        </p>
        <button type="submit"  className={style.login_registerBtn}>Create Your Amazon Account</button>
      </div>
      
      </Link>



    </section>
  )
}

export default Auth
