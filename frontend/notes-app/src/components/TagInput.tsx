import React from 'react'
import { MdAdd, MdClose } from 'react-icons/md'
import { useState } from 'react'

const TagInput = ({ tags, setTags }) => {

    const[inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const addNewTag = () => {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter") {
            addNewTag(e); //bruh
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    }

  return (
    <div>
        
        <div className='flex items-center gap-2 flex-wrap mt-2'>
            {tags?.map((tags, index) => (
                <span key={index} className='border rounded-md text-slate-900 bg-slate-100 px-3 py-1'>
                    # {tags}
                    <button onClick={() => {handleRemoveTag(tags)}}>
                        <MdClose />
                    </button>
                </span>
            ))}
        </div>
        
        <div className='flex items-center gap-4 mt-2'>
            <input type='text' className='w-[69%] border rounded-md pl-2' placeholder='Add tags!' onKeyDown={handleKeyDown} onChange={handleInputChange} value={inputValue}></input>
            
            <button className='w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700' onClick={addNewTag}>
                <MdAdd className='text-2xl text-blue-700 hover:text-white' />
            </button>
        </div>
    </div>
  )
}

export default TagInput