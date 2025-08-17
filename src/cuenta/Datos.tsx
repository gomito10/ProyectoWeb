import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {Stack, Typography, Container, List, ListItem, ListItemText, ListItemButton,Box,Button, TextField, Checkbox, FormControlLabel, FormGroup, FormLabel, DialogTitle, Dialog, DialogActions, IconButton} from "@mui/material";
import {Link,useNavigate} from "react-router-dom";
import {grey} from "@mui/material/colors";
import {useState,useEffect} from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

function Datos(){
  const[password,setPassword]=useState("");
  const[checked,setChecked]=useState(false);
  const[logout,setLogout]=useState(false);
  const navigate=useNavigate();
  const listaDatos=["Datos personales","Autenticación","Salir"];
  
  function handleLogout(indice){
    if(indice === 2){
      setLogout(!logout)
    }
  }
  return(
    <div>
      <Box id="datosPersonales">
        <Container sx={{backgroundColor:grey[200],border:"1px solid red",height:"fit-content"}} id="Datos">
        <Stack direction="row" spacing={0.3}sx={{marginBlock:"10px"}}>
        <Typography variant="body2" color="initial" >CitySell</Typography>
        <NavigateNextIcon fontSize="small"/>
        <Typography variant="body2" color="initial">Mi cuenta</Typography>
        <NavigateNextIcon fontSize="small"/>
        <Typography variant="body2" color="initial">Mis datos</Typography>
        </Stack>
        <Typography variant="h6" color="initial" className="title-cuenta">Mis datos</Typography>
          <List>
            {
              listaDatos.map((item,index)=>(
                <ListItem key={index} sx={{fontWeight:"bold"}}>
                  <ListItemButton component="a" href={index !== 2 ?  `#${index}` : undefined}onClick={()=>handleLogout(index)}>
                    <ListItemText>
                      <Typography variant="body1" color="initial" className="title-cuenta">{item}</Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))
            }
          </List>
        </Container>
        <div id="0" style={{backgroundColor:grey[200],padding:"10px"}}>
        <Stack direction="row" spacing={0.3}sx={{marginBlock:"10px"}}>
        <Typography variant="body2" color="initial" >CitySell</Typography>
        <NavigateNextIcon fontSize="small"/>
        <Typography variant="body2" color="initial">Mi cuenta</Typography>
        <NavigateNextIcon fontSize="small"/>
        <Typography variant="body2" color="initial">Mis datos</Typography>
        </Stack>
        <IconButton component="a" href="#Datos" >
          <KeyboardBackspaceIcon color="info" fontSize="small" sx={{marginRight:2}}/>
          <Typography variant="body2" color="info">Volver</Typography>
        </IconButton>
          <Typography variant="body1" color="initial" className="title-cuenta">Datos personales</Typography>
          <Container sx={{ paddingBottom:"15px",backgroundColor:"white"}}>
            <List>
              <ListItem>
                <ListItemText>
                  <Typography variant="body1" color="initial" className="title-cuenta">Nombre</Typography>
                  <ListItemText secondary="Luis"/>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Typography variant="body1" color="initial" className="title-cuenta">Apellido</Typography>
                    <ListItemText secondary="Gómez"/>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Typography variant="body1" color="initial" className="title-cuenta">Email</Typography>
                  <ListItemText secondary="gomiti724@gmail.com"/>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Typography variant="body1" color="initial" className="title-cuenta">DNI</Typography>
                  <ListItemText secondary="28280639"/>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Typography variant="body1" color="initial" className="title-cuenta">Teléfono</Typography>
                  <ListItemText secondary="(11) 55606321" />
                </ListItemText>
              </ListItem>
            </List>
            <Button variant="outlined" color="secondary" sx={{margin:"0 auto",display:"block"}}>Editar</Button>
          </Container>
        </div>
        <div id="1" style={{backgroundColor:grey[200],padding:"10px"}}>
        <Stack direction="row" spacing={0.3}sx={{marginBlock:"10px"}}>
        <Typography variant="body2" color="initial" >CitySell</Typography>
        <NavigateNextIcon fontSize="small"/>
        <Typography variant="body2" color="initial">Mi cuenta</Typography>
        <NavigateNextIcon fontSize="small"/>
        <Typography variant="body2" color="initial">Mis datos</Typography>
        </Stack>
        <IconButton component="a" href="#Datos" >
          <KeyboardBackspaceIcon color="info" fontSize="small" sx={{marginRight:2}}/>
          <Typography variant="body2" color="info">Volver</Typography>
        </IconButton>
        <Typography variant="body1" color="initial" className="title-cuenta">Autenticación</Typography>
          <Container sx={{backgroundColor:"white",padding:"10px"}}>
          <Typography variant="body1" color="initial" className="title-cuenta" >Usted no tiene una contraseña definida</Typography>
          <form>
          <TextField variant="outlined" label="nueva contraseña" value={password} onChange={(e)=>setPassword(e.target.value)} fullWidth color="secondary"/>
          <FormLabel component="p">Su contraseña debe tener al menos:</FormLabel>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={password.length >= 8}/>}  label="8 carácteres"/>
            <FormControlLabel control={<Checkbox checked={/\d/.test(password)}/>} label="1 número"/>
            <FormControlLabel control={<Checkbox checked={/[A-Z]/.test(password)}/>} label="1 letra mayúscula"/>
            <FormControlLabel control={<Checkbox checked={/[a-z]/.test(password)}/>} label="1 minuscula"/>
          </FormGroup>
          <Button variant="contained" color="secondary" type="submit" sx={{marginTop:"15px",paddingBlock:"10px"}} fullWidth>Guardar</Button>
          </form>
          </Container>
        </div>
      </Box>
      <Dialog open={logout} onClose={()=>setLogout(!logout)}>
        <DialogTitle>¿Seguro que quieres salir de tu cuenta?</DialogTitle>
        <DialogActions>
          <Button variant="outlined" color="secondary">cancelar</Button>
          <Button variant="contained" color="secondary">salir</Button>
        </DialogActions>
      </Dialog>
      </div>
    )
}

export default Datos;