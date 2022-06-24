import { createContext } from 'react';


interface ContextProps {
     sidemenuOpen: boolean;
     // metodhs
     openSideMenu: () => void;
     closeSideMenu: () => void;
}

export const UIContext = createContext({} as ContextProps)