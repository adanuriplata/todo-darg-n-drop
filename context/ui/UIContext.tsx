import { createContext } from 'react';


interface ContextProps {
     sidemenuOpen: boolean;
     isAddingEntry: boolean;
     isDragging: boolean;
     // metodhs
     openSideMenu: () => void;
     closeSideMenu: () => void;
     setIsAddingEntry: (isEntry: boolean) => void;
     startDragging: () => void;
     endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps)