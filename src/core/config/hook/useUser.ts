import { useContext }           from "react";

import { useLocalStorage }      from "./useLocalStorage";
import { AuthContext }          from "../context/auth.context";
import { User }                 from "../../model/user";

export const useUser = () => {
    const { user, setUser, setToken } = useContext(AuthContext);
    
    const { setItem } = useLocalStorage();

    const addUser = (_user: User, token :any) => {
        setUser(_user);
        setToken(token)
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

