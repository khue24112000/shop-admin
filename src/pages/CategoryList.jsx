import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategory, updateProduct } from "../redux/apiCalls";
import Spinner from "../components/Spinner";
import Search from "../components/Search";

const Container = styled.div`
  height: calc(100vh - 200px);
  margin-top: 20px;
  font-size: 1.6rem;
`;

const EditButton = styled.button`
  border-radius: 10px;
  padding: 5px 10px;
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
  margin-right: 20px;
  border: none;
`;

const DeleteIcon = styled.span`
  color: red;
  cursor: pointer;
`;

export default function CategoryList() {
  const [value, setValue] = useState("");

  const { category, isLoading } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.product);
  const [renderCategory, setRenderCategory] = useState([]);

  const dispatch = useDispatch();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "_id",
      headerName: "Mã danh mục sản phẩm",
      width: 400,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "categoryName",
      headerName: "Tên danh mục sản phẩm",
      width: 550,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "action",
      headerName: "Chức năng",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <Link to={"/category/" + params.row._id}>
              <EditButton>Xem chi tiết</EditButton>
            </Link>
            <DeleteIcon onClick={() => handleDelete(params.row._id)}>
              <DeleteOutline style={{ fontSize: "2rem" }} />
            </DeleteIcon>
          </>
        );
      },
    },
  ];

  function handleDelete(id) {
    if (confirm("Xác nhận xoá danh mục sản phẩm này?")) {
      const categoryName = category.find((c) => c._id === id).categoryName;
      const productsHaveCat = products.filter((p) =>
        p.categories.includes(categoryName)
      );
      console.log(productsHaveCat);
      productsHaveCat.forEach((p) => {
        updateProduct(dispatch, p._id, {
          ...p,
          categories: p.categories.filter((cat) => cat !== categoryName),
        });
      });
      deleteCategory(dispatch, id);
    }
  }

  const handleSearch = (e) => {
    if (e.target.value) setValue(e.target.value);
    else setValue("");
  };

  const defaultCategory = useCallback(
    function defaultCategory() {
      return category.map((c, i) => {
        return { id: i + 1, ...c };
      });
    },
    [category]
  );

  const searchFunc = useCallback(
    function searchFuncvalue(value) {
      return defaultCategory().filter((c) =>
        c.categoryName.toLowerCase().includes(value.toLowerCase())
      );
    },
    [defaultCategory]
  );

  useEffect(() => {
    getCategory(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (category.length > 0) setRenderCategory(defaultCategory());
    else setRenderCategory([]);
  }, [category, defaultCategory]);

  useEffect(() => {
    if (value === "") {
      setRenderCategory(defaultCategory());
    } else {
      setRenderCategory(searchFunc(value));
    }
  }, [value, defaultCategory, searchFunc]);

  return (
    <PageContainer>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Title
            title="Danh sách danh mục sản phẩm"
            button="Thêm mới"
            link="/newCategory"
          />
          <Container>
            <Search
              placeholder="Tìm kiếm theo tên"
              value={value}
              onChange={handleSearch}
            />
            <DataGrid
              autoPageSize
              rows={renderCategory}
              columns={columns}
              disableSelectionOnClick
              disableRowSelectionOnClick
              sx={{ fontSize: "1.4rem", outline: "none  " }}
            />
          </Container>
        </>
      )}
    </PageContainer>
  );
}
