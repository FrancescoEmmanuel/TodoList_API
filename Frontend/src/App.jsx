import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from "./components/Header";
import TodoModal from './components/TodoModal';
import TodoList from './components/TodoList';
import Title from './components/Title';
import FilterModal from './components/FilterModal';
import UserProfile from './components/UserProfile'; 
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [openModal, setModal] = useState(false);
  const [toDoList, setToDoList] = useState([]);
  const [activeTab, setActiveTab] = useState('Today');
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({ type: '', completed: '' });
  const [selectedItem, setSelectedItem] = useState(null); 

  useEffect(() => {
    fetchToDoList();
  }, []);

  const fetchToDoList = async () => {
    try {
      const response = await axios.get('http://localhost:8000/todos/');
      setToDoList(response.data);
    } catch (error) {
      console.error('Error fetching ToDo list:', error);
    }
  };

  const applyFilter = async (filter) => {
    try {
      const response = await axios.get('http://localhost:8000/todos/', { params: filter });
      setToDoList(response.data);
      setFilterOptions(filter);
      setFilterModalOpen(false);
    } catch (error) {
      console.error('Error applying filter:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/todos/${id}`);
      setSelectedItem(response.data);
      setModal(true);
    } catch (error) {
      console.error('Error fetching ToDo item for update:', error);
    }
  };

  const handleSubmit = async (newItemData) => {
    try {
      // Generate a unique ID for the new item
      const newItemWithId = { ...newItemData, id: crypto.randomUUID() };

      const response = await axios.post('http://localhost:8000/todos/new', newItemWithId);
      setToDoList([...toDoList, response.data]);
      setModal(false);
    } catch (error) {
      console.error('Error creating new ToDo item:', error);
      console.log('Error response:', error.response);
    }
  };

  const updateItem = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:8000/todos/edit/${id}`, updatedData);
      const updatedList = toDoList.map(todo => todo.id === id ? response.data : todo);
      setToDoList(updatedList);
      setModal(false);
    } catch (error) {
      console.error('Error updating ToDo item:', error);
    }
  };
  
  

  const toggleTodo = async (id, status) => {
    try {
      const response = await axios.put(`http://localhost:8000/todos/edit/${id}`, { completed: status });
      setToDoList((currentTodos) =>
        currentTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, completed: status };
          }
          return todo;
        })
      );
    } catch (error) {
      console.error("There was an error updating the todo: ", error.response);
    }
  };
  
  

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/todos/${id}`);
      const updatedList = toDoList.filter(todo => todo.id !== id);
      setToDoList(updatedList);
    } catch (error) {
      console.error('Error deleting ToDo item:', error);
    }
  };

  const tabNames = ['Today', 'Tomorrow', 'Upcoming', 'Past'];

  const renderTabButton = (tabName) => (
    <button
      key={tabName}
      className={`font-semibold h-8 focus:outline-none relative transition-all duration-300 ${activeTab === tabName && 'text-blue-400'}`}
      onClick={() => setActiveTab(tabName)}
    >
      {tabName}
      <div
        className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-400 transform origin-left transition-transform duration-300 ${activeTab === tabName ? 'scale-x-100' : 'scale-x-0'}`}
      ></div>
    </button>
  );

  return (
    <div className="flex items-center justify-center min-w-screen">
      <div className="w-[40%] mx-auto my-0">
        <Title>Todo List</Title>
        <div className="max-w-[750px] w-full mx-auto my-0">
          <Header setModal={setModal}  setFilterModalOpen={setFilterModalOpen}/>
          <div className="flex justify-center mt-2 mb-3 space-x-4 text-white">
            {tabNames.map(renderTabButton)}
          </div>
          <TodoList
            todos={toDoList}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            title={activeTab}
            handleUpdate={handleUpdate}
          />
          <div className='flex justify-center mt-96 items-center'>
            <UserProfile name="Francesco Emmanuel Setiawan" nim="2602209620" profileIcon="src\assets\pas-photo.png" />
          </div>
          <TodoModal
            openModal={openModal}
            setModal={setModal}
            handleSubmit={handleSubmit}
            updateItem={updateItem}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <FilterModal
            isOpen={filterModalOpen}
            closeModal={() => setFilterModalOpen(false)}
            applyFilter={applyFilter}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
