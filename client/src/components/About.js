import React from "react";
import styled from "styled-components";
import Header from "./Header";

const About = () => {
  return (
    <FullPage>
      <Header />
      <ImageDiv>
        <TextDiv>
          Go-Go-Gadgets is the one-stop-shop for everything you need in your
          active lifestyle. We're with you every step of the way.
        </TextDiv>
      </ImageDiv>
    </FullPage>
  );
};
const FullPage = styled.div`
  display: flex;
  flex-direction: column;
`;
const ImageDiv = styled.div`
  background-image: url("https://i.ytimg.com/vi/a7ljpOGF-O0/maxresdefault.jpg");
  /* background-image: url("https://www.roadaffair.com/wp-content/uploads/2019/06/trail-running-shoes-shutterstock_703189510-1024x683.jpg"); */

  /* background-image: url("https://www.severnesails.com/wp-content/uploads/2020/03/Dyno-board-setup-guide-with-Simon-Bornhoft-boom-height-opening-shot-.jpg"); */
  margin: 0;
  padding: 0;
  height: calc(100vh - 140px);
  width: 100vw;
  background-size: cover;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextDiv = styled.div`
  position: fixed;
  top: 160px;
  left: 20px;
  width: 300px;
  background-color: #000066;
  opacity: 0.5;
  padding: 20px;
`;

export default About;
