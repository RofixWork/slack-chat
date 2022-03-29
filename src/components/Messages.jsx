import { forwardRef } from "react";
import { Avatar, Typography, Stack } from "@mui/material";
import styled from "styled-components";
const Message = styled.article`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 0 0 20px 0;
`;

const Messages = forwardRef(({ message, user, picture, timestamp }, ref) => {
  return (
    <Message ref={ref}>
      <Avatar src={picture} alt={user} />
      <div className="info">
        <Stack direction="row" alignItems="center" gap="5px">
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {user}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#353333", fontWeight: 700 }}
          >
            {timestamp?.toDate().toLocaleString()}
          </Typography>
        </Stack>
        <Typography
          variant="subtitle1"
          sx={{
            lineHeight: "0  !important",
            fontWeight: 500,
            marginTop: "8px",
          }}
        >
          {message}
        </Typography>
      </div>
    </Message>
  );
});

export default Messages;
