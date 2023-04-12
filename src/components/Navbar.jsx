import React from 'react';
import styled from 'styled-components';
import Logo from '../../images/logo.jpeg'

const Nav = styled.nav`
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const NavLink = styled.a`
  color: #fff;
  margin-left: 1rem;
`;

const Navbar = () => {
  return (
    <Nav>
      <img src={Logo} width={75} height={75} placeholder='Logo'/>
      <div>
        <NavLink href="#">Home</NavLink>
        <NavLink href="#">About</NavLink>
        <NavLink href="#">Contact</NavLink>
      </div>
    </Nav>
  );
};

export default Navbar;