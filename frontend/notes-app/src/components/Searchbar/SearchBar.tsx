import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'

function SearchBar( {value, onChange, handleSearch, onClearSearch}) {
  return (
    <div className='w-80 flex items-center px-4 bg-slate-100 rounded-md'>
        <input 
            type="text" 
            placeholder="Search Notes" 
            className='w-full text-xs bg-transparent outline-none py-[11px]'
            value={value}
            onChange={onChange}
        />
        
        {value && (
           <IoMdClose className='cursor-pointer mr-2 text-slate-500 hover:text-black' onClick={onClearSearch}/>
        )}
        
        <FaMagnifyingGlass className='text-slate-400 cursor-pointer hover:text-black' onClick={handleSearch}/>
    </div>
  )
}

export default SearchBar