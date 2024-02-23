import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrder } from "../redux/apiCalls";
import Spinner from "../components/Spinner";
import Search from "../components/Search";
import { formatCurrency, formatDate } from "../utils/helpers";

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

export default function OrderList() {
  const [value, setValue] = useState("");

  const { orders, isLoading } = useSelector((state) => state.order);
  const [renderOrders, setRenderOrder] = useState([]);

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
      headerName: "Mã đơn hàng",
      width: 230,
    },
    {
      field: "fullName",
      headerName: "Tên người nhận",
      width: 150,
    },

    {
      field: "createdAt",
      headerName: "Ngày đặt hàng",
      width: 165,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => formatDate(params.row.createdAt),
    },
    {
      field: "updatedAt",
      headerName: "Thời gian cập nhật đơn",
      width: 165,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => formatDate(params.row.updatedAt),
    },
    {
      field: "status",
      headerName: "Tình trạng đơn",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalPrice",
      headerName: "Tổng tiền",
      width: 130,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        formatCurrency(params.row.shippingCost + params.row.totalPrice),
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
            <Link to={"/orders/" + params.row._id}>
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
    if (confirm("Xác nhận xoá đơn hàng này?")) deleteOrder(dispatch, id);
  }

  const handleSearch = (e) => {
    if (e.target.value) setValue(e.target.value);
    else setValue("");
  };

  const defaultOrder = useCallback(
    function defaultOrder() {
      return orders.map((o, i) => {
        return { id: i + 1, ...o };
      });
    },
    [orders]
  );

  const searchFunc = useCallback(
    function searchFunc(value) {
      return defaultOrder().filter(
        (o) =>
          o.fullName.toLowerCase().includes(value.toLowerCase()) ||
          o._id.toLowerCase().includes(value.toLowerCase()) ||
          formatDate(o.createdAt).includes(value) ||
          formatDate(o.updatedAt).includes(value) ||
          o.status.toLowerCase().includes(value.toLowerCase())
      );
    },
    [defaultOrder]
  );

  useEffect(() => {
    getOrder(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (orders.length > 0) setRenderOrder(defaultOrder());
    else setRenderOrder([]);
  }, [orders, defaultOrder]);

  useEffect(() => {
    if (value === "") {
      setRenderOrder(defaultOrder());
    } else {
      setRenderOrder(searchFunc(value));
    }
  }, [value, defaultOrder, searchFunc]);

  return (
    <PageContainer>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Title title="Danh sách đơn hàng" />
          <Container>
            <Search
              placeholder="Tìm kiếm theo mã đơn hàng, người nhận, thời gian, tình trạng đơn"
              value={value}
              onChange={handleSearch}
            />
            <DataGrid
              disableRowSelectionOnClick
              autoPageSize
              rows={renderOrders}
              columns={columns}
              disableSelectionOnClick
              sx={{ fontSize: "1.4rem", outline: "none  " }}
            />
          </Container>
        </>
      )}
    </PageContainer>
  );
}
