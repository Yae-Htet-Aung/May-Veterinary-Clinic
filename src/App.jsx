
import { Toaster } from 'react-hot-toast';
import './App.css'
import Navigation from './components/Navigation'
import PatientList from './components/PatientList'
import React, { useState } from 'react';

function App() {
  const [ showModal, setShowModal ] = useState(false)
  const [ showAlert, setShowAlert ] = useState(false)

  const show = (showModal, showAlert ) =>{
    setShowModal(showModal)
    setShowAlert(showAlert)
  }

  return (
    <div className='overflow-hidden'>
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

      <Navigation showModal={showModal} showAlert={showAlert} />
      <PatientList show={show} />

    </div>
  )
}

export default App
