window.addEventListener('load',()=>{
    let errores = [];
    const form = document.querySelector("form.login-form");
    const firstName = document.querySelector(".firstName");
    const lastName = document.querySelector(".lastName");
    const imageName = document.querySelector("#images")
    const email = document.querySelector(".email");
    const password = document.querySelector(".password");
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const minuscula = /[a-z]/;
    const mayuscula = /[A-Z]/;
    const numero = /[0-9]/;
    const caracterEspecial = /[@$.!%#?&]/;
    form.addEventListener('submit', (e) => {
        errores = [];
    if(firstName.value == ''){
        errores.push('El nombre no puede estar vacío');
        // firstName.classList.add('error-msg');
    }else if(firstName.value.length < 2){
        errores.push('El nombre debe tener al menos 2 caracteres');
        // firstName.classList.add('error-msg');
    };
    if(lastName.value == ''){
        errores.push('El apellido no puede estar vacío');
        // firstName.classList.add('error-msg');
    }else if(lastName.value.length < 2){
        errores.push('El apellido debe tener al menos 2 caracteres');
        // firstName.classList.add('error-msg');
    };
    if(email.value == ''){
        errores.push('El e-mail no puede estar vacio');
    }else if(!emailRegex.test(email.value)){
        errores.push('Ingrese un formato de e-mail válido por favor');
    };
    
    if (imageName.value == '') {
        errores.push('Debe seleccionar una imagen para el usuario');
    };
    if(password.value == ''){
        errores.push('La contraseña no puede estar vacía')
    }else if(password.value.length < 8){
        errores.push('La contraseña debe tener al menos 8 caracteres')
    }else{
        if(!minuscula.test(password.value)) errores.push('La contraseña debe contener al menos una minúscula')
        if(!mayuscula.test(password.value)) errores.push('La contraseña debe contener al menos una mayúscula')
        if(!numero.test(password.value)) errores.push('La contraseña debe contener al menos un número')
        if(!caracterEspecial.test(password.value)) errores.push('La contraseña debe contener al menos un caracter especial')
    }

    if (errores.length > 0) {
        e.preventDefault();
        let ulErrors = document.querySelector('.errors');
        ulErrors.classList.add('error-msg');
        ulErrors.innerHTML = '';
        for (let i = 0; i < errores.length; i++) {
            ulErrors.innerHTML += `<li >  ${errores[i]} </li>`;
        };
    }
}) ;
})