import styled from "styled-components";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
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

const ChatFooter = ({ roomId }) => {
  const [msg, setMessage] = useState("");
  const { user } = useSelector((state) => state.general);
  const sendMessage = async (e) => {
    e.preventDefault();
    if (msg.trim()) {
      try {
        await addDoc(collection(db, "messages"), {
          message: msg,
          roomId,
          picture: user.photoURL,
          user: user.displayName,
          timestamp: serverTimestamp(),
        });
      } catch (err) {
        console.log(err);
      }
      setMessage("");
    }
  };
  return (
    <FooterChat>
      <Form onSubmit={sendMessage}>
        <Input value={msg} onChange={(e) => setMessage(e.target.value)} />
      </Form>
    </FooterChat>
  );
};

export default ChatFooter;
