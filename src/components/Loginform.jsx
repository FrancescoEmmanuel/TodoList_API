import React from 'react';
import { gitProvider,googleProvider } from '../Firebase';

function LoginForm({ handleCredentials, handleLogIn, handleSocial, gitIcon}) {
  return (
    <div className="p-8 rounded w-[600px]">
      <div className="mb-4 text-white"> 
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email
        </label>
        <input type="email"  name="email" className="login-input" placeholder='Johndoe@gmail.com' 
        onChange={(e) => {handleCredentials(e)}} />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium 0 ">
          Password
        </label>
        <input type="password" name="password" className="login-input" placeholder='Password' 
        onChange={(e)=> {handleCredentials(e)}}/>
      </div>

      <div className="flex flex-col justify-end items-end">
        <button onClick = {(e) => {handleLogIn(e)}} className="bg-blue-700 shadow-lg text-white text-base py-1 px-4 rounded-3xl hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Sign in
        </button>
      </div>

      <div className="flex items-center mt-4">
        <hr className="flex-grow border-t" />
        <span className="mx-2 text-sm">or continue with</span>
        <hr className="flex-grow border-t" />
      </div>

      <div className="flex flex-col items-center mt-4">
        <div className='flex flex-row'>
            <button className="w-10 h-10 bg-zinc-600 rounded-full flex items-center justify-center mr-4 shadow-md" onClick={() => handleSocial(googleProvider)}>
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Icon" className="w-6 h-6" />
            </button>

            <button className="w-10 h-10 bg-zinc-600 rounded-full flex items-center justify-center mr-4 shadow-md " onClick={() => handleSocial(gitProvider)}>
            <img src={gitIcon} alt="Github Icon" className="w-6 h-6" />
            </button>
        </div>
        
      </div>

      
    </div>
  );
}
export default LoginForm;
