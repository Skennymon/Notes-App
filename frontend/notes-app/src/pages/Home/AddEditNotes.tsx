import React from 'react'

const AddEditNotes = () => {
  return (
    <div>
        <div className='flex flex-col gap-2'>
            <label className='input-label'>TITLE</label>
            <input 
                type='text'
                className='text-2xl text-slate-950 outline-none'
                placeholder='GYM TIME YIPPEEE'
            />
            <textarea 
                className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
                placeholder='Content'
                rows={10}
            />
        </div>

        <div className='mt-3'>
            <label className='input-label'>TAGS</label>
        </div>

        <button className='btn-primary font-medium mt-5 p-3' onClick={() => {}}>ADD</button>
    </div>
  )
}

export default AddEditNotes