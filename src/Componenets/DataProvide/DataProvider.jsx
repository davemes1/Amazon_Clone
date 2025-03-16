

import React,{createContext,useContext,useEffect,useReducer,useState} from "react";
import { reducer } from "../../Utility/Reducer";

export const DataContext=createContext();

export const DataProvider=({children,reducer,initialState})=>{
    return(
        <DataContext.Provider value={useReducer(reducer,initialState)}>
            {children}
        </DataContext.Provider>


    )
}