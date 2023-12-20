import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import { useState } from 'react'
import { Modal } from './Modal'
import { Dropdown } from 'flowbite-react';
import { IconDotsVertical, IconPencil } from '@tabler/icons-react'
import { FITrash } from '@icongo/fi'
import toast, { Toaster, resolveValue } from 'react-hot-toast';
import Success from '../assets/resources/success.png'
import { IoMdClose } from "react-icons/io";
// pictures
import Allergy from '../assets/resources/allergy.png'
import Search from '../assets/resources/search.png'
import Add from '../assets/resources/add.png'
import PickyEater from '../assets/resources/picky eater.png'
import { AlertModal } from './Alert';


const Container = styled.div`
  background-color: whitesmoke;
`;


const PatientList = ({ show }) => {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [data, setData] = useState([
    { id: 'B-0001', name: 'Milo', status: '1', parent: 'Phyo Min', breed: 'Rottweiler', gender: 'Male', dob: '2023-12-07', phone: '09 877 766 345', address: 'No.35 Thirihaymar St, Zawana Qtr', township: 'Yankin', city: 'Yangon' },
    { id: 'B-0002', name: 'Bella', status: '2', parent: 'Zayar', breed: 'Chiwhawha', gender: 'Female', dob: '2022-01-07', phone: '09 232 766 345', address: 'No. 90 BoAung St, MarGa Qtr', township: 'Yankin', city: 'Yangon' },
    { id: 'B-0003', name: 'Kitty', status: '1', parent: 'Yae', breed: 'Golden Reteriver', gender: 'Male', dob: '2021-02-06', phone: '09 877 121 345', address: 'No. 32, Mahar Ban Lann, Ta Mar Di Qtr', township: 'Yankin', city: 'Yangon' }
  ])
  const [paramsData, setParamsData] = useState({})
  // const [confirm, setConfirm] = useState(false)
  const [idToDel, setIdToDel] = useState('')

  const generateId = `B-${Math.floor(Math.random() * 10000) + 1}`


  // get data from modal
  const createData = (e) => {
    setData([e, ...data])
    noti('Patient is successfully created!')
  }

  const deleteBtn = (id) => {
    console.log('deleteBtn clicked')
    setShowAlert(true)
    setIdToDel(id)
  }

  // if (confirm == true) {
  //   const checkData = data.filter(item => item.id !== id);
  //   setData(checkData);
  // }

  const updateData = (id, newData) => {
    const updatedData = data.map(item =>
      item.id === id ? newData : item
    );
    setData(updatedData);
    noti('Patient is successfully updated!')
  }



  // filter
  const statusBtn = useRef(null)
  const breedBtn = useRef(null)

  // console.log(statusBtn)
  const statusBtnClick = () => {
    statusBtn.current.classList.toggle('active')
    // console.log(statusBtn.current.className)
  }
  const breedBtnClick = () => {
    breedBtn.current.classList.toggle('active')
    // console.log(breedBtn.current.className)
  }
  // filter end

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

  // Opacity
  console.log('showmodl, showalert >>> ', showModal, showAlert)
  show(showModal, showAlert)
  // Opacity end

  return (
    <Container>
      <div className='relative w-[100vw] h-[100vh] mx-auto'>
        {/* upper container */}
        <div className={`flex flex-col md:flex-row p-5 justify-between w-full md:h-[185px] h-[300px] ${showModal || showAlert ? 'opacity-50' : ''}`}>
          {/* left container */}
          <div className="flex flex-col gap-5 justify-end shrink-0 w-full md:w-[300px] md:h-full">
            <p className='text-[22px] title'>Patient List</p>
            {/* search */}
            <div className="flex relative ">
              <input type="text" placeholder='Search table' className='outlineBtn text-[#4c4c4c] w-full px-3' />
              <img src={Search} alt="" className='w-[15px] h-[15px] absolute top-[6px] right-[15px] ' />
            </div>
            {/* filter */}
            <div className="flex w-full gap-3 justify-between">
              <div className='relative flex w-1/2'>
                <div onClick={statusBtnClick} className="flex w-full h-[30px] justify-between items-center px-4 outlineBtn">
                  Status All
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="22" width="14" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                  </div>
                </div>
                <div ref={statusBtn} className="filterBtn">
                  <p className='filterItems'>Good</p>
                  <p className='filterItems'>Food Allergy</p>
                  <p className='filterItems'>Sick</p>
                </div>
              </div>

              <div className='relative flex w-1/2'>
                <div onClick={breedBtnClick} className="flex w-full h-[30px] justify-between items-center px-4 outlineBtn">
                  Breed All
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="22" width="14" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                  </div>
                </div>
                <div ref={breedBtn} className="filterBtn">
                  <p className='filterItems'>Beagle</p>
                  <p className='filterItems'>Golden Retriever</p>
                  <p className='filterItems'>Spaniel</p>
                </div>
              </div>

            </div>
          </div>

          {/* right container */}
          <div className="md:flex md:flex-col gap-5 justify-center md:justify-end md:items-center shrink-0 content-start md:content-end md:h-full">
            <div className="blueBtn mb-5 md:mb-0 flex items-center justify-center gap-2 self-center" onClick={() => { setParamsData({ id: generateId, name: '', status: '', parent: '', breed: '', gender: '', dob: '', phone: '', address: '', township: '', city: '' }), setShowModal(true) }}>
              <img src={Add} alt="" className='w-[10px] h-[10px]' />
              Add new patient
            </div>

            <div className="flex gap-5 md:justify-between items-center">
              <p className='commonText'>Rows per page:</p>
              <select id="rowsPerPage" className='outlineBtnSec px-[5px] flex justify-center'>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
        </div>

        {/* data table */}
        <div className={`py-5 w-full overflow-x-scroll ${showModal ? 'opacity-50' : ''}`}>
          <table className='min-w-[1250px] lg:w-full' >
            <thead>
              <tr align='left' className='h-[40px] title border-2 border-y-[#44444480]'>
                <th className='w-[30px] md:min-w-[2%]  py-[9px]'><input type="checkbox" className="w-[30px]" /></th>
                <th className='w-[80px] md:min-w-[6%] '>ID</th>
                <th className='w-[150px] md:min-w-[10%] '>Pet Name</th>
                <th className='w-[80px] md:min-w-[6%] '>Status</th>
                <th className='w-[150px] md:min-w-[10%] '>Parent</th>
                <th className='w-[150px] md:min-w-[14%] '>Breed</th>
                <th className='w-[150px] md:min-w-[10%] '>Gender</th>
                <th className='w-[150px] md:min-w-[10%] '>Date of Birth</th>
                <th className='w-[150px] md:min-w-[10%] '>Phone No.</th>
                <th className='w-[300px] md:min-w-[20%] '>Address</th>
                <th className='w-[60px] md:min-w-[2%] '></th>
              </tr>
            </thead>

            <tbody>
              {
                data.map((d, i) => (
                  <tr key={i} className='h-[40px] border border-b-[#44444480]'>
                    <td className='w-[30px]  py-[9px]'><input type="checkbox" className="w-[30px]" /></td>
                    <td>{d.id}</td>
                    <td>{d.name}</td>
                    <td>
                      {d.status === '1' ? (
                        <img src={Allergy} alt="" className="w-[13px] h-[13px]" />
                      ) : (
                        <img src={PickyEater} alt="" className="w-[13px] h-[13px]" />
                      )}
                    </td>
                    <td>{d.parent}</td>
                    <td>{d.breed}</td>
                    <td>{d.gender}</td>
                    <td>{(new Date(d.dob)).toLocaleDateString('en-GB').replace(/\//g, '.')}</td>
                    <td>{d.phone}</td>
                    <td>{d.address} {d.township} {d.city}</td>
                    <td className='min-w-[50px]'>
                      <Dropdown label="" placement="left" className='w-[130px] dropdownOption'
                        renderTrigger={() => <span><IconDotsVertical size={17} color='#54bab9' /></span>}>
                        <Dropdown.Item className='bg-stone-100 dropdownItems' onClick={() => { setParamsData(data[i]), setShowModal(true) }} ><IconPencil size={17} color='#a2e22d' /><span>Edit</span></Dropdown.Item>
                        <Dropdown.Item className='bg-stone-100 dropdownItems' onClick={() => { deleteBtn(d.id) }}><FITrash size={17} color='red' /><span>Delete</span></Dropdown.Item>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              }
            </tbody>

          </table>
        </div>

        {/* Create || Update Modal */}
        <div className={showModal ? 'fixed top-[50%] left-[50%] transition-transform -translate-x-1/2 -translate-y-1/2' : ''}>
          <Modal show={showModal} setShowModal={setShowModal} paramsData={paramsData} updateData={(i, e) => { updateData(i, e) }} createData={e => { createData(e) }} />
          {/* {console.log('*** >>> ', typeof(showModal))} */}
        </div>

        {/* Delete Modal */}
        <div className={showAlert ? 'fixed top-[50%] left-[50%] transition-transform -translate-x-1/2 -translate-y-1/2' : ''}>
          <AlertModal noti={noti} idToDel={idToDel} showAlert={showAlert} setShowAlert={setShowAlert} data={data} setData={setData} />
          {/* {console.log('*** >>> ', typeof(showModal))} */}
        </div>

      </div>
    </Container>
  )
}

export default PatientList