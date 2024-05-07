import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from '../components/Header';
import TodoModal from '../components/TodoModal';
import TodoList from '../components/TodoList';
import Title from '../components/Title';
import FilterModal from '../components/FilterModal';
import Tab from '../components/Tab';
import axios from "axios"; 
import Sidebar from '../components/Sidebar';

function ToDoPage() {
  const [openModal, setModal] = useState(false);
  const [toDoList, setToDoList] = useState([]);
  const [missedTaskCount, setMissedTaskCount] = useState(0);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({ type: '', completed: '' });
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    // Fetch todos from FastAPI backend when the component mounts
    axios.get("http://localhost:8000/todos")
      .then(response => {
        setToDoList(response.data);
        // Calculate missed task count (if needed)
        const missedCount = response.data.filter(todo => isPast(new Date(todo.date)) && !todo.completed).length;
        setMissedTaskCount(missedCount);
      })
      .catch(error => {
        console.error("Error retrieving todos:", error);
      });
  }, []);

  const applyFilter = (filter) => {
    setFilterOptions(filter);
    setFilterModalOpen(false);
  };

  const handleUpdate = (id) => {
    const selectedItem = toDoList.find((item) => item.id === id);
    setSelectedItem(selectedItem);
    setModal(true);
  };

  const filteredList = () => {
    return toDoList.filter((todo) => {
      const typeFilter =
        filterOptions.type === 'All' ||
        !filterOptions.type ||
        todo.type.toUpperCase() === filterOptions.type.toUpperCase();

      const completedFilter =
        filterOptions.completed === 'All' ||
        filterOptions.completed === '' ||
        todo.completed === filterOptions.completed;

      const dateFilter = () => {
        switch (activeTab) {
          case 'All':
            return todo;
          case 'Today':
            return isToday(new Date(todo.date));
          case 'Tomorrow':
            return isTomorrow(new Date(todo.date));
          case 'Upcoming':
            return isLater(new Date(todo.date));
          case 'Past':
            return isPast(new Date(todo.date));
          default:
            return true;
        }
      };

      return typeFilter && completedFilter && dateFilter();
    });
  };

  function isToday(date) {
    const today = new Date();
    const todayWithoutTime = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const dateWithoutTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    return (
      dateWithoutTime.getTime() === todayWithoutTime.getTime() &&
      date.getTime() >= today.getTime()
    );
  }

  function isTomorrow(date) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return date.toDateString() === tomorrow.toDateString();
  }

  function isLater(date) {
    const today = new Date();
    return date > today && !isToday(date) && !isTomorrow(date);
  }

  function isPast(date) {
    const today = new Date();
    return date < today;
  }

  const toggleTodo = async (id) => {
    try {
      // Send a PUT request to update the todo completion status in FastAPI backend
      await axios.put(`http://localhost:8000/todos/${id}/toggle`);
      // Fetch updated todos from FastAPI backend
      const response = await axios.get("http://localhost:8000/todos");
      setToDoList(response.data);
      // Recalculate missed task count (if needed)
      const missedCount = response.data.filter(todo => isPast(new Date(todo.date)) && !todo.completed).length;
      setMissedTaskCount(missedCount);
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      // Send a DELETE request to delete the todo in FastAPI backend
      await axios.delete(`http://localhost:8000/todos/${id}`);
      // Fetch updated todos from FastAPI backend
      const response = await axios.get("http://localhost:8000/todos");
      setToDoList(response.data);
      // Recalculate missed task count (if needed)
      const missedCount = response.data.filter(todo => isPast(new Date(todo.date)) && !todo.completed).length;
      setMissedTaskCount(missedCount);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const tabNames = ['All', 'Today', 'Tomorrow', 'Upcoming', 'Past'];

  return (
    <div className="flex items-center justify-center min-w-screen">
      <div className="w-[40%] mx-auto my-0">
        <Title>Todo List</Title>
        <div className="max-w-[750px] w-full mx-auto my-0">
          <Header setModal={setModal} setFilterModalOpen={setFilterModalOpen} />
          <div className="flex justify-center mt-2 mb-3 text-white">
            <Tab
              tabNames={tabNames}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              space={'space-x-4'}
            />
          </div>
          <TodoList
            todos={filteredList()}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            title={activeTab}
            handleUpdate={handleUpdate}
          />
          <div className="text-white opacity-80 flex justify-center mt-20 items-center">
            Made by Francesco Emmanuel Setiawan 2602209620
          </div>
          <TodoModal
            openModal={openModal}
            setModal={setModal}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            userId={null} // Change this accordingly if you still need to pass user ID
          />
          <FilterModal
            isOpen={filterModalOpen}
            closeModal={() => setFilterModalOpen(false)}
            applyFilter={applyFilter}
          />
          <Sidebar missedTaskCount={missedTaskCount} />
        </div>
      </div>
    </div>
  );
}

export default ToDoPage;
