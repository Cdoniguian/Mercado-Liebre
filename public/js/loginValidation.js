window.addEventListener("load", function () {

    let inputPass = document.querySelector('#password');  //guardo en inputPass la etiquetsa input con id  password del formulario
    const togglePassword = document.querySelector('#togglePassword'); //traigo y guardo la etiqueta i con id togglePassword

    togglePassword.addEventListener('click', function (e) { //cuando hacemos click cambiamos clases

        const type = inputPass.getAttribute('type');//.getAttribute(nombe del atributo) devuelve el valor del atributo especificado en el elemento

        if (type === 'password') {   //pregunto si el type es password que el nuevo tipo sea text
            var newType = 'text';
        } else {                    // sino, el nuevo password es de tipo tassword 
            newType = 'password'
        }

        inputPass.setAttribute('type', newType); // Establece el valor de un atributo en el elemento indicado con uno nuevo
        this.classList.toggle('fa-eye-slash');
    })
})
