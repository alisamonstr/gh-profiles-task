import React, { memo, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { Breadcrumb, Container, Spinner, Card, Image, ListGroup, Badge } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { RepoIcon, StarIcon, GitForkIcon } from '@primer/octicons-react'

import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../actions'
import { RootState } from '../store'
import { ActivityGraph } from '../components'

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
  width: 200px;
  height: 200px;
`
const ProfileCardBody = styled(Card.Body)`
  display: flex;
`
const ProfileInfo = styled.div`
  padding: 0 20px;
`
const ListItemContent = styled.div`
  display: flex;
`
const Flex = styled.div`
  flex: 1;
`
const RepoLink = styled(Link)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const RepoBadge = styled(Badge)`
  margin: 0 5px;
`

const Profile = memo(() => {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { profileId } = useParams<{ profileId: string }>()
  const profiles = useSelector((state: RootState) => state.profiles)
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    const promise = dispatch(getProfile(profileId)) as any
    promise
      .catch(() => {
        setError('Something went wrong')
      })
      .then(() => setLoading(false))
  }, [dispatch, profileId, setLoading])

  if (isLoading) {
    return (
      <DefaultWrapper>
        <Spinner animation="border" variant="primary" />
      </DefaultWrapper>
    )
  }

  if (error && !profiles[profileId]) {
    return (
      <DefaultWrapper>
        <div>{error}</div>
      </DefaultWrapper>
    )
  }

  const { profile, activity, repos } = profiles[profileId]

  return (
    <Content>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/profiles' }}>
          Profiles
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/profile/${profileId}` }} active>
          {profileId}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card style={{ width: '100%' }} className="mb-2">
        <Card.Header>{profile.login}</Card.Header>
        <ProfileCardBody>
          <ImageContainer>
            <Image src={profile.avatar_url} roundedCircle fluid />
          </ImageContainer>
          <ProfileInfo>
            <Card.Subtitle>{profile.name}</Card.Subtitle>
            <Card.Text>{profile.email}</Card.Text>
            <Card.Text>{profile.company} </Card.Text>
            <Card.Text>{profile.location} </Card.Text>
            <Card.Text>{profile.bio}</Card.Text>
          </ProfileInfo>
        </ProfileCardBody>
      </Card>
      <div className="mb-4">{activity.length} contributions in the last year</div>
      <ActivityGraph events={activity} />
      <ListGroup as="ul">
        <ListGroup.Item as="li" variant="info">
          Repositories:
        </ListGroup.Item>
        {repos
          .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
          .map((repo: any) => (
            <ListGroup.Item as="li" key={repo.id}>
              <ListItemContent>
                <RepoLink to={`/repository/${profile.login}/${repo.name}`}>
                  <RepoIcon verticalAlign="middle" />
                  {repo.name}
                </RepoLink>
                <Flex />
                <RepoBadge variant="success">
                  <StarIcon verticalAlign="middle" /> {repo.stargazers_count}
                </RepoBadge>
                <RepoBadge variant="primary">
                  <GitForkIcon verticalAlign="middle" /> {repo.forks_count}
                </RepoBadge>
              </ListItemContent>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Content>
  )
})

export default Profile
