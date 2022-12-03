import { useTheme } from "@mui/material/styles";

const ThemedColors = () => {
  const theme = useTheme();

  return {
    color:
      theme.palette.mode === "light"
        ? "rgba(102, 108, 255, 1)"
        : "rgba(234, 234, 237, 1)",
    backgroundColor:
      theme.palette.mode === "light"
        ? "rgba(234, 234, 237, 1)"
        : "rgba(102, 108, 255, 1)",
    deepBackground:
      theme.palette.mode === "light"
        ? "rgba(234, 234, 237, 1)"
        : "rgba(58, 62, 91, 1)",
    hoverBackground: theme.palette.mode === "light" && "rgba(128, 132, 255,1)",
  };
};

export default ThemedColors;
