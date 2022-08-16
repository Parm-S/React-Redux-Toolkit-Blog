import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100%",
        },
        body: {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          height: "100vh",
          width: "100%",
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            borderRadius: "32px",
          },
        },
      ],
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid #EAECED",
          boxShadow: "1px 2px 9px rgba(0, 0, 0, 0.2)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          backdropFilter: "drop-shadow(1px 2px 4px rgba(0, 0, 0, 0.25))",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          borderRadius: "10px",
          border: "1px solid #EAECED",
          boxShadow: "1px 2px 9px rgba(0, 0, 0, 0.2)",
          backdropFilter: "drop-shadow(1px 2px 4px rgba(0, 0, 0, 0.25))",
        },
      },
    },
  },

  palette: {
    background: {
      default: "#F0F2F5",
      paper: "#FFFFFF",
    },
    primary: {
      main: "#007FFF",
      light: "#3398FF",
      dark: "#0058B2",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#060312",
      secondary: "#272D3D",
      disabled: "rgba(55, 65, 81, 0.48)",
    },
    info: {
      main: "#00288d1",
      light: "#007fff21",
    },
  },
  typography: {
    h5: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "32px",
    },
    h6: {
      fontFamily: "Open Sans",
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: "18px",
    },
    subtitle1: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "14px",
    },
    subtitle2: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "14px",
    },
    body1: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "16px",
    },
    body2: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "13px",
    },
  },
});

export default theme;