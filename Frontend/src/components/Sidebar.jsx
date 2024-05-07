import React from 'react';
import UserProfile from './UserProfile';

function Sidebar({ missedTaskCount }) {
  return (
    <div className="w-1/5 h-screen bg-zinc-800 fixed left-0 top-0 flex flex-col items-center">
      <div className='mt-20 ml-3'>
        <UserProfile missedTaskCount={missedTaskCount} />
      </div>
    </div>
  );
}

export default Sidebar;
