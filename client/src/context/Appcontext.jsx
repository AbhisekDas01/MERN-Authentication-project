import { createContext, useEffect, useState } from "react";
import { VITE_BACKEND_URL } from "../utils/env";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();


export const AppContextProvider = ({ children }) => {

    
    axios.defaults.withCredentials = true;


    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(false);

    const getUserData = async () => {
        try {
            const { data } = await axios.get(VITE_BACKEND_URL + '/api/user/data');


            data.success ? setUserData(data.userData) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message)
        }

    }

    const getAuthState = async () => {
        try {


            const { data } =await  axios.get(VITE_BACKEND_URL + '/api/auth/is-auth');

            if (data?.success) {
                setIsLoggedin(true);
                getUserData();
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getAuthState();
    }, [])

    const value = {
        backendUrl: VITE_BACKEND_URL,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserData

    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}