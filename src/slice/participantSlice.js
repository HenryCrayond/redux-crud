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
            const val = state.addParticipant
            if (val.id) {
                const index = state.participantList.findIndex(p => p.id === val.id);
                if (index !== -1) {
                    state.participantList[index] = { ...state.participantList[index], ...val };
                }
            } else {
                const newParticipant = { id: new Date().toLocaleString(), ...val };
                state.participantList = [newParticipant, ...state.participantList];
            }
        },

        handleEdit: (state, action) => {
            const { edit } = action.payload;
            state.addParticipant = edit
        },

        handleDelete: (state, action) => {
            const { del } = action.payload;
            let deleted = state.participantList?.filter((item) => item.id !== del.id)
            state.participantList = deleted
        },

        handleCancel: (state) => {
            state.addParticipant = { email: "", name: "" };
        }

    }
})

export const { handleChangeInput, handleCancel, handleAddParticipant, handleEdit, handleDelete } = participantSlice.actions
export default participantSlice.reducer