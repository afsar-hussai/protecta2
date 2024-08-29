import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className="mycontainer  flex justify-between  items-center py-5 px-4 h-14">

        <div className='logo font-bold text-2xl'>
          <span className="text-green-400">&lt;</span>
          Prot
          <span className="text-green-400">ecta/&gt;</span>
        </div>
        <ul>




        </ul>
        <button className='bg-green-500 my-5 rounded-full text-white flex justify-between items-center ring-white ring-1'>
          <img className='p-1 invert w-10' src="/icons/github.svg" alt="github logo" />
          <span className='font-bold px-2'>Github</span>
        </button>
      </div>

    </nav>
  )
}

export default Navbar
