import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose, MdOutlineClose } from 'react-icons/md';
import toast, { Toaster, resolveValue } from 'react-hot-toast';
import Success from '../assets/resources/success.png'
import { IoMdClose } from "react-icons/io";

const ModalWrapper = styled.div`
  background: #fff;  
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

export const AlertModal = ({ active, noti, idToDel, showAlert, setShowAlert, data, setData }) => {
  console.log('id to del >> ', idToDel)
  console.log('data (alert modal) >> ', data)
  
  active(true)
  const handleDelete = (e) => {
    const checkData = data.filter(item => item.id !== idToDel);
    console.log('checkData >> ', checkData)
    setData(checkData);
    setShowAlert(false)
    noti('Patient is successfully deleted!')
  }

  // Modal
  const modalRef = useRef();

  const closeModal = e => {
    console.log("closeModal called")
    if (modalRef.current === e.target) {
      setShowAlert(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showAlert) {
        setShowAlert(false);
        console.log('Escape pressed');
      }
    },
    [showAlert, setShowAlert]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );
  // Modal end


  return (
    <>

      {showAlert ? (
        <div className=' relative bg-stone-300 flex justify-center items-center rounded-lg shadow-md' onClick={closeModal} ref={modalRef}>
          <ModalWrapper className={`w-[300px] h-[150px] p-5 shadow-lg bg-white border-none`}>
            <form onSubmit={(e) => handleDelete(e)} className='grid grid-cols-2 grid-rows-7 h-full relative z-10 content-start gap-5'>
              <span
                className='cursor-pointer absolute top-5 right-5 w-[20px] h-[20px] p-0 z-10 leading-[20px] text-center'
                aria-label='Close modal'
                onClick={() => setShowAlert(false)}
              >
                <MdOutlineClose className='material-icons md-18 ' />
              </span>

              {/* title */}
              <div className="row-start-1 row-span-1 col-start-1 col-span-2 text-center h-fit ">
                <p className="text-[#54bab9] font-semibold  ">Confirmation</p>
                <p className='text-sm textSec'>Are you sure you want to delete this patient?</p>

              </div>

              {/* buttons */}
              <div className="col-start-1 col-span-2  ">
                <div className="flex w-full gap-5 justify-center ">
                  <button className="deleteBtn" style={{ border: '2px solid #c6cbd4' }}>
                    Delete
                  </button>
                  <button className="cancelBtn" onClick={() => setShowAlert(false)} style={{ border: '2px solid #c6cbd4' }}>
                    Cancel
                  </button>
                </div>
              </div>

            </form>
          </ModalWrapper>
        </div>
      ) : null}
    </>
  );
};