import React, { useEffect, useReducer, useContext, createContext } from "react";
import axios from "axios";
const CurrentUserStateContext = createContext();
const CurrentUserDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {...action.user, isAuthenticated: true };
        case "LOGOUT":
            return { isAuthenticated: false };
        default:
            throw new Error(`unknown action ${action.type}`);
    }
};

export const CurrentUserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { isAuthenticated: false });

    useEffect(() => {
        let isMounted = true;
        const fetchUser = async () => {

            try{
                const user = await axios.get('http://localhost:1337/users/me', { withCredentials: true })
                    .then(response => { return response.data })
                if (user.id && isMounted) {
                    dispatch({ type: "LOGIN", user });
                    return;
                }
            } catch (error) {
                console.error("Error in fetching /users/me", error);
            }
        }
        fetchUser();

        return () => { isMounted = false }
    }, []);

    return (
        <CurrentUserDispatchContext.Provider value={dispatch}>
            <CurrentUserStateContext.Provider value={state}>
                {children}
            </CurrentUserStateContext.Provider>
        </CurrentUserDispatchContext.Provider>
    );
};

export const useCurrentUser = () => useContext(CurrentUserStateContext);
export const useDispatchCurrentUser = () => useContext(CurrentUserDispatchContext);