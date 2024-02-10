import { createContext }        from 'react';
import { UserContext }          from './user.context';

interface IAuthContext {
    user: UserContext | null;
    setUser: (user: UserContext | null) => void;
    token: string | null;
    setToken: (token: string | null) => void;
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    setUser: () => {},
    token: null,
    setToken: () => {},
});


