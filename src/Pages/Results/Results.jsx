import React,{useState,useEffect} from "react";
import Layout from "../../Componenets/Layout/Layout";
import style from "./Results.module.css";
import { useParams} from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Componenets/Product/ProductCard";
import Loader from "../../Componenets/Loader/Loader";

function Results() {
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();
  const [isLoading,setIsLoading]=useState(false)
  console.log(categoryName);
  

  useEffect(()=>{
    setIsLoading(true);

    axios.get(`${productUrl}/products/category/${categoryName}`)
    .then((res) => {
      console.log(res.data);
      
        
      setResults(res.data)
      setIsLoading(false)
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false)
    });


  },[])
 

  return (
    <Layout>

      
      {
        isLoading?(<Loader/>):(<section>
        
          <h1 style={{ padding:"30px"}}>Results</h1>
          <p style ={{ padding:"30px"}}>Category/{categoryName}</p>
          <hr />
          <div className={style.products_container}>
            
              {results?.map((product)=>{
                return(
                  <ProductCard key={product.id}
                  product={product}
                  renderAdd={true}
                  renderDesc={true}
                  />
                 

                )
                  
                  
              })}
          </div>
        </section>

        )
      }
      
      
      
      
      
      
    </Layout>
  )
}

export default Results;
