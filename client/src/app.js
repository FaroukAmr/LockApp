import React, { useEffect, useState } from "react";
import SignIn from './signIn.js'
import SignUp from './signUp.js'
import Home from './home.js'
import { Routes, Route } from "react-router-dom"
import { BrowserRouter } from 'react-router-dom';
import Button from '@mui/material/Button'
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import NavBar from './navbar.js'
import Cards from './cards.js'
import { UserContext,useMemo } from "./usercontext.js";
import Locks from './locks.js'
import AllCards from './allCards.js'



const App = ()=>{
   const [value,setValue] = useState('')
   const [uzer,setUzername] = useState('')
    useEffect(() => {
        document.title = "Lock Access"
     }, []);
    return(
        <BrowserRouter>
        <UserContext.Provider value={{value,setValue}}>
        

        <NavBar/>
        <Routes>   
            
          <Route exact path="/" element={ <Home/> } />
          <Route exact path="/signIn" element={ <SignIn/> } />
          <Route exact path="/home" element={ <Home/> } />
          <Route exact path="/signUp" element={ <SignUp/> } />
          <Route exact path="/locks" element={ <Locks/> } />
          <Route exact path="/cards" element={ <Cards/> } />
          <Route exact path="/allCards" element={ <AllCards/> } />
        </Routes>
        
        </UserContext.Provider>
        
        </BrowserRouter>
        
        

    )
}

export default App