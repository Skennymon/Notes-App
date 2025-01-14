import Navbar from '../../components/navbar'
import React from 'react'
import { Link } from 'react-router-dom'
function Login() {
    
    return (
        <>
            <Navbar/>

            <div className='flex items-center justify-center mt-28'>
                <div className='w-96 border rounded px-7 py-10'>
                    <form onSubmit={() => {}}>
                        <h4 className='text-2xl mb-7'>Login</h4>
                        <input placeholder='Email' className='input-box'></input>
                        <button type='submit' className='btn-primary'>Login</button>
                        <p className='text-sm text-center mt-4'>Not Registered yet? {" "} <Link to='SignUp' className='font-medium underline text-primary'>Sign Up Here!</Link></p>
                    </form>
                </div>
            </div>

        </>
    )

}

export default Login