import { forwardRef } from "react";
import { Avatar, Typography, Stack, Chip, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
const Message = styled.article`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin: 0 0 20px 0;
  padding-left: 10px;
  padding-right: 10px;
`;

const MessageMe = styled(Message)`
  justify-content: flex-end;
  padding-left: 10px;
  padding-right: 10px;
`;

const Image = styled.img`
  width: fit-content;
  height: 250px;
  object-fit: cover;
  object-position: center;
  border-radius: 20px;
  outline: 1px solid whitesmoke;
  outline-offset: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const Messages = forwardRef(
  ({ id, message, username, picture, timestamp, user, image }, ref) => {
    const { user: currUser } = useSelector((state) => state.general);

    const removeMessage = async (id) => {
      try {
        await deleteDoc(doc(db, "messages", id));
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <>
        {currUser.uid === user ? (
          <>
            <MessageMe ref={ref}>
              <div className="info">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  gap="5px"
                >
                  <IconButton
                    onClick={() => removeMessage(id)}
                    size="small"
                    sx={{
                      fontSize: "14px !important",
                      marginBottom: "2px",
                    }}
                  >
                    <FaTrash />
                  </IconButton>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {username}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#8a8d91", fontWeight: 700 }}
                  >
                    {timestamp?.toDate().toLocaleString()}
                  </Typography>
                </Stack>

                <div>
                  {image && <Image src={image} alt="image" />}

                  {message && (
                    <Stack direction="row" justifyContent="flex-end">
                      <Chip
                        label={message}
                        sx={{
                          fontSize: "1rem",
                          fontWeight: 500,
                          bgcolor: "#e4e6eb",
                          color: "#111",
                        }}
                      />
                    </Stack>
                  )}
                </div>
              </div>
              <Avatar src={picture} alt={username} />
            </MessageMe>
          </>
        ) : (
          <>
            <Message ref={ref}>
              <Avatar src={picture} alt={username} />
              <div className="info">
                <Stack direction="row" alignItems="center" gap="5px">
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {username}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#8a8d91", fontWeight: 700 }}
                  >
                    {timestamp?.toDate().toLocaleString()}
                  </Typography>
                </Stack>
                {image && <Image src={image} alt="image" />}
                {message && (
                  <Stack direction="row" justifyContent="flex-start">
                    <Chip
                      label={message}
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 500,
                        color: "#e4e6eb",
                        bgcolor: "#1565c0",
                      }}
                    />
                  </Stack>
                )}
              </div>
            </Message>
          </>
        )}
      </>
    );
  }
);

export default Messages;
