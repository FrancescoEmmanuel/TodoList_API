import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from '../components/Header';
import TodoModal from '../components/TodoModal';
import TodoList from '../components/TodoList';
import Title from '../components/Title';
import FilterModal from '../components/FilterModal';
import UserProfile from '../components/UserProfile';
import Tab from '../components/Tab';
import { auth, db } from '../Firebase';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc, getDoc
} from 'firebase/firestore';

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

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = auth.currentUser.uid;

        const userDocRef = doc(db, 'users', userId);

        const q = query(collection(db, 'todos', userId, 'items'));
        const unsubscribeTodos = onSnapshot(q, (querySnapshot) => {
          let todosDb = [];
          let missedCount = 0;

          querySnapshot.forEach((doc) => {
            const todoData = { ...doc.data(), id: doc.id };

            if (isPast(new Date(todoData.date)) && !todoData.completed) {
              missedCount++;
            }

            todosDb.push(todoData);
          });

          setToDoList(todosDb);
          setMissedTaskCount(missedCount);
        });

        return () => {
          unsubscribeTodos();
        };
      } else {
        setToDoList([]);
        setMissedTaskCount(0);
      }
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
      const todoRef = doc(db, 'todos', auth.currentUser.uid, 'items', id);
      const todoDoc = await getDoc(todoRef);
  
      if (todoDoc.exists()) {
        const todoData = todoDoc.data();
  
        // Update completed status
        await updateDoc(todoRef, {
          completed: !todoData.completed,
        });
  
        // Update user document based on completion status
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
  
        if (userDoc.exists()) {
          const userData = userDoc.data();
  
          // Update taskToComplete and taskCompleted counters based on completion status
          await updateDoc(userDocRef, {
            taskToComplete: todoData.completed
              ? userData.taskToComplete + 1
              : userData.taskToComplete - 1,
            taskCompleted: todoData.completed
              ? userData.taskCompleted - 1
              : userData.taskCompleted + 1,
          });
        }
      }
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };
  

  // Inside ToDoPage component
  // Inside ToDoPage component
  // Inside ToDoPage component
const deleteTodo = async (id) => {
  try {
    const todoRef = doc(db, 'todos', auth.currentUser.uid, 'items', id);
    const todoDoc = await getDoc(todoRef);

    if (todoDoc.exists()) {
      const todoData = todoDoc.data();
      const completed = todoData.completed || false;

      const userDocRef = doc(db, 'users', auth.currentUser.uid);

      if (!completed) {
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          await updateDoc(userDocRef, {
            taskToComplete: userData.taskToComplete - 1,
          });
        }
      }

      await deleteDoc(todoRef);
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};

  
  


  const tabNames = ['All', 'Today', 'Tomorrow', 'Upcoming', 'Past'];

  return (
    <div className="flex items-center justify-center min-w-screen">
      
  
      <div className="w-[40%] mx-auto my-0">
        <Title>Todo List</Title>
        <div className="max-w-[750px] w-full mx-auto my-0">
          <Header setModal={setModal} setFilterModalOpen={setFilterModalOpen} />

          {/* Tabs */}
          <div className="flex justify-center mt-2 mb-3 text-white">
            <Tab
              tabNames={tabNames}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              space={'space-x-4'}
            />
          </div>

          {/* Display filtered list based on the active tab */}
          <TodoList
            todos={filteredList()}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            title={activeTab}
            handleUpdate={handleUpdate}
          />
          <div className=" text-white opacity-80 flex justify-center mt-20 items-center">
            Made by Francesco Emmanuel Setiawan 2602209620
         
          </div>

          <TodoModal
            openModal={openModal}
            setModal={setModal}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            userId={auth.currentUser?.uid || null}
          />

          <FilterModal
            isOpen={filterModalOpen}
            closeModal={() => setFilterModalOpen(false)}
            applyFilter={applyFilter}
          ></FilterModal>
          <Sidebar missedTaskCount={missedTaskCount }></Sidebar>
       
        </div>
      </div>
    </div>
  );
}

export default ToDoPage;
