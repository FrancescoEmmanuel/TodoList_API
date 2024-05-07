import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { v4 } from "uuid";

const UserProfile = ({ missedTaskCount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [userData, setUserData] = useState({
    taskCompleted: 0,
    taskToComplete: 0,
    missedTask: 0,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  
  useEffect(() => {
    setEditedName(userData.name || '');
    setEditedEmail(userData.email || '');
  }, [userData]);

  return (
    <div className="container mx-auto p-4 rounded-lg">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-24 h-24 mb-2">
          <img
             // Replace with the actual source for the profile photo
            alt="Profile Icon"
            className="object-cover w-full h-full rounded-full"
          />
          <div
            className="absolute right-0 bottom-0 cursor-pointer text-white"
            onClick={openModal}
          >
            <FaEdit />
          </div>
        </div>
        <div className="text-center">
          <span className="text-white text-xl block">{editedName}</span>
          <span className="text-gray-300 text-xs block opacity-75">{editedEmail}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="info-container bg-green-400 opacity-75">
          <span className="text-white text-3xl">{userData.taskCompleted}</span>
          <span className="text-white text-xs">Completed</span>
          {/* <FaCheck className="text-green-500 text-lg" /> */}
        </div>
        <div className="info-container bg-orange-400 opacity-75">
          <span className="text-white text-3xl">{userData.taskToComplete}</span>
          <span className="text-white text-xs">To complete</span>
          {/* <FaClock className="text-yellow-500 text-lg" /> */}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="info-container bg-red-400 opacity-75">
          <span className="text-white text-3xl">{missedTaskCount}</span>
          <span className="text-white text-xs">Missed</span>
          {/* <FaTimes className="text-red-500 text-lg" /> */}
        </div>
        <div className="info-container bg-blue-400 opacity-75">
          <span className="text-white text-3xl">
            {Math.round((userData.taskCompleted) / ((userData.taskCompleted) + (missedTaskCount)) * 100)}%
          </span>
          <span className="text-white text-xs">Completion rate</span>
        </div>
      </div>

   
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#333] bg-opacity-75 flex items-center justify-center">

          <div className="bg-zinc-700 p-6 rounded- text-white">
            <div className='text-white text-2xl font-semibold mb-4'>
             Update Profile
            </div>
            <label className="block mb-2 text-sm font-bold text-white">Name:</label>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="text-white w-full mb-4 p-2 rounded-md bg-[#333]"
            />
            
            <label className="block mb-2 text-sm font-bold text-white">Upload profile picture</label>
            <input
              type= "file"
              onChange={handleImageChange}
            />

            <button
              onClick={handleSave}
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Save
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-500 text-white p-2 rounded-md ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
