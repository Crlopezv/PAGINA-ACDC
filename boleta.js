//Productos/Carrodecompra

const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
const boleta = document.getElementById('boleta')
let carrito = {}
//Se espera que se cargue el dom antes de cargar los datos y se genera el localstorage
document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})

//Se genera la funcion que espera por los datos de la apijson
const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data = await res.json()
        //console.log(data)
        pintarCards(data)
    } catch (error) {
        console.log(error)
    }
}
// Se genera la estrectura de las templatecard y se insertan los datos de la apijson
 const pintarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl)
        templateCard.querySelector('.btn-primary').dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })

    cards.appendChild(fragment)
 }
//funcion para agregar al carrito

// funcion que asigna los datos al carrito
const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-primary').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito [producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto}
    pintarCarrito()
    

}
//Funcion que agrega los datos al carrito
const pintarCarrito = () => {
    //console.log(carrito)
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
       
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
    pintarFooter()
    localStorage.setItem('carrito',JSON.stringify(carrito))

}
// datos de footer
const pintarFooter = () => {
    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5" class="text-primary">Carrito vacío - comience a comprar!</th>
        `
        return
    }
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad ,0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad,precio}) => acc + cantidad * precio ,0)
    console.log(nPrecio)
    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio
    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })
    const btnPaginaPrincipal = document.getElementById('p-p')
    btnPaginaPrincipal.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    }) 
    const btnIniciarSesion = document.getElementById('i-s')
    btnIniciarSesion.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    }) 
    const btnProductos = document.getElementById('p')
    btnProductos.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })
     const btnColabora = document.getElementById('c')
    btnColabora.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })
    
    const btnRegistroUsuario = document.getElementById('r-u')
    btnRegistroUsuario.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })

    
    
}
//Funcion de botones sumar restar
const btnAccion = e => {
    //console.log(e.target)
    if(e.target.classList.contains('btn-info')){
        //console.log(carrito[e.target.dataset.id])
        //carrito[e.target.dataser.id]
        const producto = carrito[e.target.dataset.id]
        
        producto.cantidad ++
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }
    if(e.target.classList.contains('btn-danger')){
        const producto = carrito[e.target.dataset.id]
        
        producto.cantidad --
        if(producto.cantidad === 0){
            delete carrito[e.target.dataset.id]
            
        }
        pintarCarrito()

    }
    e.stopPropagation()

 

  }

