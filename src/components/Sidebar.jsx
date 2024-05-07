import React, { useState, useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import UserProfile from './UserProfile';
import { auth } from '../Firebase'; // Import your Firebase setup file
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

function Sidebar({ missedTaskCount }) {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the current user
      navigate('/'); // Redirect to the login page
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="w-1/5 h-screen bg-zinc-800 fixed left-0 top-0 flex flex-col items-center">
      <div className='mt-20 ml-3'>
        <UserProfile missedTaskCount={missedTaskCount} />
      </div>
      <div className='mt-auto mb-5'>
        <button
          className="rounded mt-auto mb-auto px-4 py-2 text-white flex items-center justify-center bg-red-400 border border-red-400  cursor-pointer outline-none 
            transition duration-300 ease-in-out hover:bg-opacity-20 hover:text-red-400 focus-visible:bg-opacity-20"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;