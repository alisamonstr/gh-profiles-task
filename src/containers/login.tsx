import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { Card, Button, Container } from 'react-bootstrap'

import { ReactComponent as GithubLogo } from '../svg/logo.svg'
import { CLIENT_ID } from '../constants'

const Wrapper = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
`

const Login = memo(() => {
  const login = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
  }

  return (
    <Wrapper>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Login Container</Card.Title>
          <Card.Text>Please, login with your github account to continue</Card.Text>
          <Button variant="dark" onClick={login}>
            Login with <GithubLogo />
          </Button>
        </Card.Body>
      </Card>
    </Wrapper>
  )
})

export default Login
