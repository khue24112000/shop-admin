import { ArrowBack } from "@mui/icons-material";
import styled from "styled-components";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TextRong } from "../utils/validate";
import { updateCategory } from "../redux/apiCalls";

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

export default function Category() {
  const categories = useSelector((state) => state.category.category);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = categories?.find((c) => c._id === id);
  const [categoryName, setCategoryName] = useState(
    category?.categoryName || ""
  );
  const [errors, setErrors] = useState([]);
  const [canUpdate, setCanUpdate] = useState(false);
  console.log(errors);

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
      updateCategory(dispatch, id, categoryName);
      navigate("/categories");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canUpdate]);

  return (
    <PageContainer>
      <Title
        title="Cập nhật danh mục sản phẩm"
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
            placeholder={category.categoryName}
          />
          {errors.findIndex((e) => e.name === "categoryName") !== -1 && (
            <ErrorMsg>
              {errors?.find((e) => e?.name === "categoryName")?.error}
            </ErrorMsg>
          )}
        </UserItem>

        <Button onClick={handleClick} width="calc(100% - 840px)" mt="40px">
          Cập nhật
        </Button>
      </Form>
    </PageContainer>
  );
}
