import { ArrowBack } from "@mui/icons-material";
import styled from "styled-components";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { addProduct } from "../redux/apiCalls";
import { validateProduct } from "../utils/validate";
import BasicModal from "../components/Modal";
import { Checkbox, MenuItem, Select } from "@mui/material";

// const Title = styled.h1``;

const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];

const Form = styled.form``;
const Row = styled.div`
  display: flex;
  gap: 15px;
`;

// const RowItem = styled.div`
//   flex: 1;
//   margin-right: 20px;
//   margin-top: 15px;

//   /* & + & {
//     margin-left: 20px;
//   } */
// `;

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

// const ItemSelect = styled.select`
//   height: 40px;
//   border-radius: 5px;
//   font-size: 1.4rem;
// `;

const ErrorMsg = styled.p`
  color: red;
`;

const ColorContainer = styled.div`
  display: flex;
  gap: 4px;
  overflow-x: overlay;
  max-width: 60%;
  height: 40px;
  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-grey-400);
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    /* display: none; */
    background-color: transparent;
  }
`;
const ColorPreview = styled.div`
  position: relative;
  padding: 5px 5px 0 0;
  max-height: 40px;
`;

const Color = styled.span`
  background-image: url(${(props) => props.$image || ""});
  width: 50px;
  height: 80%;
  background-color: #000;
  color: #fff;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  /* padding-top: 2px; */
`;

const DeleteColorButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  line-height: 1rem;
  font-size: 2.3rem;
  cursor: pointer;
`;

const Desc = styled.textarea`
  resize: none;
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 1.4rem;
  &:focus {
    border-color: ${(props) => (props.$error ? "red" : "var(--primary-color)")};
  }
  ${(props) => (props.$error ? "border-color: red" : "")}
`;

export default function NewProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, products } = useSelector((state) => state.product);
  const { category } = useSelector((state) => state.category);
  const [errors, setErrors] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [colors, setColors] = useState([]);

  const [dataInput, setDataInput] = useState({
    name: "",
    categories: [],
    size: [],
    price: "",
    amount: "",
    desc: "",
  });
  const [canUpdate, setCanUpdate] = useState(false);

  const { name, categories, size, price, amount, desc } = dataInput;
  // console.log(canUpdate);

  // console.log(errors);

  console.log({
    ...dataInput,
    color: colors,
  });
  // console.log(userAddress, userWard, userDistrict, userProvince);

  function handleChange(e) {
    setErrors((prev) => prev.filter((err) => err.name !== e.target.name));
    setDataInput((prev) => {
      if (e.target.value) {
        return { ...prev, [e.target.name]: e.target.value };
      } else return { ...prev, [e.target.name]: "" };
    });
  }

  function handleChangeColors(c) {
    if (c) setColors((prev) => [...prev, c]);
  }

  function handleClick(e) {
    e.preventDefault();
    const validate = validateProduct({
      name,
      categories,
      size,
      price,
      amount,
      desc,
      colors,
    });
    if (validate.length === 0) {
      setCanUpdate(true);
    } else {
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

  function handleDeleteColors(name) {
    setColors((prev) => prev.filter((c) => c.colorName !== name));
  }

  useEffect(() => {
    const callback = (e) => {
      if (e.key === "Enter") return;
    };
    document.addEventListener("keydown", callback);
    if (canUpdate) {
      addProduct(
        dispatch,
        {
          ...dataInput,
          status: amount > 0 ? true : false,
          color: colors,
        },
        navigate
      );
    }
    return () => {
      document.removeEventListener("keydown", callback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canUpdate]);
  return (
    <PageContainer>
      <Title
        title="Thêm sản phẩm"
        button="Quay lại"
        icon={<ArrowBack />}
        link="/products"
      />
      <Form onSubmit={handleClick}>
        <Row>
          <UserItem>
            <ItemLabel>Tên sản phẩm</ItemLabel>
            <ItemInput
              onChange={handleChange}
              name="name"
              value={name}
              type="text"
              placeholder="Tên sản phẩm"
            />
            {errors.findIndex((e) => e.name === "name") !== -1 && (
              <ErrorMsg>
                {errors?.find((e) => e?.name === "name")?.error}
              </ErrorMsg>
            )}
          </UserItem>
          <UserItem>
            <ItemLabel>Loại sản phẩm</ItemLabel>
            <Select
              multiple
              sx={{
                fontSize: "1.6rem",
                lineHeight: "1",
                "& #mui-component-select-categories": {
                  minHeight: "1em",
                  padding: "14px 32px 14px 14px",
                },
              }}
              name="categories"
              value={categories}
              onChange={handleChange}
              renderValue={(selected) => {
                if (selected.length === 0) return "Chọn loại sản phẩm";
                else return selected.join(", ");
              }}
            >
              {category.map((c) => (
                <MenuItem
                  sx={{ fontSize: "1.6rem" }}
                  key={c._id}
                  value={c.categoryName}
                >
                  <Checkbox checked={categories.indexOf(c.categoryName) > -1} />
                  {c.categoryName}
                </MenuItem>
              ))}
            </Select>
            {errors.findIndex((e) => e.name === "categories") !== -1 && (
              <ErrorMsg>
                {errors?.find((e) => e?.name === "categories")?.error}
              </ErrorMsg>
            )}
          </UserItem>
          <UserItem>
            <ItemLabel>Kích cỡ sản phẩm</ItemLabel>
            <Select
              multiple
              required
              sx={{
                fontSize: "1.6rem",
                lineHeight: "1",
                "& #mui-component-select-size": {
                  minHeight: "1em",
                  padding: "14px 32px 14px 14px",
                },
              }}
              name="size"
              value={size}
              onChange={handleChange}
              renderValue={(selected) => {
                return selected.join(", ");
              }}
            >
              {sizes.map((s) => (
                <MenuItem sx={{ fontSize: "1.6rem" }} key={s} value={s}>
                  <Checkbox checked={size.indexOf(s) > -1} />
                  {s}
                </MenuItem>
              ))}
            </Select>
            {errors.findIndex((e) => e.name === "size") !== -1 && (
              <ErrorMsg>
                {errors?.find((e) => e?.name === "size")?.error}
              </ErrorMsg>
            )}
          </UserItem>
        </Row>

        <Row>
          <UserItem>
            <ItemLabel>Số lượng</ItemLabel>
            <ItemInput
              required
              onChange={handleChange}
              name="amount"
              value={amount}
              type="text"
              placeholder="Số lượng sản phẩm"
            />
            {errors.findIndex((e) => e.name === "amount") !== -1 && (
              <ErrorMsg>
                {errors?.find((e) => e?.name === "amount")?.error}
              </ErrorMsg>
            )}
          </UserItem>
          <UserItem>
            <ItemLabel>Giá</ItemLabel>
            <ItemInput
              required
              onChange={handleChange}
              name="price"
              value={price}
              type="text"
              placeholder="Giá sản phẩm"
            />
            {errors.findIndex((e) => e.name === "price") !== -1 && (
              <ErrorMsg>
                {errors?.find((e) => e?.name === "price")?.error}
              </ErrorMsg>
            )}
          </UserItem>
          <UserItem>
            <ItemLabel>Màu sắc</ItemLabel>
            <Row>
              {colors.length > 0 && (
                <ColorContainer>
                  {colors.map((c) => (
                    <ColorPreview key={c.colorName}>
                      <Color $image={c.colorImg}></Color>
                      <DeleteColorButton
                        onClick={() => handleDeleteColors(c.colorName)}
                      >
                        &times;
                      </DeleteColorButton>
                    </ColorPreview>
                  ))}
                </ColorContainer>
              )}
              <Button
                mt="0"
                onClick={(e) => {
                  e.preventDefault();
                  setErrors((prev) =>
                    prev.filter((err) => err.name !== "colors")
                  );
                  setOpenModal(true);
                }}
              >
                + Thêm màu
              </Button>
            </Row>
            {errors.findIndex((e) => e.name === "colors") !== -1 && (
              <ErrorMsg>
                {errors?.find((e) => e?.name === "colors")?.error}
              </ErrorMsg>
            )}
          </UserItem>
        </Row>
        <Row>
          <UserItem>
            <ItemLabel>Mô tả sản phẩm</ItemLabel>
            <Desc
              value={desc}
              name="desc"
              onChange={handleChange}
              placeholder="Mô tả sản phẩm"
            />
            {errors.findIndex((e) => e.name === "desc") !== -1 && (
              <ErrorMsg>
                {errors?.find((e) => e?.name === "desc")?.error}
              </ErrorMsg>
            )}
          </UserItem>
        </Row>
        <Button onClick={handleClick} disabled={isLoading} mt="40px">
          {isLoading ? <Spinner size="3rem" /> : "Thêm mới"}
        </Button>
      </Form>
      {openModal && (
        <BasicModal
          open={openModal}
          setOpen={setOpenModal}
          colors={colors}
          handleChangeColors={handleChangeColors}
        ></BasicModal>
      )}
    </PageContainer>
  );
}
