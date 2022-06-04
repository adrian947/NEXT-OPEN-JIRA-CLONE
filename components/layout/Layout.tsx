import React, { FC, ReactChild } from "react";
import { Box } from "@mui/material";
import Head from "next/head";
import { Navbar } from "../ui/Navbar";
import { Sidebar } from "../ui/Sidebar";


interface Props {
  children: ReactChild;
  title?: string;
}

export const Layout: FC<Props> = ({ children, title = "Jira-Clone" }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      {/* <Sidebar /> */}
      
      <Box sx={{ padding: "10px" }}>{children}</Box>
    </Box>
  );
};
