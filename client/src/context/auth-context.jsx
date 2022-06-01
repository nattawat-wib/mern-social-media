import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext({});

const authReducer = (state, action) => {
    if(action.type === 'login') {
        
        return console.log('action login ');
    }
    
    else if (action.type === 'logout') {

        return console.log('action logout ');
    }

    return state
}

const AuthContextProvider = ({ children }) => {
    const [auth, authDispatch] = useReducer(authReducer, false);

    return (
        <AuthContext.Provider value={{ auth, authDispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => { return useContext(AuthContext) }
export default AuthContextProvider