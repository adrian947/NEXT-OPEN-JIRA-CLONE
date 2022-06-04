import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

export const themeDark = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#9254C8",
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },
  },
});

export const themeLight = createTheme({
  palette: {
    mode: "light",
    background: {
      default: grey[300],
    },
    primary: {
      main: "#4a148c",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },

  components: {
    MuiAppBar: {
      styleOverrides: {},
      defaultProps: {
        elevation: 0,
      },
    },
  },
});
