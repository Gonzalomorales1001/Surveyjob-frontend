import React from 'react';
import styled from 'styled-components';
import { BsTwitter,BsFacebook,BsInstagram } from 'react-icons/Bs';
//import { BsFacebook } from 'react-icons/Bs';


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
        <BsTwitter />
        </SocialLink>
        <SocialLink href="https://www.facebook.com/">
        <BsFacebook/>
        </SocialLink>
        <SocialLink href="https://www.instagram.com/">
          <BsInstagram/>
        </SocialLink>
      </SocialLinks>
    </FooterContainer>
  );
};

export default Footer;