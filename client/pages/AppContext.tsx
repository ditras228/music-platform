// src/context/state.js
import { createContext, useContext } from 'react';

// @ts-ignore
const AppContext = createContext();

export function AppWrapper({ children }) {
    let sharedState = {/* whatever you want */}

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
