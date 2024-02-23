import styled, { keyframes } from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

const animate = keyframes`
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
`;
const Border = styled.div`
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: transparent;
  left: 0;
  opacity: 0;
  bottom: 0;
  &::before {
    content: "";
    position: absolute;
    height: 2px;
    left: 50%;
    bottom: 0;
    width: 0;
    transform: translateX(-50%);
    background-color: purple;
    animation: ${animate} 0.5s;
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  cursor: text;
  align-items: center;
  min-width: fit-content;
  max-width: 50%;
  margin-bottom: 2px;
  gap: 4px;
  border-bottom: 1px solid var(--color-grey-300);
  /* transition: border linear 0.2s; */
  &:hover > ${Border} {
    opacity: 1;
    background-color: black;
  }
  /* &:hover > ${Border}::before {
    display: block;
    background-color: red;
  } */
`;

const Input = styled.input`
  border: none;
  width: 100%;

  &:focus ~ ${Border} {
    opacity: 1;
    background-color: transparent;
  }
  &:focus ~ ${Border}::before {
    width: 100%;
    background-color: var(--primary-color);
  }
`;
// eslint-disable-next-line react/prop-types
function Search({ placeholder = "", value = "", onChange = () => {} }) {
  return (
    <Container>
      <SearchIcon />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
        autoCorrect="off"
      />
      <Border />
    </Container>
  );
}

export default Search;
