function handleCart(){
    const carrito = JSON.parse(localStorage.getItem('productos')) || [];
    const total = localStorage.getItem('precioTotal') || 0;

    let carritoContainer = document.getElementById('itemProductos');

    if(carrito.length === 0){
        carritoContainer.innerHTML = `
        <p>No hay productos en el carrito :(</p>`;
        return;
    }

    let tabla = document.createElement('table');
    tabla.classList.add('table');

    let encabezado = `
        <thead>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
            </tr>
        </thead>
    `;

    let cuerpo = '<tbody>';

    carrito.forEach( producto => {
        const precioUnitario = parseFloat(producto.precio);
        const subtotal = precioUnitario * producto.cantidad;
        
        cuerpo += `
            <tr>
                <td>${producto.titulo}</td>
                <td>
                    <button class="restar" data-titulo="${producto.titulo}">−</button>
                    ${producto.cantidad}
                    <button class="sumar" data-titulo="${producto.titulo}">+</button>
                </td>
                <td>$${subtotal}</td>
            </tr>
        `;
    });

    cuerpo += '<tbody>';
    tabla.innerHTML = encabezado + cuerpo;
    carritoContainer.appendChild(tabla);

    const precioFinal = document.createElement('p');
    const totalCalculado = carrito.reduce((sum, prod) => sum + prod.cantidad * parseFloat(prod.precio), 0);
    precioFinal.innerText = `Total a pagar: $${totalCalculado}`;
    carritoContainer.appendChild(precioFinal);

    document.querySelectorAll('.sumar').forEach(boton => {
        boton.addEventListener('click', () => {
            modificarCantidad(boton.dataset.titulo, +1);
        });
    });

    document.querySelectorAll('.restar').forEach(boton => {
        boton.addEventListener('click', () => {
            modificarCantidad(boton.dataset.titulo, -1);
        });
    });
    
    let finalizarCompra = document.createElement('button');

}

function vaciarCarrito() {
    if(confirm("Estás seguro de que deseas vaciar el carrito?")) {
        localStorage.removeItem('productos');
        localStorage.removeItem('total');

        const carritoContainer = document.getElementById('itemProductos');
        carritoContainer.innerHTML = `<p>No hay productos en el carrito :(</p>`;

        document.querySelector('.count').innerText = '0';
    }
}

function modificarCantidad(titulo, cambio) {
    const carrito = JSON.parse(localStorage.getItem('productos')) || [];
    const producto = carrito.find(p => p.titulo === titulo);
    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
        const index = carrito.findIndex(p => p.titulo === titulo);
        carrito.splice(index, 1);
    }

    const nuevoTotal = carrito.reduce((sum, prod) => sum + prod.cantidad * parseFloat(prod.precio), 0);

    localStorage.setItem('productos', JSON.stringify(carrito));
    localStorage.setItem('precioTotal', nuevoTotal.toString());

    location.reload();
}

document.addEventListener('DOMContentLoaded', handleCart);

window.vaciarCarrito = vaciarCarrito;