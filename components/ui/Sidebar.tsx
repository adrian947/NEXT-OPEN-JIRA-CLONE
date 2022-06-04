import React, { useContext } from "react";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { UIContext } from "../../context/ui";

const menuItems: string[] = ["inbox", "draft", "others", "naranja"];

export const Sidebar = () => {
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer anchor={"left"} open={sideMenuOpen} onClose={() => closeSideMenu()}>
      <Box sx={{ width: 250 }}>
        <Typography fontSize={30} sx={{ padding: "0 15px" }}>
          Menu
        </Typography>
        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={text}>
              {index % 2 ? <InboxIcon /> : <EmailOutlinedIcon />}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={text}>
              {index % 2 ? <InboxIcon /> : <EmailOutlinedIcon />}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
