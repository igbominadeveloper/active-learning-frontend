import { useState } from 'react';

interface useModalProps {
    openModal: boolean;
    toggleModal: Function;
}

const useModal = (): useModalProps => {
    const [openModal, setOpenModal] = useState(false);
    
    const toggleModal = ():void => setOpenModal(!openModal);

    return {
        openModal: openModal,
        toggleModal: toggleModal
    }
}

export default useModal;
