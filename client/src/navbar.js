
import React, { useEffect, useState,useContext } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import { Link, useNavigate } from "react-router-dom";
import  {IconButton} from '@mui/material';
import { UserContext } from './usercontext.js';
import './home.css'
const NavBar = () => {
  const {value,setValue} = useContext(UserContext)

  const navigate = useNavigate();
  const [value2, setValue2] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
const handleClick= ()=>{
  setValue("")
  navigate('/signIn')
}

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#34568B" }}>
        <Toolbar>
        <IconButton onClick={()=>{navigate('/home')}}> <SecurityOutlinedIcon sx={{ transform: "scale(2)" }} /> </IconButton>
          
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                
              </Typography>
            </>
          ) : (
            <>
            
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value2}
                onChange={(e, value2) => setValue2(value2)}
              >
                <Tab  onClick={()=>{navigate('/locks')}} label="My Locks" />
                <Tab onClick={()=>{navigate('/cards')}} label="My Cards" />
                <Tab onClick={()=>{navigate('/allCards')}} label="All Cards" />


              </Tabs>
              <div id="buttons">
                
              {value===""?<Button onClick={()=>{navigate('/signIn')}} sx={{ marginLeft: "auto" }} variant="contained">Login</Button>:null}
              {value!==""?<Button onClick={()=>{handleClick()}} sx={{ marginLeft: "auto" }} variant="contained">Log Out</Button>:null}
              
              
              {value===""?<Button onClick={()=>{navigate('/signUp')}} sx={{ marginLeft: "auto" }} variant="contained">Sign Up</Button>:null}
              
              </div>
              
              
              
            </>
            
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default NavBar;