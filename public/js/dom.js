async function entrar(data) {
    //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    
    
    try {
      const response = await fetch("/login", {
        method: "PUT", // or 'POST'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      //En result obtengo la respuesta
      const result = await response.json();
      console.log("Success:", result);

      console.log("hola")
  
      if (result.validar == false) {
        alert("Los datos son incorrectos")
      } else {
        
        //Envio el formularia desde dom para cambiar de pagina
        //Podria usar tambien un changeScreen()

        console.log(result.esadmin)
        if (result.esadmin == true){
          document.getElementById("administrador").submit()  
          }  else 
          {document.getElementById("loguearse").submit()}
       
        }
  
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  //Esta funcion la llama el boton Ingresar que tiene que ser type button para ejecutar el onclick
  function login() {
    //Leo los datos del input
    let usuario = document.getElementById("usuarioId").value
    sessionStorage.setItem("userName",usuario);
    let contraseña = document.getElementById("passwordId").value
  
    //Creo un objeto de forma instantanea
    let data = {
        user: usuario,
        pass: contraseña
    }

  
    //data es el objeto que le paso al back
    entrar(data)
  }
  function nuevoUsuario(){
    let mail = document.getElementById("mail").value
    let usuario = document.getElementById("usuarioId").value
    let contraseña = document.getElementById("passwordId").value
  
    let data = {
      mail: mail,
      user: usuario,
      pass: contraseña
    }
      registrarse(data)
  
  }
  async function registrarse(data){
    try {
    const response = await fetch("/nuevoUsuario", {
      method: "POST", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    //En result obtengo la respuesta
    const result = await response.json();
    console.log("Success:", result);
    if (result.validar == false) {
      alert("El usuario no se puede crear")
      location.href = '/register'
    }
    else{
      console.log("Usuario creado con exito")
      location.href = '/volver'
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

 async function traerCategorias(){
  try {
    const response = await fetch("/traerCategorias", {
      method: "PUT", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    
    //En result obtengo la respuesta
    const result = await response.json();
    console.log("Success Categorias:", result);
    let categorias = result.categorias
    console.log(categorias)
    
    //falta el inner HTML con las categorias que existen y el tipo de boton para poder seleccionarlas (estilo true/false)
  } catch (error) {
    console.error("Error:", error);
  }
 }
 function addCategory(){
  let text = document.getElementById("inputCategory").value
  document.getElementById("jajqa").innerHTML = `
    ${document.getElementById("jajqa").innerHTML}
    <label class="btn btn-outline-primary" for="btnradio9">${text}</label>
  `
  
  console.log(text)
}
 function mostrar(){
  let text=document.getElementById("inputCategory").value
  console.log(text)
  let html =`
    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
      <input type="checkbox" class="btn-check" name="btnradio" id="btnradio${text}" autocomplete="off" >
      <label class="btn btn-outline-primary" for="btnradio9">${text}</label>
      </div>
    `
  document.getElementsByClassName("card1").innerHTML=html
 }
function validaCheckbox( ){
  x=document.getElementsByClassName("btn btn-outline-primary")
  let a=[];
  for(let i=0;i<x.length;i++){
    if(document.getElementById('btnradio'+(i+1))){
      if(document.getElementById('btnradio'+(i+1)).checked){
        a.push(x[i].innerHTML);
      }
    }
  }
  console.log(a)
  return(a)
}
function validaRadio(){
  x=document.getElementsByClassName("btn btn-outline-primary")
  let a=0;
  for(let i=0;i<x.length;i++){
    if(document.getElementById('btnRadio'+(i+1))){
      if(document.getElementById('btnRadio'+(i+1)).checked){
        a=x[i+12].innerHTML;
      }
    }
  }
  return(a)
}


 async function traerSalas(){
  try {
    const response = await fetch("/salas", {
      method: "PUT", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    const result = await response.json();

    console.log("Success:", result);
    let vector = result
    console.log(vector)

    //falta terminar
  }
  catch (error) {
    console.error("Error:", error);
  }
 }

async function API(){
  try {
    const response = await fetch("https://dolarapi.com/v1/dolares", {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    const result = await response.json();
    console.log("Success API:", result);

    dolarOFicial = result[0]
    dolarBlue = result[1]
    dolarBolsa = result[2]
    dolarLiqui = result[3]
    dolarSolidario = result[4]
    dolarMayorista = result[5]

    console.log(dolarOFicial.venta)
    console.log(dolarBlue.venta)

    let html =  ` <marquee id= dolar> Valor actual del dolar: oficial: $${dolarOFicial.venta} - Blue: $${dolarBlue.venta}- Contado con Liqui: $${dolarLiqui.venta} - Solidario: $${dolarSolidario.venta} - Mayorista: $${dolarMayorista.venta}</marquee>`
    document.getElementById("header").innerHTML = html

    
  }
  catch (error) {
    console.error("Error:", error);
  }
 }

 async function mostrar() {
  try {
    const response = await fetch("/vectores", {
      method: "PUT", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({validar: true}),
    });
    
    //En result obtengo la respuesta
    const result = await response.json();
    console.log("Success:", result);
    let vector = result.categorias[0]
    let vector2 = result.usuarios[0]

    console.log("Success:", vector);
    console.log("Success:", vector2);
    let html = `
        <select name="select" id="categorie">
          <option value="value1" selected> Elegir Categoria</option>`
    for (let i in vector){
      html+=
      `
          <option>${vector[i].contenido}</option>
        
      `;
    }
    html += `</select>`;
    document.getElementById("seleccion").innerHTML = html;

    let html2 = `
        <select name="select" id="user">
          <option value="value1" selected> Elegir Usuario</option>`
    for (let i in vector2){
      html2+=
      `
          <option>${vector2[i].nom_usuario}</option>
        
      `;
    }
    html2 += `</select>`;
    document.getElementById("seleccionUsuario").innerHTML = html2;
   
  }
    catch (error) {
      console.error("Error:", error);
    
  }
}

function borrarUsuario(){
  usuario= document.getElementById("user").value
  console.log(usuario)
  let data = {
    pregunta: usuario
  }
  eliminarUsuario(data)
}

async function eliminarUsuario(data) {
  //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    
  console.log(data)
  try {
    const response = await fetch("/eliminarUsuario", {
      method: "PUT", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("borrar ok ", result);

    if (result.validar == false) {
      alert("No se pudo borrar el usuario")
    }
    else {
     console.log("Usuario borrado")
     location.href = '/volver2'
  } 
}
  catch (error) {
    console.error("Error:", error);
  }
}

function borrarPuntaje(){
  usuario= document.getElementById("user").value
  console.log(usuario)
  let data = {
    pregunta: usuario
  }
  eliminarPuntaje(data)
}

async function eliminarPuntaje(data) {
  //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    
  console.log(data)
  try {
    const response = await fetch("/eliminarPuntaje", {
      method: "PUT", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("borrar ok ", result);

    if (result.validar == false) {
      alert("No se pudo borrar el puntaje")
    }
    else {
     console.log("Puntaje borrado")
     location.href = '/volver2'
  } 
}
  catch (error) {
    console.error("Error:", error);
  }

}

async function salir(){
  try {
    const response = await fetch("/logout", {
      method: "PUT", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    const result = await response.json();
    
    if (result.validar == false) {
      alert("Error al desloguear")
    }
    else {
     console.log("Puntaje borrado")
     location.href = '/volver'
  } 
}
  catch (error) {
    console.error("Error:", error);
  }
}

function borrarCategoria(){
  categoriaBorrar= document.getElementById("categorie").value
  console.log(categoriaBorrar)
  let data = {
    borrar: categoriaBorrar
  }
  eliminarCategoria(data)
}

async function eliminarCategoria(data) {
  console.log(data)
  try {
    const response = await fetch("/eliminarCategoria", {
      method: "PUT", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("borrar ok ", result);

    if (result.validar == false) {
      alert("No se pudo borrar la categoria")
    }
    else {
     console.log("Categoria borrada")
     location.href = '/volver2'
  } 
}
  catch (error) {
    console.error("Error:", error);
  }
}

function ejemplo(){

  listaEjemplo = sessionStorage.categories.split(",")
  console.log("mario", listaEjemplo)
  for (let i in listaEjemplo){
    console.log("dada", listaEjemplo[i])
    let html2 = `
        <br>
        <h5 class="card-title"> ${listaEjemplo[i]}</h5>
        <input class="x" style="width : 1000px; heigth : 1px" plaecholder="Escriba" id="${listaEjemplo[i]}" oninput="validarInput(this)"/>`
    document.getElementById("prueba").innerHTML += html2;
  }
}


//let palabraalea={}

//let plabraalea = ""

async function palabra_elegida(){
  
  try {
    const response = await fetch("/randomWord", {
      method: "POST", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
     // body: JSON.stringify(data),
    });
    
    //En result obtengo la respuesta
    const result = await response.json();
    console.log("Success:", result);

    palabraalea = result.letter; 

    console.log(palabraalea)
    let html =`<h5 id=letraElegida> Letra: ${palabraalea} </h5>`
    document.getElementById("letraRandom").innerHTML += html;

    let html2 = `<h5 id=letraElegida> Ronda: ${sessionStorage.rounds}  </h5>`
    document.getElementById("ronda").innerHTML = html2
  
  } catch (error) {
    console.error("Error:", error);
  }
}

function validarInput(input) {
  var valor = input.value;
  var letraInicial = palabraalea; // Cambia esta letra a la que desees
  if (valor.length > 0 && valor[0] !== letraInicial) {
    valor = letraInicial + valor.substring(1);
    input.value = valor;
  }
}
