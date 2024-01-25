import axios                    from "axios";
import { createContext }        from "react";
import { useContext }           from "react";
import { useEffect }            from "react";
import { useMemo }              from "react";
import { useState }             from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
// State to hold the authentication token
    const [token, setToken_] = useState(localStorage.getItem("token"));

    const setToken = (newToken: string) => {
        setToken_(newToken);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem('token',token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token')
        }
    }, [token]);

  // Memoized value of the authentication context
    const contextValue = useMemo(
        () => ({
        token,
        setToken,
        }),
        [token]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;