import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import './styles.css'
import logo from '../../assets/images/logo_iuh.png'

const Login = () => {
  return (
    <div className="bg-blurred d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <div className="card-container">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                  <CRow className="justify-content-center">
                  <CImage className='logo' src={logo} fluid  />
                  </CRow>
                    <CForm>
                      <h1>Đăng nhập</h1>
                      <p className="text-body-secondary">Đăng nhập để tiếp tục</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput placeholder="Email" autoComplete="username" />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Mật khẩu"
                          autoComplete="current-password"
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton color="primary" className="px-4">
                            Đăng nhập
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
