/*  Paquetes instalados: -g nodemon, express, express-handlebars, body-parser, mysql2
    Agregado al archivo "package.json" la línea --> "start": "nodemon index"
    
    Proyecto "Node_base"
    Desarrollo de Aplicaciones Informáticas - 5to Informática
    
    Docentes: Nicolás Facón, Martín Rivas
    
    Revisión 1 - Año 2021
*/
//Cargo librerías instaladas y necesarias
const express = require('express'); //Para el manejo del servidor Web
const exphbs  = require('express-handlebars'); //Para el manejo de los HTML
const bodyParser = require('body-parser'); //Para el manejo de los strings JSON
const MySQL = require('./modulos/mysql'); //Añado el archivo mysql.js presente en la carpeta módulos
const session = require('express-session');
const { initializeApp } = require("firebase/app");
const {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    GoogleAuthProvider,
  } = require("firebase/auth");

const app = express(); //Inicializo express para el manejo de las peticiones

app.use(express.static('public')); //Expongo al lado cliente la carpeta "public"

app.use(bodyParser.urlencoded({ extended: false })); //Inicializo el parser JSON
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'})); //Inicializo Handlebars. Utilizo como base el layout "Main".
app.set('view engine', 'handlebars'); //Inicializo Handlebars

const Listen_Port = 3000; //Puerto por el que estoy ejecutando la página Web

const server = app.listen(Listen_Port, function() {
    console.log('Servidor NodeJS corriendo en http://localhost:' + Listen_Port + '/');
});

const io = require('socket.io')(server);

const sessionMiddleware = session({
    secret: 'sararasthastka',
    resave: true,
    saveUninitialized: false,
});

app.use(sessionMiddleware);

io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

const firebaseConfig = {
    apiKey: "AIzaSyAnd3eT_dYP5hQIRp6Yh8e2k6bc7RByh2U",
    authDomain: "proyecto-final-b0b19.firebaseapp.com",
    projectId: "proyecto-final-b0b19",
    storageBucket: "proyecto-final-b0b19.appspot.com",
    messagingSenderId: "176515864772",
    appId: "1:176515864772:web:8466acfbcb26072a729191",
  };
  
const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);
const authService = require("./authService");


/*
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
*/

app.get("/", (req, res) => {
    res.render("login");
  });
  
  app.get("/register", (req, res) => {
    res.render("register");
  });
  
  app.post("/register", async (req, res) => {
    const { email, user, password } = req.body;
  
    try {
      await authService.registerUser(auth, { email, user, password });
      res.render("register", {
        message: "Registro exitoso. Puedes iniciar sesión ahora.",
      });
    } catch (error) {
      console.error("Error en el registro:", error);
      res.render("register", {
        message: "Error en el registro: " + error.message,
      });
    }
  });
  

  /*app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const userCredential = await authService.loginUser(auth, {
        email,
        password,
      });
      res.redirect("/home");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      res.render("login", {
        message: "Error en el inicio de sesión: " + error.message,
      });
    }
  });*/



  app.get('/registrarse', function(req, res){
    //Petición GET con URL = "/login"
    console.log("Soy un pedido GET", req.query); 
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('register', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
  });
  
  app.get("/volver", (req, res) => {
    // Agrega aquí la lógica para mostrar la página del dashboard
    res.render("login");
  });

  app.put('/login', async function(req, res) {
    //Petición PUT con URL = "/login"
    const  email  = req.body.user;
    const password  = req.body.pass;
    console.log(email, password)
    console.log("Soy un pedido PUT", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método PUT
    let respuesta= await MySQL.realizarQuery(` SELECT * FROM Jugadores WHERE mail= "${req.body.user}"`)
    console.log(respuesta)
    console.log(respuesta[0].esadmin)
    if (respuesta.length > 0) {
      console.log("sql correcto")
      try {
        console.log(req.body.user)
        const userCredential = await authService.loginUser(auth, {
          email,
          password,
        });
        req.session.conectado = req.body.user;
        res.send({validar: true, esadmin:respuesta[0].esadmin})
      } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        console.log("error en firebase")
        /*res.render("login", {
          message: "Error en el inicio de sesión: " + error.message,
        });*/
        res.send({validar:false})    
        }
    
    }
    else{
      console.log("sql error")
      res.send({validar:false})    
    }
});


app.post('/Admin', async function(req, res){
  console.log("Soy un pedido GET", req.query);
  res.render('Admin', null); 

});

app.post('/ingreso', async function(req, res){
  console.log("Soy un pedido GET", req.query);
  console.log("Soy Salas")
  res.render('Salas', null);

});

app.post('/nuevoUsuario', async function(req, res)
{
    let validar = true
    //Petición POST con URL = "/login"
    console.log("Soy un pedido POST", req.body); 
    let users= await MySQL.realizarQuery("SELECT * FROM Jugadores")
    if (req.body.mail.length == 0 || req.body.user.length == 0 || req.body.pass.length == 0 ){
        validar = false 
    }
    for (let i in users){
        if (req.body.mail == users[i].mail){
            console.log("falso")
            validar = false
        }
    }
    if (validar==true) {
      const email = req.body.mail;
      const user = req.body.user;
      const password  = req.body.pass;
      
      try {
        await authService.registerUser(auth, { email, password });
        await MySQL.realizarQuery (`INSERT INTO Jugadores VALUES("${email}", "${user}", ${false},${0})`)

        res.send({validar:true});
      } 
      catch (error) {
        console.error("Error en el registro:", error);
        res.render("register", {
          message: "Error en el registro: " + error.message,
        });
      }        
         //Renderizo página "home" enviando un objeto de 2 parámetros a Handlebars
    }
    else if (validar==false){
        res.send({validar:false})
    }
    
    //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método POST
    
    //res.render('home', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.put('/traerCategorias', async function(req, res){
  
  let vector = await MySQL.realizarQuery(` SELECT * FROM Categorias`)

  res.send({categorias: vector})

});
app.put('/category', async function(req, res){
  let text=req.body.txt
  console.log(text)
  await MySQL.realizarQuery(` INSERT INTO Categorias(contenido) VALUES ("${text}")`)
  //await MySQL.realizarQuery(` Select (ID_categoria) From Categorias Where contenido = "${text}" `)
  //await MySQL.realizarQuery(` INSERT INTO Lista (ID_sala, ID_categoria) VALUES =  `)
  let resp = await MySQL.realizarQuery(` SELECT * FROM Categorias WHERE contenido="${text}"`)
  if(resp.length > 0){
    res.send({validar:true})
  }else{
    res.send({validar:false})
  }
});

app.put('/salas', async function(req,res) {

  let vector = [await MySQL.realizarQuery(` Select * From Sala`)]
  console.log(vector)
  if (vector.length > 0) {
    res.send({sala: vector})    
  }
  else{
    res.send({sala:false})    
  }


})

app.post('/newRoom', async function(req, res){
  console.log(req.body.nom_sala)
  let x=await MySQL.realizarQuery(` SELECT nombre_sala FROM Sala WHERE nombre_sala like "${req.body.nom_sala}"`)
  if(x.length ==0){
    await MySQL.realizarQuery(` INSERT INTO Sala(nombre_sala) VALUES ("${req.body.nom_sala}")`)
    res.send({validar:true})
  }else{
    res.send({validar:false})
  }
});
io.on("connection", socket => {
  socket.join();
  socket.on("joinRoom", room => {

  })

});