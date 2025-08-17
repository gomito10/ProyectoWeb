import {useState,createContext} from "react";
import {TextField, FormControlLabel, Checkbox, Container, Button, Typography, Divider} from "@mui/material";
import {useForm} from "react-hook-form";
import {Link,useNavigate} from "react-router-dom";
import {FcGoogle} from "react-icons/fc";
//const crearContexto=createContext();
const Login=({children})=>{
  const navigate=useNavigate();
  const [token,setToken]=useState(null);
  {/*<crearContexto.provider value={{token,setToken}}/>
    {children}
  <crearContexto.provider/>*/}
  const {
    register,
    handleSubmit,
    formState:{errors},
    setError,
    watch
  }=useForm();
  
  async function onSubmit(data){
      const response=await fetch("http://localhost:4000/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      });
      const result=await response.json();
      if(!response.ok){
        if(result.error === "USER_NOT_FOUND" || result.error === "INVALID_PASSWORD"){
          alert("usuario o contraseña incorrecta")
        }
      }else{
        navigate("/")
        setToken(result.token);
      }
  }
  return(
      <div>
        <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
        <TextField variant="outlined" color={errors.usuario ? "error" : "info"} {...register("usuario",{required:"Completar este campo"})} helperText={errors.usuario && errors.usuario.message} error={!! errors.usuario} label="Email" fullWidth sx={{my:4}}/>
        <TextField {...register("password",{required:"Completar este campo"})} helperText={errors.password && errors.password.message} color={errors.password ? "error" : "info"} error={!!errors.password} label="Password" variant="outlined" fullWidth/>
        <FormControlLabel control={<Checkbox color="success"/>} label="Recordarme"/>
        <Typography variant="body1" sx={{my:1, width:"100%", textAlign:"right"}}>
          <Link to="" underline="hover" style={{textDecoration:"none", color:"red"}}>Olvidé mi contraseña</Link>
        </Typography>
        <Button type="submit" variant="contained" color="secondary" fullWidth size="large">ingresar</Button>
        </form>
        <Divider textAlign="center" sx={{my:2}}>o</Divider>
        <Button variant="outlined" color="secondary" startIcon={<FcGoogle />} size="large">iniciar con Google</Button>
        <Typography variant="body1" color="initial" sx={{width:"100%",textAlign:"center",my:3}}>
          ¿Aún no tenés cuenta?
          <Link to="/register" style={{marginInline:"5px"}}>Registrate</Link>
        </Typography>
        </Container>
      </div>
    )
}

export default Login;