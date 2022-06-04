import { createContext, useState, useContext } from "react";

const ToggleContext = createContext({});

export const useToggleContext = () => useContext(ToggleContext);

export const ToggleContextProvider = ({ children }) => {
    const [isCreatePostDialogOpen, setIsCreatePostDialogOpen] = useState(false);
    const [isEditProfileDialogOpen, setIsEditProfileDialogOpen] = useState(false);
    const [isEditPostDialogOpen, setIsEditPostDialogOpen] = useState(false);

    return (
        <ToggleContext.Provider
            value={
                {
                    isCreatePostDialogOpen,
                    setIsCreatePostDialogOpen,

                    isEditProfileDialogOpen,
                    setIsEditProfileDialogOpen,
                    
                    isEditPostDialogOpen, 
                    setIsEditPostDialogOpen,
                }
            }
        >
            {children}
        </ToggleContext.Provider>
    )
}