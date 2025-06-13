import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #0f172a; // deep navy like Vercel/GitHub
  color: #cbd5e1;
  padding: 60px 30px 40px;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 40px;
`;

const LogoSection = styled.div`
  grid-column: span 2;
`;

const LogoText = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #38bdf8;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #94a3b8;
  line-height: 1.6;
  max-width: 400px;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #e2e8f0;
`;

const FooterLink = styled.a`
  font-size: 0.9rem;
  color: #cbd5e1;
  text-decoration: none;
  margin-bottom: 10px;
  transition: all 0.2s ease;

  &:hover {
    color: #38bdf8;
    transform: translateX(4px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 30px;
  font-size: 0.8rem;
  color: #64748b;
  border-top: 1px solid #1e293b;
  margin-top: 40px;
`;

function Footer() {
  return (
    <FooterWrapper>
      <FooterContainer>
        <LogoSection>
          <LogoText>DevUI</LogoText>
          <Description>
            Build beautiful and blazing-fast UIs with DevUI. We help developers
            create delightful web experiences.
          </Description>
        </LogoSection>

        <FooterSection>
          <SectionTitle>Company</SectionTitle>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Careers</FooterLink>
          <FooterLink href="#">Press</FooterLink>
          <FooterLink href="#">Blog</FooterLink>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Products</SectionTitle>
          <FooterLink href="#">Features</FooterLink>
          <FooterLink href="#">Integrations</FooterLink>
          <FooterLink href="#">Pricing</FooterLink>
          <FooterLink href="#">Releases</FooterLink>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Resources</SectionTitle>
          <FooterLink href="#">Docs</FooterLink>
          <FooterLink href="#">Help Center</FooterLink>
          <FooterLink href="#">Community</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Legal</SectionTitle>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
          <FooterLink href="#">Security</FooterLink>
          <FooterLink href="#">Cookie Policy</FooterLink>
        </FooterSection>
      </FooterContainer>

      <Copyright>
        © {new Date().getFullYear()} DevUI. All rights reserved.
      </Copyright>
    </FooterWrapper>
  );
}

export default Footer;
