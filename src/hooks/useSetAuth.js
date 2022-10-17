import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useSetAuth = () => {
    const { setAuth } = useContext(AuthContext);
    return setAuth;
}

export default useSetAuth;
