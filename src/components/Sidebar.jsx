import styled from "styled-components";
import { useEffect, useState } from "react";
import { Avatar, Stack, Typography, IconButton } from "@mui/material";
import { MdKeyboardArrowDown, MdAdd } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import MenuItem from "./MenuItem";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  collection,
  orderBy,
  onSnapshot,
  query,
  deleteDoc,
  updateDoc,
  where,
  doc,
  getDocs,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const SidebarStyled = styled.aside`
  width: 300px;
  background-color: #111;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.4s ease-in-out;

  &.active {
    margin-left: -300px;
  }
`;

const Room = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`;

const Sidebar = () => {
  const { toggle, user } = useSelector((state) => state.general);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  // edit
  const editChannel = async (id) => {
    const newName = prompt("Enter the new name of the channel");

    if (newName?.trim()) {
      try {
        await updateDoc(doc(db, "rooms", id), {
          name: newName,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // delete room in firebase
  const deleteChannel = async (id) => {
    const areYouSure = window.confirm("Are you sure?");
    if (areYouSure) {
      try {
        const q = query(collection(db, "messages"), where("roomId", "==", id));

        await deleteDoc(doc(db, "rooms", id));
        const messages = await getDocs(q);

        messages.forEach(async (message) => {
          await deleteDoc(doc(db, "messages", message.id));
        });

        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const q = query(collection(db, "rooms"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setRooms(
        snapshot.docs.map((room) => {
          return {
            id: room.id,
            ...room.data(),
          };
        })
      );
    });
  }, []);

  return (
    <SidebarStyled className={`${toggle ? "active" : null}`}>
      <Stack flex="1" sx={{ overflowY: "auto" }}>
        <MenuItem
          header
          title="channels"
          icon={<MdKeyboardArrowDown color="white" fontSize="25" />}
        />
        <MenuItem
          header
          title="add channel"
          add
          icon={<MdAdd color="white" fontSize="25" />}
        />
        {/* rooms */}
        {rooms.length ? (
          <>
            {rooms.map((room) => {
              return (
                <Room key={room.id}>
                  <Link
                    to={`/rooms/${room?.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <MenuItem title={room?.name} />
                  </Link>
                  {room.roomOwner === user.uid ? (
                    <>
                      <Stack direction="row" gap="5px">
                        <IconButton
                          size="small"
                          onClick={() => editChannel(room?.id)}
                        >
                          <AiFillEdit color="white" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => deleteChannel(room?.id)}
                        >
                          <BsTrashFill color="white" />
                        </IconButton>
                      </Stack>
                    </>
                  ) : null}
                </Room>
              );
            })}
          </>
        ) : null}

        {/* rooms */}
      </Stack>
      {/* user */}
      <Stack
        direction="row"
        alignItems="center"
        gap="10px"
        py="4px"
        px="10px"
        borderTop="1px solid #3d3c3c"
      >
        <Avatar
          src={user?.photoURL}
          alt={user?.displayName}
          sx={{ width: 35, height: 35 }}
        ></Avatar>
        <div>
          <Typography variant="body1">{user?.email}</Typography>
          <Typography variant="body2">{user?.displayName}</Typography>
        </div>
      </Stack>
    </SidebarStyled>
  );
};

export default Sidebar;
