import Modal from "@mui/material/Modal";
import { useState } from "react";
import styled from "styled-components";

import Title from "../components/Title";
import Button from "./Button";

import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../utils/requestMethod";
import { updateUser } from "../redux/apiCalls";
import { errorToast } from "../redux/toastSlice";

const Container = styled.div`
  position: relative;
  background-color: white;
  width: 40vw;
  height: fit-content;
  top: 50%;
  left: 50%;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  padding: 20px;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  gap: 15px;
`;

const UserItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-right: 20px;
`;

const ItemLabel = styled.label`
  font-size: 1.6rem;
  font-weight: 600;
`;

const ItemInput = styled.input`
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 1.4rem;
  &:focus {
    border-color: ${(props) => (props.$error ? "red" : "var(--primary-color)")};
  }
  ${(props) => (props.$error ? "border-color: red" : "")}
`;

const Close = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  line-height: 1;
  padding: 4px 8px 0 0;
  font-size: 3rem;
  cursor: pointer;
`;

const ModalForm = styled.form``;

// eslint-disable-next-line react/prop-types
export default function ChangePwdModal({ open, onCloseModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.client.users);
  const user = users.find((u) => u._id === currentUser._id);
  const dispatch = useDispatch();
  // console.log(user);
  async function handleClick(e) {
    e.preventDefault();
    const request = userRequest();
    const res = await request.post("/user/changePassword", {
      id: currentUser._id,
      currentPassword,
    });

    if (res.data === "Đúng") {
      if (newPassword.length >= 6) {
        if (newPassword === confirmPassword) {
          updateUser(dispatch, user._id, { ...user, password: newPassword });
          onCloseModal();
        } else dispatch(errorToast("Mật khẩu xác nhận không trùng khớp"));
      } else dispatch(errorToast("Mật khẩu có độ dài tối thiểu là 6"));
    } else dispatch(errorToast("Mật khẩu hiện tại không đúng"));
  }
  return (
    <>
      <Modal open={open}>
        {isLoading ? (
          <Spinner />
        ) : (
          <Container>
            <ModalContainer>
              <Row>
                <Title title="Đổi mật khẩu" />
              </Row>
              <ModalForm autoComplete="off">
                <Row>
                  <UserItem>
                    <ItemLabel>Mật khẩu hiện tại</ItemLabel>
                    <ItemInput
                      type="password"
                      placeholder="Mật khẩu hiện tại"
                      value={currentPassword}
                      onChange={(e) =>
                        setCurrentPassword(e.target.value.trim())
                      }
                      autoComplete="off"
                      autoCorrect="off"
                    />
                  </UserItem>
                </Row>
                <Row>
                  <UserItem>
                    <ItemLabel>Mật khẩu mới</ItemLabel>
                    <ItemInput
                      type="password"
                      placeholder="Mật khẩu mới"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value.trim())}
                    />
                  </UserItem>
                </Row>
                <Row>
                  <UserItem>
                    <ItemLabel>Xác nhận mật khẩu</ItemLabel>
                    <ItemInput
                      type="password"
                      placeholder="Xác nhận mật khẩu"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value.trim())
                      }
                    />
                  </UserItem>
                </Row>

                <Row>
                  <Button onClick={handleClick} width="100%" mt="40px">
                    Đổi mật khẩu
                  </Button>
                </Row>
              </ModalForm>
            </ModalContainer>
            <Close onClick={onCloseModal}>&times;</Close>
          </Container>
        )}
      </Modal>
    </>
  );
}
