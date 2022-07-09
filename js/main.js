//formulario
const formulario = document.getElementById("form");
const inputs = document.querySelectorAll("input");

//Canciones Busqueda
var inputBuscar = document.getElementById("buscar");

//inicio
function mostrarJson() {

	var peticion = new XMLHttpRequest();

	peticion.open("GET", "http://127.0.0.1:5501/datos.json", true);

	peticion.send();

	peticion.onload = function () {
		if (peticion.readyState == 4 && peticion.status == 200) {
			var datos = JSON.parse(this.responseText);
			var array = datos.canciones;
      //ordeno datos
			array.sort(function (a, b) {
				var reproA = a.reproducciones;
				var reproB = b.reproducciones;

				return reproA > reproB ? -1 : reproA < reproB ? 1 : 0;
			});
		
		}

		var listado = document.getElementById("contenedorTop3");
		listado.innerHTML = "";

		if (listado.innerHTML === "") {
			for (var i = 0; i < 3; i++) {
				listado.innerHTML += `
          <div class="row border-bottom col-12 p-2 ">
          <div class="col-3 text-primary d-none d-sm-block font-weight-bold" id="nombre">${array[i].nombre}</div>
          <div class="col-9"><audio class="card-audio" src="./canciones/${array[i].ruta}" controls ></audio></div>
           </div>
          `;
			}
		}
	};
}

//Canciones
function cargarCanciones() {
      
  $.ajax({
    url:"datos.json"
  }).done(function(resultado)
  {
    registro = resultado.canciones;

          var cancion = document.getElementById('contenedorCanciones');
         cancion.innerHTML='';
          
         for(var i=0; i<registro.length;i++){
		         
          insertarDatos(cancion,registro,i);
			}
  })
	};

function insertarDatos(cancion,registro,i)
{
  cancion.innerHTML += `
     
   <div class="col-12 col-lg-6 col-xl-4 p-3">
             <div class="row text-center bg-light">
                  <div class="col-12 border">
                  <img src="./imagenes/icon_${registro[i].icono}.svg" alt="" width="20%">
                  </div>
             </div>
             <div class="row text-center">
                 <div class="col-12 border p-0">
                 <p>${registro[i].nombre}</p>
                 <audio src="./canciones/${registro[i].ruta}" controls preload="auto"></audio>
                 </div>
             </div>     
   </div>`;

}

//buscar
function buscar(texto){
  
  var peticion = new XMLHttpRequest();

  peticion.open('GET','http://127.0.0.1:5501/datos.json',true);
   
  peticion.send();

  peticion.onload = function(){
    if(peticion.readyState== 4 && peticion.status==200){
    var datos = JSON.parse(this.responseText);
    var registro = datos.canciones;
    var cancion = document.getElementById('contenedorCanciones');
    cancion.innerHTML='';

    texto = inputBuscar.value.toLowerCase();
    console.log(texto);

    for(var i=0;i<registro.length;i++)
    {
      var nombre = registro[i].nombre;
      if(nombre.toLowerCase().indexOf(texto)!==-1){
       console.log("iguales");
       insertarDatos(cancion,registro,i);
     }
      
    }
}
}
};
//limpiar Formulario
function limpiarErrores() {
	//guardo en var errores todos los elementos de clase error
	var errores = document.getElementsByClassName("error");
	//limpiamos
	for (var i = 0; i < errores.length; i++) {
		errores[i].innerHTML = "";
	}
}

//validacion Inicio de sesion
function validarInicioSesion() {
	//llamamos a la funcion a limpiar
	limpiarErrores();

	//validacion email
	if (formulario.email.value.length == 0) {
		document.getElementById("errorEmail").innerText = "Campo obligatorio";
		return false;
	}
	//expresion regular para validar un email
	var re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!re.test(formulario.email.value)) {
		document.getElementById("errorEmail").innerText = "Email Invalido";
		formulario.email.focus();
		return false;
	}
	//validacion password
	if (formulario.password.value.trim().length == 0) {
		document.getElementById("errorPassword").innerText =
			"Campo obligatorio";
		formulario.password.focus();
		return false;
	}

	if (formulario.password.value.trim().length < 8) {
		document.getElementById("errorPassword").innerText =
			"Contraseña Invalida (Mínimo 8 caracteres)";
		formulario.password.focus();
		return false;
	}
	return true;
}
//validacion formulario
function validar(formulario) {
	//llamamos a la funcion a limpiar
	limpiarErrores();

	//validacion email
	if (formulario.email.value.length == 0) {
		document.getElementById("errorEmail").innerText = "Campo obligatorio";
		return false;
	}

	//expresion regular para validar un email
	var re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!re.test(formulario.email.value)) {
		document.getElementById("errorEmail").innerText = "Email Invalido";
		formulario.email.focus();
		return false;
	}

	//validacion password
	if (formulario.password.value.trim().length == 0) {
		document.getElementById("errorPassword").innerText =
			"Campo obligatorio";
		formulario.password.focus();
		return false;
	}

	if (formulario.password.value.trim().length < 8) {
		document.getElementById("errorPassword").innerText =
			"Contraseña Invalida (Mínimo 8 caracteres)";
		formulario.password.focus();
		return false;
	}

	//validacion coincidencia password
	if (formulario.password.value != formulario.confirmacion.value) {
		document.getElementById("errorPassword2").innerText =
			"Las contraseñas no coinciden";
		formulario.confirmacion.focus();
		return false;
	}

	//validacion genero musical
	if (formulario.opciones.value == "") {
		document.getElementById("errorGeneroMusical").innerText =
			"Debe seleccionar un genero Musical";
		return false;
	}

	//validacion rango de edad
	if (formulario.edad.value == "") {
		document.getElementById("errorEdad").innerText =
			"Debe seleccionar un rango de edad";
		return false;
	}

	
	if (!formulario.terminos.checked) {
		document.getElementById("errorCheckbox").innerText =
			"Debe aceptar los términos y condiciones";
		return false;
	}

	alert("Registro Exitoso");

	return true;
}


