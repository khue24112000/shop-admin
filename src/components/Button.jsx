import styled from "styled-components";

const Container = styled.button`
  display: flex;
  align-items: center;
  align-self: ${(props) => props.$alignSelf};
  gap: 4px;
  justify-content: center;
  background-color: var(--primary-color);
  border: none;
  color: white;
  padding: 7px 10px;
  font-weight: 600;
  border-radius: 10px;
  width: ${(props) => (props.$width ? props.$width : "auto")};
  margin-top: ${(props) => (props.$mt ? props.$mt : "auto")};
  height: 38px;
  cursor: pointer;
  ${(props) => (props.$disabled ? "opacity: 0.8" : "opachity: 1")}
`;

// eslint-disable-next-line react/prop-types
function Button({
  style,
  children,
  mt,
  width,
  icon,
  onClick,
  alignSelf = "flex-start",
  $disable,
}) {
  return (
    <Container
      style={style}
      onClick={onClick}
      $mt={mt}
      $width={width}
      $alignSelf={alignSelf}
      $disabled={$disable}
    >
      {icon} {children}
    </Container>
  );
}

export default Button;
