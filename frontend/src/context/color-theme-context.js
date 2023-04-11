import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createContext, useEffect, useMemo, useState } from "react";

const ColorModeContext = createContext({ toggleColorMode: () => {}});
export const ColorModeProvider = (props) => {
  const [mode, setMode] = useState(() => {
    return JSON.parse(localStorage.getItem("colorMode")) || "light";
  });

  useEffect(() => {
    localStorage.setItem("colorMode", JSON.stringify(mode));
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ColorModeContext;
