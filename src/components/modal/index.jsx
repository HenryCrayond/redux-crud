import React from 'react'
import ReactDom from 'react-dom';
import { useSelector, useDispatch } from 'react-redux'

import '../style.css';
import { handleChangeInput, handleCancel, handleAddParticipant } from '../../slice/participantSlice';

export const Modal = (props) => {
    const { open, handleClose } = props;
    const { addParticipant } = useSelector((state) => state.participant)

    const dispatch = useDispatch()

    const cancelModal = () => {
        handleCancel()
        handleClose()
    }
    const saveModal = () => {
        dispatch(handleAddParticipant())
        handleClose()
    }

    if (!open) return null
    return ReactDom.createPortal(
        <div className='modal-overlay'>
            <div className='modal-root'>
                <div className='modal-header'>
                    <h3>Add Participant</h3>
                    <button className='close-btn' onClick={handleClose}>x</button>
                </div>

                <div className='modal-body'>
                    <div style={{ marginBottom: 16 }}>
                        <label title='Participant name' />
                        <input placeholder='Enter name' value={addParticipant.name} onChange={(e) => dispatch(handleChangeInput({ field: 'name', value: e.target.value }))} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label title='Email' />
                        <input placeholder='Enter Email' value={addParticipant.email} onChange={(e) => dispatch(handleChangeInput({ field: 'email', value: e.target.value }))} />
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
