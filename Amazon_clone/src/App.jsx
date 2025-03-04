import { useState } from 'react'

import './App.css'
import Header from './Componenets/Header/Header'
import CarouselEffect from './Componenets/Carousel/Carousel'
import Catagory from './Componenets/Catagory/Catagory'
import Product from './Componenets/Product/Product'
import Layout from './Componenets/Layout/Layout'
import Landing from './Pages/Landing/Landing'
import Routing from './Router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        {/* <Header/> */}
        <Routing/>
        

       
      </div>
       
    </>
  )
}

export default App
