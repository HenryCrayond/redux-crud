import React from 'react'
import '../style.css'
import { useDispatch } from 'react-redux'
import { handleEdit, handleDelete } from '../../slice/participantSlice'

const ParticipantTable = (props) => {
    const { rowData,openModal} = props
    const dispatch = useDispatch()

    const handleRowEdit =(row)=>{
        openModal()
        dispatch(handleEdit({ edit: row }))
    }

    return (
        <div style={{ overflowX: 'auto' }} >
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '100px' }}>Id</th>
                        <th style={{ width: '200px' }}>Name</th>
                        <th style={{ width: '300px' }}>Email</th>
                        <th style={{ width: '100px' }}>Edit</th>
                        <th style={{ width: '100px' }}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rowData && rowData.length > 0 && rowData?.map((row, i) => (
                            <tr className='row-item' >
                                <td >{i+1}</td>
                                <td>{row.name}</td>
                                <td>{row.email}</td>
                                <td><button className='outline-btn' onClick={()=>handleRowEdit(row)}>Edit</button></td>
                                <td><button className='contained-btn' onClick={() => dispatch(handleDelete({ del: row }))}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ParticipantTable