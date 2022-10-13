import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { createContext, useMemo, useState } from "react";
import { getDesignTokens } from "../theme/theme";

export const ColorModeContext = createContext<{ toggleColorMode: () => void }>({
  toggleColorMode: () => {},
});

export const ColorModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
