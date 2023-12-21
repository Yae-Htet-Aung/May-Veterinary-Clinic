import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { Modal } from './Modal'
import { Dropdown } from 'flowbite-react'
import { IconDotsVertical, IconPencil } from '@tabler/icons-react'
import { FITrash } from '@icongo/fi'
import toast from 'react-hot-toast'
import Success from '../assets/resources/success.png'
import { IoMdClose } from "react-icons/io"
// pictures
import Allergy from '../assets/resources/allergy.png'
import Search from '../assets/resources/search.png'
import Add from '../assets/resources/add.png'
import PickyEater from '../assets/resources/picky eater.png'
import BlueDown from '../assets/resources/green_down.png'
import BlackDown from '../assets/resources/black_down.png'
import { AlertModal } from './Alert'


const Container = styled.div`
  background-color: whitesmoke;
  margin: 20px;
`

const PatientList = ({ show }) => {
  const [showModal, setShowModal] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [paramsData, setParamsData] = useState({})
  const [idToDel, setIdToDel] = useState('')
  const [resultData, setResultData] = useState([])
  const [data, setData] = useState([
    { id: 'B-0001', name: 'Milo Khris', status: 'picky eater', parent: 'Phyo Min', breed: 'spaniel', gender: 'Male', dob: '2023-12-07', phone: '09 877 766 345', address: 'No.35 Thirihaymar St, Zawana Qtr', township: 'Yankin', city: 'Yangon' },
    { id: 'B-0002', name: 'Bella Brown', status: 'allergy', parent: 'Bo Bo', breed: 'golden retriever', gender: 'Female', dob: '2022-01-07', phone: '09 232 766 345', address: 'No. 90 BoAung St, MarGa Qtr', township: 'Yankin', city: 'Yangon' },
    { id: 'B-0003', name: 'Kitty Kim', status: 'picky eater', parent: 'Kon Kon', breed: 'golden retriever', gender: 'Male', dob: '2021-02-06', phone: '09 877 121 345', address: 'No. 32, Mahar Ban Lann, Ta Mar Di Qtr', township: 'Yankin', city: 'Yangon' },
    { id: 'B-0004', name: 'Sky', status: 'picky eater', parent: 'Twe Tar', breed: 'spaniel', gender: 'Female', dob: '2023-12-07', phone: '09 877 777 777', address: 'No.11 Hay Mar St, Kyaik Ka San Qtr', township: 'Thingangyun', city: 'Yangon' },
    { id: 'B-0005', name: 'Calvin Kelvin', status: 'allergy', parent: 'Zayar Naing', breed: 'beagle', gender: 'Male', dob: '2022-01-07', phone: '09 232 222 444', address: 'No. 90 BoAung St, Thiri Qtr', township: 'Tamwe', city: 'Yangon' },
    { id: 'B-0006', name: 'Bingo', status: 'allergy', parent: 'Yae Yae', breed: 'golden retriever', gender: 'Male', dob: '2021-02-06', phone: '09 877 111 444', address: 'No. 32, 12 Ward', township: 'S. Okkalapa', city: 'Yangon' },

    { id: 'B-0007', name: 'Mr. Smith', status: 'allergy', parent: 'Taylor', breed: 'beagle', gender: 'Male', dob: '2013-12-07', phone: '09 877 783 266', address: 'No.44, Kyee Pwa Yay Qtr', township: 'Thingangyun', city: 'Yangon' },
    { id: 'B-0008', name: 'Noli', status: 'allergy', parent: 'Ma Chit', breed: 'golden retriever', gender: 'Female', dob: '2020-01-07', phone: '09 232 234 332', address: 'No. 90 12 Qtr', township: 'S. Okkala', city: 'Yangon' },
    { id: 'B-0009', name: 'Jennie Kim', status: 'picky eater', parent: 'G-Dragon', breed: 'spaniel', gender: 'Female', dob: '2021-02-06', phone: '09 877 121 345', address: 'No. 53, Shin Saw Pu Qtr', township: 'Dagon', city: 'Yangon' },
    { id: 'B-0010', name: 'Doraemon', status: 'picky eater', parent: 'Thant Zin', breed: 'beagle', gender: 'Male', dob: '2020-12-07', phone: '09 877 121 111', address: 'No.11 Lover Qtr', township: 'Myay Ni Gone', city: 'Yangon' },
    { id: 'B-0011', name: 'Kelvin Kate', status: 'allergy', parent: 'Zayar Naing', breed: 'golden retriever', gender: 'Male', dob: '2000-01-07', phone: '09 232 111 111', address: 'No. 90 Zayar Qtr', township: 'Tamwe', city: 'Yangon' },
    { id: 'B-0012', name: 'Honey', status: 'allergy', parent: 'Mg Yae', breed: 'golden retriever', gender: 'Male', dob: '2021-02-06', phone: '09 877 111 666', address: 'No. 32, 122 Ward', township: 'S. Tamwe', city: 'Yangon' }
  ])

  const generateId = `B-${Math.floor(Math.random() * 10000) + 1}`

  // get data from modal
  const createData = (e) => {
    setData([e, ...data])
    noti('Patient is successfully created!')
    setStatus('Status All')
  }

  const deleteBtn = (id) => {
    // console.log('deleteBtn clicked')
    setShowAlert(true)
    setIdToDel(id)
  }

  const updateData = (id, newData) => {
    const updatedData = data.map(item =>
      item.id === id ? newData : item
    )
    setData(updatedData)
    noti('Patient is successfully updated!')
  }

  // ? filter
  const [Status, setStatus] = useState('')
  const [Breed, setBreed] = useState('')
  const statusBtn = useRef(null)
  const breedBtn = useRef(null)

  // console.log(statusBtn)
  const statusBtnClick = () => {
    statusBtn.current.classList.toggle('active')
    // console.log(statusBtn.current.className)
  }
  const statusAllClicked = () => {
    setStatus('Status All')
    setResultData(data)
    statusBtn.current.classList.toggle('active')
  }
  const allergyClicked = () => {
    setStatus('Allergy')
    // console.log('allergy clk')
    const filteredData = data.filter(item => item.status == 'allergy')
    setResultData(filteredData)
    statusBtn.current.classList.toggle('active')
  }

  const pickyClicked = () => {
    setStatus('Picky Eater')
    // console.log('picky clk')
    const filteredData = data.filter(item => item.status == 'picky eater')
    setResultData(filteredData)
    statusBtn.current.classList.toggle('active')
  }

  const breedBtnClick = () => {
    breedBtn.current.classList.toggle('active')
    // console.log(breedBtn.current.className)
  }
  const beagleClicked = () => {
    setBreed('Beagle')
    // console.log('picky clk')
    const filteredData = data.filter(item => item.breed == 'beagle')
    setResultData(filteredData)
    breedBtn.current.classList.toggle('active')
  }

  const grClicked = () => {
    setBreed('Golden Retriever')
    // console.log('picky clk')
    const filteredData = data.filter(item => item.breed == 'golden retriver')
    setResultData(filteredData)
    breedBtn.current.classList.toggle('active')
  }

  const spanielClicked = () => {
    setBreed('Spaniel')
    // console.log('picky clk')
    const filteredData = data.filter(item => item.breed == 'spaniel')
    setResultData(filteredData)
    breedBtn.current.classList.toggle('active')
  }
  // filter end

  // ? Row per page
  const [RPP, setRPP] = useState('')
  const rppBtn = useRef(null)
  const rppList = useRef(null)

  const rppBtnClicked = () => {
    rppList.current.classList.toggle('active')
  }

  const rpp5 = () => {
    // console.log('rpp5 called')
    setRPP(5)
  }

  const rpp10 = () => {
    // console.log('rpp10 called')
    setRPP(10)
  }

  const rpp20 = () => {
    // console.log('rpp10 called')
    setRPP(20)
  }
  // Row per page end

  // ? search
  const [searchTerm, setSearchTerm] = useState('')
  const [searchedData, setSearchedData] = useState([])

  const onChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value)
  }

  const [allKeys, setAllKeys] = useState([]) 

  data.forEach(obj => {
    Object.keys(obj).forEach(key => {
      if (!allKeys.includes(key)) {
        allKeys.push(key)
      }
    })
  })

  const handleSearch = () => {
    // console.log('keys >> ', allKeys)
    // console.log('search term :', searchTerm)
    if (searchTerm == '') {
      setResultData(data)
    } else {
      const searchResults = allKeys.reduce((accumulator, key) => {
        const filteredItems = data.filter(item => (
          item[key].toLowerCase().includes(searchTerm.toLowerCase())
        ))
        return accumulator.concat(filteredItems)
      }, [])

      setSearchedData(searchResults)
      // console.log('searched data >> ', resultData)
      setResultData(searchedData)

      if (searchedData.length == 0) {
        noti('There is no such data. Showing all data instead!')
      } else {
        noti('Showing searched results.')
      }
    }
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  useEffect(() => {
    setRPP(20)

    const newAllKeys = []
    data.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        if (!newAllKeys.includes(key)) {
          newAllKeys.push(key)
        }
      })
    })
    setAllKeys(newAllKeys)

    setResultData(searchedData)
  }, [data, searchedData])


  // search end

  // ? Notification
  const noti = (msg) => {
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
  show(showModal, showAlert)

  return (
    <Container>
      <div className='relative w-full h-full'>
        {/* upper container */}
        <div className={`flex flex-col md:flex-row p-5 justify-between w-full md:h-[185px] h-[300px] ${showModal || showAlert ? 'opacity-50' : ''}`}>
          {/* left container */}
          <div className="flex flex-col gap-5 justify-end shrink-0 w-full md:w-[350px] md:h-full">
            <p className='text-[22px] title'>Patient List</p>
            
            {/* search */}
            <div className="flex relative ">
              {/* <input type="text" value={searchTerm} onChange={onChangeSearchTerm} /> */}
              <input type="text" value={searchTerm} placeholder='Search table'
                onKeyPress={handleKeyPress}
                onChange={(e) => { onChangeSearchTerm(e) }}
                className='outlineBtn text-[#4c4c4c] w-full px-3' />
              <img src={Search} onClick={() => handleSearch()} alt="" className='w-[15px] h-[15px] absolute top-[8px] right-[15px] ' />
            </div>
            
            {/* Sorting */}
            <div className="flex flex-col md:flex-row w-full gap-3 justify-between">
              <div className='relative flex md:w-1/2'>
                <div onClick={statusBtnClick} className="flex w-full h-[30px] justify-between items-center px-4 outlineBtn">
                  {Status == '' ? 'Status All' : `${Status}`}
                  <div>
                    <img src={BlackDown} alt="icon" />
                  </div>
                </div>
                <div ref={statusBtn} className="filterBtn">
                  <p className='filterItems' onClick={statusAllClicked}>Status All</p>
                  <p className='filterItems' onClick={allergyClicked}>Allergy</p>
                  <p className='filterItems' onClick={pickyClicked}>Picky Eater</p>
                </div>
              </div>

              <div className='relative flex md:w-1/2'>
                <div onClick={breedBtnClick} className="flex w-full h-[30px] justify-between items-center px-4 outlineBtn">
                  {Breed == '' ? 'Breed All' : `${Breed}`}
                  <div>
                    <img src={BlackDown} alt="icon" />
                  </div>
                </div>
                <div ref={breedBtn} className="filterBtn">
                  <p className='filterItems' onClick={beagleClicked}>Beagle</p>
                  <p className='filterItems' onClick={grClicked}>Golden Retriever</p>
                  <p className='filterItems' onClick={spanielClicked}>Spaniel</p>
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

              <div ref={rppBtn} onClick={rppBtnClicked} id="rowsPerPage" className='rppBtn'>
                {RPP == '' ? '10' : `${RPP}`}
                <img src={BlueDown} className='w-3 h-3 mt-[4px]' alt="icon" />
                <div ref={rppList} className="rppList">
                  <p className='rppItems' onClick={rpp5}>5</p>
                  <p className='rppItems' onClick={rpp10}>10</p>
                  <p className='rppItems' onClick={rpp20}>20</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* data table */}
        <div className={`pt-[10px] w-full overflow-auto ${showModal || showAlert ? 'opacity-50' : ''}`}>
          <table className='min-w-[1250px] h-fit lg:w-full mb-10' >
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
                resultData.length == 0 ? (
                  data.map((d, i) => (
                    <tr key={i} className={`h-[40px] border border-b-[#44444480] ${d.parent == '' ? 'hidden' : ''} ${i < RPP ? '' : 'hidden'} `} >
                      <td className='w-[30px]  py-[9px]'><input type="checkbox" className="w-[30px]" /></td>
                      <td>{d.id}</td>
                      <td>{d.name}</td>
                      <td>
                        {d.status === 'picky eater' ? (
                          <img src={PickyEater} alt="" className="w-[13px] h-[13px]" />
                        ) : (
                          <img src={Allergy} alt="" className="w-[13px] h-[13px]" />
                        )}
                      </td>
                      <td>{d.parent}</td>
                      <td>
                        {d.breed === 'beagle' ? ( <span>Beagle</span> ) : ''}
                        {d.breed === 'golden retriever' ? ( <span>Golden Retriever</span> ) : ''}
                        {d.breed === 'spaniel' ? ( <span>Spaniel</span> ) : ''}
                      </td>
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
                ) : (
                  resultData.map((d, i) => (
                    <tr key={i} className={`h-[40px] border border-b-[#44444480] ${d.parent == '' ? 'hidden' : ''} ${i < RPP ? '' : 'hidden'} `} >
                      <td className='w-[30px]  py-[9px]'><input type="checkbox" className="w-[30px]" /></td>
                      <td>{d.id}</td>
                      <td>{d.name}</td>
                      <td>
                        {d.status === 'picky eater' ? (
                          <img src={PickyEater} alt="" className="w-[13px] h-[13px]" />
                        ) : (
                          <img src={Allergy} alt="" className="w-[13px] h-[13px]" />
                        )}
                      </td>
                      <td>{d.parent}</td>
                      <td>
                        {d.breed === 'beagle' ? ( <span>Beagle</span> ) : ''}
                        {d.breed === 'golden retriever' ? ( <span>Golden Retriever</span> ) : ''}
                        {d.breed === 'spaniel' ? ( <span>Spaniel</span> ) : ''}
                      </td>
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
                )
              }
            </tbody>
          </table>
        </div>

        {/* Create || Update Modal */}
        <div className={showModal ? 'fixed top-[50%] left-[50%] transition-transform -translate-x-1/2 -translate-y-1/2' : ''}>
          <Modal show={showModal} setShowModal={setShowModal} paramsData={paramsData} updateData={(i, e) => { updateData(i, e) }} createData={e => { createData(e) }} />
          {/* {console.log('*** >>> ', typeof(showModal))} */}
        </div>

        {/* Delete Alert Modal */}
        <div className={showAlert ? 'fixed top-[50%] left-[50%] transition-transform -translate-x-1/2 -translate-y-1/2' : ''}>
          <AlertModal noti={noti} idToDel={idToDel} showAlert={showAlert} setShowAlert={setShowAlert} data={data} setData={setData} />
          {/* {console.log('*** >>> ', typeof(showModal))} */}
        </div>

      </div>
    </Container>
  )
}

export default PatientList