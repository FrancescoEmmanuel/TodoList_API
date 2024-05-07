import React, { useEffect, useState } from 'react';
import { MdOutlineClose } from "react-icons/md";


function FilterModal({ isOpen, closeModal, applyFilter }) {
  const [selectedType, setSelectedType] = useState('');
  const [completedFilter, setCompletedFilter] = useState('');

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleCompletedChange = (filter) => {
    setCompletedFilter(filter);
  };

  const handleApplyFilter = () => {
    applyFilter({
      type: selectedType,
      completed: completedFilter === 'completed' ? true : completedFilter === 'incomplete' ? false : '',
    });
    closeModal();
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex justify-center items-center p-8 rounded-lg relative bg-zinc-800">
            <div
              className="absolute -translate-y-full text-[1.25rem] rounded bg-zinc-800 text-[color:var(--black-2)] flex items-center justify-center cursor-pointer transition-[0.3s] duration-[ease] ease-[all] 
                    z-[-1] p-2 right-0 -top-2.5 hover:bg-[#e32525] hover:text-white"
              onKeyDown={closeModal}
              onClick={closeModal}
              tabIndex={0}
              role="button"
            >
              
              <MdOutlineClose/>
            </div>
            <div className="w-full">
              <h1 className="text-white text-[1.5rem] font-semibold capitalize mb-8">Filter Tasks</h1>
              <div className="flex flex-col space-y-4">
                <label className="text-white">
                  <div className='flex mr-5'>
                    Filter by Type:
                  </div>
                  <select
                    className="text-white bg-zinc-600 rounded outline-none mt-2"
                    value={selectedType}
                    onChange={(e) => handleTypeChange(e.target.value)}
                  >
                    <option value= "All">
                      All</option>
                    <option value= "WORK">
                      Work</option>
                    <option value= "SCHOOL">
                        School
                    </option>
                    <option value="DAILY">
                        Daily
                    </option>
                    <option value ="HOBBIES">
                        Hobbies
                    </option>
                    <option value="SOCIAL">
                        Social
                    </option>
                    <option value = "SELF-IMPROVEMENT">
                        Self-improvement
                    </option>
                    <option value= "OTHER">
                        Other
                    </option>
                           
                  </select>
                </label>
                <label className="text-white">
                  <div className='flex mr-5'>
                    Filter by Completion:
                  </div>
                  
                  <select
                    className="text-white bg-zinc-600 rounded outline-none mt-2"
                    value={completedFilter}
                    onChange={(e) => handleCompletedChange(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                  </select>
                </label>
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                    onClick={handleApplyFilter}
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterModal;
