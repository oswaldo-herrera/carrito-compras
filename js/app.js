//variables
const carrito= document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners() {
    //cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //muestra los curso de localstorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];//reseteamos el arreglo

        limpiarHTML(); //eliminamos todo el html
    })
}


//funciones
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;//accedemos a todo los div que tuienen los cursos
        leerDatosCurso(cursoSeleccionado);
    }
}

//elimina curso del carrito
function eliminarCurso(e) {
    
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')
        
        //elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML(); //iterar sobre caqrrito y mostrar su html



    }
}

//lee el contenido del HTML al que le dimos click y extrae la informcion del curso
function leerDatosCurso (curso){
    // console.log(curso);

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++; //este retorna el objeto actualizado
                return curso;
            }else {
                return curso; //este retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //agregamos el curso al carrito
         //Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


    console.log(articulosCarrito);
    carritoHTML();
    
}

//muestra el carrito de compras en el html es para iterar unir/ligar
function carritoHTML(){
    //limpiar el html
    limpiarHTML();

    //recorre el carrito y genera el html
    articulosCarrito.forEach((curso) => {
        const {imagen, titulo, precio, cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width=100>
            </td>
            <td>${titulo}</td>
            <td>${precio} </td>
            <td>${cantidad}</td>
            <td> <a href='#' class="borrar-curso" data-id="${id}"> X </a></td>
            
        `;
        //agrega el html del carrito  en el tbody
        contenedorCarrito.appendChild(row);
    });

    //agregar el carrito de compras al storage
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

//Elimina los cursos del tbody
function limpiarHTML(){
    //forma lenta de eliminar elemnetos
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

