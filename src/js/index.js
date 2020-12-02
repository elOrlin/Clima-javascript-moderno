import '../css/style.css';
import '../css/tailwind.min.css';

import {buscarClima} from './funciones.js'

const container = document.querySelector('.container')
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

//cargar el documento con window
window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
})



export {container, resultado, formulario}
