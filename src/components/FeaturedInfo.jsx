import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { formatCurrency } from "../utils/helpers";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { userRequest } from "../utils/requestMethod";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Item = styled.div`
  flex: 1;
  margin: 0px 20px;
  padding: 30px;
  border-radius: 10px;
  cursor: pointer;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Title = styled.span`
  font-size: 2rem;
`;

const MoneyContainer = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
`;

const Money = styled.span`
  font-size: 3rem;
  font-weight: 600;
`;

const MoneyRate = styled.span`
  align-items: center;
  display: flex;
  margin-left: 20px;
`;

const Icon = styled.div`
  margin-left: 5px;
  color: ${(props) => (props.$negative ? "red" : "green")};
`;
const Sub = styled.span`
  font-size: 1.5rem;
  color: gray;
`;

export default function FeaturedInfo() {
  const [revenue, setRevenue] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const getRevenueStats = async () => {
      const request = userRequest();
      try {
        const res = await request.get("/order/revenue");
        const revenueData = res.data.sort((a, b) => a._id - b._id);
        console.log(revenueData);
        const doanhthu = revenueData.at(-1)?.tong - revenueData.at(-2)?.tong;
        setRevenue(revenueData.length > 1 ? doanhthu : revenueData[0]?.tong);
        setPercentage(
          revenueData.length > 1
            ? (doanhthu * 100) / revenueData.at(-2)?.tong
            : revenueData[0]?.tong
        );
        // setRevenue(r);
      } catch (err) {
        console.log(err);
      }
    };
    getRevenueStats();
  }, []);
  return (
    <Container>
      <Item>
        <Title>Doanh thu</Title>
        <MoneyContainer>
          <Money>{formatCurrency(revenue)}</Money>
          <MoneyRate>
            {percentage.toFixed(0)}%
            <Icon $negative={percentage < 0}>
              {percentage < 0 ? <ArrowDownward /> : <ArrowUpward />}
            </Icon>
          </MoneyRate>
        </MoneyContainer>
        <Sub>So với tháng trước</Sub>
      </Item>
    </Container>
  );
}
