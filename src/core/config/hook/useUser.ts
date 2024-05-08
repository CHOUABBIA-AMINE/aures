import { useContext }           from "react";

import { useLocalStorage }      from "./useLocalStorage";
import { AuthContext }          from "../context/auth.context";
import { UserContext }          from "../context/user.context";

export const useUser = () => {
    const { user, setUser, setToken, setAuthority } = useContext(AuthContext);
    
    const { setItem } = useLocalStorage();

    const addUser = (_user: UserContext, token :any, authority: string[]) => {
        setUser(_user);
        setToken(token);
        setAuthority(authority);
        //setToken(_user.token !==undefined ? _user.token : "")
        setItem("user", _user.username !== undefined ? _user.username : "");
        setItem("token", token !== undefined ? token : "");
    };

    const removeUser = () => {
        setUser(null);
        setItem("user", "");
        setItem("token", "");
    };

    return { user, addUser, removeUser };
};

