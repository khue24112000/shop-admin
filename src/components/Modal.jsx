import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Upload } from "@mui/icons-material";
import Title from "../components/Title";
import Button from "./Button";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import app from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { errorToast, successToast } from "../redux/toastSlice";
import { endLoading, startLoading } from "../redux/productSlice";
import Spinner from "./Spinner";

const Container = styled.div`
  position: relative;
  background-color: white;
  width: 40vw;
  height: fit-content;
  top: 50%;
  left: 50%;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  padding: 20px;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  gap: 15px;
`;

const UserItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-right: 20px;
`;

const ItemLabel = styled.label`
  font-size: 1.6rem;
  font-weight: 600;
`;

const ItemInput = styled.input`
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 1.4rem;
  &:focus {
    border-color: ${(props) => (props.$error ? "red" : "var(--primary-color)")};
  }
  ${(props) => (props.$error ? "border-color: red" : "")}
`;

const UploadButton = styled.button`
  position: relative;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 10px;
  border: none;
  background-color: white;
  cursor: pointer;
`;

const InputImg = styled.input`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
`;

const ImgPreview = styled.div`
  position: relative;
`;

const ColorPreview = styled.img`
  padding: 10px;
  width: 70px;
  height: 70px;
  object-fit: cover;
`;

const ProductPreview = styled.img`
  padding: 10px;
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

const DeleteImageButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 2rem;
  line-height: 0.5;
  cursor: pointer;
`;

const Close = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  line-height: 1;
  padding: 4px 8px 0 0;
  font-size: 3rem;
  cursor: pointer;
`;

export default function BasicModal({
  // eslint-disable-next-line react/prop-types
  open,
  // eslint-disable-next-line react/prop-types
  setOpen,
  // eslint-disable-next-line react/prop-types
  handleChangeColors,
  // eslint-disable-next-line react/prop-types
  colors,
}) {
  const [colorName, setColorName] = useState("");

  const [colorImgFiles, setColorImgFiles] = useState("");
  const [productImgFiles, setProductImgFiles] = useState("");
  const [urls, setUrls] = useState([]);
  const [canUpdate, setCanUpdate] = useState(false);
  const [order, setOrder] = useState(true);
  const { isLoading } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  // console.log(colorImgFiles);
  // console.log(productImgFiles);

  // console.log(count.current++);
  function handleChangeColorName(e) {
    if (e.target.value) setColorName(e.target.value);
    else setColorName("");
  }
  function handleChangeColorImg(e) {
    if (e.target.files[0]) setColorImgFiles(e.target.files[0]);
  }
  function handleChangeProductImg(e) {
    if (e.target.files[0]) setProductImgFiles(e.target.files[0]);
  }

  // console.log("render");

  const handleClose = () => {
    setOpen(false);
  };

  function handleDeleteColorPreview() {
    setColorImgFiles("");
  }
  function handleDeleteProductPreview() {
    setProductImgFiles("");
  }

  function handleClick(e) {
    e.preventDefault();
    if (colorName === "") dispatch(errorToast("Vui lòng điền tên màu"));
    // eslint-disable-next-line react/prop-types
    else if (colors.map((c) => c.colorName).includes(colorName)) {
      dispatch(errorToast("Tên màu đã tồn tại"));
    } else {
      dispatch(startLoading());
      const storage = getStorage(app);
      const promises = [];
      [colorImgFiles, productImgFiles].map((item) => {
        const storageRef = ref(storage, new Date().getTime() + item.name);
        const uploadTask = uploadBytesResumable(storageRef, item);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          async () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                setUrls((prev) => {
                  // console.log(prev);
                  return [...prev, downloadURL];
                });
              }
            );
          }
        );
      });
      Promise.all(promises)
        .then(() => {
          setCanUpdate(true);
        })
        .catch((err) => console.log(err));
    }
    if (!(colorImgFiles && productImgFiles))
      dispatch(errorToast("Vui lòng chọn màu"));
  }

  useEffect(() => {
    if (canUpdate === true && urls.length === 2) {
      console.log(order);
      if (order) {
        handleChangeColors({
          colorName,
          colorImg: urls[0],
          productImg: urls[1],
        });
      } else {
        handleChangeColors({
          colorName,
          colorImg: urls[1],
          productImg: urls[0],
        });
      }
      dispatch(endLoading());
      dispatch(successToast("Thêm màu thành công"));
      handleClose();
    }
  }, [canUpdate, colorName, urls]);

  useEffect(() => {
    if (colorImgFiles && productImgFiles) {
      if (colorImgFiles.size > productImgFiles.size) {
        setOrder(false);
      } else {
        setOrder(true);
      }
    }
  }, [colorImgFiles, productImgFiles]);

  return (
    <>
      <Modal open={open}>
        {isLoading ? (
          <Spinner />
        ) : (
          <Container>
            <ModalContainer>
              <Row>
                <Title title="Màu sản phẩm" />
              </Row>
              <Row>
                <UserItem>
                  <ItemLabel>Tên màu</ItemLabel>
                  <ItemInput
                    onChange={handleChangeColorName}
                    name="colorName"
                    value={colorName}
                    type="text"
                    placeholder="Tên màu"
                  />
                </UserItem>
              </Row>
              <Row>
                <UserItem>
                  <Row>
                    <ItemLabel>Hình ảnh màu</ItemLabel>
                    {!colorImgFiles && (
                      <UploadButton>
                        Chọn ảnh
                        <Upload />
                        <InputImg
                          name="colorImg"
                          onChange={handleChangeColorImg}
                          type="file"
                          accept="image/*"
                        />
                      </UploadButton>
                    )}
                  </Row>
                  <Row>
                    {colorImgFiles && (
                      <ImgPreview>
                        <ColorPreview
                          src={URL.createObjectURL(colorImgFiles)}
                        />
                        <DeleteImageButton onClick={handleDeleteColorPreview}>
                          &times;
                        </DeleteImageButton>
                      </ImgPreview>
                    )}
                  </Row>
                </UserItem>
              </Row>
              <Row>
                <UserItem>
                  <Row>
                    <ItemLabel>Hình ảnh sản phẩm tương ứng</ItemLabel>
                    {!productImgFiles && (
                      <UploadButton>
                        Chọn ảnh
                        <Upload />
                        <InputImg
                          type="file"
                          accept="image/*"
                          name="productImg"
                          onChange={handleChangeProductImg}
                        />
                      </UploadButton>
                    )}
                  </Row>
                  <Row>
                    {productImgFiles && (
                      <ImgPreview>
                        <ProductPreview
                          src={URL.createObjectURL(productImgFiles)}
                        />
                        <DeleteImageButton onClick={handleDeleteProductPreview}>
                          &times;
                        </DeleteImageButton>
                      </ImgPreview>
                    )}
                  </Row>
                </UserItem>
              </Row>
              <Row>
                <Button onClick={handleClick} width="100%" mt="40px">
                  Thêm màu
                </Button>
              </Row>
            </ModalContainer>
            <Close onClick={handleClose}>&times;</Close>
          </Container>
        )}
      </Modal>
    </>
  );
}
