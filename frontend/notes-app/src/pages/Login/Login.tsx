import Navbar from '../../components/Navbar.tsx'
import PasswordInput from '../../components/PasswordInput.tsx'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { validateEmail } from '../../utils/helper.tsx'
import axiosInstance from '../../utils/axiosInstance.ts';

function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!validateEmail(email)) {
            setError("Invalid Email!");
            return;
        }
        if(!password) {
            setError("Please enter a password!");
            return;
        }
        //login api call
        
        setError("");

        try {
            const response = await axiosInstance.post("/login", {
                email: email,
                password: password,
            });

            if(response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate('/dashboard');
            }
        }
        catch (error) {
            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
            else {
                setError("An unexpected error occured. Please try again");
            }
        }
    }

    //when the <button> type is set to "submit" it'll run the function that the <form> attribute "onsubmit" is set too.
    //{error && blah blah blah} is a conditional render where if error is not "", it'll render whatever is after &&

    return (
        <>
            { /* <Navbar/> */ } 
            
            <div className='flex items-center justify-center mt-28'>
                <div className='w-96 border rounded px-7 py-10 bg-white'>
                    <form onSubmit={handleLogin}>
                        <h4 className='text-2xl mb-7'>Login</h4>
                        <input placeholder='Email' className='input-box' type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                        {error && <p className="text-red-600 text-xs pb-1">{error}</p>}
                        <button type='submit' className='btn-primary'>Login</button>
                        <p className='text-sm text-center mt-4'>Not Registered yet? <Link to='/signup' className='font-medium underline text-primary'>Sign Up Here!</Link></p>
                    </form>
                </div>
            </div>

        </>
    )

}

export default Login