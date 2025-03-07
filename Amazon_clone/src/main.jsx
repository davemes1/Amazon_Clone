import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProvider } from './Componenets/DataProvide/DataProvider.jsx'
import { reducer } from './Utility/Reducer'
import { initialState } from './Utility/Reducer'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>
    
  </StrictMode>,
)
