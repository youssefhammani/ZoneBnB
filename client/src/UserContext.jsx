import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);


    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                setReady(true);
                setUser(data);
            });
        }

    }, [])


    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    )
}


