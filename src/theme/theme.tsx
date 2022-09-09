import { createTheme } from "@mui/material";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#ed2828",
    },
  },

  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
    fontSize: 16,
    fontWeightBold: 700,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    fontWeightLight: 300,
    h1: {
      fontWeight: 700,
      fontSize: 48,
      lineHeight: "66px",
    },
    h2: {
      fontWeight: 700,
      fontSize: 32,
      lineHeight: "44px",
    },
    h3: {
      fontWeight: 700,
      fontSize: 24,
      lineHeight: "33px",
    },
    h4: {
      fontWeight: 700,
      fontSize: 20,
      lineHeight: "27px",
    },
    h5: {
      fontWeight: 700,
      fontSize: 16,
      lineHeight: "22px",
    },
    h6: {
      fontWeight: 600,
      fontSize: 14,
      lineHeight: "19.12px",
    },
    body1: {
      fontWeight: 400,
      fontSize: "18px",
      lineHeight: "28px",
    },
    body2: {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "19px",
    },
    subtitle1: {
      fontFamily: "Noto Serif",
      fontWeight: 700,
      fontSize: "70px",
      lineHeight: "65px",
      color: "rgb(215,240,211,1)",
    },
    subtitle2: {
      fontFamily: "Noto Serif",
      fontWeight: 500,
      fontSize: "29px",
      lineHeight: "16px",
    },
    caption: {
      fontWeight: 400,
      fontSize: 11,
      lineHeight: "15px",
      display: "block",
    },
    button: {
      fontSize: "14px",
      lineHeight: "1.5rem",
      letterSpacing: "0.025em",
      fontWeight: 700,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
