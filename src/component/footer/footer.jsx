import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  background-color: #0f172a;
  color: #cbd5e1;
  padding: 40px 20px 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 40px;
`;

const LogoSection = styled.div`
  grid-column: span 2;
`;

const LogoText = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  color: #38bdf8;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #94a3b8;
  line-height: 1.5;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 14px;
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
    transform: translateX(3px);
  }
`;

const BottomBar = styled.div`
  margin-top: 40px;
  border-top: 1px solid #1e293b;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;

  a {
    color: #cbd5e1;
    font-size: 1.2rem;
    transition: color 0.2s ease;

    &:hover {
      color: #38bdf8;
    }
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <FooterContainer>
        <LogoSection>
          <LogoText>DevUI</LogoText>
          <Description>
            Build beautiful and blazing-fast UIs with DevUI. We help developers create delightful web experiences.
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
          <FooterLink href="#">Cookies</FooterLink>
        </FooterSection>
      </FooterContainer>

      <BottomBar>
        <SocialLinks>
          <a href="#"><FaGithub /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedin /></a>
        </SocialLinks>
        <div>© {new Date().getFullYear()} DevUI. All rights reserved.</div>
      </BottomBar>
    </FooterWrapper>
  );
}

export default Footer;
