import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose, MdOutlineClose } from 'react-icons/md';
import toast, { Toaster, resolveValue } from 'react-hot-toast';


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

export const Modal = ({ show, setShowModalActive, setModel }) => {

  const generateUniqueId = () => {
    // return 'B-' + Math.random().toString(4);
    return `B-${Math.random().toString().slice(15)}`;
  };
  // console.log('id >>>> ',generateUniqueId())

  
  const [data, setData ] = useState({})

  const onChangeData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const modalRef = useRef();

  const closeModal = e => {
    console.log("bg onclick called")
    if (modalRef.current === e.target) {
      setShowModalActive(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && show) {
        setShowModalActive(false);
        console.log('I pressed');
      }
    },
    [show, setShowModalActive]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  // toast
  const notify = () => {
    toast.success('Patient is successfully created!')
  }


  return (
    <>

      {show ? (
        <div className=' relative bg-stone-300 flex justify-center items-center rounded-lg shadow-md' onClick={closeModal} ref={modalRef}>
          <ModalWrapper className='p-5 '>
            <div className='grid grid-cols-2 h-full relative z-10 content-start gap-5'>
              <span
                className='cursor-pointer absolute top-5 right-5 w-[20px] h-[20px] p-0 z-10 leading-[20px] text-center'
                aria-label='Close modal'
                onClick={() => setShowModalActive(prev => !prev)}
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
                    <input type="text" name="name" onChange={(e)=>onChangeData(e)} className='formInput' />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="pawrent">Pawrent</label>
                    <input type="text" name='parent' onChange={(e)=>onChangeData(e)} className='formInput' />
                  </div>

                  <div className='flex flex-col gap-[9px] '>
                    <label htmlFor="genderBox">Gender</label>
                    <div name="genderBox" className="flex gap-10">
                      <div className="flex gap-2">
                        <input type="radio" id="male" name="gender" value="male" onChange={(e)=>onChangeData(e)}/>
                        <label htmlFor="male" className='labelTitle'>Male</label>
                      </div>

                      <div className="flex gap-2">
                        <input type="radio" id="female" name="gender" value="female" onChange={(e)=>onChangeData(e)}/>
                        <label htmlFor="female" className='labelTitle'>Female</label>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="phone">Contact Phone No.</label>
                    <input type="text" name='phone' className='formInput' onChange={(e)=>onChangeData(e)} />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="city">City</label>
                    <input type="text" name='city' className='formInput' onChange={(e)=>onChangeData(e)} />
                  </div>

                </div>
              </div>


              {/* right container */}
              <div className="mt-5 col-start-2 col-span-1 ">
                <div className="flex flex-col gap-5">
                  <div className='flex flex-col'>
                    <label htmlFor="petName">Status</label>
                    {/* <input type="text" name='petName' className='formInput' placeholder='please choose status' /> */}
                    <select name="status" id="" onChange={(e)=>onChangeData(e)} placeholder="Status" required>
                    <option disabled>Choose Status</option>
                      <option value="1">Allergy</option>
                      <option value="2">Sick</option>
                      <option value="3">Good</option>
                    </select>
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="breed">Breed</label>
                    <input type="text" name='breed' className='formInput' placeholder='please choose breed' onChange={(e)=>onChangeData(e)} />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" name='dob' className='formInput' onChange={(e)=>onChangeData(e)} />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="address">Address</label>
                    <input type="text" name='address' className='formInput' onChange={(e)=>onChangeData(e)} />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="township">Township</label>
                    <input type="text" name='township' className='formInput' placeholder='please choose township' onChange={(e)=>onChangeData(e)} />
                  </div>

                </div>
              </div>


              {/* buttons */}
              <div className="col-start-1 col-span-2  ">
                <div className="flex w-full gap-5 justify-center ">
                  <button onClick={()=> {setModel(data), setShowModalActive(false), notify()}} className="saveBtn">
                    Save
                  </button>
                  <button className="cancelBtn" onClick={() => setShowModalActive(false)}>
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
