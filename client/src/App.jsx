import React from 'react'

const App = () => {
  return (
    <div className="relative sm:-8 bg-[#13131a] min-h-screen flex flex-row">    
        <div className="sm:flex hidden mr-10 relative">
            Sidebar
        </div>

        <p className="font-bold">testing</p>

        <div className='flex-1 max-sm:w-full min-w-[1280px] mx-auto sm:pr-8'>
          Navbar
        </div>
    </div>
  )
}

export default App