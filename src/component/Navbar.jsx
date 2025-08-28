import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-gray-900 text-white h-[50px] '>
        <div className="logo mx-5 my-3" >
            <span className='font-bold text-xl '>iTask</span>
        </div>
        <ul className="flex gap-8 mr-5 mt-3">
            <li className='cursor-pointer hover:font-bold transition-all duration-50'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-50'>Your task</li>
        </ul>
    </nav>
  )
}

export default Navbar
