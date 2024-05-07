import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

function TodoItem({ completed, id, title, date, type, description, toggleTodo, deleteTodo, handleUpdate }) {
  const dateTime = new Date(date);

  // Format date and time separately
  const formattedDate = dateTime.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const formattedTime = dateTime.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
  });

  const [isExpanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col rounded mb-6 p-4 last:mb-0 bg-[#333] relative ">
      <div className={`flex items-center justify-between gap-4 w-full ${completed ? 'opacity-40' : 'opacity-100'}`}>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
          className="h-8 w-8 mr-2 cursor-pointer"
        />
        <div className="flex flex-col overflow-hidden w-full" onClick={handleExpand}>
          <div className="grid grid-cols-[auto_1fr] gap-3 overflow-hidden w-full">
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-xl text-white">{title}</span>
            <span className="justify-self-end overflow-hidden text-ellipsis whitespace-nowrap text-sm">{type.toUpperCase()}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-sm text-slate-400">To be done by:</span>
            <div className="flex gap-1">
              <div className="text-sm text-slate-400">{formattedDate}</div>
              <div className="text-sm text-slate-400">{formattedTime}</div>
            </div>
            <button className="ml-auto text-blue-500 " onClick={handleUpdate}>
            <FontAwesomeIcon icon={faPencilAlt}/>
            </button>
            <button className="ml-3 text-red-600 ">
              <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(id)} />
            </button>
            
            <div className="flex items-center absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} onClick={handleExpand} className="scale-75"/>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 text-white">
          <p className="text-sm font-light">{description}</p>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
