import { createContext, useState } from "react";

export const CreatePostContext = createContext({});

export const CreatePostContextProvider = ({ children }) => {
    const [isCreatePostDialogOpen, setIsCreatePostDialogOpen] = useState(false);

    return (
        <CreatePostContext.Provider
            value={
                { 
                    isCreatePostDialogOpen, 
                    setIsCreatePostDialogOpen
                }
            }
        >
            {children}
        </CreatePostContext.Provider>
    )
}