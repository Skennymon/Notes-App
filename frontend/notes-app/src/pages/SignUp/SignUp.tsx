import React from 'react'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import PasswordInput from '../../components/PasswordInput.tsx'
import { validateEmail } from '../../utils/helper.tsx'
import { Link } from 'react-router-dom'

function SignUp() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSignUp = async (e) => {
    e.preventDefault();
    if(!name) {
        setError("Enter name pls");
        return;
    }
    else if(!validateEmail(email)) {
        setError("Enter valid email pls");
        return;
    }
    else if(!password) {
        setError("Enter password pls");
        return;
    }

    //api calls
    //probably use some database to store the bing bongs

    setError("");

  }

  return (
    <>
        <Navbar />
        <div className="flex item-center justify-center mt-28">
            <div className="w-96 border rounded bg-white px-7 py-10">
                <form onSubmit={handleSignUp}>
                    <h4>Sign Up</h4>
                    <input placeholder="Name" className='input-box mt-5' type='text' onChange={(e) => setName(e.target.value)}/>
                    <input placeholder='Email' className='input-box' type="text" onChange={(e) => setEmail(e.target.value)} value={email}/>
                    <PasswordInput placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                    {error && <p className='text-red-600 text-xs'>{error}</p>}

                    <button type="submit" className="btn-primary">Sign Up!</button>
                    <p className='text-sm text-center mt-4'>
                        Already have an account? <Link to="/login" className='font-medium text-primary underline'>Login</Link>
                    </p>
                </form>
            </div>
        </div>

    </>
  )
}

export default SignUp