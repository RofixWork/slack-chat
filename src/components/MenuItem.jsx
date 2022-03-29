import { Stack, Typography } from "@mui/material";
import { SiSharp } from "react-icons/si";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
const MenuItem = ({ title, icon, header, add }) => {
  const { user } = useSelector((state) => state.general);
  const addChannel = async () => {
    const name = prompt("Enter the name of the channel");
    if (name?.trim()) {
      await addDoc(collection(db, "rooms"), {
        name,
        roomOwner: user.uid,
        timestamp: serverTimestamp(),
      });
    }
  };
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap="5px"
      px="10px"
      py="5px"
      borderBottom={`${header ? "1px solid #3d3c3c" : null}`}
      onClick={add && addChannel}
    >
      {icon ? icon : <SiSharp fontSize={15} color="white" />}
      <Typography
        sx={{
          textTransform: "capitalize",
          cursor: "pointer",
          color: "white",
        }}
        variant="subtitle1"
      >
        {title}
      </Typography>
    </Stack>
  );
};

export default MenuItem;
