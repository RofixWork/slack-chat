import { useState, useEffect } from "react";
import styled from "styled-components";
import ChatFooter from "../components/ChatFooter";
import ChatHeader from "../components/ChatHeader";
import Messages from "../components/Messages";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import FlipMove from "react-flip-move";
import {
  doc,
  onSnapshot,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import { css } from "@emotion/css";
import ScrollToBottom from "react-scroll-to-bottom";
const ChatWrapped = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

const messagesStyled = css({
  flex: 1,
  padding: "15px 10px",
  overflowY: "auto",
});

const Home = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "rooms", id), (snapshot) => {
      setRoom(snapshot.data());
    });

    return unsub;
  }, [id]);
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs
          .map((message) => {
            return {
              id: message.id,
              ...message.data(),
            };
          })
          .filter((message) => message.roomId === id)
      );
    });

    return unsub;
  }, [id]);

  return (
    <ChatWrapped>
      <ChatHeader roomName={room?.name} />
      <ScrollToBottom className={messagesStyled} initialScrollBehavior="smooth">
        {messages.length ? (
          <FlipMove>
            {messages.map((msg) => {
              return <Messages key={msg.id} {...msg} />;
            })}
          </FlipMove>
        ) : null}
      </ScrollToBottom>
      {/* messages */}
      <ChatFooter roomId={id} />
    </ChatWrapped>
  );
};

export default Home;
