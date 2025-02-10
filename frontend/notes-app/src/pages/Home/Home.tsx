import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar.tsx'
import NoteCard from '../../components/Cards/NoteCard.tsx'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes.tsx'
import Modal from 'react-modal'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance.ts'
import axios from 'axios'

function Home() {

  const [openAddEditModal, setOpenEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if(response.data && response.data.user) {
        setUserInfo(response.data.user);
        console.log("YAY");
      }
    }
    catch (error) {
      console.log("ERROR");
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
        <Navbar userInfo={userInfo}/>
        
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

        <button 
        className='rounded-2xl w-16 h-16 flex items-center justify-center bg-primary hover:bg-blue-600 absolute right-10 bottom-10 drop-shadow-md' 
        onClick={() => {
          setOpenEditModal({ isShown: true, type: "add", data: null});
        }}>
          <MdAdd className='text-[32px] text-white' />
        </button>

        {/*this is to toggle a popup to add a note*/ }
        <Modal
          isOpen={openAddEditModal.isShown}
          onRequestClose={() => {}}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.2)",
            },
          }}
          contentLabel=''
          className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll'
        >
          <AddEditNotes onClose={() => setOpenEditModal({ isShown: false, type: "add", data: null })} type={openAddEditModal.type} noteData={openAddEditModal.data}/>
        </Modal>



    </>
  )
}
export default Home