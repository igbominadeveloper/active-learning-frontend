import { useState } from 'react';

interface useModalProps {
    openEditModal: boolean;
    openDeleteModal: boolean;
    toggleEditModal : Function;
    toggleDeleteModal : Function;
}

const useModal = (): useModalProps => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    
    const toggleEditModal = ():void => setOpenEditModal(!openEditModal);
    const toggleDeleteModal = ():void => setOpenDeleteModal(!openDeleteModal);

    return {
        openEditModal: openEditModal,
        openDeleteModal: openDeleteModal, 
        toggleEditModal: toggleEditModal,
        toggleDeleteModal: toggleDeleteModal,
    }
}

export default useModal;
