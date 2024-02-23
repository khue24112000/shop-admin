import styled from "styled-components";
import FeaturedInfo from "../components/FeaturedInfo";
import Chart from "../components/Chart";
import Button from "../components/Button";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../utils/requestMethod";

const Container = styled.div`
  flex: 4;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px;
`;

// const MONTH = [
//   "Tháng 1",
//   "Tháng 2",
//   "Tháng 3",
//   "Tháng 4",
//   "Tháng 5",
//   "Tháng 6",
//   "Tháng 7",
//   "Tháng 8",
//   "Tháng 9",
//   "Tháng 10",
//   "Tháng 11",
//   "Tháng 12",
// ];

const StatList = [
  {
    stat: "user",
    name: "Thống kê người dùng",
  },
  {
    stat: "revenue",
    name: "Thống kê doanh thu",
  },
  // {
  //   stat: "product",
  //   name: "Thống kê sản phẩm",
  // },
];
function Home() {
  const [stats, setStats] = useState("user");
  const [userStats, setUserStats] = useState([]);
  const [revenueStats, setRevenueStats] = useState([]);
  const [productStats, setProductStats] = useState([]);

  const MONTH = useMemo(
    () => [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    []
  );

  useEffect(() => {
    const getUserStats = async () => {
      const request = userRequest();
      try {
        const res = await request.get("/user/stats");
        setUserStats(
          res.data
            .sort((a, b) => a._id - b._id)
            .map((d) => {
              return { name: MONTH[d._id - 1], "Số người đăng ký": d.total };
            })
        );
      } catch (err) {
        console.log(err);
      }
    };

    const getRevenueStats = async () => {
      const request = userRequest();
      try {
        const res = await request.get("/order/revenue");
        setRevenueStats(
          res.data
            .sort((a, b) => a._id - b._id)
            .map((d) => {
              return {
                name: MONTH[d._id - 1],
                "Doanh thu": d.tong,
              };
            })
        );
      } catch (err) {
        console.log(err);
      }
    };

    const getProductStats = async () => {
      const request = userRequest();
      try {
        const res = await request.get("/user/stats");
        setUserStats(
          res.data
            .sort((a, b) => a._id - b._id)
            .map((d) => {
              return { name: MONTH[d._id - 1], "Số người đăng ký": d.total };
            })
        );
      } catch (err) {
        console.log(err);
      }
    };

    if (stats === "user") {
      getUserStats();
    } else if (stats === "revenue") {
      getRevenueStats();
    } else getProductStats();
  }, [MONTH, stats]);

  // useEffect(() => {
  //   const getUserStats = async () => {
  //     const request = userRequest();
  //     try {
  //       const res = await request.get("/user/stats");
  //       setUserStats((prev) => {
  //         res.data.forEach((d) => {
  //           // console.log((prev[d._id - 1]["Số lượng người dùng"] = d.total));
  //           prev[d._id - 1]["Số người đăng ký"] = d.total;
  //           // console.log(prev);
  //         });
  //         // console.log(prev);
  //         return prev;
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getUserStats();
  // }, []);
  // const getRevenueStats = async () => {
  //   const request = userRequest();
  //   try {
  //     const res = await request.get("/order/stats");
  //     console.log(
  //       res.data
  //         .sort((a, b) => a._id - b._id)
  //         .map((item) =>
  //           setUserStats((prev) => [
  //             ...prev,
  //             { name: MONTH[item._id - 1], "Số người đăng ký": item.total },
  //           ])
  //         )
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  //   if(stats === "user")

  //   if(stats === "revenue")
  //   if(stats === "product")
  // })
  // const [value, setValue] = useState();
  // const [images, setImages] = useState([]);
  // // console.log(value);
  // function handleChange(e) {
  //   console.log(e.target.files);
  //   setImages(
  //     e.target.files.length
  //       ? Object.values(e.target.files).map((file) => URL.createObjectURL(file))
  //       : []
  //   );

  //   // localStorage.setItem("src", JSON.stringify(src));
  // }

  return (
    // <>
    //   <input onChange={handleChange} type="file" accept="image/*" multiple />
    //   <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
    //     {images.map((image, index) => (
    //       <img
    //         style={{ width: "200px", height: "200px", objectFit: "cover" }}
    //         key={index}
    //         src={image}
    //       />
    //     ))}
    //   </div>
    // </>

    <Container>
      <FeaturedInfo />
      <Row>
        {StatList.map((item) => (
          <Button
            onClick={() => setStats(item.stat)}
            $disable={stats !== item.stat}
            key={item.stat}
          >
            {item.name}
          </Button>
        ))}
        {/* <Button $disable={stats !== "user"}>Thống kê người dùng</Button>
        <Button $disable={stats !== "revenue"}>Thống kê doanh thu</Button>
        <Button $disable={stats !== "product"}>Thống kê sản phẩm</Button> */}
      </Row>
      <Chart
        data={
          stats === "user"
            ? userStats
            : stats === "revenue"
            ? revenueStats
            : productStats
        }
        title={
          stats === "user"
            ? "Thống kê người dùng"
            : stats === "revenue"
            ? "Thống kê doanh thu"
            : "Thống kê sản phẩm"
        }
        grid
        dataKey={
          stats === "user"
            ? "Số người đăng ký"
            : stats === "revenue"
            ? "Doanh thu"
            : "Số lượng"
        }
      />
    </Container>
  );
}

export default Home;
