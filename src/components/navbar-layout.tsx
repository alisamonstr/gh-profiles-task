import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import logo from '../svg/logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { logout } from '../actions'

interface NavbarLayoutProps {
  children: JSX.Element | JSX.Element[] | any
}

export const NavbarLayout = ({ children }: NavbarLayoutProps) => {
  const { githubToken } = useSelector((x: RootState) => x.auth)
  const dispatch = useDispatch()

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="logo"
              />
            </Link>
          </Navbar.Brand>
          {githubToken && (
            <Nav>
              <Nav.Link onClick={() => dispatch(logout())} active>
                Logout
              </Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
      {children}
    </>
  )
}
