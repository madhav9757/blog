import styled from 'styled-components'
import React from 'react'
import { Container, PostForm } from '../component'

const AddPostPageWrapper = styled.div`
    padding-top: 32px;    /* py-8 = 2rem = 32px */
    padding-bottom: 32px; /* py-8 = 2rem = 32px */
`;

function AddPost() {
  return (
    <AddPostPageWrapper>
      <Container>
        <PostForm />
      </Container>
    </AddPostPageWrapper>
  )
}

export default AddPost
