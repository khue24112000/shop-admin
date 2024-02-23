import { Add, ArrowBack, Remove } from "@mui/icons-material";
import styled from "styled-components";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { updateOrder } from "../redux/apiCalls";
import { DataGrid } from "@mui/x-data-grid";
import { formatCurrency } from "../utils/helpers";
import { validateOrder } from "../utils/validate";

// const Title = styled.h1``;

const Form = styled.form``;
const Row = styled.div`
  display: flex;
  gap: 15px;
  align-items: ${(props) => props.$alignItems};
  justify-content: ${(props) => props.$justifyContent};
`;

const RowItem = styled.div`
  flex: 1;
  margin-right: 20px;
  margin-top: 15px;

  /* & + & {
    margin-left: 20px;
  } */
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

const GridContainer = styled.div`
  height: 198px;
  padding-right: 20px;
  margin-top: 20px;

  & .MuiDataGrid-footerContainer {
    min-height: 36px;
    max-height: 36px;
  }
  & .MuiDataGrid-columnHeaders {
    min-height: 50px !important;
    max-height: 50px !important;
    line-height: 50px !important;
  }
  & .MuiDataGrid-row {
    min-height: 50px !important;
    max-height: 50px !important;
  }
`;

const Pricing = styled.p`
  margin: 20px 64px 0 auto;
  font-size: 1.8rem;
  font-weight: 600;
`;

const ProductImage = styled.img`
  width: 60px;
  height: 45px;
  object-fit: contain;
`;

const ColorName = styled.span`
  display: inline-flex;
  max-width: 50px;
  min-width: 50px;
  justify-content: center;
  align-items: center;
`;

export default function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, orders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);
  const { id } = useParams();
  const order = orders?.find((o) => o._id === id);
  const [canUpdate, setCanUpdate] = useState(false);
  const [errors, setErrors] = useState([]);
  const [dataInput, setDataInput] = useState({
    fullName: order?.fullName || "",
    email: order?.email || "[]",
    phoneNumber: order?.phoneNumber || "",
    paymentMethod: order?.paymentMethod || "",
    note: order?.note || "",
    address: order?.address || "",
    status: order?.status || "",
  });
  // console.log(order);
  const { fullName, email, phoneNumber, paymentMethod, note, address, status } =
    dataInput;

  const [orderProducts, setOrderProducts] = useState(order?.products);

  // console.log(order?.products);
  const renderProducts = orderProducts.map((p, i) => {
    return { id: i + 1, ...p };
  });

  // console.log(dataInput);

  const totalPrice = orderProducts?.reduce(
    (total, product) =>
      total +
      product.quantity *
        products.find((p) => p._id === product.productId)?.price,
    0
  );
  // console.log(orderProducts, products);
  const shippingCost = totalPrice > 300000 ? 0 : 30000;
  // console.log(totalPrice, shippingCost);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "productId",
      headerName: "Mã sản phẩm",
      width: 200,
    },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      width: 230,
      headerAlign: "center",

      renderCell: (params) =>
        products?.find((p) => p?._id === params.row?.productId)?.name,
    },

    {
      field: "size",
      headerName: "Kích cỡ",
      width: 90,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "color",
      headerName: "Màu sắc",
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Row $alignItems="center" $justifyContent="space-between">
            <ProductImage src={params.row?.color?.productImg} />
            <ColorName>{params.row?.color?.colorName}</ColorName>
          </Row>
        );
      },
    },

    {
      field: "quantity",
      headerName: "Số lượng",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Row $alignItems="center">
            <Remove
              sx={{ cursor: "pointer" }}
              onClick={() => handleQuantity("dec", params.row._id)}
            />
            {params.row.quantity}
            <Add
              sx={{ cursor: "pointer" }}
              onClick={() => handleQuantity("inc", params.row._id)}
            />
          </Row>
        );
      },
    },
    {
      field: "price",
      headerName: "Đơn giá",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return formatCurrency(
          products?.find((p) => p?._id === params.row?.productId)?.price
        );
      },
    },
    {
      field: "totalPrice",
      headerName: "Thành tiền",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return formatCurrency(
          params.row?.quantity *
            products?.find((p) => p._id === params.row?.productId)?.price
        );
      },
    },
  ];

  // const { name, categories, size, price, amount, desc } = dataInput;
  // console.log(canUpdate);

  // console.log(errors);

  // console.log(error);
  // console.log(userAddress, userWard, userDistrict, userProvince);

  function handleQuantity(type, id) {
    if (type === "inc") {
      setOrderProducts((prev) =>
        prev.map((p) => {
          if (p._id === id) return { ...p, quantity: p.quantity + 1 };
          return p;
        })
      );
    } else {
      setOrderProducts((prev) => {
        if (prev.find((p) => p._id === id).quantity === 1) {
          const xacNhan = confirm("Xác nhận xoá sản phẩm khỏi đơn hàng?");
          if (xacNhan) return prev.filter((p) => p._id !== id);
          else return prev;
        } else
          return prev.map((p) => {
            if (p._id === id) return { ...p, quantity: p.quantity - 1 };
            return p;
          });
      });
    }
  }

  function handleChange(e) {
    setErrors((prev) => prev.filter((err) => err.name !== e.target.name));
    setDataInput((prev) => {
      if (e.target.value) {
        return { ...prev, [e.target.name]: e.target.value };
      } else return { ...prev, [e.target.name]: "" };
    });
  }

  function handleClick(e) {
    e.preventDefault();
    const validate = validateOrder({
      fullName,
      phoneNumber,
      status,
      address,
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

  useEffect(() => {
    const callback = (e) => {
      if (e.key === "Enter") return;
    };
    document.addEventListener("keydown", callback);
    if (canUpdate) {
      updateOrder(
        dispatch,
        id,
        { ...dataInput, products: orderProducts, shippingCost, totalPrice },
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
        title="Thông tin đơn hàng"
        button="Quay lại"
        icon={<ArrowBack />}
        link="/orders"
      />
      <Form onSubmit={handleClick}>
        <Row>
          <UserItem>
            <ItemLabel>Tên người nhận</ItemLabel>
            <ItemInput
              onChange={handleChange}
              name="fullName"
              value={fullName}
              type="text"
              placeholder="Tên người nhận"
            />
            {errors.findIndex((e) => e.name === "fullName") !== -1 && (
              <ErrorMsg>
                {errors?.find((e) => e?.name === "fullName")?.error}
              </ErrorMsg>
            )}
          </UserItem>
          <UserItem>
            <ItemLabel>Email người nhận</ItemLabel>
            <ItemInput
              onChange={handleChange}
              name="email"
              value={email}
              type="text"
              placeholder="Email người nhận"
            />
          </UserItem>
          <UserItem>
            <ItemLabel>Số điện thoại</ItemLabel>
            <ItemInput
              onChange={handleChange}
              name="phoneNumber"
              value={phoneNumber}
              type="text"
              placeholder="Số điện thoại người nhận"
            />
            {errors.findIndex((e) => e.name === "phoneNumber") !== -1 && (
              <ErrorMsg>
                {errors?.find((e) => e?.name === "phoneNumber")?.error}
              </ErrorMsg>
            )}
          </UserItem>
        </Row>

        <Row>
          <UserItem>
            <ItemLabel>Ghi chú</ItemLabel>
            <ItemInput
              onChange={handleChange}
              name="note"
              value={note}
              type="text"
              placeholder="Ghi chú"
            />
          </UserItem>
          <UserItem>
            <ItemLabel>Tình trạng đơn hàng</ItemLabel>
            <ItemSelect name="status" value={status} onChange={handleChange}>
              <option disabled value="">
                Tình trạng đơn hàng
              </option>
              <option>Đang xử lý</option>
              <option>Đang vận chuyển</option>
              <option>Đã huỷ</option>
              <option>Hoàn thành</option>
            </ItemSelect>
            {errors.findIndex((e) => e.name === "desc") !== -1 && (
              <ErrorMsg>
                {errors?.find((e) => e?.name === "desc")?.error}
              </ErrorMsg>
            )}
          </UserItem>

          <UserItem>
            <ItemLabel>Phương thức thanh toán</ItemLabel>
            <ItemInput disabled defaultValue={paymentMethod} type="text" />
          </UserItem>
        </Row>
        <Row>
          <UserItem style={{ flex: 2 }}>
            <ItemLabel>Địa chỉ</ItemLabel>
            <ItemInput
              onChange={handleChange}
              name="address"
              value={address}
              type="text"
              placeholder="Địa chỉ nhận hàng"
            />
            {errors.findIndex((e) => e.name === "address") !== -1 && (
              <ErrorMsg>
                {errors?.find((e) => e?.name === "address")?.error}
              </ErrorMsg>
            )}
          </UserItem>
          <UserItem>
            <ItemLabel>Phí vận chuyển</ItemLabel>
            <ItemInput disabled value={shippingCost} onChange={() => {}} />
          </UserItem>
        </Row>
        <GridContainer>
          <DataGrid
            autoPageSize
            disableColumnFilter
            disableColumnMenu
            disableColumnSelector
            disableDensitySelector
            disableRowSelectionOnClick
            rows={renderProducts}
            columns={columns}
            disableSelectionOnClick
            sx={{ fontSize: "1.2rem", outline: "none" }}
            // pageSizeOptions="none"
          />
        </GridContainer>
        <Row>
          <Pricing>Tổng tiền: {formatCurrency(totalPrice)}</Pricing>
        </Row>
        <Row>
          <UserItem></UserItem>
          <UserItem></UserItem>
          <UserItem>
            <Button width="100%" onClick={handleClick} disabled={isLoading}>
              {isLoading ? <Spinner size="3rem" /> : "Cập nhật"}
            </Button>
          </UserItem>
        </Row>
      </Form>
    </PageContainer>
  );
}
