import React from 'react'
import Logo from '../assets/resources/Logo.png'
import Profile from '../assets/resources/profile.png'
import Bell from '../assets/resources/bell.png'

const Navigation = ({showModal, showAlert}) => {

  return (
    <div className={`flex items-center justify-between w-full h-[82px] px-9 py-3 bg-[#54bab9] ${ showModal || showAlert ? 'opacity-60 ' : ''} `}>
      <div>
        <img src={`${Logo}`} alt="" className='w-[50px] h-[60px]' />
      </div>

      <div className="flex items-center gap-5"> 
        <img src={`${Bell}`} alt="" className='w-[20px] h-[20px] '/>
        <img src={`${Profile}`} alt="" className='w-[50px] h-[50px] ' />
        <div className='text-white '>
          <p className='font-poppins font-semibold'>Lisa</p>
          <p>Operator</p>
        </div>
      </div>
    </div>
  )
}

export default Navigation