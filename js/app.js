//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets = [];


// Event Listeners
eventListeners();

function eventListeners(){
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded',()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        
        crearHTML();
    });
}



// Funciones
function agregarTweet(e){
    e.preventDefault();
   
    // textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
   

    //validación
    if(tweet ===''){
        mostrarError('Un mensaje no puede ir vacio');
        return; //Evita que se ejecuten mas lineas de codigo
    }

    const tweetObj ={
        id: Date.now(),
        tweet
    }
    // Añadir al arreglo de tweets
    tweets = [...tweets,tweetObj];

    //Una vez agregado crear HTML
    crearHTML();

    //reiniciar el formulario
    formulario.reset();
}

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent= error;
    mensajeError.classList.add('error');

    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina la alerta despues de tres segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

//Mostrar un listado de los tweets

function crearHTML(){
    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach( tweet=>{
            //Agregar un boton de eliminar
            const btnEliminar =document.createElement('a');
            btnEliminar.classList.add('borrar-tweet')
            btnEliminar.innerHTML= 'X';

            //Añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //Crear el html
            const li = document.createElement('li');

            //añadir texto
            li.innerText = tweet.tweet;

            //Asignar el botón
            li.appendChild(btnEliminar);

            //Insertar en el html
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}
//Agrega los Twetts adctuales a localstorage

function sincronizarStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets));
}
//Elimina un tweet
function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !==id);
   crearHTML();
}


//Limpiar HTML

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}