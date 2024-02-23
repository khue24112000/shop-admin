import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  YAxis,
  Bar,
} from "recharts";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  height: 365px;
  margin: 20px;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);

  & .recharts-surface {
    min-width: 300px;
  }
`;
const Title = styled.h3`
  margin-bottom: 20px;
`;

export default function Chart({ title, data, dataKey }) {
  return (
    <Container>
      <Title>{title}</Title>
      <ResponsiveContainer
        minWidth="20%"
        width={`${data.length * 8.33}%`}
        height="100%"
      >
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#1976d2" />
          {/* <Line type="monotone" dataKey={dataKey} stroke="#5550bd" /> */}
          {/* {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />} */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
}

Chart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  dataKey: PropTypes.string,
  grid: PropTypes.bool,
};
