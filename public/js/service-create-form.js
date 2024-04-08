window.addEventListener("load", function() {
   console.log("El evento load se ha disparado correctamente.");
   //tomamos todos los elementos del formulario
   let form = document.querySelector(".form");
   let errorsHTML = document.querySelector(".errores");
    
   //en el evento submit, frenar el envio al back sin antes realizar validaciones
   form.addEventListener("submit", (event) => {
          
   //arreglo de errores
   let errorsList = [];
    
          
   //VALIDACIONES CAMPO NOMBRE DEL SERVICIO
   if(form.name.value == "" ) {
      errorsList.push("El nombre del servicio es obligatorio")
   } else  if (form.name.value.length < 6) {  //que tenga el minimo de caracteres
      errorsList.push("El nombre del servicio debe tener al menos 5 caracteres")
   }

   //VALIDACIONES CAMPO DESCRIPCION
   if(form.description.value == "" ) {
      errorsList.push("La descripción del servicio es obligatoria")
   } else if (form.description.value.length <21) {  //que tenga el minimo de caracteres
      errorsList.push("La descripción debe tener al menos 20 caracteres")
   }

   //VALIDACIONES IMAGEN
   if (form.image.value == "") {
      errorsList.push("Debes subir una imagen")
   }
   
   //VALIDACIONES CAMPO PRECIO
   if(form.price.value == "" ) {
      errorsList.push("El precio es obligatorio")
   } else if (form.price.value < 1) {
      errorsList.push("El precio debe ser mayor a 1");
   }

   //listar los errores  como elementos <li>
    
   // si el arrary de errores no esta vacio
   if (errorsList.length > 0) {
             
      //no se envie formulario si tiene errores
      event.preventDefault(); 
      errorsHTML.innerHTML = "";//reseteo el arreglo de errores, para que cada vez q haga submit borre los anteriores y valide de nuevo
      //imprimir los errores cuando se tienen
      errorsList.forEach(error => {
         errorsHTML.innerHTML += "<li>" + error + "</li>"
    
      })
   }
            
    
    
})
})