import styled, { keyframes } from "styled-components";

const Container = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const rotate = keyframes`
to {
  transform: rotate(1turn);
}
`;

const Spin = styled.div`
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};

  border-radius: 50%;
  background: conic-gradient(#0000 10%, #ececec);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: ${rotate} 1.5s infinite linear;
`;

// eslint-disable-next-line react/prop-types
function Spinner({ size = "6rem" }) {
  return (
    <Container>
      <Spin $size={size}></Spin>
    </Container>
  );
}

export default Spinner;
