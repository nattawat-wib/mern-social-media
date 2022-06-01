import { createContext, useContext, useEffect, useReducer } from "react";
import axios from './../utils/axios';

const AuthContext = createContext({});

const authReducer = async (state, action) => {
    if (action.type === 'login') {
        console.log('login action');
        // if (!action.payload?.data?.data?.accessToken) return state
        return {
            isAuth: true,
            accessToken: action.payload.data.data.accessToken
        }
    }
    else if (action.type === 'logout') {
        return {
            isAuth: false,
            accessToken: undefined
        }
    }
    return state
}

const AuthContextProvider = ({ children }) => {
    const [auth, authDispatch] = useReducer(authReducer, { isAuth: false });

    useEffect(() => {
        axios.get('/member/verify-token')
            .then(resp => {
                console.log(resp);
                authDispatch({ type: 'login', payload: resp });
            })
    }, [])

    return (
        <AuthContext.Provider value={{ auth, authDispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => { return useContext(AuthContext) }
export default AuthContextProvider