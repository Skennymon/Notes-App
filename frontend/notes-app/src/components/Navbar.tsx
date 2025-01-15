import React from 'react'
import ProfileInfo from './Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/Searchbar/SearchBar.tsx'
import { useState } from 'react'

function Navbar() {

    const navigate = useNavigate;
    const [searchQuery, setSearchQuery] = useState("");

    const onLogOut = () => {
        navigate(); //idk what to do here
    }

    const handleSearch = () => {
        //some code
    }

    const onClearSearch = () => {
        setSearchQuery("");
    }

    return (
        <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
            <h2 className='text-xl font-medium text-black py-2 text-center'>Notes</h2>
            <SearchBar 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
            />
            <ProfileInfo onLogOut={onLogOut}/>
        </div>
    )
}

export default Navbar