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

export const Modal = ({ show, setShowModal, createData, updateData, paramsData }) => {

  const [data, setData] = useState({})
  // const [message, setMessage ] = useState('')

  const onChangeData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const modalRef = useRef();

  const closeModal = e => {
    console.log("closeModal called")
    setShowModal(false);
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && show) {
        closeModal();
        console.log('Escape pressed');
      }
    },
    [show, setShowModal]
  );

  useEffect(() => {
    setData(paramsData)
  }, [paramsData])

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  const handleSave = () => {
    createData(data), closeModal()
  }

  const handleUpdate = () => {
    updateData(data.id, data), closeModal()
  }

  // Notification

  const noti = (msg) => {
    // custom toast
    toast.custom((t) => (
      <div
        className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
        max-w-sm w-full bg-[#1ab45d] shadow-lg rounded-lg border-none pointer-events-auto flex `}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-5 w-5 object-cover"
                src={Success}
                alt=""
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white ">
                {msg}
              </p>
            </div>
          </div>
        </div>
        <div className="flex">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full rounded-none rounded-r-lg p-4 flex items-center justify-center "
          >
            <IoMdClose color='white' />
          </button>
        </div>
      </div>
    ))
  }
  // Notification end


  return (
    <>

      {show ? (
        <div className=' relative flex justify-center items-center rounded-lg shadow-md' ref={modalRef}>
          <ModalWrapper className={`${paramsData.parent == '' ? 'w-[600px] h-[462px] ' : 'w-[600px] h-[510px]'} p-5 shadow-lg bg-white border-none `}>
            <form onSubmit={() => { paramsData.parent == '' ? handleSave() : handleUpdate() }} className='grid grid-cols-2 grid-rows-7 h-full relative z-10 content-start gap-5'>
              <span
                className='cursor-pointer absolute top-0 -right-[5px] w-[20px] h-[20px] p-0 z-10 leading-[20px] text-center'
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              >
                <MdOutlineClose className='material-icons md-18 ' />
              </span>

              {/* title */}
              <div className="row-start-1 row-span-1 col-start-1 col-span-2 text-center h-fit ">
                {paramsData.parent == '' ? (
                  <p className="title">Add new patient</p>
                ) : (
                  <p className="title">Update patient</p>
                )}
                {paramsData.parent == '' ? (
                  <p className='text-sm textSec'>Enter new patient information below</p>
                ) : (
                  <p className='text-sm textSec'>Enter update patient information below</p>
                )}

              </div>

              {/* left inputs */}
              <div className="row-start-2 row-span-1 col-start-1 col-span-1">
                <div className='flex flex-col'>
                  <label htmlFor="petName">Pet Name</label>
                  <input required type="text" value={data.name} name="name" onChange={(e) => onChangeData(e)} className='formInput' />
                </div>
              </div>


              <div className="row-start-3 row-span-1 col-start-1 col-span-1">
                <div className='flex flex-col'>
                  <label htmlFor="pawrent">Parent</label>
                  <input required type="text" value={data.parent} name='parent' onChange={(e) => onChangeData(e)} className='formInput' />
                </div>
              </div>

              <div className="row-start-4 row-span-1 col-start-1 col-span-1">
                <div className='flex flex-col gap-[9px] '>
                  <label htmlFor="genderBox">Gender</label>
                  <div name="genderBox" className="flex gap-10">
                    <div className="flex gap-2">
                      <input required type="radio" id="male" name="gender" checked={data.gender === "male"} value="male" onChange={(e) => onChangeData(e)} defaultChecked={true} />
                      <label htmlFor="male" className='labelTitle'>Male</label>
                    </div>

                    <div className="flex gap-2">
                      <input required type="radio" id="female" name="gender" checked={data.gender === "female"} value="female" onChange={(e) => onChangeData(e)} />
                      <label htmlFor="female" className='labelTitle'>Female</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row-start-5 row-span-1 col-start-1 col-span-1">
                <div className='flex flex-col'>
                  <label htmlFor="phone">Contact Phone No.</label>
                  <input required type="text" value={data.phone} name='phone' className='formInput' onChange={(e) => onChangeData(e)} />
                </div>
              </div>

              <div className="row-start-6 row-span-1 col-start-1 col-span-1">
                <div className='flex flex-col'>
                  <label htmlFor="city">City</label>
                  <input required type="text" value={data.city} name='city' className='formInput' onChange={(e) => onChangeData(e)} />
                </div>
              </div>

              {/* right inputs */}
              <div className="row-start-2 row-span-1 col-start-2 col-span-1 ">
                <div className='flex flex-col'>
                  <label htmlFor="status">Status</label>
                  <select value={data.status} name="status" id="" onChange={(e) => onChangeData(e)} required className='formInput' style={{ padding: '3px 10px', backgroundColor: 'transparent', fontSize: '13px', color: '#afa5b1' }}>
                    <option value="" disabled hidden>Please choose status</option>
                    <option value="allergy" selected={data.status === 'allergy'}>Allergy</option>
                    <option value="picky eater" selected={data.status === 'picky eater'}>Picky Eater</option>
                  </select>
                </div>
              </div>

              <div className="row-start-3 row-span-1 col-start-2 col-span-1 ">
                <div className='flex flex-col'>
                  <label htmlFor="breed">Breed</label>
                  <select value={data.breed} name="breed" id="" onChange={(e) => onChangeData(e)} required className='formInput' style={{ padding: '3px 10px', backgroundColor: 'transparent', fontSize: '13px', color: '#afa5b1' }}>
                    <option value="" disabled hidden>Please choose breed</option>
                    <option value="beagle" selected={data.breed === 'beagle'}>Beagle</option>
                    <option value="golden retriever" selected={data.breed === 'golden retriever'}>Golden Retriever</option>
                    <option value="spaniel" selected={data.breed === 'spaniel'}>Spaniel</option>
                  </select>
                </div>
              </div>

              <div className="row-start-4 row-span-1 col-start-2 col-span-1 ">
                <div className='flex flex-col'>
                  <label htmlFor="dob">Date of Birth</label>
                  <input required type="date" value={data.dob} name='dob' className='formInput' onChange={(e) => onChangeData(e)} style={{ padding: '3px 10px', fontSize: '13px', color: '#afa5b1' }} />
                </div>
              </div>

              <div className="row-start-5 row-span-1 col-start-2 col-span-1 ">
                <div className='flex flex-col'>
                  <label htmlFor="address">Address</label>

                  {paramsData.parent == '' ? (
                    <input required type="text" value={data.address} name='address' className='formInput' onChange={(e) => onChangeData(e)} />
                  ) : (
                    <textarea required type="text" rows='3' value={data.address} name='address' className='formInput' onChange={(e) => onChangeData(e)} style={{ height: '81px' }} />
                  )}
                </div>
              </div>

              <div className="row-start-6 row-span-1 col-start-2 col-span-1 ">
                <div className='flex flex-col'>
                  <label htmlFor="township">Township</label>
                  <input required type="text" value={data.township} name='township' className='formInput' placeholder='please choose township' onChange={(e) => onChangeData(e)} />
                </div>
              </div>

              {/* buttons */}
              <div className="col-start-1 col-span-2  ">
                <div className="flex w-full gap-5 justify-center ">
                  {/* {console.log(paramsData.parent)} */}
                  <button type='submit' className={`${paramsData.parent == '' ? 'saveBtn' : 'updateBtn'} `}>
                    {paramsData.parent == '' ? 'Save' : 'Update'}
                  </button>
                  <button className="cancelBtn" onClick={() => closeModal()} style={{ border: '2px solid #c6cbd4' }}>
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