import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "./Button";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleH1 = styled.h1``;

// const Button = styled.button`
//   border: none;
//   padding: 5px;
//   background-color: var(--primary-color);
//   border-radius: 5px;
//   cursor: pointer;
//   color: white;
//   font-size: 1.6rempx;
// `;

// eslint-disable-next-line react/prop-types
function Title({ title, button, icon, link }) {
  return (
    <Container>
      <TitleH1>{title}</TitleH1>
      <Link to={link}>{button && <Button icon={icon}>{button}</Button>}</Link>
    </Container>
  );
}

export default Title;
