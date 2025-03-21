import { useContext,useEffect } from 'react'
import './App.css'
import Routing from './Router'
import { DataContext } from './Componenets/DataProvide/DataProvider'
import { Type } from './Utility/action.type'
import { auth } from './Utility/firebase'

function App() {
  const [{user},dispatch] = useContext(DataContext);
 
  useEffect(()=>{
    auth.onAuthStateChanged((authUser) => {
      if (authUser){
        // console.log(authUser);
        
        dispatch({
          type:Type.SET_USER,
          user:authUser
        });
      }else{
        dispatch({
          type:Type.SET_USER,
          user:null,

        })
      }
    })

  },[])

  return (
    <>
      <div>
       
        <Routing/>
        

       
      </div>
       
    </>
  )
}

export default App
