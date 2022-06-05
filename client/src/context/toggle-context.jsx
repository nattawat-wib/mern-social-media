import { createContext, useState, useContext } from "react";

const ToggleContext = createContext({});

export const useToggleContext = () => useContext(ToggleContext);

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
                    setIsEditProfileDialogOpen,
                }
            }
        >
            {children}
        </ToggleContext.Provider>
    )
}