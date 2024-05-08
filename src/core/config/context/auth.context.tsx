import { createContext }        from 'react';
import { UserContext }          from './user.context';

interface IAuthContext {
    user: UserContext | null;
    setUser: (user: UserContext | null) => void;
    token: string | null;
    setToken: (token: string | null) => void;
    authority: string[];
    setAuthority: (authority: string[]) => void;
    hasAuthority: (authority: string) => boolean;
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    setUser: () => {},
    token: null,
    setToken: () => {},
    authority: [],
    setAuthority: () => {},
    hasAuthority: () => false
});