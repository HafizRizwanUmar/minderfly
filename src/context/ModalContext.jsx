import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState('General Inquiry');

    const openModal = (projectType = 'General Inquiry') => {
        setSelectedProject(projectType);
        setIsOfferModalOpen(true);
    };

    const closeModal = () => {
        setIsOfferModalOpen(false);
    };

    return (
        <ModalContext.Provider value={{ isOfferModalOpen, selectedProject, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
