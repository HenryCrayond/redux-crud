import './App.css';
import { useState } from 'react'
import { Modal } from './components/modal';
import ParticipantTable from './components/table';
import { useDispatch, useSelector } from 'react-redux';
import { handleCancel } from './slice/participantSlice';


function App() {
  const { participantList } = useSelector((state) => state.participant)
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const handleAdd = () => {
    setOpenModal(true);
    dispatch(handleCancel())
  }
  return (
    <div className="App">
      <div className='app-nav'>
        <h2>Participants List</h2>
        <button className='contained-btn-add' onClick={handleAdd}>Add Participant</button>
      </div>
      <div className='table-root'>
        <ParticipantTable rowData={participantList} openModal={() => setOpenModal(true)} />
      </div>
      <Modal open={openModal} handleClose={() => setOpenModal(false)} />
    </div>
  );
}

export default App;
