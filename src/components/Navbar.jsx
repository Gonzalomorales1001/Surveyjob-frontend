import React from 'react';
import styled from 'styled-components';
import Logo from '../../images/logosinfondo.webp'

const Nav = styled.nav`
  background-color: rgb(240, 165, 0);
  color: #FFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const NavLink = styled.a`
  color: #fff;
  margin-left: 1rem;
  font-size: 1.5rem;
  text-decoration: none;
  
`;
const Linkscontenedor= styled.div`
padding-right: 4rem;
display:flex;
gap:2rem;
`
const Logocontenedor= styled.img`
object-fit: contain;

`

const Navbar = () => {
  return (
    <Nav>

      <Logocontenedor src={Logo} width={100} height={50} alt='logo'/>
      <Linkscontenedor >
        <NavLink href="#">HOME</NavLink>
        <NavLink href="#">ABOUT</NavLink>
        <NavLink href="#">CONTACT</NavLink>
      </Linkscontenedor>
    </Nav>
  );
};

export default Navbar;