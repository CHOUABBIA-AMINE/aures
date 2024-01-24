import { createContext }        from "react";

import User                     from "../../model/user";

interface AuthContext {
    user: User | null;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContext>({
    user: null,
    setUser: () => {},
});

export default AuthContext;
