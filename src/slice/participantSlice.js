import { createSlice } from '@reduxjs/toolkit'

const tableData = [
    { id: 1, name: 'Henry', email: 'henry@gmail.com' },
    { id: 2, name: 'Dyson', email: 'dyson@gmail.com' },
    { id: 3, name: 'george', email: 'george@gmail.com' },
]

const initialState = {

    participantList: tableData,

    addParticipant: {
        name: "",
        email: ""
    },
    validationErrors: {
        name: '',
        email: '',
        isValid: null
    }

}

const participantSlice = createSlice({
    initialState: initialState,

    name: "participant",

    reducers: {
        handleChangeInput: (state, action) => {
            const { field, value } = action.payload;
            state.addParticipant[field] = value;
        },

        handleAddParticipant: (state) => {
            const val = state.addParticipant;
            if (val.id) {
                const index = state.participantList.findIndex(p => p.id === val.id);
                if (index !== -1) {
                    state.participantList[index] = { ...state.participantList[index], ...val };
                }
            } else {
                const newParticipant = { id: new Date().toLocaleString(), ...val };
                state.participantList.unshift(newParticipant);
            }
        },

        handleEdit: (state, action) => {
            const { edit } = action.payload;
            state.addParticipant = edit
        },

        handleDelete: (state, action) => {
            const { del } = action.payload;
            state.participantList = state.participantList.filter(item => item.id !== del.id);
        },

        handleValidation: (state) => {
            const { name, email } = state.addParticipant;
            let isValid = null;
            let nameError = '';
            let emailError = '';

            if (name && email) return isValid

            if (!name.trim()) {
                isValid = false;
                nameError = 'Name is required';
            }

            if (!email.trim()) {
                isValid = false;
                emailError = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                isValid = false;
                emailError = 'Email is not valid';
            } else if (/\S+@\S+\.\S+/.test(email) && name.trim()) {
                isValid = true;
                nameError = '';
                emailError = '';
            }

            state.validationErrors = { name: nameError, email: emailError,isValid:isValid };

        },


        handleCancel: (state) => {
            state.addParticipant = { email: "", name: "" };
            state.validationErrors = { name: '', email: '', isValid: false };
        }

    }
})

export const { handleChangeInput, handleCancel, handleValidation, handleAddParticipant, handleEdit, handleDelete } = participantSlice.actions
export default participantSlice.reducer