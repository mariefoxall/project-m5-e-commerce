import React from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { getCartItemArray } from "./reducers/cart.reducer";
import { useSelector } from "react-redux";

import SearchBar from "./SearchBar";

const Header = () => {
  const cartItems = useSelector(getCartItemArray);
  let numCartItems = 0;

  cartItems.forEach((item) => {
    numCartItems = numCartItems + item.quantity;
  });

  return (

    <Spacer>
      <HeaderDiv>
        <Link to="/shop">
          <Title>STORE NAME</Title>
        </Link>
        <HeaderLinks>
          <StyledNavLink to="/companies">COMPANIES</StyledNavLink>
          <StyledNavLink to="/about">ABOUT</StyledNavLink>
          <StyledNavLink to="/profile">PROFILE</StyledNavLink>
          <StyledNavLink to="/cart">
            VIEW CART {numCartItems > 0 && `(${numCartItems})`}
          </StyledNavLink>
        </HeaderLinks>
      </HeaderDiv>
    </Spacer>
  );
};
const Spacer = styled.div`
  height: 120px;
  width: 100vw;
  background-color: red;
  z-index: 4;
`;
const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 50px;
  height: 120px;
  width: 100%;
  position: fixed;
  z-index: 5;
  background-color: white;

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
