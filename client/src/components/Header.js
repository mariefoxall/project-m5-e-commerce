import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <HeaderDiv>
      <Title>STORE NAME</Title>
      <HeaderLinks>
        <StyledNavLink to="/companies">COMPANIES</StyledNavLink>
        <StyledNavLink to="/about">ABOUT</StyledNavLink>
        <StyledNavLink to="/profile">PROFILE</StyledNavLink>
        <StyledNavLink to="/cart">VIEW CART</StyledNavLink>
      </HeaderLinks>
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 50px;
`;

const Title = styled.h1`
  background-image: linear-gradient(to right, #52d7e0, #0036b3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyledNavLink = styled(NavLink)`
  color: #0036b3;
  margin: 0px 10px;

  &:hover {
    border-bottom: 1px solid #0036b3;
  }
`;

const HeaderLinks = styled.div``;

export default Header;
