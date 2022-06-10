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
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


const Cards=()=>{
    const paperStyle = { padding: 20, height: '70vh', width: 400, margin: "150px auto",  }
    const {value,setValue} = useContext(UserContext)
    let id= value
    const [open1, setOpen1] = React.useState(false);
    const handleClick1 = () => {
      setOpen1(true);
    };
  
    const handleClose1 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen1(false);
    };
    const [open2, setOpen2] = React.useState(false);
  
    const handleClick2 = () => {
      setOpen2(true);
    };
  
    const handleClose2 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen2(false);
    };
    const Alert = React.forwardRef(function Alert(props, ref) {
  
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const navigate = useNavigate();
    
    const [list,setList]=useState([])
    const [assign,setAssign]=useState("")
    const [uzer,setUzer]=useState("")

    const allData = async()=>{
        const res = await axios.get("http://localhost:1000/api/cards",{
            params:{
                userid:id
            }
        })
        setList(res.data)
        setUzer(res.data.username)
    }

    const handleDelete = async(e)=>{
        const res = await axios.delete("http://localhost:1000/api/cards",{
            params:{
            userid:e
        }
        }).then((res)=>{

        })

        const res2 = await axios.get("http://localhost:1000/api/cards",{
            params:{
                userid:id
            }
        }).then((res2)=>{
            setList(res2.data)
        })

        const res3 = await axios.patch("http://localhost:1000/api/locks/unassign",{
            id:e,
            oid:""
        }).then((res3)=>{

        })

        
    }

    const handleAssign = async(e)=>{
        setAssign(e._id)

            const res = await axios.get("http://localhost:1000/api/locks",{
                params:{
                    userid:id
                }
            }).then((res)=>{
                setList(res.data)
            }).catch((err)=>{
                
            })


        

    }
    const getId = async()=>{
        const res = await axios.get("http://localhost:1000/api/users",{
            params:{
                id:id
            }
            

    }).then((res)=>{
        console.log(res.data.username)
        setUzer(res.data.username)
        console.log(uzer)
    }) .catch((err)=>{
        console.log(err)
    })
    }

    const handleUnassign = async(e)=>{

        const res = await axios.patch("http://localhost:1000/api/cards",{
            id:e._id,
            oid:"no"

    }).then((res)=>{
        console.log(res.data)
    }) 

    const res3 = await axios.patch("http://localhost:1000/api/locks/unassign",{
            id:e._id,
            oid:""

    }).then((res3)=>{

 
    }) 

    const res2 = await axios.get("http://localhost:1000/api/cards",{
            params:{
                userid:id
            }
        }).then((res2)=>{
            setList(res2.data)
        })


        

    }



    const assignToLock = async(e)=>{


        const res = await axios.patch("http://localhost:1000/api/locks",{
                id:e._id,
                oid:assign
 
        }).then((res)=>{

            console.log(res.data)
        })

        const res2 = await axios.patch("http://localhost:1000/api/cards",{
                id:assign,
                oid:e._id
 
        }).then((res2)=>{

            console.log(res2.data)
        }) 
        navigate("/home")
        navigate("/cards")
        

    }

    const addListDisplay = async()=>{
        if(list.length<5){
        const res = await axios.post("http://localhost:1000/api/cards",{userid:id,username:uzer,
        access:"admin",lock:"no"
        }).then((res)=>{
            console.log(res)
        })
    }

        const res2 = await axios.get("http://localhost:1000/api/cards",{
            params:{
                userid:id
            }
        }).then((res2)=>{
            setList(res2.data)
        })
    }
    useEffect(()=>{
        getId()
    },[])

    useEffect(()=>{
        allData()
    },[])


   

    if(assign===""){
    if(list.length===5){
        return(
            <Container>
                <Paper elevation={10} style={paperStyle}>
                <h1 id="cardtop">My Cards</h1>
            
              {list.map(function(d,idx){
                return (<div id="cardsA" key={idx}>Card id: {d._id}<br/> User id : {d.userid} <br/>  {d.lock==="no"?<Button value={d._id} onClick={()=>handleAssign(d)} variant="contained">Assign</Button>:<Button value={d._id} onClick={()=>handleUnassign(d)} variant="contained">UnAssign</Button>} <Button value={d._id} onClick={()=>handleDelete(d._id)} variant="contained">Delete</Button></div> )
              })} 
           
            </Paper>
      </Container>
            )
    }
    if(list.length===0){
        return(
        <Container>
            <Paper elevation={10} style={paperStyle}>
        <h1 id="cardtop">No cards, please add some.</h1>
        <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={addListDisplay} >Add Cards</Button>

      </Stack>
      </Paper>
      </Container>
        )
    }
    if(list.length<5){
        return(
            <Container>
                <Paper elevation={10} style={paperStyle}>
                <h1 id="cardtop">My Cards</h1>
            
              {list.map(function(d,idx){
                return (<div id="cardsA" key={idx}>Card id: {d._id}<br/> User id : {d.userid} <br/>  {d.lock==="no"?<Button value={d._id} onClick={()=>handleAssign(d)} variant="contained">Assign</Button>:<Button value={d._id} onClick={()=>handleUnassign(d)} variant="contained">UnAssign</Button>} <Button value={d._id} onClick={()=>handleDelete(d._id)} variant="contained">Delete</Button></div> )
              })} 
            
            <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={addListDisplay} >Add Cards</Button>

      </Stack>
      </Paper>
      </Container>
            )
    }
}else{
    return(
        <Container>
            <Paper elevation={10} style={paperStyle}>
            <h1 id="cardtop">My Locks</h1>
        
          {list.map(function(d,idx){
            return (<div id="cardsB" key={idx}>Lock id: {d._id}<br/> User id : {d.userid} <br/><Button variant="contained" onClick={()=>assignToLock(d)} >Assign to Lock</Button></div> )
          })} 
        
        <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="error" sx={{ width: '100%' }}>
        test
        </Alert>
      </Snackbar>

  </Stack>
  </Paper>
  </Container>
        )
}
}

export default Cards