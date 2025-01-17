import React from 'react'
import ReactDom from 'react-dom';
import { useSelector, useDispatch } from 'react-redux'

import '../style.css';
import { handleChangeInput, handleCancel, handleAddParticipant, handleValidation } from '../../slice/participantSlice';

export const Modal = (props) => {
    const { open, handleClose } = props;
    const { addParticipant, validationErrors } = useSelector((state) => state.participant)

    const dispatch = useDispatch()

    const cancelModal = () => {
        handleCancel()
        handleClose()
    }
    const saveModal = () => {
        if (addParticipant.name && addParticipant.email) {
            dispatch(handleAddParticipant());
            handleClose();
        }
    }

    if (!open) return null
    return ReactDom.createPortal(
        <div className='modal-overlay'>
            <div className='modal-root'>
                <div className='modal-header'>
                    <h3>{addParticipant?.id ? "Edit Participant" : 'Add Participant'}</h3>
                    <button className='close-btn' onClick={handleClose}>x</button>
                </div>

                <div className='modal-body'>
                    <div style={{ marginBottom: 24 }}>
                        <input placeholder='Enter name' value={addParticipant?.name} onChange={(e) => dispatch(handleChangeInput({ field: 'name', value: e.target.value }))} />
                        {validationErrors?.name && <p className='error-msg'>{validationErrors?.name}</p>}
                    </div>
                    <div style={{ marginBottom: 16, position: "relative" }}>
                        <input placeholder='Enter Email' value={addParticipant?.email} onChange={(e) => dispatch(handleChangeInput({ field: 'email', value: e.target.value }))} />
                        {validationErrors?.email && <p className='error-msg'>{validationErrors?.email}</p>}
                    </div>
                </div>

                <div className='modal-footer'>
                    <button className='outline-btn' onClick={cancelModal}>Cancel</button>
                    <button className='contained-btn' onClick={saveModal}>{addParticipant?.id ? 'Update' : 'Save'}</button>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}
