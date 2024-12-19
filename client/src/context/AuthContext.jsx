import { createContext, useContext, useEffect, useState } from "react"


const authContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextWrapper = ({children}) => {
    const [auth, setAuth] = useState({
        isLogin:false,
        token:""
    })
    
    useEffect(()=>{
        //set in local storage
        if(auth.isLogin){
            localStorage.setItem("token",auth.token)
        } else {
            let isToken = localStorage.getItem("token") ? localStorage.getItem("token"):"";
            if(isToken){
                setAuth({isLogin:true, token:isToken})
            }
        }
    },[auth])

  return (
    <authContext.Provider value={{auth,setAuth}}>
            {children}
    </authContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthContextWrapper");
    }
    return context;
};