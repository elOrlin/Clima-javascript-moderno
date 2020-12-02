import {formulario, resultado, container} from './app.js';

function buscarClima(e){
    e.preventDefault();

    //validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        mostrarError('los campos son obligatorios')
        return;
    }

    //consultar la api
    consultarApi(ciudad, pais)
    
}

//mensaje de error
function mostrarError(mensaje){
    const alerta = document.querySelector('bg-red-100')
   if(!alerta){
    const alerta = document.createElement('div')

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px4', 'py3',
        'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center')
   

    alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
    `;

    container.appendChild(alerta)

    setTimeout(() => {
        alerta.remove()
    }, 3000)
    }
}


function consultarApi(ciudad, pais){
    const appId = 'f0c4a946977f1b4d511878bb55dd080b';

    const url= `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
 
    spinners() //muestra un spinner de carga

   setTimeout(() => {
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => {
        limpiarHTML();
        if(datos.cod === "404"){
            mostrarError('ciudad no encontrada')
            return;
        }
      
        //imprimir la respuesta del html
        mostrarClima(datos)
        console.log(datos)
    })
   }, 3000)
}

function mostrarClima(datos){
   const {name, main: {temp, temp_max, temp_min, }, weather: [{description}]} = datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p')
    nombreCiudad.innerText = `Clima en ${name}`;
    nombreCiudad.classList.add('text-center', 'text-white', 'text-2xl')

    const actual = document.createElement('p')
    actual.innerHTML = `${centigrados}&#8451`;
    actual.classList.add('font-bold', 'text-6xl')

    const tempMaxima = document.createElement('p')
    tempMaxima.innerHTML = `Temp Max: ${max} &#8451`;
    tempMaxima.classList.add('text-xl', 'text-center', 'text-white')

    const tempMinima = document.createElement('p')
    tempMinima.innerHTML = `Temp Min: ${min} &#8451`;
    tempMinima.classList.add('text-xl', 'text-center', 'text-white')

    const descripcion = document.createElement('p')
    descripcion.innerHTML = `Descripcion: ${description}`;
    descripcion.classList.add('text-xl', 'text-center', 'text-white')

    const resultadoDiv = document.createElement('div')
    resultadoDiv.classList.add('text-center', 'text-white')
    resultadoDiv.appendChild(actual)

    resultado.appendChild(resultadoDiv)
    resultado.insertBefore(nombreCiudad, resultadoDiv)
    resultado.appendChild(descripcion)
    resultado.appendChild(tempMaxima)
    resultado.appendChild(tempMinima)

    formulario.reset();
    
}

function kelvinACentigrados(grados){
    return parseInt(grados - 273.15)
}


//limpiar html
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function spinners(){
    limpiarHTML()

    const spinnerGif = document.createElement('div')
    spinnerGif.classList.add('ak-fading-circle')

    spinnerGif.innerHTML = `
    <div class="sk-fading-circle">
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  </div>
    `;
    resultado.appendChild(spinnerGif)
}


export {buscarClima}