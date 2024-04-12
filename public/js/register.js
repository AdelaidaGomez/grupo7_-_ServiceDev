window.addEventListener("load", function() {

    //tomamos todos los elementos del formulario
     let form = document.querySelector(".form");
     let errorsHTML = document.querySelector(".errores");

   //en el evento submit, frenar el envio al back sin antes realizar validaciones
   form.addEventListener("submit", (event) => {
      
   //arreglo de errores
   let errorsList = [];

   //VALIDACIONES CAMPO NAME
    
     //no este vacio
     if(form.name.value == "" ) {
        errorsList.push("El nombre y apellido no debe estar vacio")
     } else if (form.name.value.length < 3) { //no se menor a 3 caracteres
      errorsList.push("El nombre y apellido debe tener al menos 2 caracteres")
   }

   //VALIDACIONES CAMPO EMAIL

     // creacion cariable para definir expresion regular q debe cumpli el email
     let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


     if(form.email.value == "" ) {
      errorsList.push("El email no debe estar vacio")
     } else if (!regexEmail.test(form.email.value)) {
      errorsList.push("El email debe tener un formato válido");
     }   

   //VALIDACIONES CAMPO CONTRASEÑA
   if(form.password.value == "" ) {
      errorsList.push("La contraseña es obligatoria")
   } else  if (form.password.value.length < 9) {  //que tenga el minimo de caracteres
      errorsList.push("La contraseña debe tener al menos 8 caracteres")
   }

    //VALIDACIONES CAMPO CONFIRMAR CONTRASEÑA
    if(form.confirm_pass.value == "" ) {
      errorsList.push("La confirmacion de contraseña es obligatoria")
   } 
   
   //VALIDACIONES IMAGEN
   if (form.avatar.value == "") {
      errorsList.push("Debes subir una imagen")
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