import { createContext, useContext, useEffect, useReducer } from "react";
import axios from './../utils/axios';

const AuthContext = createContext({});

const authReducer = (state, action) => {
    if (action.type === 'login') {
        if (!action.payload?.data?.data) return state
        return {
            isAuth: true,
            member: action.payload.data.data.member,
            accessToken: action.payload.data.data.accessToken
        }
    }
    else if (action.type === 'logout') {
        return {
            isAuth: false,
            member: undefined
        }
    }
    else if (action.type === 'update auth') {
        return {
            ...state,
            member: action.payload.data.data.member,
            accessToken: action.payload.data.data.accessToken
        }
    }
    return state
}

const AuthContextProvider = ({ children }) => {
    const [auth, authDispatch] = useReducer(authReducer, { isAuth: false });
    useEffect(() => {
        axios.get('/auth/verify-token')
            .then(resp => authDispatch({ type: 'login', payload: resp }))
    }, [])
    return (
        <AuthContext.Provider value={{ auth, authDispatch, member: auth.member || {} }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => { return useContext(AuthContext) }
export const beforeAuthPage = ['/Login', '/Login/', '/login', '/login/', '/forget-password', '/forget-password/', '/reset-password', '/reset-password/']
export default AuthContextProvider