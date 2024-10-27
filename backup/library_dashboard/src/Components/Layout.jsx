import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'


const Layout = () => {
  return (
    <div>
        <div className='flex'>
            <Sidebar/>
            <div className='w-full ml-16 md:ml-56'>
                <Header/>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Layout