import React from 'react'
import ReactLoading from 'react-loading'
import styled from 'styled-components'
import { spinner } from '../../constants/colors'

const FullContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const Loader = () => (
  <ReactLoading
    type="spin"
    color={spinner}
    height="60px"
    width="60px"
  />
)

export const FullLoader = () => (
  <FullContainer>
    <Loader />
  </FullContainer>
)
