function validateCart(
  name = "",
  phoneNumber = "",
  address = "",
  district = ""
) {
  let errors = [];

  if (name?.length === 0) {
    errors = [...errors, "name"];
  }

  if (phoneNumber?.length === 0 || phoneNumber?.length !== 10) {
    errors = [...errors, "phoneNumber"];
  }

  if (address?.length === 0) {
    errors = [...errors, "address"];
  }

  if (district?.length === 0) {
    errors = [...errors, "district"];
  }
  return errors;
}

function validateRegister(props) {
  // we are going to store errors for all fields
  // in a signle array
  const {
    fullName,
    username,
    password,
    email,
    phoneNumber,
    district,
    address,
    passwordConfirm,
  } = props;
  const errors = [];
  // console.log(props);

  // fullName
  if (fullName?.length === 0) {
    errors.push({
      name: "fullName",
      error: "Vui lòng nhập tên đầy đủ",
    });
  }

  // username
  if (username?.length === 0) {
    errors.push({ name: "username", error: "Vui lòng nhập tên đăng nhập" });
  }

  // phoneNumber

  if (phoneNumber?.length !== 10 || isNaN(Number(phoneNumber))) {
    errors.push({ name: "phoneNumber", error: "Số điện thoại không hợp lệ" });
  }

  if (phoneNumber?.length === 0) {
    errors.push({
      name: "phoneNumber",
      error: "Vui lòng nhập số điện thoại",
    });
  }

  // password
  if (password !== undefined && password?.length < 6) {
    errors.push({ name: "password", error: "Mật khẩu tối thiểu cần 6 kí tự" });
  }

  if (password !== undefined && passwordConfirm !== password) {
    errors.push({ name: "passwordConfirm", error: "Mật khẩu không khớp" });
  }

  // email
  if (email?.split("")?.filter((x) => x === "@")?.length !== 1) {
    errors.push({ name: "email", error: "Email phải bao gồm kí tự '@'" });
  }
  if (email?.indexOf(".") === -1) {
    errors.push({ name: "email", error: "Email phải bao gồm kí tự '.'" });
  }

  if (email?.length < 5) {
    errors.push({ name: "email", error: "Email tối thiểu cần 5 kí tự" });
  }

  //address
  if (address?.length === 0) {
    errors.push({ name: "address", error: "Vui lòng nhập địa chỉ " });
  }

  if (district?.length === 0) {
    errors.push({ name: "district", error: "Vui lòng chọn quận/huyện" });
  }
  // return props;
  return errors.reduce((arr, err) => {
    if (arr.findIndex((a) => a.name === err.name) !== -1) {
      arr.at(arr.findIndex((a) => a.name === err.name)).error = err.error;
      return arr;
    } else {
      return [...arr, err];
    }
  }, []);
}

function TextRong(text = "", name) {
  const errors = [];
  if (text.length === 0)
    errors.push({ name, error: "Thông tin không được để trống" });
  return errors;
}

function validateProduct(props) {
  // we are going to store errors for all fields
  // in a signle array
  const { name, categories, size, amount, price, colors, desc } = props;
  const errors = [];
  // console.log(props);

  // fullName
  if (name.length === 0) {
    errors.push({
      name: "name",
      error: "Vui lòng tên sản phẩm",
    });
  }

  // username
  if (categories?.length === 0) {
    errors.push({ name: "categories", error: "Vui lòng chọn loại sản phẩm" });
  }

  // phoneNumber

  if (size?.length === 0) {
    errors.push({ name: "size", error: "Vui lòng chọn kích cỡ sản phẩm" });
  }

  if (isNaN(Number(price))) {
    errors.push({
      name: "price",
      error: "Giá sản phẩm phải là số",
    });
  }

  if (price?.length === 0) {
    errors.push({
      name: "price",
      error: "Vui lòng nhập giá sản phẩm",
    });
  }

  if (isNaN(Number(amount))) {
    errors.push({
      name: "amount",
      error: "Số lượng sản phẩm phải là số",
    });
  }

  if (amount?.length === 0) {
    errors.push({
      name: "amount",
      error: "Vui lòng nhập số lượng sản phẩm",
    });
  }

  if (colors?.length === 0) {
    errors.push({ name: "colors", error: "Vui lòng chọn màu sản phẩm" });
  }

  if (desc?.length === 0) {
    errors.push({ name: "desc", error: "Mô tả sản phẩm không được để trống" });
  }

  return errors.reduce((arr, err) => {
    if (arr.findIndex((a) => a.name === err.name) !== -1) {
      arr.at(arr.findIndex((a) => a.name === err.name)).error = err.error;
      return arr;
    } else {
      return [...arr, err];
    }
  }, []);
}

const validateOrder = (props) => {
  const { fullName, phoneNumber, status, address } = props;
  const errors = [];
  if (fullName?.length === 0) {
    errors.push({
      name: "fullName",
      error: "Vui lòng nhập tên người nhận",
    });
  }

  if (phoneNumber?.length !== 10 || isNaN(Number(phoneNumber))) {
    errors.push({ name: "phoneNumber", error: "Số điện thoại không hợp lệ" });
  }

  if (phoneNumber?.length === 0) {
    errors.push({
      name: "phoneNumber",
      error: "Vui lòng nhập số điện thoại",
    });
  }

  if (status?.length === 0) {
    errors.push({
      name: "status",
      error: "Vui lòng chọn trạng thái đơn hàng",
    });
  }

  if (address?.length === 0) {
    errors.push({ name: "address", error: "Vui lòng nhập địa chỉ " });
  }

  return errors.reduce((arr, err) => {
    if (arr.findIndex((a) => a.name === err.name) !== -1) {
      arr.at(arr.findIndex((a) => a.name === err.name)).error = err.error;
      return arr;
    } else {
      return [...arr, err];
    }
  }, []);
};

export {
  validateCart,
  validateRegister,
  TextRong,
  validateProduct,
  validateOrder,
};
