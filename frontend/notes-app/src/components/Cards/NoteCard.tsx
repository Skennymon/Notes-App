import React from 'react'
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md'
const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
}) => {
    return (
        <div className='grid grid-cols-1 border p-4 bg-white hover:drop-shadow-xl transition-all ease-in-out'>
            <div className='flex items-center justify-between'>
                <div>
                    <h6 className='text-sm font-medium'>{title}</h6>
                    <span className='text-xs text-slate-500'>{date}</span>

                </div>
                
                {isPinned ? 
                    <MdOutlinePushPin className='icon-btn text-primary' onClick={onPinNote}/>
                :
                    <MdOutlinePushPin className='icon-btn text-slate-300' onClick={onPinNote}/>
                }

            </div>

            <p className="">{content?.slice(0, 60)} </p>

            <div className='flex items-center gap-2 justify-between mt-2'>
                
                <span className='text-xs text-slate-500'>{tags}</span>

                <div className='flex items-center gap-2'>
                    <MdCreate 
                        className='icon-btn hover:text-green-600 cursor-pointer'
                        onClick={onEdit}
                    />
                    <MdDelete 
                        className='icon-btn hover:text-red-600 cursor-pointer'
                        onClick={onDelete}
                    />
                </div>

            </div>

        </div>
    )
}

export default NoteCard