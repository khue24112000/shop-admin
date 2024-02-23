import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import Title from "../components/Title";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProduct } from "../redux/apiCalls";
import Search from "../components/Search";
import { formatCurrency } from "../utils/helpers";

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

  &:disabled {
    background-color: var(--color-grey-300);
    cursor: not-allowed;
  }
`;

const DeleteIcon = styled.span`
  color: ${(props) => (props.$disabled ? "var(--color-grey-300)" : "red")};
  cursor: pointer;
  pointer-events: ${(props) => (props.$disabled ? "none" : "auto")};
`;

export default function ProductList() {
  const [value, setValue] = useState("");

  const { products, isLoading } = useSelector((state) => state.product);
  const [renderProduct, setRenderProduct] = useState([]);

  const dispatch = useDispatch();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "_id",
      headerName: "Mã sản phẩm",
      width: 250,
    },
    { field: "name", headerName: "Tên sản phẩm", width: 160 },
    {
      field: "size",
      headerName: "Kích cỡ",
      width: 90,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.row.size?.join(", ");
      },
    },

    {
      field: "color",
      headerName: "Màu sắc",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        params.row.color?.map((c) => c.colorName)?.join(", "),
    },
    {
      field: "categories",
      headerName: "Loại sản phẩm",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => params.row.categories?.join(", "),
    },
    {
      field: "amount",
      headerName: "Số lượng",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        params.row.amount > 0 ? params.row.amount : "Hết hàng",
    },
    {
      field: "price",
      headerName: "Giá",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return formatCurrency(params.row.price);
      },
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
            <Link to={"/product/" + params.row._id}>
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
    // console.log(id);
    if (confirm("Xác nhận xoá sản phẩm này?")) deleteProduct(dispatch, id);
  }

  const handleSearch = (e) => {
    if (e.target.value) setValue(e.target.value);
    else setValue("");
  };

  const defaultProduct = useCallback(
    function defaultProduct() {
      return products?.map((u, i) => {
        return { id: i + 1, ...u };
      });
    },
    [products]
  );

  const searchFunc = useCallback(
    function searchFuncvalue(value) {
      return defaultProduct().filter(
        (p) =>
          p.name.toLowerCase().includes(value.toLowerCase()) ||
          p._id.toLowerCase().includes(value.toLowerCase()) ||
          p.categories
            ?.map((c) => c.toLowerCase())
            ?.join(", ")
            .includes(value.toLowerCase())
      );
    },
    [defaultProduct]
  );

  useEffect(() => {
    getProduct(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) setRenderProduct(defaultProduct());
    else setRenderProduct([]);
  }, [products, defaultProduct]);

  useEffect(() => {
    if (value === "") {
      setRenderProduct(defaultProduct());
    } else {
      setRenderProduct(searchFunc(value));
    }
  }, [value, defaultProduct, searchFunc]);

  return (
    <PageContainer>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Title
            title="Danh sách sản phẩm"
            button="Thêm mới"
            link="/newProduct"
          />
          <Container>
            <Search
              placeholder="Tìm kiếm theo mã sản phẩm, tên sản phẩm"
              value={value}
              onChange={handleSearch}
            />
            <DataGrid
              autoPageSize
              disableColumnFilter
              disableColumnMenu
              disableColumnSelector
              disableDensitySelector
              rows={renderProduct}
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
