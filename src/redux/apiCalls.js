import { loginFailure, loginStart, loginSuccess, logout } from "./userSlice";
import { publicRequest, userRequest } from "../utils/requestMethod";
import {
  getCategoryFailure,
  getCategoryStart,
  getCategorySuccess,
  deleteCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  updateCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
  addCategoryFailure,
  addCategoryStart,
  addCategorySuccess,
} from "./categorySlice";
import {
  getUserFailure,
  getUserStart,
  getUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  addUserFailure,
  addUserStart,
  addUserSuccess,
} from "./clientSlice";

import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "./productSlice";

import {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure,
} from "./orderSlice";
import { errorToast, successToast } from "./toastSlice";

// Login
export const verifyLogin = async (dispatch) => {
  const request = userRequest();
  try {
    await request.post("/auth/verifyLogin");
  } catch (err) {
    if (err.response.status === 403) dispatch(logout());
  }
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  // const request = userRequest();
  try {
    const res = await publicRequest.post("/auth/adminLogin", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

// Category
export async function getCategory(dispatch) {
  dispatch(getCategoryStart());
  // verifyLogin(dispatch);
  try {
    const res = await publicRequest.get("/category");
    dispatch(getCategorySuccess(res.data));
  } catch (err) {
    dispatch(getCategoryFailure());
  }
}

export async function deleteCategory(dispatch, id) {
  dispatch(deleteCategoryStart());
  const request = userRequest();
  try {
    await request.delete(`/category/${id}`);
    dispatch(deleteCategorySuccess(id));
    dispatch(successToast("Xoá danh mục thành công"));
  } catch (err) {
    dispatch(deleteCategoryFailure());
  }
}

export async function updateCategory(dispatch, id, categoryName) {
  dispatch(updateCategoryStart());
  const request = userRequest();
  try {
    await request.put(`/category/${id}`, { categoryName });
    dispatch(updateCategorySuccess({ id, categoryName }));
    dispatch(successToast("Sửa danh mục thành công"));
  } catch (err) {
    dispatch(updateCategoryFailure());
  }
}

export async function addCategory(dispatch, categoryName) {
  dispatch(addCategoryStart());
  const request = userRequest();
  try {
    const res = await request.post(`/category`, { categoryName });
    dispatch(addCategorySuccess(res.data));
    dispatch(successToast("Thêm danh mục thành công"));
  } catch (err) {
    dispatch(addCategoryFailure());
  }
}

// User
export async function getUser(dispatch) {
  dispatch(getUserStart());
  const request = userRequest();
  try {
    const res = await request.get("/user");
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
}

export async function deleteUser(dispatch, id) {
  dispatch(deleteUserStart());
  const request = userRequest();
  try {
    await request.delete(`/user/${id}`);
    dispatch(deleteUserSuccess(id));
    dispatch(successToast("Xoá người dùng thành công"));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
}

export async function updateUser(dispatch, id, data) {
  dispatch(updateUserStart());
  const request = userRequest();
  try {
    await request.put(`/user/${id}`, data);
    dispatch(updateUserSuccess());
    dispatch(successToast("Cập nhật người dùng thành công"));
  } catch (err) {
    dispatch(updateUserFailure());
  }
}

export async function addUser(dispatch, data, navigate) {
  dispatch(addUserStart());
  const request = userRequest();
  try {
    const res = await request.post(`/auth/adminregister`, data);
    dispatch(addUserSuccess(res.data));
    dispatch(successToast("Thêm người dùng thành công"));
    navigate("/users");
  } catch (err) {
    dispatch(addUserFailure());
    dispatch(errorToast("Tên đăng nhập hoặc email đã tồn tại"));
  }
}

// Product
export async function getProduct(dispatch) {
  dispatch(getProductStart());
  const request = userRequest();
  try {
    const res = await request.get("/product");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
}

export async function deleteProduct(dispatch, id) {
  dispatch(deleteProductStart());
  const request = userRequest();
  // const newProduct = Order.map((o) =>
  //   o.products.filter((p) => p.productId === id)
  // );
  // console.log(newProduct);
  try {
    const Order = await request.get(`/order/find?productid=${id}`);
    await Order.data.forEach(async (item) => {
      const newProducts = item.products.filter((p) => p.productId !== id);
      if (newProducts.length === 0) await request.delete(`/order/${item._id}`);
      else
        await request.put(`/order/${item._id}`, {
          ...item,
          products: newProducts,
        });
    });

    const Cart = await request.get("/cart");
    await Cart.data.forEach(async (item) => {
      const newProducts = item.products.filter((p) => p.productId !== id);
      await request.put(`/cart/${item._id}`, {
        ...item,
        products: newProducts,
      });
    });

    await request.delete(`/product/${id}`);
    dispatch(deleteProductSuccess(id));
    dispatch(successToast("Xoá sản phẩm thành công"));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
}

export async function updateProduct(dispatch, id, data, navigate) {
  dispatch(updateProductStart());
  const request = userRequest();
  try {
    await request.put(`/product/${id}`, data);
    dispatch(updateProductSuccess());
    navigate("/products");
    dispatch(successToast("Cập nhật sản phẩm thành công"));
  } catch (err) {
    dispatch(updateProductFailure());
  }
}

export async function addProduct(dispatch, data, navigate) {
  dispatch(addProductStart());
  const request = userRequest();
  try {
    const res = await request.post(`/product`, data);
    dispatch(addProductSuccess(res.data));
    dispatch(successToast("Thêm sản phẩm thành công"));
    navigate("/products");
  } catch (err) {
    dispatch(addProductFailure());
  }
}

// Order
export async function getOrder(dispatch) {
  dispatch(getOrderStart());
  const request = userRequest();
  try {
    const res = await request.get("/order");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
}

export async function deleteOrder(dispatch, id) {
  dispatch(deleteOrderStart());
  const request = userRequest();
  try {
    await request.delete(`/order/${id}`);
    dispatch(deleteOrderSuccess(id));
    dispatch(successToast("Xoá đơn hàng thành công"));
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
}

export async function updateOrder(dispatch, id, data, navigate) {
  dispatch(updateOrderStart());
  const request = userRequest();
  try {
    if (data.products.length === 0) deleteOrder(dispatch, id);
    else {
      await request.put(`/order/${id}`, data);
      dispatch(updateOrderSuccess());
    }
    navigate("/orders");
    dispatch(successToast("Cập nhật đơn hàng thành công"));
  } catch (err) {
    dispatch(updateOrderFailure());
  }
}
