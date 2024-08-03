import { createContext, useContext, useState } from "react";
import { registerRequest } from "../../api/auth"

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    // el usuario que va a ser leido en toda la aplicación
    const [user, setUser] = useState(null);
    const signup = async (user) => {
        const res = await registerRequest(user);
        console.log(res.data);
        setUser(res.data);
    }

    return (
        <AuthContext.Provider value={{
            signup,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}
