import {useState,useEffect,useContext, } from 'react'
import React from 'react'
import axios from 'axios'
import './home.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { UserContext } from './usercontext.js';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { TextField} from '@mui/material';
import Paper from '@mui/material/Paper';
let id="z"
const handleSubmit = (e) => {
    e.preventDefault()
}
const AllCards=()=>{
    
    const [search, setSearch] = useState('')
    const [list,setList]=useState([])
    const AllData = async()=>{
        const res = await axios.get("http://localhost:1000/api/cards/allCards")
        setList(res.data)
    }
    useEffect(()=>{
        AllData()
    },[])
    return(

        <Container>
                <h1 id="top">All Cards</h1>
                <Stack spacing={2} direction="row">
                    <form noValidate autoComplete='off'>
                    <TextField
              onChange={(e) => setSearch(e.target.value)}
                label="Search"
                variant="outlined"
                placeholder="Enter User ID or Username"
                required 
                style={{ width: '100%', margin: "8px 0" }}
              />
              
                </form>
                </Stack>
            <ul>
              {list.filter((val)=>{
                if(search===""){
                    return val;
                }else if (val.userid.toLowerCase().includes(search.toLowerCase())){
                    return val
                }else if (val.username.toLowerCase().includes(search.toLowerCase())){
                    return val
                }
              }).map(function(d,idx){
                 return (<li key={idx}>Card id: {d._id}, User id : {d.userid}, Username: {d.username} </li> )
              })} 
            </ul>
      </Container>

    )
}



export default AllCards