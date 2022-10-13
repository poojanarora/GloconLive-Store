import { createContext, useState } from "react";
import { localStorageGetItem } from "../hooks/useAsyncStorage";

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const initialAuth = {
        userId: '',
        name: '',
        emailId: '',
        profilePic: '',
        accessToken: '',
        isLoggedIn: false
    };
    const localStorageData = localStorageGetItem();
    const [auth, setAuth] = useState((localStorageData) ? localStorageData : initialAuth);
    return(
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}