import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#ff4400',
    },

    secondary: {
      main: 'rgba(21, 21, 21, 0.92)'
    },
    input: {
      main: "#EEE"
    },
    main_orange: "#ff4400",
    lightGray: "rgb(21, 21, 21, 0.96)",
    background: "#121212",
    nav: "#212121",
    button_mui: "rgba(0, 0, 0, 0.54)",
    button_orange: "#ff7200",
    buttonHover: "rgba(255, 255, 255, 0.08)",
    font_text: "#EEE",
    textLight: "#DDD",

  },
  typography: {
    confidentialityVariant: {
      color: "#DDD",
      marginRight: '35px',
      textAlign: 'justify',
      transform: 'translateY(-10%)',
      fontSize: '20px'
    },
    profileNoData: {
      display: 'block',
      color: "#DDD",
      fontSize: '30px',
      justifyContent: 'center',
      margin: '25px 0',
    },
    comments: {
      color: "#DDD",
      fontSize: '30px',
    },
    postNames: {
      fontWeight: '700',
      marginLeft: '12px',
    },
    postTitle: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)', fontWeight: '700',
    },
    postDate: {
      margin: '0 10px',
      fontWeight: '700'
    },
    friendsTitle: {
      display: 'block',
      color: "white",
      padding: "25px",
      fontSize: '25px',
      fontWeight: '400',
      margin: '0 10px'

    }


  },

  components: {
    MuiSvgIcon: {
      variants: [
        {
          props: { variant: 'confidential' },
          style: {
            color: "#DDD",
            marginRight: '25px',
            transform: 'translateY(-20%)'
          }
        },
      ]
    }
  }
})

theme.typography.friendsTitle = {
  ...theme.typography.friendsTitle,
  [theme.breakpoints.down(500)]: {
    fontSize: '18px',
    width: '80%'
  },
  [theme.breakpoints.down(400)]: {
    fontSize: '15px',
    textAlign: 'center', display: 'block', margin: '0 auto',
    fontWeight: 700
  },

}