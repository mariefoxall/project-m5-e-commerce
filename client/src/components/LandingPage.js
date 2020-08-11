import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { getStoreItems } from "./reducers/items.reducer";
import { getCompanies } from "./reducers/companies.reducer";
import styled from "styled-components";

const LandingPage = () => {
  const companies = useSelector(getCompanies);
  const storeItems = useSelector(getStoreItems);
  console.log(companies);
  console.log(storeItems);

  return (
    <LandingDiv>
      <div>
        <Welcome>GO-GO-GADGETS</Welcome>
        <WelcomeNav>
          <NavSection>
            <Link to="/shop">SHOP</Link>
          </NavSection>
          <NavSection>CONTACT</NavSection>
        </WelcomeNav>
      </div>
    </LandingDiv>
  );
};

const LandingDiv = styled.div`
  background-image: url("https://www.severnesails.com/wp-content/uploads/2020/03/Dyno-board-setup-guide-with-Simon-Bornhoft-boom-height-opening-shot-.jpg");
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  background-size: cover;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Welcome = styled.h1`
  padding: 20px;
  background-color: #00ccff;
  opacity: 0.7;
`;

const WelcomeNav = styled.div`
  display: flex;
  /* margin-top: 30px; */
  justify-content: space-between;
`;

const NavSection = styled.h2`
  text-align: center;
  padding: 20px;
  background-color: #ccccff;
  opacity: 0.7;
  width: 50%;
  &:hover {
    opacity: 0.9;
  }
`;

export default LandingPage;
