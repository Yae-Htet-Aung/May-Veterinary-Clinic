import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose, MdOutlineClose } from 'react-icons/md';
import toast, { Toaster, resolveValue } from 'react-hot-toast';
import Success from '../assets/resources/success.png'
import { IoMdClose } from "react-icons/io";

const ModalWrapper = styled.div`
  width: 300px;
  height: 200px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

export const Modal = ({ show, setShowModalActive }) => {

  // console.log('id >>>> ',generateUniqueId())

  const [data, setData] = useState({})

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
    createData(data), setShowModalActive(false), notify()
  }

  const handleUpdate = () => {
    updateData(data.id, data), setShowModalActive(false), notify()
  }

  // toast
  const notify = () => {
    // custom toast
    toast.custom((t) => (
      <div
        className={`${t.visible ? 'animate-enter' : 'animate-leave' } 
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
                Patient is successfully created!
              </p>
            </div>
          </div>
        </div>
        <div className="flex">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full rounded-none rounded-r-lg p-4 flex items-center justify-center "
          >
            <IoMdClose color='white'/>
          </button>
        </div>
      </div>
    ))
    // custom toast end
  }
  

  return (
    <>

      {show ? (
        <div className=' relative bg-stone-300 flex justify-center items-center rounded-lg shadow-md' onClick={closeModal} ref={modalRef}>
          <ModalWrapper className='p-5 '>
            <form onSubmit={() => { paramsData.parent == '' ? handleSave() : handleUpdate() }} className='grid grid-cols-2 h-full relative z-10 content-start gap-5'>
              <span
                className='cursor-pointer absolute top-5 right-5 w-[20px] h-[20px] p-0 z-10 leading-[20px] text-center'
                aria-label='Close modal'
                onClick={() => setShowModalActive(prev => !prev)}
              >
                <MdOutlineClose className='material-icons md-18 ' />
              </span>

              {/* title */}
              <div className="col-start-1 col-span-2 text-center h-fit ">
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

              {/* left container */}
              <div className="mt-5 col-start-1 col-span-1 ">
                <div className="flex flex-col gap-5">
                  <div className='flex flex-col'>
                    <label htmlFor="petName">Pet Name</label>
                    <input required type="text" value={data.name} name="name" onChange={(e) => onChangeData(e)} className='formInput' />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="pawrent">Pawrent</label>
                    <input required type="text" value={data.parent} name='parent' onChange={(e) => onChangeData(e)} className='formInput' />
                  </div>

                  <div className='flex flex-col gap-[9px] '>
                    <label htmlFor="genderBox">Gender</label>
                    <div name="genderBox" className="flex gap-10">
                      <div className="flex gap-2">
                        <input required type="radio" id="male" name="gender" checked={data.gender === "Male"} value="Male" onChange={(e) => onChangeData(e)} defaultChecked={true} />
                        <label htmlFor="male" className='labelTitle'>Male</label>
                      </div>

                      <div className="flex gap-2">
                        <input required type="radio" id="female" name="gender" checked={data.gender === "Female"} value="Female" onChange={(e) => onChangeData(e)} />
                        <label htmlFor="female" className='labelTitle'>Female</label>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="phone">Contact Phone No.</label>
                    <input required type="text" value={data.phone} name='phone' className='formInput' onChange={(e) => onChangeData(e)} />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="city">City</label>
                    <input required type="text" value={data.city} name='city' className='formInput' onChange={(e) => onChangeData(e)} />
                  </div>

                </div>
              </div>


              {/* right container */}
              <div className="mt-5 col-start-2 col-span-1 ">
                <div className="flex flex-col gap-5">
                  <div className='flex flex-col'>
                    <label htmlFor="petName">Status</label>
                    {/* <select value={data.status} name="status" id="" onChange={(e) => onChangeData(e)} placeholder="Choose Status" required>
                      <option {data.status !== ''? 'selected': ''} value="1">Allergy</option>
                      <option value="2">Sick</option>
                      <option value="3">Good</option>
                    </select> */}
                    <select value={data.status} name="status" id="" onChange={(e) => onChangeData(e)} required className='formInput' style={{ padding: '3px 10px', backgroundColor: 'transparent', fontSize: '13px',  color: '#afa5b1' }}>
                      <option value="" disabled hidden>Please choose status</option>
                      <option value="1" selected={data.status === '1'}>Allergy</option>
                      <option value="2" selected={data.status === '2'}>Picky Eater</option>
                    </select>

                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="breed">Breed</label>
                    <input required type="text" value={data.breed} name='breed' className='formInput' placeholder='Please choose breed' onChange={(e) => onChangeData(e)} style={{ padding: '3px 10px', fontSize: '13px',  color: '#afa5b1' }}/>
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="dob">Date of Birth</label>
                    <input required type="date" value={data.dob} name='dob' className='formInput' onChange={(e) => onChangeData(e)} style={{ padding: '3px 10px', fontSize: '13px',  color: '#afa5b1' }}/>
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="address">Address</label>
                    <input required type="text" value={data.address} name='address' className='formInput' onChange={(e) => onChangeData(e)} />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="township">Township</label>
                    <input required type="text" value={data.township} name='township' className='formInput' placeholder='please choose township' onChange={(e) => onChangeData(e)} />
                  </div>

                </div>
              </div>


              {/* buttons */}
              <div className="col-start-1 col-span-2  ">
                <div className="flex w-full gap-5 justify-center ">
                  {console.log(paramsData.parent)}
                  <button type='submit' className={`${paramsData.parent == '' ? 'saveBtn' : 'updateBtn'} `}>
                    {paramsData.parent == '' ? 'Save' : 'Update'}
                  </button>
                  <button className="cancelBtn" onClick={() => setShowModalActive(false)} style={{border: '2px solid #c6cbd4'}}>
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