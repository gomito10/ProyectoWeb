import {TextField, Button, Container} from "@mui/material";
import {useForm} from "react-hook-form";
const Register=()=>{
  const{
    register,
    handleSubmit,
    formState:{errors},
    setError
  }=useForm();
  
async function onSubmit(data){
    try{
      const response=await fetch("http://localhost:4000/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      });
      const result=await response.json();
      if(result.errors){
        result.errors.forEach((error)=>{
          setError(error.path,{
            type:"manual",
            message:error.msg
          })
        })
      }
    }catch(error){
      console.error("Error: ",error.message)
    }
  }
  return(
     <div>
       <Container>
       <form onSubmit={handleSubmit(onSubmit)}>
         <TextField sx={{my:3}} variant="outlined" color={errors.username ? "error" : "info"} {...register("username",{required:"Completar este campo",setValueAs:(value)=>value.trim()})} error={!!errors.username} helperText={errors.username && errors.username.message} label="Nombre" fullWidth/>
         <TextField sx={{my:3}} variant="outlined" {...register("apellido",{required:"Completar este campo",setValueAs:(value)=>value.trim()})} color={errors.apellido ? "error" : "info"} error={!!errors.apellido} helperText={errors.apellido && errors.apellido.message} label="Apellido" fullWidth/>
         <TextField sx={{my:3}} variant="outlined" {...register("email",{required:"Completar este campo",pattern:{
           value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
           message:"Formato inválido"
         },setValueAs:(value)=>value.trim()})}  color={errors.email ? "error" : "info"} error={!!errors.email} helperText={errors.email && errors.email.message} label="Email" fullWidth/>
         <TextField sx={{my:3}} variant="outlined" {...register("password",{required:"Completar este campo",maxLength:{
           value:20,
           message:"Formato inválido"
         },
         minLength:{
           value:8,
           message:"Formato inválido"
         },
        pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%+?&])[A-Za-z\d@$!%+?&]{8,}$/,
        message: "Formato inválido"
         },setValueAs:(value)=>value.trim()})} label="Password" fullWidth/>
         <TextField sx={{my:3}} variant="outlined" {...register("confirmPassword",{required:"Completar este campo"})}  error={!!errors.confirmPassword} color={errors.confirmPassword ? "error" : "info"} helperText={errors.confirmPassword && errors.confirmPassword.message} label="confirmar password" fullWidth/>
         <Button variant="contained" color="secondary" size="large" fullWidth type="submit">crear usuario</Button>
       </form>
       </Container>
     </div>
    )
}

export default Register;