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
                <td>${producto.cantidad}</td>
                <td>$${subtotal}</td>
            </tr>
        `;
    });

    cuerpo += '<tbody>';

    tabla.innerHTML = encabezado + cuerpo;

    carritoContainer.appendChild(tabla);

    let precioFinal = document.createElement('p');
    precioFinal.innerText = `Total a pagar: $${total}`;
    
    carritoContainer.appendChild(precioFinal);

    let finalizarCompra = document.createElement('button');

}

function vaciarCarrito() {
    if(confirm("Estás seguro de que deseas vaciar el carrito?")) {
        localStorage.removeItem('productos');
        localStorage.removeItem('total');

        const carritoContainer = document.getElementById('itemProductos');
        carritoContainer.innerHTML = '';

        document.querySelector('.count').innerText = '0';
    }
}

document.addEventListener('DOMContentLoaded', handleCart);

window.vaciarCarrito = vaciarCarrito;