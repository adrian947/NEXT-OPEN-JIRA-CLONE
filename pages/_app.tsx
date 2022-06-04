import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeDark, themeLight } from "../themes/themes";
import { UIProvider } from "../context/ui/UIProvider";
import { EntriesProvider } from "../context/entries/EntriesProvider";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <UIProvider>
        <EntriesProvider>
          <ThemeProvider theme={themeDark}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </EntriesProvider>
      </UIProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
