import React, { createContext, useState, useContext } from 'react';
import LoadingSystem from '../components/system/LoadingSystem';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {isLoading && <LoadingSystem />}
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
} 