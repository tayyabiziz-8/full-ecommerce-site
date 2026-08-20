import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  palette: {
    background: { default: "#FAFAF7", paper: "#FFFFFF" },
    text: { primary: "#17181C", secondary: "#6B6D76" },
    primary: { main: "#1E6F5C" },
    warning: { main: "#C9A227" },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 4 },
});