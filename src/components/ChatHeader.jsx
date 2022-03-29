import styled from "styled-components";
import Typography from "@mui/material/Typography";

const HeaderChat = styled.header`
  width: 100%;
  height: 39px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  border-bottom: 1px solid whitesmoke;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

const ChatHeader = ({ roomName }) => {
  return (
    <HeaderChat>
      <Typography
        variant="h6"
        sx={{ fontSize: "17px", textTransform: "capitalize" }}
      >
        {roomName}
      </Typography>
    </HeaderChat>
  );
};

export default ChatHeader;
