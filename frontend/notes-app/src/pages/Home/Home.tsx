import React from 'react'
import Navbar from '../../components/Navbar.tsx'
import NoteCard from '../../components/Cards/NoteCard.tsx'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes.tsx'
import Modal from 'react-modal'
import { useState } from 'react'

function Home() {

  const [openAddEditModal, setOpenEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });


  return (
    <>
        <Navbar/>
        
        <div className='container mx-auto'>
          
          <div className='grid grid-cols-3 gap-4 mt-8'>
            <NoteCard 
              title="Meet the bros" 
              date="5/10/25" 
              content="penis"
              tags="#Bros"
              isPinned={true}
              onEdit={() => {}}
              onDelete={() => {}}
              onPinNote={() => {}}
            />
          </div>
        </div>

        <button className='bg-green-500 rounded-2xl w-16 h-16 flex items-center justify-center bg-primary hover:bg-blue-600 absolute right-10 bottom-10 drop-shadow-md' onClick={() => {}}>
          <MdAdd className='text-[32px] text-white' />
        </button>

        <Modal
          isOpen={openAddEditModal.isShown}
          onRequestClose={() => {}}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.2)",
            },
          }}
          contentLabel=''
          className=''
        >
          <AddEditNotes/>
        </Modal>



    </>
  )
}
export default Home