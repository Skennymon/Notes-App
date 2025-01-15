import React from 'react'
import ProfileInfo from './Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/Searchbar/SearchBar.tsx'

function Navbar() {

    const navigate = useNavigate;

    const onLogOut = () => {
        navigate('/login');
    }

    return (
        <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
            <h2 className='text-xl font-medium text-black py-2 text-center'>Notes</h2>
            <SearchBar/>
            <ProfileInfo onLogOut={onLogOut}/>
        </div>
    )
}

export default Navbar