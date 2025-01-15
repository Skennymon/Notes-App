import React from 'react'
import Navbar from '../../components/Navbar.tsx'
import NoteCard from '../../components/Cards/NoteCard.tsx'

function Home() {
  return (
    <>
        <Navbar/>
        
        <div className='container mx-auto'>
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

    </>
  )
}

export default Home