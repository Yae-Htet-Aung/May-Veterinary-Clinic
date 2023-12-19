
import { Toaster } from 'react-hot-toast';
import './App.css'
import Navigation from './components/Navigation'
import PatientList from './components/PatientList'
import React, { useState } from 'react';

function App() {
  const [modelActive, setModelActive] = React.useState(false);

  const active = (active) => {
    setModelActive(active)
  }

  return (
    <div>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: 'green',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'white',
              secondary: 'white',
            },
          },
        }}
      />

      <Navigation active={active} />
      <PatientList active={active} />

    </div>
  )
}

export default App
