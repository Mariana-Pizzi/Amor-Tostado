let carrito = JSON.parse(localStorage.getItem('productos')) || [];
let precioTotal = parseFloat(localStorage.getItem('precioTotal')) || 0;

function actualizarContador() {
    const countElement = document.querySelector('.count');
    if (countElement) {
        countElement.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    }
}

function generarResumenPedido() {
    if (carrito.length === 0) return 'Carrito vacío';

    let resumen = 'Resumen de la compra:\n';
    carrito.forEach(item => {
        const precioFinal = (parseFloat(item.precio) * item.cantidad).toFixed(2);
        resumen += `${item.titulo} x${item.cantidad} - $${precioFinal}\n`;
    });

    const total = carrito.reduce((acc, item) => acc + parseFloat(item.precio) * item.cantidad, 0);
    resumen += `Total: $${total.toFixed(2)}`;
    return resumen;
}

function actualizarCarritoUI() {
    const listaCarrito = document.getElementById('listaCarrito');
    const totalCarrito = document.getElementById('totalCarrito');
    const pedidoInput = document.getElementById('pedidoInput');

    if (!listaCarrito || !totalCarrito || !pedidoInput) return;

    listaCarrito.innerHTML = '';

    if (carrito.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Tu carrito está vacío.';
        listaCarrito.appendChild(li);
        totalCarrito.textContent = 'Total: $0.00';
        pedidoInput.value = 'Carrito vacío';
        return;
    }

    carrito.forEach(item => {
        const li = document.createElement('li');
        const precioFinal = (parseFloat(item.precio) * item.cantidad).toFixed(2);
        
        li.innerHTML = `
            <span>${item.titulo}</span>
            <div style="display: flex; align-items: center; gap: 8px; margin: 0.5rem 0;">
                <button onclick="modificarCantidad('${item.titulo}', -1)">➖</button>
                <span>${item.cantidad}</span>
                <button onclick="modificarCantidad('${item.titulo}', 1)">➕</button>
            </div>
            <span>$${precioFinal}</span>
        `;

        listaCarrito.appendChild(li);
        
    });

    const total = carrito.reduce((acc, item) => acc + parseFloat(item.precio) * item.cantidad, 0);
    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    pedidoInput.value = generarResumenPedido();
}

function guardarYActualizar() {
    precioTotal = carrito.reduce((acc, item) => acc + parseFloat(item.precio) * item.cantidad, 0);
    localStorage.setItem('productos', JSON.stringify(carrito));
    localStorage.setItem('precioTotal', precioTotal.toFixed(2));
    actualizarContador();
    actualizarCarritoUI();
}

function vaciarCarrito() {
    if(confirm("Estás seguro de que deseas vaciar el carrito?")) {
        carrito = [];
        precioTotal = 0;
        localStorage.removeItem('productos');
        localStorage.removeItem('total');
        guardarYActualizar();
    }
}

function modificarCantidad(titulo, cambio) {
    const producto = carrito.find(p => p.titulo === titulo);
    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
        const index = carrito.findIndex(p => p.titulo === titulo);
        carrito.splice(index, 1);
    }

    guardarYActualizar();
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
    actualizarCarritoUI();
});

window.vaciarCarrito = vaciarCarrito;
window.modificarCantidad = modificarCantidad(titulo, cambio)