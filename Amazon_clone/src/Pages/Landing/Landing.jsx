import React from 'react'
import Layout from '../../Componenets/Layout/Layout'
import CarouselEffect from '../../Componenets/Carousel/Carousel'
import Catagory from '../../Componenets/Catagory/Catagory'
import Product from '../../Componenets/Product/Product'

function Landing() {
  return (
    <div>
        <Layout>
              <CarouselEffect/>
               <Catagory/>
               <Product/>
        </Layout>

    </div>
  )
}

export default Landing
