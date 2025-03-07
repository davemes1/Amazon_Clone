import React from 'react'
import style from './Catagory.module.css'
import { Link } from 'react-router-dom'

function CatagoryCard({data}) {
  // console.log(data);
  
  return (
    <div className={style.catagory}>

        <Link to={`/category/${data.category}`} >
            <h3>{data.category}</h3>
            <span>
                <h2>{data?.title}</h2>
            </span>
            <img src={data.imageLink} alt="" />
            <p>Shop Now</p>
        </Link>
      
    </div>
  )
}

export default CatagoryCard
