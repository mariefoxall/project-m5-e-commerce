import React from "react";

import styled, { keyframes } from "styled-components";

import inspectorGadget from "../assets/inspectorGadget.png";

const Loading = () => {
  console.log(inspectorGadget);
  return (
    <Wrapper>
      <IMG src={inspectorGadget} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const spin = keyframes`
  from {
  transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }`;

const scale = keyframes`
  from {
  transform: scale(0.2);
  }
  to {
    transform: scale(1.5);
  }`;

const fade = keyframes`
  from {
opacity:0.7
  }
  to {
  opacity:0
  }`;

const IMG = styled.img`
  width: 250px;
  opacity: 0.6;
  animation: ${scale} 5000ms infinite linear, ${fade} 5000ms infinite linear;
  /* animation: ${spin} 3000ms infinite linear, ${fade} 3000ms infinite linear; */
`;

export default Loading;
