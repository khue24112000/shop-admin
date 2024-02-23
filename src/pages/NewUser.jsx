import { ArrowBack } from "@mui/icons-material";
import styled from "styled-components";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { addUser } from "../redux/apiCalls";
import { validateRegister } from "../utils/validate";
import {
  SelectDistrict,
  SelectProvince,
  SelectWards,
} from "../components/SelectAddress";

// const Title = styled.h1``;

const Form = styled.form``;
const Row = styled.div`
  display: flex;
  gap: 15px;
`;

const RowItem = styled.div`
  flex: 1;
  & + & {
    margin-left: 20px;
  }
`;

const UserItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-right: 20px;
`;

// eslint-disable-next-line no-unused-vars
const Label = styled.label``;

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

const ItemSelect = styled.select`
  height: 40px;
  border-radius: 5px;
  font-size: 1.4rem;
`;

const ErrorMsg = styled.p`
  color: red;
`;

export default function NewUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.user);
  const [errors, setErrors] = useState([]);

  const [dataInput, setDataInput] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    address: "",
    isAdmin: false,
    status: true,
  });
  const [canUpdate, setCanUpdate] = useState(false);
  const [province, setProvince] = useState("Hà Nội");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const {
    fullName,
    username,
    password,
    email,
    phoneNumber,
    address,
    isAdmin,
    status,
  } = dataInput;

  // console.log(error);
  // console.log(userAddress, userWard, userDistrict, userProvince);

  function handleChange(e) {
    setErrors((prev) => prev.filter((err) => err.name !== e.target.name));
    setDataInput((prev) => {
      if (e.target.value) {
        if (e.target.name === "fullName" || e.target.name === "address")
          return { ...prev, [e.target.name]: e.target.value };
        else return { ...prev, [e.target.name]: e.target.value.trim() };
      } else return { ...prev, [e.target.name]: "" };
    });
  }

  function handleChangePasswordConfirm(e) {
    if (e.target.value) setPasswordConfirm(e.target.value.trim());
    else setPasswordConfirm("");
    if (e.target.value.trim() !== dataInput.password) {
      setErrors((prev) => {
        if (prev.filter((e) => e.name === "passwordConfirm").length !== 0)
          return prev;
        else
          return [
            ...prev,
            {
              name: "passwordConfirm",
              error: "Mật khẩu không khớp",
            },
          ];
      });
    } else {
      setErrors((prev) => prev.filter((e) => e.name !== "passwordConfirm"));
    }
  }

  function handleClick(e) {
    e.preventDefault();
    const validate = validateRegister({
      ...dataInput,
      district,
      passwordConfirm,
    });
    if (validate.length === 0) {
      setCanUpdate(true);
    } else {
      // console.log(1);
      setErrors((prev) =>
        validate.reduce((arr, e) => {
          if (arr.findIndex((a) => a.name === e.name) === -1)
            return [...arr, e];
          else {
            arr.at(arr?.findIndex((a) => a?.name === e?.name)).error = e.error;
            return arr;
          }
        }, prev)
      );
      setCanUpdate(false);
    }
  }

  function handleChangeProvince(e) {
    setProvince(e.target.value);
    setDistrict("");
    setWard("");
  }
  function handleChangeDistrict(e) {
    setErrors((prev) => prev.filter((err) => err.name !== "district"));
    setDistrict(e.target.value);
  }
  function handleChangeWard(e) {
    setWard(e.target.value);
  }

  useEffect(() => {
    if (canUpdate) {
      addUser(
        dispatch,
        {
          ...dataInput,
          address: `${address}, ${ward}, ${district}, ${province}`,
        },
        navigate
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canUpdate]);
  return (
    <PageContainer>
      <Title
        title="Thêm người dùng"
        button="Quay lại"
        icon={<ArrowBack />}
        link="/users"
      />
      <Form onSubmit={handleClick}>
        <Row>
          <UserItem>
            <ItemLabel>Họ và tên</ItemLabel>
            <ItemInput
              onChange={handleChange}
              name="fullName"
              value={fullName}
              type="text"
              placeholder="Họ và tên"
            />
            {errors.findIndex((e) => e.name === "fullName") !== -1 && (
              <ErrorMsg>
                {errors?.find((e) => e?.name === "fullName")?.error}
              </ErrorMsg>
            )}
          </UserItem>
          <UserItem>
            <ItemLabel>Tên đăng nhập</ItemLabel>
            <ItemInput
              onChange={handleChange}
              name="username"
              value={username}
              type="text"
              placeholder="Tên đăng nhập"
            />
            {errors.findIndex((e) => e.name === "username") !== -1 && (
              <ErrorMsg>
                {errors?.find((e) => e?.name === "username")?.error}
              </ErrorMsg>
            )}
          </UserItem>
          <UserItem>
            <ItemLabel>Email</ItemLabel>
            <ItemInput
              onChange={handleChange}
              name="email"
              value={email}
              type="email"
              placeholder="Email..."
            />
            {errors.findIndex((e) => e.name === "email") !== -1 && (
              <ErrorMsg>
                {errors?.find((e) => e?.name === "email")?.error}
              </ErrorMsg>
            )}
          </UserItem>
        </Row>
        <Row>
          <UserItem>
            <ItemLabel>Mật khẩu</ItemLabel>
            <ItemInput
              onChange={handleChange}
              name="password"
              value={password}
              type="password"
              placeholder="Mật khẩu"
            />
            {errors.findIndex((e) => e.name === "password") !== -1 && (
              <ErrorMsg>
                {errors?.find((e) => e?.name === "password")?.error}
              </ErrorMsg>
            )}
          </UserItem>
          <UserItem>
            <ItemLabel>Xác nhận mật khẩu</ItemLabel>
            <ItemInput
              onChange={handleChangePasswordConfirm}
              value={passwordConfirm}
              type="password"
              autoComplete="off"
              placeholder="Xác nhận mật khẩu"
            />
            {errors.findIndex((e) => e.name === "passwordConfirm") !== -1 && (
              <ErrorMsg>
                {errors?.find((e) => e?.name === "passwordConfirm")?.error}
              </ErrorMsg>
            )}
          </UserItem>
          <UserItem>
            <ItemLabel>Số điện thoại</ItemLabel>
            <ItemInput
              onChange={handleChange}
              name="phoneNumber"
              value={phoneNumber}
              type="text"
              placeholder="Số điện thoại"
            />
            {errors.findIndex((e) => e.name === "phoneNumber") !== -1 && (
              <ErrorMsg>
                {errors?.find((e) => e?.name === "phoneNumber")?.error}
              </ErrorMsg>
            )}
          </UserItem>
        </Row>
        <UserItem>
          <ItemLabel>Địa chỉ</ItemLabel>
          <Row>
            <RowItem>
              <SelectProvince
                value={province}
                handleChange={handleChangeProvince}
              />
            </RowItem>
            <RowItem>
              <SelectDistrict
                value={district}
                handleChange={handleChangeDistrict}
                errors={errors}
                province={province}
              />
              {errors.findIndex((e) => e.name === "district") !== -1 && (
                <ErrorMsg>
                  {errors?.find((e) => e?.name === "district")?.error}
                </ErrorMsg>
              )}
            </RowItem>
            <RowItem>
              <SelectWards
                value={ward}
                handleChange={handleChangeWard}
                province={province}
                district={district}
              />
            </RowItem>
          </Row>
        </UserItem>
        <Row>
          <UserItem>
            <ItemLabel>Địa chỉ chi tiết</ItemLabel>
            <ItemInput
              onChange={handleChange}
              name="address"
              value={address}
              type="text"
              placeholder="Địa chỉ chi tiết"
            />
            {errors.findIndex((e) => e.name === "address") !== -1 && (
              <ErrorMsg>
                {errors?.find((e) => e?.name === "address")?.error}
              </ErrorMsg>
            )}
          </UserItem>

          <UserItem>
            <ItemLabel>Quyền người dùng</ItemLabel>
            <ItemSelect name="isAdmin" value={isAdmin} onChange={handleChange}>
              <option disabled value="">
                Chọn quyền
              </option>
              <option value={false}>Khách hàng</option>
              <option value={true}>Admin</option>
            </ItemSelect>
          </UserItem>
          <UserItem>
            <ItemLabel>Tình trạng tài khoản</ItemLabel>
            <ItemSelect name="status" value={status} onChange={handleChange}>
              <option value={true}>Hoạt động</option>
              <option value={false}>Vô hiệu</option>
            </ItemSelect>
          </UserItem>
        </Row>
        <Button disabled={isLoading} width="calc(100% - 840px)" mt="40px">
          {isLoading ? <Spinner size="3rem" /> : "Thêm mới"}
        </Button>
      </Form>
    </PageContainer>
  );
}
