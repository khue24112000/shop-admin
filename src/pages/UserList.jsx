import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import Title from "../components/Title";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser } from "../redux/apiCalls";
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

export default function UserList() {
  const [value, setValue] = useState("");

  const { users, isLoading } = useSelector((state) => state.client);
  const [renderUser, setRenderUser] = useState([]);

  const currentUser = useSelector((state) => state.user.currentUser);
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
      field: "fullName",
      headerName: "Tên người dùng",
      width: 290,
    },
    { field: "username", headerName: "Tên đăng nhập", width: 200 },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "isAdmin",
      headerName: "Quyền",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (params.row.isAdmin ? "Admin" : "Khách hàng"),
    },
    {
      field: "status",
      headerName: "Tình trạng tài khoản",
      width: 160,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.row.status ? "Hoạt động" : "Vô hiệu";
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
            <Link to={"/user/" + params.row._id}>
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
    if (confirm("Xác nhận xoá người dùng này?")) deleteUser(dispatch, id);
  }

  const handleSearch = (e) => {
    if (e.target.value) setValue(e.target.value);
    else setValue("");
  };

  const defaultUser = useCallback(
    function defaultUser() {
      return users.map((u, i) => {
        return { id: i + 1, ...u };
      });
    },
    [users]
  );

  const searchFunc = useCallback(
    function searchFuncvalue(value) {
      return defaultUser().filter(
        (u) =>
          u.username.toLowerCase().includes(value.toLowerCase()) ||
          u.fullName.toLowerCase().includes(value.toLowerCase())
      );
    },
    [defaultUser]
  );

  useEffect(() => {
    getUser(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0) setRenderUser(defaultUser());
    else setRenderUser([]);
  }, [users, defaultUser]);

  useEffect(() => {
    if (value === "") {
      setRenderUser(defaultUser());
    } else {
      setRenderUser(searchFunc(value));
    }
  }, [value, defaultUser, searchFunc]);

  return (
    <PageContainer>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Title
            title="Danh sách người dùng"
            button="Thêm mới"
            link="/newUser"
          />
          <Container>
            <Search
              placeholder="Tìm kiếm người dùng"
              value={value}
              onChange={handleSearch}
            />
            <DataGrid
              autoPageSize
              rows={renderUser}
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
