import React from "react";
import styled from "styled-components";
import BeatLoader from "react-spinners/BeatLoader";
const LoadingStyled = styled.section`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const Loading = () => {
  return (
    <LoadingStyled>
      <BeatLoader color="#111" size={20} />
    </LoadingStyled>
  );
};

export default Loading;
