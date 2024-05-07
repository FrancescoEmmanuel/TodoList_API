// UserProfile.js
import React from 'react';

const UserProfile = ({ name, nim, profileIcon }) => {
  return (
    <div className="flex items-center space-x-2">
      <img src={profileIcon} alt="Profile Icon" className="w-10 h-10 rounded-full" />
      <div>
        <span className="text-white">{name}</span>
        <br />
        <span className="text-white">{nim}</span>
      </div>
    </div>
  );
};

export default UserProfile;
