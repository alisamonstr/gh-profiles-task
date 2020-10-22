import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../store'
import { initialiseOctokit } from '../actions'
import { NavbarLayout } from '../components'

import Profiles from './profiles'
import Profile from './profile'
import Login from './login'
import RedirectCallback from './redirect-callback'
import Repository from './repository'
import { Container, Spinner } from 'react-bootstrap'
import styled from 'styled-components/macro'

const DefaultWrapper = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 56px);
`

function Root() {
  const { githubToken, octokit } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (githubToken) {
      dispatch(initialiseOctokit())
    }
  }, [githubToken, dispatch])

  return (
    <Router>
      <NavbarLayout>
        {githubToken && !octokit && (
          <DefaultWrapper>
            <Spinner animation="border" variant="primary" />
          </DefaultWrapper>
        )}
        {githubToken && octokit && (
          <Switch>
            <Route path="/profiles">
              <Profiles />
            </Route>
            <Route path="/profile/:profileId">
              <Profile />
            </Route>
            <Route path="/repository/:profileId/:repositoryId">
              <Repository />
            </Route>
            <Route>
              <Redirect to="/profiles" />
            </Route>
          </Switch>
        )}
        {!githubToken && (
          <Switch>
            <Route path="/redirect-callback">
              <RedirectCallback />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        )}
      </NavbarLayout>
    </Router>
  )
}

export default Root
