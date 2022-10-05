import React from 'react'
import { closeModal, getModalState } from '../../../utils/reduxToolkit/features/modal';
import NfticksDetails from './NfticksDetails';
import { useSelector, useDispatch } from 'react-redux'

function DisplayModals() {
    const { isModalOpen, modalType } = useSelector(getModalState)
    const dispatch = useDispatch()
    const handleClose = () => dispatch(closeModal())

    console.log(isModalOpen, modalType);

    switch (modalType) {
        case 'NFTicks-Details':
            return (
                <NfticksDetails
                    open={isModalOpen}
                    handleClose={handleClose}
                />
            )
            break;
        default: return <></>
    }
}

export default DisplayModals