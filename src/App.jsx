
import './App.css'
import Navigation from './components/Navigation'
import PatientList from './components/PatientList'
import React, { useState } from 'react';

function App() {
  const [modelActive, setModelActive] = React.useState(false);

  const active = (aciveOrNot) => {
    setModelActive(aciveOrNot)
  }


  return (
    <div>
      {/* {console.log('parent >>>>', modelActive)} */}
      <div className={modelActive ? 'bg-black/50 overflow-x-auto ' : ''}>
        <Navigation active={modelActive}/>
        <PatientList active={active} />
      </div>
    </div>
  )
}

export default App
