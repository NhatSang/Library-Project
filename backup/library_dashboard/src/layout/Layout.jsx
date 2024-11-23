import React from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import Content from '../components/Content'
import Footer from '../components/Footer'



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
