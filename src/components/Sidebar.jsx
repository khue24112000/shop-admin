// import "./sidebar.css";
import styled, { css } from "styled-components";
import {
  HomeOutlined,
  PermIdentity,
  Storefront,
  ViewCarouselOutlined,
  CategoryOutlined,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const menu = [
  {
    name: "Dashboard",
    icon: <HomeOutlined />,
    link: "/",
  },
  {
    name: "Người dùng",
    icon: <PermIdentity />,
    link: "/users",
  },
  {
    name: "Sản phẩm",
    icon: <Storefront />,
    link: "/products",
  },
  {
    name: "Danh mục sản phẩm",
    icon: <CategoryOutlined />,
    link: "/categories",
  },
  {
    name: "Đơn hàng",
    icon: <ViewCarouselOutlined />,
    link: "/orders",
  },
];

const Container = styled.div`
  flex: 1;
  height: calc(100vh - 70px);
  background-color: rgb(251, 251, 255);
  position: sticky;
  top: 50px;
`;

const Wrapper = styled.div`
  padding: 20px;
  color: #555;
`;

const Menu = styled.div`
  margin-bottom: 10px;
`;

const List = styled.ul`
  list-style: none;
  padding: 5px;
`;

const ListItem = styled.li`
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin: 4px 0;
  gap: 4px;

  ${(props) =>
    props.$active &&
    css`
      background-color: rgb(240, 240, 255);
    `}

  &:hover {
    background-color: rgb(240, 240, 255);
  }
`;

export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <Container>
      <Wrapper>
        <Menu>
          <List>
            {menu.map((item, index) => (
              <Link key={index} to={item.link}>
                <ListItem
                  $active={item.link.split("/")[1] === pathname.split("/")[1]}
                >
                  {item.icon}
                  {item.name}
                </ListItem>
              </Link>
            ))}
            {/* <Link to="/">
              <ListItem $active>
                <HomeOutlined />
                Dashboard
              </ListItem>
            </Link>
            <Link to="/users">
              <ListItem>
                <PermIdentity />
                Người dùng
              </ListItem>
            </Link>
            <Link to="/products">
              <ListItem>
                <Storefront />
                Sản phẩm
              </ListItem>
            </Link>

            <ListItem>
              <DynamicFeed />
              Danh mục sản phẩm
            </ListItem>
            <ListItem>
              <ViewCarouselOutlined />
              Đơn hàng
            </ListItem> */}
          </List>
        </Menu>
      </Wrapper>
    </Container>
  );
}
