import React from "react";
import styled from 'styled-components';

const LogoWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 1.5rem;
  color: #1e293b;
  user-select: none;
`;

const LogoIcon = styled.div`
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  font-weight: 800;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
`;

const LogoText = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
`;

function Logo({ width = "auto" }) {
    return (
        <LogoWrapper style={{ width }}>
            <LogoIcon>B</LogoIcon>
            <LogoText>Blog</LogoText>
        </LogoWrapper>
    );
}

export default Logo;
