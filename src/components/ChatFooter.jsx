import styled from "styled-components";
import { db, storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BsEmojiSunglasses } from "react-icons/bs";
import { GrLike } from "react-icons/gr";
import IconButton from "@mui/material/IconButton";
import { BsImage } from "react-icons/bs";
import { FaTimesCircle } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Picker from "emoji-picker-react";
const FooterChat = styled.footer`
  height: 53.02px;
  border-top: 1px solid whitesmoke;
  display: flex;
  align-items: center;
  padding: 0 14px;
`;

const Form = styled.form`
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Input = styled.input.attrs({
  type: "text",
  placeholder: "Type Your message here",
})`
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px 14px;
  border-radius: 5px;

  &:focus {
    outline: none;
  }
`;

const ImageArea = styled.div`
  border-top: 1px solid whitesmoke;
  padding: 10px 14px;
  position: relative;
`;
const Image = styled.img`
  width: fit-content;
  height: 130px;
  object-fit: cover;
  object-position: center;
  border-radius: 20px;
  outline: 1px solid whitesmoke;
  outline-offset: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const ChatFooter = ({ roomId }) => {
  const [msg, setMessage] = useState("");
  const [currImage, setCurrImage] = useState(null);
  const [currFile, setCurrFile] = useState(null);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.general);
  const sendMessage = async (e) => {
    e.preventDefault();
    if (msg.trim()) {
      try {
        await addDoc(collection(db, "messages"), {
          message: msg,
          roomId,
          picture: user.photoURL,
          username: user.displayName,
          user: user.uid,
          timestamp: serverTimestamp(),
        });
      } catch (err) {
        console.log(err);
      }
      setMessage("");
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    let emoji = msg + emojiObject.emoji;

    setMessage(emoji);
  };
  // send like
  const sendLike = async () => {
    try {
      await addDoc(collection(db, "messages"), {
        message: "👍",
        username: user.displayName,
        picture: user.photoURL,
        timestamp: serverTimestamp(),
        user: user.uid,
        roomId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // remove all content field
  const emptyField = (e) => {
    if (e.key === "Escape") {
      setMessage("");
    }
    if (e.key === "Escape" && msg) {
      setOpen(false);
    }
    if (e.key === "Escape" && !msg) {
      setOpen(false);
    }
  };

  // upload image
  const chooseImage = (e) => {
    const file = e.target.files[0];

    if (!file) return false;

    const imageType = file.type.split("/")[1];
    const types = ["png", "jpg", "jpeg"];

    if (!types.includes(imageType)) {
      alert(`Format ${imageType} not supported`);
      return;
    }

    // create url  image
    const myImage = URL.createObjectURL(file);
    setCurrImage(myImage);
    setCurrFile(file);
  };

  const uploadImage = () => {
    if (!currFile) return false;

    const storageRef = ref(storage, `images/${uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, currFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          await addDoc(collection(db, "messages"), {
            message: msg,
            image: url,
            picture: user.photoURL,
            username: user.displayName,
            user: user.uid,
            timestamp: serverTimestamp(),
            roomId,
          });
        });

        setCurrImage(null);
        setMessage("");
      }
    );
  };

  return (
    <>
      {open && <Picker onEmojiClick={onEmojiClick} />}
      {/* area image */}
      {currImage && (
        <ImageArea>
          <Image src={currImage} alt="image upload" />

          <IconButton
            size="medium"
            sx={{ position: "absolute !important", top: "5px", right: "40px" }}
            onClick={uploadImage}
          >
            <AiOutlineSend />
          </IconButton>
          <IconButton
            size="small"
            sx={{ position: "absolute !important", top: "10px", right: "10px" }}
            onClick={() => setCurrImage(null)}
          >
            <FaTimesCircle />
          </IconButton>
        </ImageArea>
      )}
      {/* area image */}

      <FooterChat>
        <Form onSubmit={sendMessage}>
          <IconButton size="small" component="label" htmlFor="file">
            <BsImage />
          </IconButton>
          <input type="file" onChange={chooseImage} hidden id="file" />
          <IconButton size="small" onClick={() => setOpen(!open)}>
            <BsEmojiSunglasses />
          </IconButton>
          <Input
            value={msg}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => emptyField(e)}
          />
          <IconButton size="medium" onClick={sendLike}>
            <GrLike />
          </IconButton>
        </Form>
      </FooterChat>
    </>
  );
};

export default ChatFooter;
