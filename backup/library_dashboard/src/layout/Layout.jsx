import React from 'react'
import { Content, Footer, Header, SideBar } from '../components'
import { notification } from 'antd';


const Layout = () => {
  return (
    <div>
      <SideBar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <Header />
        <div className="body flex-grow-1">
          <Content />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
