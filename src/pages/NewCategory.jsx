import styled from "styled-components";
import Button from "../components/Button";
import PageContainer from "../components/PageContainer";
import Title from "../components/Title";
import { ArrowBack } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextRong } from "../utils/validate";
import { useEffect, useState } from "react";
import { addCategory } from "../redux/apiCalls";

// const Title = styled.h1``;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const UserItem = styled.div`
  width: 400px;
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
  color: gray;
`;

const ItemInput = styled.input`
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 1.4rem;
`;

const ErrorMsg = styled.p`
  color: red;
`;
export default function NewCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [canUpdate, setCanUpdate] = useState(false);
  const [errors, setErrors] = useState([]);

  function handleClick(e) {
    e.preventDefault();
    if (TextRong(categoryName, "categoryName").length === 0) setCanUpdate(true);
    else {
      setErrors((prev) =>
        TextRong(categoryName, "categoryName").reduce((arr, e) => {
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

  useEffect(() => {
    if (canUpdate) {
      addCategory(dispatch, categoryName);
      navigate("/categories");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canUpdate]);
  return (
    <PageContainer>
      <Title
        title="Thêm danh mục sản phẩm"
        button="Quay lại"
        icon={<ArrowBack />}
        link="/categories"
      />
      <Form>
        <UserItem>
          <ItemLabel>Tên danh mục sản phẩm</ItemLabel>
          <ItemInput
            value={categoryName}
            onChange={(e) => {
              setErrors((prev) =>
                prev.filter((e) => e.name !== "categoryName")
              );
              setCategoryName(e.target.value);
            }}
            type="text"
            placeholder="Tên danh mục sản phẩm"
          />
          {errors.findIndex((e) => e.name === "categoryName") !== -1 && (
            <ErrorMsg>
              {errors?.find((e) => e?.name === "categoryName")?.error}
            </ErrorMsg>
          )}
        </UserItem>

        <Button onClick={handleClick} width="calc(100% - 840px)" mt="40px">
          Thêm mới
        </Button>
      </Form>
    </PageContainer>
  );
}
