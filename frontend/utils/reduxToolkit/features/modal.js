import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isModalOpen: false,
    modalType: '',
    payload: null,
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, { payload: { modalType, ...rest } }) {
            state.isModalOpen = true;
            state.modalType = modalType;
            state.payload = rest;
        },
        closeModal(state) {
            state.isModalOpen = false;
            state.modalType = '';
            state.payload = null;
        }
    },
})

// Action creators are generated for each case reducer function
export const { openModal, closeModal } = modalSlice.actions

export const getModalState = (state) => state.modal

export default modalSlice.reducer