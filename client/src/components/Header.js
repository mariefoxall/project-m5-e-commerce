import React from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";

import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <HeaderDiv>
      <ShopLink to="/shop">STORE NAME</ShopLink>
      <HeaderLinks>
        <StyledNavLink to="/companies">COMPANIES</StyledNavLink>
        <StyledNavLink to="/about">ABOUT</StyledNavLink>
        <StyledNavLink to="/profile">PROFILE</StyledNavLink>
        <StyledNavLink to="/cart">VIEW CART</StyledNavLink>
        <SearchBar />
      </HeaderLinks>
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 50px;
  width: 100%;
  position: sticky;
  z-index: 10;
`;

const ShopLink = styled(Link)`
  background-image: linear-gradient(to right, #52d7e0, #0036b3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 50px;
`;

const StyledNavLink = styled(NavLink)`
  color: #0036b3;
  margin: 0px 10px;

  &:hover {
    border-bottom: 1px solid #0036b3;
  }
`;

const HeaderLinks = styled.div`
  display: flex;
  height: 18px;
`;

export default Header;
