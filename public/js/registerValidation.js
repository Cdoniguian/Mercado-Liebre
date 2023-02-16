window.addEventListener("load", function(){

    let inputPass = document.querySelector('#password');
    let classPass1 = document.querySelector('#pass1');
    let classPass2 = document.querySelector('#pass2');
    let classPass3 = document.querySelector('#pass3');

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    inputPass.addEventListener("keyup", function(event){  //keyup evento de tecla arriba.

    if(inputPass.value.length > 7){  //si el valor de lo traído al inputPass tiene 8 o más elementos
        classPass1.style.color ="blue"; //cambia la classe 
    }else{
        classPass1.style.color ="red";
    }

    if(specialChars.test(inputPass.value)){  //si el valor del inputPass tiene un caracter lo testea y da true
        classPass2.style.color ="blue";//cambia la classe 
    }else{
        classPass2.style.color ="red";
    }

    if((!(inputPass.value.toLowerCase() == inputPass.value))){ //si el imputPass es solo minúscula y se lo compara con 
                                                             // con el valor de lo convertido en minúscula y da ok,
                                                             //quiere decir que no tiene mayúscula. lo negamois
                                                             // y da false y  no cambia la clase
        classPass3.style.color ="blue";//cambia la classe 
    }else{
        classPass3.style.color ="red";
    }
})

})