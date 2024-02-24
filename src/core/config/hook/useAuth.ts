import { useEffect }            from "react";
import { useUser }              from "./useUser";
import { useLocalStorage }      from "./useLocalStorage";
import { UserContext }          from "../context/user.context";

export const useAuth = () => {
    const { user, addUser, removeUser } = useUser();
    const { getItem } = useLocalStorage();

    // useEffect(() => {
    //     const user = getItem("user");
    //     if (user) {
    //         addUser(JSON.parse(user));
    //     }
    // }, []);

    const connect = (user: UserContext, token : any, authority:string[]) => {
        addUser(user, token, authority);
    };

    const disconnect = () => {
        removeUser();
    };

    return { user, connect, disconnect };
};