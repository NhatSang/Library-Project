import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="h-screen  overflow-auto scrollbar-hide">
      <Header />
      <div className="bg-slate-200">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout