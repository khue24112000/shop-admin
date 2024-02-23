import {
  getDistricts,
  getProvinces,
  getWards,
} from "../utils/vietnameProvinces";

import styled from "styled-components";

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid var(--color-grey-300);
  &:focus {
    border-color: ${(props) => (props.$error ? "red" : "var(--primary-color)")};
  }
  ${(props) => (props.$error ? "border-color: red" : "")}
`;

export function SelectDistrict({
  // eslint-disable-next-line react/prop-types
  value = "",
  // eslint-disable-next-line react/prop-types
  handleChange = function () {},
  // eslint-disable-next-line react/prop-types
  errors = [],
  // eslint-disable-next-line react/prop-types
  province = "",
}) {
  return (
    <Select
      value={value}
      onChange={handleChange}
      $error={errors.findIndex((err) => err.name === "district") !== -1}
    >
      <option disabled value="">
        Chọn quận/huyện
      </option>
      {getDistricts(province)
        ?.sort((a, b) => a.localeCompare(b))
        ?.map((d) => (
          <option key={d}>{d}</option>
        ))}
    </Select>
  );
}

export function SelectProvince({
  // eslint-disable-next-line react/prop-types
  value = "",
  // eslint-disable-next-line react/prop-types
  handleChange = function () {},
  // eslint-disable-next-line react/prop-types
}) {
  return (
    <Select value={value} onChange={handleChange}>
      {getProvinces()
        ?.sort((a, b) => a.localeCompare(b))
        ?.reduce(
          (arr, p) => (arr.includes(p) ? arr : [...arr, p]),
          ["Hà Nội", "Thành phố Hồ Chí Minh"]
        )
        ?.map((p) => (
          <option key={p}>{p}</option>
        ))}
    </Select>
  );
}

export function SelectWards({
  // eslint-disable-next-line react/prop-types
  value = "",
  // eslint-disable-next-line react/prop-types
  handleChange = function () {},
  // eslint-disable-next-line react/prop-types
  province = "",
  // eslint-disable-next-line react/prop-types
  district = "",
}) {
  return (
    <Select disabled={district === ""} value={value} onChange={handleChange}>
      <option disabled value="">
        Chọn phường/xã
      </option>
      {getWards(province, district)
        ?.sort((a, b) => a.localeCompare(b))
        ?.map((w) => (
          <option key={w}>{w}</option>
        ))}
    </Select>
  );
}
