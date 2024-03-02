import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme, makeStyles } from '@material-ui/core'
import React from 'react'
import {useNavigate} from 'react-router-dom'
import { CryptoState } from '../cryptoContext';

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "#ccf381",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));
const Header = () => {
    const classes = useStyles();
    const { currency, setCurrency } = CryptoState();
    const navigate = useNavigate();
    const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});
    return (
      <ThemeProvider theme={darkTheme}>
            
      <AppBar color='transparent' position='static'>
          <Container>
              <Toolbar>
                  <Typography variant="h4" onClick={()=> navigate("/")} className={classes.title}>CryptoPulse</Typography>
                  <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              style={{ width: 100, height: 40, marginLeft: 15 }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
              </Toolbar>
          </Container>
    </AppBar>
      </ThemeProvider>
  )
}

export default Header
