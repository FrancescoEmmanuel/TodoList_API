import React, { useEffect, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from './Button';

function TodoModal({ openModal, setModal, handleSubmit, updateItem, selectedItem,setSelectedItem }) {
  const [mode, setMode] = useState('add'); // 'add' or 'update'
  const [title, setTitle] = useState('');
  const [type, setType] = useState('work');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedItem) {
      setMode('update');
      setTitle(selectedItem.title);
      setType(selectedItem.type);
      setDate(selectedItem.date);
      setDescription(selectedItem.description);
    } else {
      setMode('add');
      setTitle('');
      setType('work');
      setDate('');
      setDescription('');
    }
  }, [openModal, selectedItem]);


  // TodoModal.js

// Inside handleFormSubmit function
  function handleFormSubmit(e) {
    e.preventDefault();
    
    if (mode === 'update' && selectedItem) {
      updateItem(selectedItem.id, { title, type, date, description });
      setSelectedItem(null); 
    } else {
      const newItemData = { title, type, date, description, completed: false }; // Ensure all fields are included
      handleSubmit(newItemData);
    }
    
    setMode('add');
    setTitle('');
    setType('work');
    setDate('');
    setDescription('');
    setModal(false);
  }

  

  return (
    <div>
      {openModal && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex justify-center items-center p-8 rounded-lg relative bg-zinc-800">
            <div
              className="absolute -translate-y-full text-[1.25rem] rounded bg-zinc-800 text-[color:var(--black-2)] flex items-center justify-center cursor-pointer transition-[0.3s] duration-[ease] ease-[all] z-[-1] p-2 right-0 -top-2.5 hover:bg-[#e32525] hover:text-white"
              onKeyDown={() => setModal(false)}
              onClick={() => setModal(false)}
              tabIndex={0}
              role="button"
            >
              <MdOutlineClose />
            </div>
            <form className="w-full" onSubmit={(e) => handleFormSubmit(e)}>
              <h1 className="text-white text-[1.5rem] font-semibold capitalize mb-8">
                {mode === 'update' ? 'Update Task' : 'Add To List'}
              </h1>
                        <label htmlFor='title' className='text-white'>
                            Title
                            <input type="text" className=' inline-block outline-none rounded bg-zinc-600 w-full text-[1rem]  text-white mt-2 mb-6 mx-auto my-0 p-1'
                            value={title} onChange={(e) => setTitle(e.target.value)}></input>
                        </label>
                        <label htmlFor='Type' className='text-white'>
                            Type
                            <select className='text-white bg-zinc-600 rounded outline-none mt-1 mb-6 mx-auto my-0 ml-2' value={type} onChange={(e) =>setType(e.target.value)}>
                                <option value= "Work">
                                    Work
                                </option>
                                <option value= "School">
                                    School
                                </option>
                                <option value="Daily">
                                    Daily
                                </option>
                                <option value ="Hobbies">
                                    Hobbies
                                </option>
                                <option value="Social">
                                    Social
                                </option>
                                <option value = "Self-improvement">
                                    Self-improvement
                                </option>
                                <option value= "Other">
                                    Other
                                </option>
                            </select>
                        </label>
                        <label htmlFor='date' className='text-white ml-4'>
                            To be done by
                            <input type="datetime-local" className='text-white bg-zinc-600 ml-2 w-21 rounded text-center ' value={date} onChange={(e)=> setDate(e.target.value)} placeholder='select a date'></input>
                        </label>
                        <label htmlFor='Description' className='text-white block'>
                            Description
                            <input type="text" className='block rounded-lg bg-zinc-600 w-full p-5 mt-2 ' value= {description}  onChange={(e)=> setDescription(e.target.value)}></input>
                        </label>
                        <div className=' flex justify-start items-center gap-4 mt-8'>
                            <Button type="submit">
                                Submit
                            </Button>
                           
                        </div>
                    </form>
        
                </div>
        </div>
            
        )}
    </div>
  )
}

export default TodoModal;

