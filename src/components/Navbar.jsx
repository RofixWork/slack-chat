import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { sidebarToggle } from "../app/slices/GeneralSlice";
import { useSelector } from "react-redux";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
const AppBarStyled = styled(AppBar)`
  background-color: #111 !important;
  color: white;
`;

const Navbar = () => {
  const { user } = useSelector((state) => state.general);
  const dispatch = useDispatch();
  // menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // signOut function
  const logOut = async () => {
    try {
      await signOut(auth);
      window.location.pathname = "/";
    } catch (error) {
      console.log(error);
    }
  };

  // menu
  return (
    <AppBarStyled
      position="fixed"
      components="header"
      sx={{ boxShadow: "none !important" }}
    >
      <Toolbar
        sx={{ paddingLeft: "10px !important", paddingRight: "10px !important" }}
      >
        <IconButton size="medium" onClick={() => dispatch(sidebarToggle())}>
          <FiMenu color="#ffff" />
        </IconButton>
        <Typography variant="h6" flex="1">
          Rooms
        </Typography>

        <Avatar
          src={user?.photoURL}
          alt={user?.displayName}
          sx={{ width: 35, height: 35, cursor: "pointer" }}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        ></Avatar>
      </Toolbar>
      {/* menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
    </AppBarStyled>
  );
};

export default Navbar;
