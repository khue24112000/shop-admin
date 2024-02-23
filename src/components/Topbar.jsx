import { Settings } from "@mui/icons-material";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../redux/userSlice";
import { useState } from "react";
import ChangePwdModal from "./ChangPwdModal";

const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div``;

const Logo = styled.span`
  font-weight: bold;
  font-size: 30px;
  color: darkblue;
  cursor: pointer;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
  border-radius: 50%;
`;

const SettingOption = styled.div`
  display: none;
  position: absolute;
  min-width: 160px;
  right: 0;
  top: calc(100% + 5px);
  background-color: white;
  border-radius: 10px;
  box-shadow: var(--shadow-md);
  cursor: default;
  border: 1px solid var(--color-grey-300);
  /* transition: all linear 1s; */
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 18px;
    top: -14px;
    left: 0;
    display: block;
    cursor: pointer;
    background-color: transparent;
  }
`;

const SetttingContainer = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;

  &:hover > ${SettingOption} {
    display: block;
  }
`;

const OptionList = styled.ul`
  &:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
`;

const OptionItem = styled.li`
  min-width: 200px;
  cursor: pointer;
  /* margin: 10px 0; */
  padding: 10px 10px;

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

export default function Topbar() {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  function handleClick() {
    setOpenModal(true);
  }
  function handleCloseModal() {
    setOpenModal(false);
  }
  function handleLogout() {
    dispatch(logout());
  }
  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/">
            <Logo>KStoreAdmin</Logo>
          </Link>
        </Left>
        <Right>
          {/* <Badge badgeContent={2} color="warning">
            <NotificationsNone fontSize="large" />
          </Badge>
          <Badge badgeContent={2} color="warning">
            <Language fontSize="large" />
          </Badge> */}

          <SetttingContainer>
            <Settings fontSize="large" />
            <SettingOption>
              <OptionList>
                <OptionItem onClick={handleClick}>Đổi mật khẩu</OptionItem>

                <OptionItem onClick={handleLogout}>Đăng xuất</OptionItem>
              </OptionList>
            </SettingOption>
          </SetttingContainer>

          <Avatar
            src="https://firebasestorage.googleapis.com/v0/b/shop-ae551.appspot.com/o/UnknownUser.png?alt=media&token=604f3f2a-54be-4d22-b5bc-623f8b76a7ec&_gl=1*xgbf4h*_ga*MTk5NTAxNDcwNS4xNjk3ODE5Nzk3*_ga_CW55HF8NVT*MTY5OTIxMjk2OS4xOS4xLjE2OTkyMTMwMjIuNy4wLjA."
            alt=""
          />
        </Right>
      </Wrapper>
      {openModal && (
        <ChangePwdModal
          open={openModal}
          onCloseModal={handleCloseModal}
        ></ChangePwdModal>
      )}
    </Container>
  );
}
