import styled, { css } from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { successToast } from "../redux/toastSlice";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fcf5f5;
  /* background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover; */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`;
const bRadius10 = css`
  border-radius: 10px;
`;

const Wrapper = styled.div`
  /* border: 2px solid var(--color-grey-700); */
  width: 30%;
  padding: 30px;
  background-color: white;
  ${bRadius10};
  ${mobile({ width: "75%" })}
  box-shadow: var(--shadow-md);
`;

const Title = styled.h1`
  /* font-size: 2.4rem; */
  text-align: center;
  color: var(--primary-color);
  /* font-weight: 300;   */
  text-transform: uppercase;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid var(--color-grey-300);
  ${bRadius10};
  &:focus {
    border: 1px solid var(--primary-color);
  }
`;

const Button = styled.button`
  border: none;
  padding: 15px 20px;
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
  margin: 10px 0;
  text-transform: uppercase;
  ${bRadius10};

  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    color: var(--primary-color);
  }
`;

const Error = styled.p`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser !== null) {
      dispatch(successToast("Đăng nhập thành công"));

      navigate("/");
    }
  }, [currentUser, dispatch, navigate]);

  function handleClick(e) {
    e.preventDefault();
    if (username !== "" && password !== "") {
      setErrMessage("");
      login(dispatch, { username, password });
    } else setErrMessage("Tên đăng nhập và mật khẩu không được để trống");
  }

  return (
    <>
      <Container>
        <Wrapper>
          <Title>Đăng nhập</Title>
          <Form>
            <Input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value.trim());
              }}
              type="text"
              placeholder="Tên đăng nhập"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              type="password"
              placeholder="Mật khẩu"
            />
            <Button disabled={isLoading} onClick={handleClick}>
              Đăng nhâp
            </Button>
            {/* <Link>Quên mật khẩu</Link> */}
            {errMessage ? (
              <Error>{errMessage}</Error>
            ) : error ? (
              <Error>Tên đăng nhập hoặc mật khẩu không đúng</Error>
            ) : (
              ""
            )}

            {/* <Register>
              Bạn chưa có tài khoản?
              <StyledLink to="/register">Đăng ký ngay</StyledLink>
            </Register> */}
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
