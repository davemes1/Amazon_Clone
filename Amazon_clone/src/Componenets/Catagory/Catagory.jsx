import React from 'react'
import { catagoryinfo } from './catagoryInfo'
import CatagoryCard from './CatagoryCard'
import style from './Catagory.module.css'

function Catagory() {
  return (
    <div>
        <section className={style.catagory_container}>
            {
                catagoryinfo.map((infos)=>(
                    <CatagoryCard data={infos}/>
                ))


            }


        </section>
      
    </div>
  )
}

export default Catagory
