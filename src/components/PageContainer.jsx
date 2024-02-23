import styled from "styled-components";

const Container = styled.div`
  flex: 4;
  padding: 20px;
`;

function PageContainer({ children }) {
  return <Container>{children}</Container>;
}

export default PageContainer;
