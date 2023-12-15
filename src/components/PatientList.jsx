import React, { useRef } from 'react'
import Search from '../assets/resources/search.png'
import Add from '../assets/resources/add.png'
import Edit from '../assets/resources/edit.png'
import Delete from '../assets/resources/delete.png'
import styled from 'styled-components';
import { useState } from 'react'
import { Modal } from './Modal'

const Container = styled.div`
  background-color: whitesmoke;
`;

const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

const PatientList = ({ active }) => {

  const [showModal, setShowModal] = useState(false);
  // console.log('before clk >> ', showModal)

  const openModal = () => {
    // console.log('openModal called')
    setShowModal(showModal => !showModal);


  };
  active(showModal)
  // console.log('transfer called', showModal)

  // filter
  const statusBtn = useRef(null)
  const breedBtn = useRef(null)
  statusBtn.onClick = () => {
    console.log('hello')
  }

  // filter end


  return (
    <Container>
      <div className='relative w-[100vw] h-[89vh] md:h-[300px] mx-auto'>
        {/* upper container */}
        <div className={`flex flex-col md:flex-row p-5 justify-between w-full md:h-[185px] h-[300px] blue ${showModal ? 'opacity-50' : ''}`}>
          {/* left container */}
          <div className="flex flex-col gap-5 justify-end shrink-0 w-[300px] md:h-full red">
            <p className='text-[22px] title'>Patient List</p>
            {/* search */}
            <div className="flex relative ">
              <input type="text" placeholder='Search table' className='outlineBtn text-[#4c4c4c] w-full px-3' />
              <img src={Search} alt="" className='w-[15px] h-[15px] absolute top-[6px] right-[15px] ' />
            </div>
            {/* filter */}
            <div className="flex w-full gap-3 justify-between">
              <div ref={statusBtn} className="flex w-1/2 h-[30px] justify-between items-center px-4 outlineBtn">
                Status All
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" height="22" width="14" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                </div>
              </div>
              <div ref={breedBtn} className="flex w-1/2 h-[30px] justify-between items-center px-4 outlineBtn">
                Breed All
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" height="22" width="14" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                </div>
              </div>
            </div>
          </div>

          {/* right container */}
          <div className="md:flex md:flex-col gap-5 justify-center md:justify-end md:items-center shrink-0 content-start md:content-end md:h-full red">
            <div className="blueBtn mb-5 md:mb-0 flex items-center justify-center gap-2 self-center" onClick={openModal}>
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
        <div className={`py-5 min-w-[1250px] overflow-x-scroll ${showModal ? 'opacity-50' : ''}`}>
          <table className='w-full table-auto'>
            <thead>
              <tr align='left' className='h-[40px] title border-2 border-y-[#44444480]'>
                <th className='min-w-[2%]  py-[9px]'><input type="checkbox" className="w-[30px]" /></th>
                <th className='min-w-[6%] '>ID</th>
                <th className='min-w-[10%] '>Pet Name</th>
                <th className='min-w-[10%] '>Status</th>
                <th className='min-w-[10%] '>Pawrent</th>
                <th className='min-w-[10%] '>Breed</th>
                <th className='min-w-[10%] '>Gender</th>
                <th className='min-w-[10%] '>Date of Birth</th>
                <th className='min-w-[10%] '>Phone No.</th>
                <th className='min-w-[20%] '>Address</th>
                <th className='min-w-[2%] '></th>
              </tr>
            </thead>

            <tbody>
              <tr className='h-[40px] border border-b-[#44444480]'>
                <th className='w-[30px]  py-[9px]'><input type="checkbox" className="w-[30px]" /></th>
                <td>B-0001</td>
                <td>Milo</td>
                <td>Status</td>
                <td>Pawrent</td>
                <td>Breed</td>
                <td>Gender</td>
                <td>Date of Birtd</td>
                <td>09 000 888 766</td>
                <td>Lorem ipsum, dolor sit ametLorem ipsum, dolor sit ametLorem ipsum, dolor sit amet</td>
                <td className='min-w-[50px] '>
                  <div className="styled-select ">

                    <div className="options green">
                      <div className='flex gap-3 text-[12px]'><img src={Edit} alt="" className='w-5 h-5' />Edit</div>
                      <hr />
                      <div className='flex gap-3 text-[12px]'><img src={Delete} alt="" className='w-5 h-5' />Delete</div>
                    </div>
                    {/* <select property="voucherCategoryClass">
                    <option value="0" hidden></option>
                    
                  </select> */}
                  </div>
                </td>
              </tr>
              <tr className='h-[40px] border border-y-[#44444480]'>
                <th className='w-[30px]  py-[9px]'><input type="checkbox" className="w-[30px]" /></th>
                <td>A-0001</td>
                <td>Gu Gu</td>
                <td>Status</td>
                <td>Pawrent</td>
                <td>Breed</td>
                <td>Gender</td>
                <td>Date of Birtd</td>
                <td>09 000 888 766</td>
                <td>Address</td>
                <td className='min-w-[50px] '>
                  <div className="styled-select ">

                    <div className="options green">
                      <div className='flex gap-3 text-[12px]'><img src={Edit} alt="" className='w-5 h-5' />Edit</div>
                      <hr />
                      <div className='flex gap-3 text-[12px]'><img src={Delete} alt="" className='w-5 h-5' />Delete</div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className='h-[40px] border border-y-[#44444480]'>
                <th className='w-[30px]  py-[9px]'><input type="checkbox" className="w-[30px]" /></th>
                <td>S-0909</td>
                <td>Nix</td>
                <td>Status</td>
                <td>Pawrent</td>
                <td>Breed</td>
                <td>Gender</td>
                <td>Date of Birtd</td>
                <td>09 000 888 766</td>
                <td>Address</td>
                <td className='min-w-[50px] '>
                  <div className="styled-select ">

                    <div className="options green">
                      <div className='flex gap-3 text-[12px]'><img src={Edit} alt="" className='w-5 h-5' />Edit</div>
                      <hr />
                      <div className='flex gap-3 text-[12px]'><img src={Delete} alt="" className='w-5 h-5' />Delete</div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>


          </table>
        </div>

        {/* Add Modal */}
        <div className={showModal ? 'fixed top-[100px] left-[30%] shadow-lg' : ''}>
          <Modal showModal={showModal} setShowModal={setShowModal} />
          {/* {console.log('>>> ', showModal)} */}
        </div>


      </div>
    </Container>
  )
}

export default PatientList