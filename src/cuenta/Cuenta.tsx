import {useState} from "React";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {grey,purple} from "@mui/material/colors";
import {Button, Typography, Paper, Container, Box, Stack} from "@mui/material";
import {Link,useNavigate} from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
//import {crearContexto,useContexto} from "./Login";

function Cuenta(){
 // const {token}=useContexto(crearContexto);
  const navigate=useNavigate();
  function handleClick(){
  if(!token){
    navigate("/login")
  }else{
    navigate("/Datos")
  }
  }
  return(
      <>
        <div>
          <Container>
            <Stack direction="row">
            <Typography variant="body2">CitySell</Typography>
            <NavigateNextIcon fontSize="small"/>
            <Typography variant="body2">cuenta</Typography>
            </Stack>
            <Typography variant="h6" color="initial" sx={{fontWeigjt:"bold"}}>Mi cuenta</Typography>
          <Paper sx={{height:"auto", padding:"10px",display:"flex",gap:1, alignItems:"flex-start"}} elevation={7}>
            <div style={{borderRadius:"50%",padding:"10px",backgroundColor:grey[200], width:"fit-content"}}>
            <AccountCircleOutlinedIcon sx={{color:purple[200]}} fontSize="large"/>
            </div>
            <Box>
            <Typography variant="body1"  className="title-cuenta">Mis datos</Typography>
            <Typography variant="body1" color="initial">
              Mis datos Editá tus datos personales, tus direcciones, tus tarjetas y contraseñas.
            </Typography>
            <Link to={"/Datos"} style={{textDecoration:"none"}}><Typography variant="body1" color="info">Ir a Mis datos</Typography></Link>
            </Box>
          </Paper>
           <Paper sx={{height:"auto", padding:"10px",display:"flex",gap:1, alignItems:"flex-start",marginBlock:"10px"}} elevation={7}>
            <div style={{borderRadius:"50%",padding:"10px",backgroundColor:grey[200], width:"fit-content"}}>
            <AccountCircleOutlinedIcon sx={{color:purple[200]}} fontSize="large"/>
            </div>
            <Box>
            <Typography variant="body1" color="initial" className="title-cuenta">Mis Compras</Typography>
            <Typography variant="body1" color="initial">
              Seguí el estado de tus compras y consultá tus facturas.
            </Typography>
            <Link to="" style={{textDecoration:"none"}}><Typography variant="body1" color="info">Ir a Mis compras</Typography></Link>
            </Box>
          </Paper>
          <Paper sx={{height:"auto", padding:"10px",display:"flex",gap:1, alignItems:"flex-start"}} elevation={7}>
            <div style={{borderRadius:"50%",padding:"10px",backgroundColor:grey[200], width:"fit-content"}}>
            <AccountCircleOutlinedIcon sx={{color:purple[200]}} fontSize="large"/>
            </div>
            <Box>
            <Typography variant="body1" color="initial" className="title-cuenta">Centro de ayuda</Typography>
            <Typography variant="body1" color="initial">
              Realizá consultas y reclamos. Contactanos para poder ayudarte.
            </Typography>
            <Link to="" style={{textDecoration:"none"}}><Typography variant="body1" color="info">Ir al Centro de ayuda</Typography></Link>
            </Box>
          </Paper>
          </Container>
        </div>
      </>
    )
}

export default Cuenta;