import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Avatar, createMuiTheme, FormControlLabel, ThemeProvider } from '@mui/material';
import { Typography } from '@mui/material';
import React, { useEffect, useState,useContext } from "react";
import axios from 'axios'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './usercontext.js';
function SignIn() {
  const {value,setValue} = useContext(UserContext)
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')




  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)



  const [emailErrorHelper, setEmailErrorHelper] = useState('')
  const [passwordErrorHelper, setPasswordErrorHelper] = useState('')

  const [BackendValidationResponse, setBackendValidationResponse] = useState('Invalid Username or Password')
  const [BackendValidationError,setBackendValidationError]=useState(false)

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

      const handleSubmit = (e) => {
        e.preventDefault()
    

        setEmailError(false)
        setPasswordError(false)

    

        setEmailErrorHelper('')
        setPasswordErrorHelper('')

    
    


        if (email == '') {
          setEmailError(true)
          setEmailErrorHelper('Email is required')
        }
        else{
          setEmailError(false)
          setEmailErrorHelper('')
        }
        if (password == '') {
          setPasswordError(true)
          setPasswordErrorHelper('Password is required')
        }
        else{
          setPasswordError(false)
          setPasswordErrorHelper('')
        }

        if(email!='' && password!=''){
          axios.post('http://localhost:1000/api/auth', { email: email, password: password })
          .then((response)=>{
            if (response.data.message!="logged in successfully") {
              handleClick2()
              setBackendValidationResponse(response.data)
              setBackendValidationError(true)
              setValue("false")
            }else{
             
              handleClick1()
              setValue(response.data.data)
              navigate("/home")
            }
          }).catch((error)=>{
            console.log(error)
            handleClick2()
              setBackendValidationError(true)
          })
        }


        
      }

    const avatarStyle = { backgroundColor: '#be8b14' }
    const paperStyle = { padding: 20, height: '60vh', width: 400, margin: "150px auto", minheight: '60vh' }
    return (
        <Container>
          
            <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
              <Typography variant="h5">Sign In</Typography>
            </Grid>
  
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
              <TextField
              onChange={(e) => setEmail(e.target.value)}
                helperText={emailErrorHelper}
                error={emailError}
                label="Email"
                variant="outlined"
                placeholder="Enter Email"
                required 
                style={{ width: '100%', margin: "8px 0" }}
              />
  
              <TextField
              onChange={(e) => setPassword(e.target.value)}
              helperText={passwordErrorHelper}
              error={passwordError}
                label="Password"
                placeholder="Enter Password"
                variant="outlined"
                required
                type='password'
                style={{ width: '100%', margin: "8px 0" }}
  
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                endIcon={<KeyboardArrowRightOutlinedIcon />}
                style={{ width: '100%', fontSize: 20, margin: '8px 0' }}
                
              >Sign In</Button>
              Not a member?
            <Link style= {{cursor:'pointer'}}to onClick={()=>{navigate('/signUp')}}>Sign Up!</Link>
               <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
          Logged in successfully
        </Alert>
      </Snackbar>
      </Stack>
      <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="error" sx={{ width: '100%' }}>
        {BackendValidationResponse}
        </Alert>
      </Snackbar>
      </Stack>
            </form>
          </Paper>
        </Grid>
        </Container>
    );
  }
  
  export default SignIn;