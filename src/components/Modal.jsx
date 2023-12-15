import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose, MdOutlineClose } from 'react-icons/md';


const ModalWrapper = styled.div`
  width: 600px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

export const Modal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();

  const closeModal = e => {
    console.log("bg onclick called")
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  const cancelPress = 

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <>
      {showModal ? (
        <div className=' relative bg-stone-300 flex justify-center items-center rounded-lg shadow-md' onClick={closeModal} ref={modalRef}>
          <ModalWrapper showModal={showModal} className='p-5 '>
            <div className='grid grid-cols-2 h-full relative z-10 content-start gap-5'>
              <span
                className='cursor-pointer absolute top-5 right-5 w-[20px] h-[20px] p-0 z-10 leading-[20px] text-center'
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              >
                <MdOutlineClose className='material-icons md-18 ' />
              </span>

              {/* title */}
              <div className="col-start-1 col-span-2 text-center h-fit ">
                <p className="title">Add new patient</p>
                <p className='text-sm textSec'>Enter new patient information below</p>
              </div>

              {/* left container */}
              <div className="mt-5 col-start-1 col-span-1 ">
                <div className="flex flex-col gap-5">
                  <div className='flex flex-col'>
                    <label htmlFor="petName">Pet Name</label>
                    <input type="text" name='petName' className='formInput' />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="pawrent">Pawrent</label>
                    <input type="text" name='pawrent' className='formInput' />
                  </div>

                  <div className='flex flex-col gap-[9px] '>
                    <label htmlFor="genderBox">Gender</label>
                    <div name="genderBox" className="flex gap-10">
                      <div className="flex gap-2">
                        <input type="radio" id="html" name="gender" value="male" />
                        <label for="html" className='labelTitle'>Male</label>
                      </div>

                      <div className="flex gap-2">
                        <input type="radio" id="css" name="gender" value="female" />
                        <label for="css" className='labelTitle'>Female</label>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="phone">Contact Phone No.</label>
                    <input type="text" name='phone' className='formInput' />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="city">City</label>
                    <input type="text" name='city' className='formInput' />
                  </div>

                </div>
              </div>


              {/* right container */}
              <div className="mt-5 col-start-2 col-span-1 ">
                <div className="flex flex-col gap-5">
                  <div className='flex flex-col'>
                    <label htmlFor="petName">Status</label>
                    <input type="text" name='petName' className='formInput' placeholder='please choose status' />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="pawrent">Breed</label>
                    <input type="text" name='pawrent' className='formInput' placeholder='please choose breed' />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" name='dob' className='formInput' />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="address">Address</label>
                    <input type="text" name='address' className='formInput' />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="township">Township</label>
                    <input type="text" name='township' className='formInput' placeholder='please choose township' />
                  </div>

                </div>
              </div>


              {/* buttons */}
              <div className="col-start-1 col-span-2  ">
                <div className="flex w-full gap-5 justify-center ">
                  <button className="saveBtn">
                    Save
                  </button>
                  <button className="cancelBtn" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                </div>
              </div>

            </div>
          </ModalWrapper>
        </div>
      ) : null}
    </>
  );
};
