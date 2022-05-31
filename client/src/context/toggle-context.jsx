import { createContext, useState } from "react";

export const ToggleContext = createContext({});

export const ToggleContextProvider = ({ children }) => {
    const [isCreatePostDialogOpen, setIsCreatePostDialogOpen] = useState(false);
    const [isEditProfileDialogOpen, setIsEditProfileDialogOpen] = useState(false);

    return (
        <ToggleContext.Provider
            value={
                {
                    isCreatePostDialogOpen,
                    setIsCreatePostDialogOpen,
                    isEditProfileDialogOpen, 
                    setIsEditProfileDialogOpen
                }
            }
        >
            {children}
        </ToggleContext.Provider>
    )
}