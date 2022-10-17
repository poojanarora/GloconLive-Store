import { createContext, useState, useEffect } from "react";
import { localStorageGetItem } from "../hooks/useAsyncStorage";

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const initialAuth = {
        accessToken: '',
        isLoggedIn: false
    };
    const [auth, setAuth] = useState(initialAuth);

    const getAuthState = async () => {
        try {
            const localStorageData = await localStorageGetItem();
            if(localStorageData) {
                setAuth(localStorageData);
            } 
        } catch (err) {
            setAuth(initialAuth);
        }
    };

    useEffect(() => {
        console.log("In Auth Provider use effect");
        getAuthState();
    }, []);

    return(
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}