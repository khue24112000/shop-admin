import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Home from "./pages/Home";
import NewUser from "./pages/NewUser";
import NewProduct from "./pages/NewProduct";
import User from "./pages/User";
import UserList from "./pages/UserList";
import ProductList from "./pages/ProductList";
import { useSelector } from "react-redux";
import Toast from "./components/Toast";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CategoryList from "./pages/CategoryList";
import OrderList from "./pages/OrderList";
import NewCategory from "./pages/NewCategory";
import Category from "./pages/Category";
import Order from "./pages/Order";
import Product from "./pages/Product";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              currentUser ? (
                <AppLayout />
              ) : (
                <Navigate to="login" replace={true} />
              )
            }
          >
            <Route index element={<Home />} />
            <Route path="newUser" element={<NewUser />} />
            <Route path="newProduct" element={<NewProduct />} />
            <Route path="newCategory" element={<NewCategory />} />
            <Route path="user/:id" element={<User />} />
            <Route path="category/:id" element={<Category />} />
            <Route path="orders/:id" element={<Order />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="users" element={<UserList />} />
            <Route path="products" element={<ProductList />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Router>
      <Toast />
    </>
  );
}

export default App;
