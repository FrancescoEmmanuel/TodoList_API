import React, {useState} from 'react'
import Button,{SelectButton} from "./Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';




function Header({setModal,setFilterModalOpen}) {

  return (
    <div className='flex items-center justify-between h-[60px]'>
        {/* <button type ="button"> + New task</button> */}
        {/* <h1 className="text-5xl text-center ">To-do List</h1> */}
        <Button onClick= {() => setModal(true)}>+ New Task</Button>
   
        <button className="bg-gray-300 text-gray-800 p-2 px-2 py-1 rounded-2xl flex gap-2 items-center border border-white transition duration-300 ease-in-out hover:bg-opacity-20 hover:text-white focus-visible:bg-opacity-20;
  }" onClick={() => setFilterModalOpen(true)}>
                    <FontAwesomeIcon icon={faFilter}/>
                    Filter
        </button>

    
        
          {/* <SelectButton>
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </SelectButton>
      */}
      
        {/* <SelectButton>
          <option value=""
        </SelectButton>
        */}
       
      </div>

      
  )
}

export default Header;





// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFilter } from '@fortawesome/free-solid-svg-icons';
// import FilterModal from './FilterModal';
// import Button from './Button';

// function Header({ setModal, applyFilter }) {
//   const [filterModalOpen, setFilterModalOpen] = useState(false);

//   const openFilterModal = () => {
//     setFilterModalOpen(true);
//   };

//   const closeFilterModal = () => {
//     setFilterModalOpen(false);
//   };

//   return (
//     <div className='flex items-center justify-between h-[60px]'>
//       <Button onClick={() => setModal(true)}>+ New Task</Button>
//       <button
//         className="bg-white text-gray-800 p-2 px-2 py-1 rounded-xl flex gap-2 items-center"
//         onClick={openFilterModal}
//       >
//         <FontAwesomeIcon icon={faFilter} />
//         Filter
//       </button>

//       <FilterModal isOpen={filterModalOpen} closeModal={closeFilterModal} applyFilter={applyFilter} />
//     </div>
//   );
// }

// export default Header;
