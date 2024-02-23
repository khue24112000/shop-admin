import styled from "styled-components";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { closeToast } from "../redux/toastSlice";

const Text = styled.span`
  background-color: ${(props) =>
    props.$type === "error" ? "red" : "var(--primary-color)"};
  color: white;
  display: block;
  border-radius: 10px;
  border: 1px solid var(--grey-color-300);
  font-weight: 500;
  padding: 14px;
  font-size: 1.8rem;
  min-width: 300px;
  box-shadow: var(--shadow-md);
`;

function Toast() {
  const { toast, toastType, toastMessage } = useSelector(
    (state) => state.toast
  );
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(closeToast());
  }
  if (toast === true) {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open
        onClose={handleClose}
        autoHideDuration={2000}
        key={"top" + "right"}
      >
        <Text $type={toastType}>{toastMessage}</Text>
      </Snackbar>
    );
  }
}

export default Toast;
