import React, { useContext } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { UIContext } from "../../context/ui";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();

  const { openSideMenu } = useContext(UIContext);

  const handleClick = () => {
    router.push("/");
  };

  return (
    <AppBar position='sticky' elevation={0}>
      <Toolbar>
        {/* <IconButton size='large' onClick={() => openSideMenu()}>
          <MenuOutlinedIcon />
        </IconButton> */}
        <Typography
          fontSize={20}
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          Jira-Clone
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
