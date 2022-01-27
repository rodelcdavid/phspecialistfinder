import { GlobalStyles } from "@mui/material";

const globalStyles = (
  <GlobalStyles
    styles={{
      "*, *::before, *::after": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      },
      body: {
        fontFamily: "'Ubuntu', sans-serif",
        maxHeight: "100vh",
        backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
        padding: "1rem 3rem",

        // "@media (min-width: 600px)": {
        //   padding: "1.5rem 3rem",
        // },
      },
    }}
  />
);

export default globalStyles;
