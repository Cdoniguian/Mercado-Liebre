window.addEventListener('load', function(){  //donde quiero que suceda (al cargarese la página), luego cuando y la función
    
     let confirmacionCambio = confirm('desea modo oscuro?')
    
    if(confirmacionCambio){
        let main = document.querySelector('main');
        main.style.background = '#7f7f7f'
        
        
    }
   
})