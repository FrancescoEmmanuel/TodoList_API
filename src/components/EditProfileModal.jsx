import React, { useState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';


function EditProfileModal({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    picture: '', // You may handle the picture upload separately
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    // Validate form fields if needed
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving profile:', error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-md w-96">
        <div className="flex justify-end">
          <FaTimes className="cursor-pointer" onClick={onCancel} />
        </div>
        <label className="block mb-2 text-gray-800">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block mb-2 text-gray-800">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        {/* Handle picture upload based on your implementation */}
        <label className="block mb-2 text-gray-800">Picture</label>
        {/* Include your picture upload logic here */}
        
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded mr-2"
            onClick={handleSave}
          >
            <FaSave className="mr-1" />
            Save
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
