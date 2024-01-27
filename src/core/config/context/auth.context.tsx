import { createContext }        from 'react';
import { User }                 from '../../model/user';

interface IAuthContext {
    user: User | null;
    setUser: (user: User | null) => void;
    token: string | null;
    setToken: (token: string | null) => void;
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    setUser: () => {},
    token: null,
    setToken: () => {},
});


