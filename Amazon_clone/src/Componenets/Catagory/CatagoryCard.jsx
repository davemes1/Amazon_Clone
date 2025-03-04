import React from 'react'
import Style from './Catagory.module.css'

function CatagoryCard({data}) {
  return (
    <div className={Style.catagory}>
        <a href="">
            <span>
                <h2>{data.title}</h2>
            </span>
            <img src={data.imageLink} alt="" />
            <p>Shop Now</p>
        </a>
      
    </div>
  )
}

export default CatagoryCard
