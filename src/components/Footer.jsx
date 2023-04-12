import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #e8f4f8;
  padding: 1rem;
  height:100px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
`;

const SocialLink = styled.a`
  color: #333;
  margin: 0 1rem;
  font-size: 1.5rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <SocialLinks>
        <SocialLink href="https://twitter.com/">
          <i className="fab fa-twitter"></i>
        </SocialLink>
        <SocialLink href="https://www.facebook.com/">
          <i className="fab fa-facebook"></i>
        </SocialLink>
        <SocialLink href="https://www.instagram.com/">
          <i className="fab fa-instagram"></i>
        </SocialLink>
      </SocialLinks>
    </FooterContainer>
  );
};

export default Footer;