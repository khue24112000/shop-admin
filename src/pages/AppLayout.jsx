import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { Container } from "../styles/GlobalStyles";
import ScrollToTop from "../features/ScrollToTop";
import { useEffect } from "react";
import {
  getCategory,
  getOrder,
  getProduct,
  getUser,
  verifyLogin,
} from "../redux/apiCalls";
import { useDispatch } from "react-redux";

function AppLayout() {
  const dispatch = useDispatch();
  useEffect(() => {
    verifyLogin(dispatch);
    const timerId = setInterval(() => {
      return verifyLogin(dispatch);
    }, 900000);
    return () => {
      clearInterval(timerId);
    };
  }, [dispatch]);

  useEffect(() => {
    getProduct(dispatch);
    getCategory(dispatch);
    getOrder(dispatch);
    getUser(dispatch);
  }, []);

  return (
    <>
      <Topbar />
      <Container>
        <Sidebar />
        <Outlet />
      </Container>
      <ScrollToTop />
    </>
  );
}

export default AppLayout;
