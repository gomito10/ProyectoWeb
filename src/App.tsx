import { useEffect, useState} from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import {TextField, Button, Drawer,Typography,Box,Card,CardContent,CardActions,Grid, IconButton, Toolbar, AppBar, Badge, CardMedia, CardHeader, Dialog, DialogTitle, DialogContent, Paper, Stack, DialogActions, ButtonGroup, Divider, Container, Autocomplete, InputAdornment, List, ListSubheader, ListItemButton, ListItemSecondaryAction, ListItemText, ListItem} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import "./App.css";
import {grey} from "@mui/material/colors";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import Cuenta from "./cuenta/Cuenta";
import Datos from "./cuenta/Datos";
import Login from "./cuenta/Login";
import Register from "./cuenta/Register";
function Scanner() {
  const[data,setData]=useState(null);
  const[error,setError]=useState(null);
  const[total,setTotal]=useState(0);
  useEffect(()=>{
    const scanner=new Html5QrcodeScanner("reader",{
    fps:10,
    qrbox:250,
    //supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
  });
  scanner.render(
      (decodeText)=>{
        alert(`codigo escaneado: ${decodeText}`)
          const fetchData=async()=>{
         try{
        const response=await fetch(`http://localhost:5000/api/product/${decodeText}`)
       if(!response.ok){
         const errors=await response.json();
         throw new Error(errors.message)
       }
       const result=await response.json()
       setData(result)
       if(result?.Price && !isNaN(result.Price)){
       setTotal(t=>t + parseFloat(result.Price))
       }
         }catch(error){
           console.error("Error: ",error.message);
           setError(error.message)
         }
       }
       fetchData()
      },
      (error)=>{
        console.error("Error de escano: " ,error.message)
      }
    );
    return ()=> scanner.clear();
  },[])
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>🎯 Escaneo solo desde cámara</h2>
      <div id="reader" style={{ width: '300px', margin: 'auto' }}></div>
      {
        data ? (
        <>
        <h1>{data.id }</h1>
        <h1>{data.title}</h1>
        <h1>{data.Price}</h1>
        </>
        ) : (
        error && <h1>{error}</h1>
        )
      }
      <h1 style={{color:"green"}}>{total}</h1>
    </div>
  );
}

function Layout(){
  const[products,setProducts]=useState([]);
  const[open,setOpen]=useState(false);
  const[countCart,setCountCart]=useState(0);
  const[count,setCount]=useState(1);
  const[cartItems,setCartItems]=useState([]);
  const[resumen,setResumen]=useState(false);
  const[total,setTotal]=useState(0);
  const[totalCompra,setTotalCompra]=useState(0)
  const[search,setSearch]=useState("")
  const[filterProducts,setFilterProducts]=useState([]);
  const[menu,setMenu]=useState(false);
  const[category,setCategory]=useState("products");
  const navigate=useNavigate();
  useEffect(()=>{
    const fetchData=async ()=>{
      try{
      const response=await fetch(`https://fakestoreapi.com/${category}`);
      if(!response.ok){
        throw new Error("Error al obtener priductos")
      }
      const result=await response.json();
      setProducts(result)
      setFilterProducts(result);
    }catch(error){
      console.log("Error: ",error.message);
    }
    }
    fetchData();
  },[]);
  
  function searchCategory(){
    const filtrar=products.filter((p)=>p.category.startsWith(search.toLowerCase()))
    setFilterProducts(search.length !== 0 ? filtrar : filterProducts);
  }
  useEffect(()=>{
    searchCategory()
  },[search,products]);
  
  function handleClick(title){
    const producto=products.find(p=>p.title===title);
      for(let i=0;i<localStorage.length;i++){
        if(localStorage.key(i) === title){
          alert("El producto ya existe");
          return
        }}
      const newProduct={
        product:producto.title,
        price:producto.price,
        count:1,
        total:producto.price,
        image:producto.image,
        id:producto.id
      }
      localStorage.setItem(title,JSON.stringify(newProduct));
      loadCartItems()
      getTotal()
      alert("producto agregado al carrito")
  }
  
  function loadCartItems(){
    const items=[];
    for(let i=0;i<localStorage.length;i++){
      items.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
    }
    setCartItems(items);
  }
  useEffect(()=>{
    loadCartItems();
  },[])
  
  function getTotal(){
    return cartItems.reduce((acc,item)=>acc + item.total,0);
  }
  function handleSuma(title){
    const producto=JSON.parse(localStorage.getItem(title));
    producto.count=producto.count+1;
    producto.total=producto.count*producto.price
    localStorage.setItem(title,JSON.stringify(producto));
    setCount(producto.count)
    loadCartItems();
    
  }
  
  function handleResta(title){
    const producto=JSON.parse(localStorage.getItem(title));
    if(producto.count <= 1){
    producto.count= 1;
    }else{
      producto.count=producto.count-1;
      producto.total=producto.count*producto.price
    }
    localStorage.setItem(title,JSON.stringify(producto));
    setCount(producto.count);
    loadCartItems();
  }
  
  function handleResumenCart(){
    setResumen(!resumen)
  }
  
  function handleDelete(title){
    localStorage.removeItem(title);
    loadCartItems();
    
  }
  
  function handleCategory(categorie){
    const filtrar=products.filter((p)=>p.category === categorie)
    setFilterProducts(filtrar);
    setMenu(!menu);
  }
  
  useEffect(()=>{
    setCountCart(cartItems.length);
  },[cartItems]);
  
  useEffect(()=>{
    setTotalCompra(getTotal());
  },[cartItems,cartItems.count])
  
  function handleCuenta(){
    navigate("/cuenta")
  }
  const categorias=["electronics","jewelery","men's clothing","women's clothing","Todos los productos"];
      return(
      <>
        <div>
          <AppBar position="static">
            <Toolbar sx={{backgroundColor:"white"}}>
              <Stack sx={{width:"100%"}}>
              <Box sx={{width:"100%"}}>
            <IconButton edge="start" color="inherit" onClick={()=>setMenu(!menu)}>
              <MenuIcon sx={{color:"black"}}/>
            </IconButton>
            <IconButton sx={{marginLeft:"50%"}} onClick={handleCuenta}>
              <AccountCircleOutlinedIcon/>
              <Typography variant="body1" color="initial">Mi cuenta</Typography>
            </IconButton>
            <Badge badgeContent={countCart} color="secondary">
              <ShoppingCartOutlinedIcon color="action" onClick={()=>setOpen(!open)}/>
            </Badge>
            </Box>
              <Autocomplete
            freeSolo
            options={categorias}
            onInputChange={(event,newValue)=>{
              setSearch(newValue);
            }}
            Inputvalue={search}
            sx={{margin:"5px"}}
            renderInput={(params)=><TextField {...params} label="Buscar productos" variant="outlined"
            InputProps={{
              startAdornment:(
                <InputAdornment position="start">
                  <SearchOutlinedIcon/>
                </InputAdornment>
              )
            }}
            />}
            />
            <IconButton edge="start" sx={{marginRight:"auto"}}>
              <LocationOnOutlinedIcon color="info"/>
            <Typography variant="body2" color="initial">Estás en <Typography component="span" variant="body2" color="info">Capital Federal (1006)</Typography></Typography>
            </IconButton>
            </Stack>
            </Toolbar>
          </AppBar>
          <Grid container spacing={1}>
            {
              filterProducts && filterProducts.map((item)=>(
                <Grid size={{xs:6,sm:3}} key={item.id}>
                  <Card sx={{height:"300px"}}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      height={150}
                      alt={item.title}
                      sx={{
                      objectFit:"contain",
                      width:"50%",
                      margin:"auto",
                      display:"block"
                      }}
                    />
                    <CardContent sx={{pb:0}}>
                      <Typography
                        variant="body1"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2, // Número de líneas antes del corte
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textAlign:"center"
                          }}
                        >
                          {item.title}
                      </Typography>
                      <Typography variant="h6" color="initial" sx={{width:"100%",textAlign:"center"}}>${item.price}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button variant="contained" color="primary" onClick={()=>handleClick(item.title)} fullWidth>Agregar</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
          <Drawer open={open} onClose={()=>setOpen(!open)}
          PaperProps={{
            sx:{
              width:"75%"
            }
          }}
          >
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <IconButton onClick={handleResumenCart} edge="end">
              <ShoppingCartOutlinedIcon color="secondary"/>
              <Typography variant="body1" color="info">Ir a mi carrito</Typography>
            </IconButton>
            <IconButton onClick={()=>setOpen(!open)} edge="start" sx={{marginLeft:"auto"}}>
              <CloseIcon/>
            </IconButton>
            </div>
            <Grid container>
              {
                cartItems && cartItems.map((item,index)=>(
                  <Grid size={{xs:12}}>
                    <Card sx={{width:"100%",height:"250px"}}>
                      <CardMedia
                      component="img"
                      height={70}
                      alt={item.title}
                      image={item.image}
                      sx={{
                        objectFit:"contain",
                        width:"50%",
                        margin:"auto",
                        display:"block",
                        float:"left"
                      }}
                      />
                      <CardContent sx={{textAlign:"right",paddingRight:"40px"}}>
                        <Typography variant="body2">
                          {item.product}
                        </Typography>
                        <IconButton onClick={()=>handleDelete(item.product)}>
                        <DeleteOutlineIcon color="info"/>
                        </IconButton>
                        <Typography variant="h6" color="initial">
                          ${item.price}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{display:"flex",justifyContent:"flex-end",paddingRight:"40px"}}>
                        <button className="boton" onClick={()=>handleSuma(item.product)}>+</button>
                        <Typography variant="h6" color="initial">{item.count}</Typography>
                        <button className="boton" onClick={()=>handleResta(item.product)}>-</button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              }
            </Grid>
          </Drawer>
          <Dialog open={resumen} onClose={()=>setResumen(!resumen)} fullScreen>
            <IconButton edge="start" sx={{marginLeft:"auto"}} onClick={()=>setResumen(!resumen)}>
              <CloseIcon/>
            </IconButton>
            <DialogTitle>
              Mi carrito
            </DialogTitle>
            <DialogContent>
              {
                cartItems.map((item)=>(
                  <Paper key={item.id} sx={{height:"150px",padding:"10px"}} elevation={7}>
                    <Stack direction="row" spacing={2}>
                    <img src={item.image} alt={item.poduct} style={{width:"15%",objectFit:"contain"}}/>
                    <Typography>                    {item.product}</Typography>
                    </Stack>
                    <IconButton onClick={()=>handleDelete(item.product)}>
                        <DeleteOutlineIcon color="info"/>
                        <Typography variant="body2" color="secondary">Eliminar</Typography>
                      </IconButton>
                      <Stack direction="row" spacing={1}>
                          <Stack direction="row" sx={{border:"1px solid purple",borderRadius:"5px"}} alignItems="center">
                      <button style={{border:"none",backgroundColor:"transparent",display:"inline"}} onClick={()=>handleSuma(item.product)}>+</button>
                      <Divider orientation="vertical" variant="middle" flexItem/>
                      <Typography variant="body" color="initial" sx={{margin:"0px 10px"}}>{item.count}</Typography>
                      <Divider orientation="vertical" variant="middle" flexItem/>
                      <button style={{border:"none",backgroundColor:"transparent"}} onClick={()=>handleResta(item.product)}>-</button>
                      </Stack>
                      <Typography variant="h6">${item.total}</Typography>
                      </Stack>
                  </Paper>
                ))
              }
            </DialogContent>
            <DialogActions>
              <Container>
              <Stack spacing={2} sx={{width:"100%",backgroundColor:grey[200]}}>
                <div style={{display:"flex",justifyContent:"space-between", padding:"5px"}}>
                <Typography variant="body2" color="initial">Subtotal</Typography>
                <Typography variant="body1" color="initial">${totalCompra.toFixed(2)}</Typography>
              </div>
              <div style={{display:"flex",justifyContent:"space-between", padding:"5px"}}>
                <Typography variant="h5" color="initial">Total</Typography>
                <Typography variant="h5" color="initial">${totalCompra.toFixed(2)}</Typography>
              </div>
              <div style={{padding:"10px"}}>
              <Button variant="contained" color="secondary" fullWidth sx={{paddingBlock:"10px",marginBlock:"10px"}}>finalizar compra</Button>
              <Button variant="outlined" color="secondary" fullWidth sx={{paddingBlock:"10px"}}>continuar comprando</Button>
              </div>
              </Stack>
              </Container>
            </DialogActions>
          </Dialog>
          <Drawer open={menu}
          onClose={()=>setMenu(!menu)}
          PaperProps={{
            sx:{
              width:"75%"
            }
          }}
          >
            <List>
              <ListSubheader>
                Categorías
              </ListSubheader>
              {
                categorias.map((item,index)=>(
                  <ListItem key={index}>
                    <ListItemButton onClick={()=>handleCategory(item)}>
                      <ListItemText secondary={item}/>
                      <ListItemSecondaryAction>
                        <IconButton>
                          <NavigateNextIcon/>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                  </ListItem>
                ))
              }
            </List>
          </Drawer>
        </div>
      </>
    )
}
function App(){
  return(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}/>
            <Route path="/cuenta" element={<Cuenta/>}/>
            <Route path="/Datos" element={<Datos/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>} />
          </Routes>
        </BrowserRouter>
    )
}
export default App;