import React, { useEffect, useRef, useCallback, useState  } from 'react'
import Search from '../assets/resources/search.png'
import Add from '../assets/resources/add.png'
import styled from 'styled-components';
import { Dropdown } from 'flowbite-react';
import { IconDotsVertical, IconPencil } from '@tabler/icons-react'
import { FITrash } from '@icongo/fi'
import toast from 'react-hot-toast'
import { MdOutlineClose } from 'react-icons/md';



const Container = styled.div`
  background-color: whitesmoke;
`;

const button = styled.button`
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

  const data = [
    { id: 'B-0001', name: 'Milo', status: '1', parent: 'Phyo Min', breed: 'Rottweiler', gender: 'Male', dob: '23.3.2000', phone: '09 877 766 345', address: 'No.35 Thirihaymar St, Zawana Qtr', township: 'Yankin', city: 'Yangon' },
    { id: 'B-0002', name: 'Bella', status: '2', parent: 'Zayar', breed: 'Chiwhawha', gender: 'Female', dob: '3.3.2001', phone: '09 232 766 345', address: 'No. 90 BoAung St, MarGa Qtr', township: 'Yankin', city: 'Yangon' },
    { id: 'B-0003', name: 'Kitty', status: '1', parent: 'Yae', breed: 'Golden Reteriver', gender: 'Male', dob: '2.3.2002', phone: '09 877 121 345', address: 'No. 32, Mahar Ban Lann, Ta Mar Di Qtr', township: 'Yankin', city: 'Yangon' }
  ]
  const [list, setList ] = useState(data)

  // ? get data from modal


  // ? modal 
  const openModal = () => {
    // console.log('openModal called')
    setShowModal(true)
  };
  active(showModal)
  // console.log('transfer called', showModal)
  // modal end 

  // ? filter
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

  // ? option box
  // option box end

  // ? notification
  const notify = () => {
    toast.success('successfully deleted!')
  }
  // notification end


  return (
    <Container>
      <div className='relative w-[100vw] h-[100vh] mx-auto'>
        {/* upper container */}
        <div className={`flex flex-col md:flex-row p-5 justify-between w-full md:h-[185px] h-[300px] ${showModal ? 'opacity-50' : ''}`}>
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
        <div className={`py-5 w-full overflow-x-scroll ${showModal ? 'opacity-50' : ''}`}>
          <table className='w-[1250px] lg:w-full' >
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
                data.map((d) => (
                  <tr key={d.id} className='h-[40px] border border-b-[#44444480]'>
                    <td className='w-[30px]  py-[9px]'><input type="checkbox" className="w-[30px]" /></td>
                    <td>{d.id}</td>
                    <td>{d.name}</td>
                    <td>{d.status}</td>
                    <td>{d.parent}</td>
                    <td>{d.breed}</td>
                    <td>{d.gender}</td>
                    <td>{d.dob}</td>
                    <td>{d.phone}</td>
                    <td>{d.address} {d.township} {d.city}</td>
                    <td className='min-w-[50px]'>
                      <Dropdown label="" placement="left" className='w-[130px] dropdownOption'
                        renderTrigger={() => <span><IconDotsVertical size={17} color='#54bab9' /></span>}
                      >
                        <Dropdown.Item className='bg-stone-100 dropdownItems'><IconPencil size={17} color='#a2e22d' /><span>Edit</span></Dropdown.Item>
                        <Dropdown.Item className='bg-stone-100 dropdownItems' onClick={() => { deleteData(d.id)}}><FITrash size={17} color='red' /><span>Delete</span></Dropdown.Item>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>

        {/* Add Modal */}

        {/* <div className={showModal ? 'fixed top-[50%] left-[50%] transition-transform -translate-x-1/2 -translate-y-1/2 shadow-lg' : ''}>
          <Modal  show={showModal} setShowModalActive={setShowModal} setList={setList} />
        </div> */}
        <AddList setList={setList} />
      </div>
    </Container>
  )
}
// Add Data
const AddList = (setList) => {
  function handleSubmit(event) {
    const petName = event.target.elements.petName.value
    const parent = event.target.elements.parent.value
    const gender = event.target.elements.gender.value
    const phone = event.target.elements.phone.value
    const city = event.target.elements.city.value
    const status = event.target.elements.status.value
    const breed = event.target.elements.breed.value
    const dob = event.target.elements.dob.value
    const address = event.target.elements.address.value
    const township = event.target.elements.township.value
    const newData = {
      id: 'B-004', petName, parent, gender, phone, city, status, breed, dob, address, township
    }
    setList((prevList)=> {
      return prevList.concat(newData)
    })
  }
  return(
    <form onSubmit={handleSubmit} className='grid grid-cols-2 h-full relative z-10 content-start gap-5'>
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
                    <input type="text" name="name" className='formInput' />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="parent">Parent</label>
                    <input type="text" name='parent' className='formInput' />
                  </div>

                  <div className='flex flex-col gap-[9px] '>
                    <label htmlFor="genderBox">Gender</label>
                    <div name="genderBox" className="flex gap-10">
                      <div className="flex gap-2">
                        <input type="radio" id="male" name="gender" value="Male"/>
                        <label htmlFor="male" className='labelTitle'>Male</label>
                      </div>

                      <div className="flex gap-2">
                        <input type="radio" id="female" name="gender" value="Female"/>
                        <label htmlFor="female" className='labelTitle'>Female</label>
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
                    <label htmlFor="status">Status</label>
                    {/* <input type="text" name='petName' className='formInput' placeholder='please choose status' /> */}
                    <select name="status" id="" placeholder="Status" required>
                    <option disabled>Choose Status</option>
                      <option value="1">Allergy</option>
                      <option value="2">Sick</option>
                      <option value="3">Good</option>
                    </select>
                  </div>
                  
                  <div className='flex flex-col'>
                    <label htmlFor="breed">Breed</label>
                    <input type="text" name='breed' className='formInput' placeholder='please choose breed' />
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
                  {/* <button onClick={()=> {setModel(data), setShowModalActive(false), notify()}} className="saveBtn">
                    Save
                  </button> */}
                  <button onSubmit={()=> { setShowModalActive(false), notify()}} className="saveBtn">
                    Save
                  </button>
                  <button className="cancelBtn" onClick={() => setShowModalActive(false)}>
                    Cancel
                  </button>
                </div>
              </div>

            </form>
  )
}

// ? Modal
// const ModalWrapper = styled.div`
//   width: 600px;
//   height: 500px;
//   box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
//   background: #fff;
//   color: #000;
  
//   position: relative;
//   z-index: 10;
//   border-radius: 10px;
// `;

// const Modal = ({ show, setShowModalActive, setList }) => {
//   function handleSubmit(event) {
//     // event.preventDefault()
//     const petName = event.target.elements.petName.value
//     const parent = event.target.elements.parent.value
//     const gender = event.target.elements.gender.value
//     const phone = event.target.elements.phone.value
//     const city = event.target.elements.city.value
//     const status = event.target.elements.status.value
//     const breed = event.target.elements.breed.value
//     const dob = event.target.elements.dob.value
//     const address = event.target.elements.address.value
//     const township = event.target.elements.township.value
//     const newData = {
//       id: 'B-004', petName, parent, gender, phone, city, status, breed, dob, address, township
//     }
//     setList((prevList)=> {
//       return prevList.concat(newData)
//     })
//   }

//   const modalRef = useRef();

//   const closeModal = e => {
//     console.log("closeModal called")
//     if (modalRef.current === e.target) {
//       setShowModalActive(false);
//     }
//   };

//   const keyPress = useCallback(
//     e => {
//       if (e.key === 'Escape' && show) {
//         setShowModalActive(false);
//         console.log('I pressed');
//       }
//     },
//     [show, setShowModalActive]
//   );

//   useEffect(
//     () => {
//       document.addEventListener('keydown', keyPress);
//       return () => document.removeEventListener('keydown', keyPress);
//     },
//     [keyPress]
//   );

//   // toast
//   const notify = () => {
//     toast.success('Patient is successfully created!')
//   }


//   return (
//     <>

//       {show ? (
//         <div className=' relative bg-stone-300 flex justify-center items-center rounded-lg shadow-md' onClick={closeModal} ref={modalRef}>
//           <ModalWrapper className='p-5 '>
//             <form onSubmit={handleSubmit()} className='grid grid-cols-2 h-full relative z-10 content-start gap-5'>
//               <span
//                 className='cursor-pointer absolute top-5 right-5 w-[20px] h-[20px] p-0 z-10 leading-[20px] text-center'
//                 aria-label='Close modal'
//                 onClick={() => setShowModalActive(prev => !prev)}
//               >
//                 <MdOutlineClose className='material-icons md-18 ' />
//               </span>

//               {/* title */}
//               <div className="col-start-1 col-span-2 text-center h-fit ">
//                 <p className="title">Add new patient</p>
//                 <p className='text-sm textSec'>Enter new patient information below</p>
//               </div>

//               {/* left container */}
//               <div className="mt-5 col-start-1 col-span-1 ">
//                 <div className="flex flex-col gap-5">
//                   <div className='flex flex-col'>
//                     <label htmlFor="petName">Pet Name</label>
//                     <input type="text" name="name" className='formInput' />
//                   </div>

//                   <div className='flex flex-col'>
//                     <label htmlFor="parent">Parent</label>
//                     <input type="text" name='parent' className='formInput' />
//                   </div>

//                   <div className='flex flex-col gap-[9px] '>
//                     <label htmlFor="genderBox">Gender</label>
//                     <div name="genderBox" className="flex gap-10">
//                       <div className="flex gap-2">
//                         <input type="radio" id="male" name="gender" value="Male"/>
//                         <label htmlFor="male" className='labelTitle'>Male</label>
//                       </div>

//                       <div className="flex gap-2">
//                         <input type="radio" id="female" name="gender" value="Female"/>
//                         <label htmlFor="female" className='labelTitle'>Female</label>
//                       </div>
//                     </div>
//                   </div>

//                   <div className='flex flex-col'>
//                     <label htmlFor="phone">Contact Phone No.</label>
//                     <input type="text" name='phone' className='formInput' />
//                   </div>

//                   <div className='flex flex-col'>
//                     <label htmlFor="city">City</label>
//                     <input type="text" name='city' className='formInput' />
//                   </div>

//                 </div>
//               </div>

//               {/* right container */}
//               <div className="mt-5 col-start-2 col-span-1 ">
//                 <div className="flex flex-col gap-5">
//                   <div className='flex flex-col'>
//                     <label htmlFor="status">Status</label>
//                     {/* <input type="text" name='petName' className='formInput' placeholder='please choose status' /> */}
//                     <select name="status" id="" placeholder="Status" required>
//                     <option disabled>Choose Status</option>
//                       <option value="1">Allergy</option>
//                       <option value="2">Sick</option>
//                       <option value="3">Good</option>
//                     </select>
//                   </div>
                  
//                   <div className='flex flex-col'>
//                     <label htmlFor="breed">Breed</label>
//                     <input type="text" name='breed' className='formInput' placeholder='please choose breed' />
//                   </div>

//                   <div className='flex flex-col'>
//                     <label htmlFor="dob">Date of Birth</label>
//                     <input type="date" name='dob' className='formInput' />
//                   </div>

//                   <div className='flex flex-col'>
//                     <label htmlFor="address">Address</label>
//                     <input type="text" name='address' className='formInput' />
//                   </div>

//                   <div className='flex flex-col'>
//                     <label htmlFor="township">Township</label>
//                     <input type="text" name='township' className='formInput' placeholder='please choose township' />
//                   </div>

//                 </div>
//               </div>


//               {/* buttons */}
//               <div className="col-start-1 col-span-2  ">
//                 <div className="flex w-full gap-5 justify-center ">
//                   {/* <button onClick={()=> {setModel(data), setShowModalActive(false), notify()}} className="saveBtn">
//                     Save
//                   </button> */}
//                   <button onSubmit={()=> { setShowModalActive(false), notify()}} className="saveBtn">
//                     Save
//                   </button>
//                   <button className="cancelBtn" onClick={() => setShowModalActive(false)}>
//                     Cancel
//                   </button>
//                 </div>
//               </div>

//             </form>
//           </ModalWrapper>
//         </div>
//       ) : null}
//     </>
//   );
// };

export default PatientList