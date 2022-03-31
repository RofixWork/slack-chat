import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { toggleModal } from "../app/slices/GeneralSlice";
import IconButton from "@mui/material/IconButton";
import { VscChromeClose } from "react-icons/vsc";
const StyledModal = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;

  &.active {
    opacity: 1;
    visibility: visible;
  }
`;

const ImagePreview = styled.img`
  width: auto;
  height: 400px;
  border-radius: 20px;
  object-fit: cover;
  object-position: center;
`;

const ModalTools = styled.div`
  position: absolute;
  top: 15px;
  right: 20px;
  display: flex;
  gap: 5px;
  align-items: center;
`;

const Modal = () => {
  const dispatch = useDispatch();
  const { modal, image } = useSelector((state) => state.general);

  return (
    <StyledModal
      onClick={() => dispatch(toggleModal())}
      className={`${modal ? "active" : null}`}
    >
      <ImagePreview
        onClick={(e) => e.stopPropagation()}
        src={image}
        alt="image preview"
      />
      <ModalTools>
        <IconButton size="medium">
          <VscChromeClose color="white" />
        </IconButton>
      </ModalTools>
    </StyledModal>
  );
};

export default Modal;
