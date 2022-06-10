import {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import './home.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { UserContext } from './usercontext.js';
import Paper from '@mui/material/Paper';



const Locks=()=>{
    const paperStyle = { padding: 20, height: '40vh', width: 400, margin: "150px auto",  }
    const {value,setValue} = useContext(UserContext)
    let id=value
    const [list,setList]=useState([])

    const allData = async()=>{
        const res = await axios.get("http://localhost:1000/api/locks",{
            params:{
                userid:id
            }
        })
        setList(res.data)
    }

    const handleDelete = async(e,d)=>{
        const res2 = await axios.patch("http://localhost:1000/api/cards/update",{
                id:e
 
        }).then((res2)=>{
            console.log(res2.data)
        }) 

        const res = await axios.delete("http://localhost:1000/api/locks",{
            params:{
            userid:e
        }
        })

        const res3 = await axios.get("http://localhost:1000/api/locks",{
            params:{
                userid:id
            }
        }).then((res3)=>{
            setList(res3.data)
        })
    }

    const addListDisplay = async()=>{
        if(list.length<2){
        const res = await axios.post("http://localhost:1000/api/locks",{userid:id
        }).then((res)=>{
            console.log(res)
        })
    }

        const res2 = await axios.get("http://localhost:1000/api/locks",{
            params:{
                userid:id
            }
        }).then((res2)=>{
            setList(res2.data)
        })
    }

    useEffect(()=>{
        allData()
    },[])


   

    if(list.length===2){
        return(
            <Container>
                <Paper elevation={10} style={paperStyle}>
                <h1 id="cardtop">My locks</h1>
          
              {list.map(function(d,idx){
                return (<div id="cardsA" key={idx}>Lock id: {d._id} <br/> User id : {d.userid} <br/><Button value={d._id} onClick={()=>handleDelete(d._id,d)} variant="contained">Delete</Button></div> )
              })} 
            </Paper>
      </Container>
            )
    }
    if(list.length===0){
        return(
        <Container>
        <h1 id="top">No locks, please add some.</h1>
        <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={addListDisplay} >Add Locks</Button>

      </Stack>
      </Container>
        )
    }
    if(list.length<2){
        return(
            <Container>
                <h1 id="top">My locks</h1>
            <ul>
              {list.map(function(d,idx){
                return (<li key={idx}>Lock id: {d._id}, User id : {d.userid} <Button value={d._id} onClick={()=>handleDelete(d._id)} variant="contained">Delete</Button></li> )
              })} 
            </ul>
            <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={addListDisplay} >Add Locks</Button>

      </Stack>
      </Container>
            )
    }
}

export default Locks