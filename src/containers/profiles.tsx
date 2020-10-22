import React, { memo, useEffect } from 'react'
import { Card, CardColumns, Container, Spinner, Image, Breadcrumb } from 'react-bootstrap'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../store'
import { getUsers } from '../actions'

const DefaultWrapper = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 56px);
`
const Content = styled(Container)`
  padding: 20px;
`
const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
`
const StyledCardColumns = styled(CardColumns)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const Profiles = memo(() => {
  const { isLoading, error, users } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  if (isLoading) {
    return (
      <DefaultWrapper>
        <Spinner animation="border" variant="primary" />
      </DefaultWrapper>
    )
  }

  if (error) {
    return (
      <DefaultWrapper>
        <div>{error}</div>
      </DefaultWrapper>
    )
  }

  return (
    <Content>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/profiles' }} active>
          Profiles
        </Breadcrumb.Item>
      </Breadcrumb>
      <StyledCardColumns>
        {users.map((user) => (
          <Link to={`profile/${user.login}`} key={user.id}>
            <Card>
              <Card.Body>
                <Card.Title>{user.login}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{user.type}</Card.Subtitle>
                <ImageContainer>
                  <Image src={user.avatar_url} roundedCircle fluid />
                </ImageContainer>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </StyledCardColumns>
    </Content>
  )
})

export default Profiles
