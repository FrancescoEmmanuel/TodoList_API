import React from 'react'

function Tab({ tabNames, activeTab, setActiveTab,space}) {
 



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
    <div className={space}>{tabNames.map(renderTabButton)}</div>
  )
}

export default Tab