import { useState, createContext } from "react";

export  const UserContext=createContext();
 const UserContextProvider=({children})=>{
    const [login,setLogin]=useState((localStorage.getItem("token"))||null);
    const handleLogin=(data)=>{
        setLogin({token:data});
    }
    return <UserContext.Provider value={{handleLogin,login}}>{children}</UserContext.Provider>
 }
export default UserContextProvider