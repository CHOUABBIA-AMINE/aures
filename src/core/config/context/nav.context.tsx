import { createContext }        from 'react';

interface INavContext {
    menu: string ;
    setMenu: (menu: string) => void;
}

export const NavContext = createContext<INavContext>({
    menu: "",
    setMenu: () => {},
});