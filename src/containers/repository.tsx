import React, { memo, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { Breadcrumb, Container, Spinner, Card, Badge } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { StarIcon, GitForkIcon } from '@primer/octicons-react'
import ReactMarkdown from 'react-markdown'

import { useDispatch, useSelector } from 'react-redux'
import { getRepository } from '../actions'
import { RootState } from '../store'

const DefaultWrapper = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 56px);
`
const Content = styled(Container)`
  padding: 20px;
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
  }
  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }
`
const ProfileCardBody = styled(Card.Body)`
  display: flex;
`
const ProfileInfo = styled.div`
  padding: 0 20px;
`

const RepoBadge = styled(Badge)`
  margin: 0 5px;
`

const Repository = memo(() => {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { profileId, repositoryId } = useParams<{ profileId: string; repositoryId: string }>()
  const repositories = useSelector((state: RootState) => state.repositories)
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    const promise = dispatch(getRepository(profileId, repositoryId)) as any
    promise
      .catch(() => {
        setError('Something went wrong')
      })
      .then(() => setLoading(false))
  }, [dispatch, profileId, repositoryId, setLoading])

  if (isLoading) {
    return (
      <DefaultWrapper>
        <Spinner animation="border" variant="primary" />
      </DefaultWrapper>
    )
  }

  if (error || !repositories[`${profileId}/${repositoryId}`]) {
    return (
      <DefaultWrapper>
        <div>{error}</div>
      </DefaultWrapper>
    )
  }

  const { repo, readme } = repositories[`${profileId}/${repositoryId}`]

  return (
    <Content>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/profiles' }}>
          Profiles
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/profile/${profileId}` }}>
          {profileId}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: `/repository/${profileId}/${repositoryId}` }}
          active
        >
          {repositoryId}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card style={{ width: '100%' }} className="mb-2">
        <Card.Header>{repo.homepage}</Card.Header>
        <ProfileCardBody>
          <ProfileInfo>
            <Card.Subtitle>{repo.name}</Card.Subtitle>
            <Card.Text>{repo.language} </Card.Text>
            <RepoBadge variant="success">
              <StarIcon verticalAlign="middle" /> {repo.stargazers_count}
            </RepoBadge>
            <RepoBadge variant="primary">
              <GitForkIcon verticalAlign="middle" /> {repo.forks_count}
            </RepoBadge>
            <Card.Text>{repo.description}</Card.Text>
          </ProfileInfo>
        </ProfileCardBody>
      </Card>
      <Card style={{ width: '100%' }} className="mb-2">
        {readme && <ReactMarkdown className="markdown-body">{readme}</ReactMarkdown>}
        {!readme && <div className="m-2 text-center">No readme for this repo</div>}
      </Card>
    </Content>
  )
})

export default Repository
