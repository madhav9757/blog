import React from 'react';
import styled from 'styled-components';
import { Signup as SignupComponent } from '../component'; 

const SignupPageContainer = styled.div`
    padding-top: 32px;    /* py-8 = 2rem = 32px */
    padding-bottom: 32px; /* py-8 = 2rem = 32px */
    min-height: 100vh;    /* Optional: Ensure it takes full viewport height */
    box-sizing: border-box; /* Ensures padding is included in the element's total height */
`;

function Signup() {
  return (
    <SignupPageContainer>
      <SignupComponent />
    </SignupPageContainer>
  );
}

export default Signup;