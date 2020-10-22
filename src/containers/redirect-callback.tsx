import React, { memo, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { Container, Spinner } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { verifyCode } from '../actions'

const Wrapper = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
`

const RedirectContainer = memo(() => {
  const { search } = useLocation()
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  useEffect(() => {
    const queryParams = new URLSearchParams(search)
    if (queryParams.has('code')) {
      const code = queryParams.get('code')!
      const promise = dispatch(verifyCode(code)) as any
      promise.catch(() => {
        setError('Something went wrong')
      })
    }
  }, [search, dispatch])

  return (
    <Wrapper>
      {!error && <Spinner animation="border" variant="primary" />}
      {error && <div>{error}</div>}
    </Wrapper>
  )
})

export default RedirectContainer
