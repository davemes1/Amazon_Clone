import React from 'react'
import {Carousel} from'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {img} from "./img/data";
import style from "./Carousel.module.css";

function CarouselEffect() {
  return (
    <div>
        
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={true}
        showThumbs={false}
        >
            {
                img.map((imageItem,index)=>{
                    return <img src={imageItem} key={index}  alt="carousel image"/>
                })
                
                
            }
            





      </Carousel>

      <div className={style.hero_img}></div>
    </div>
  )
}

export default CarouselEffect
