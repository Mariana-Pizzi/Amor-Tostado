document.addEventListener('DOMContentLoaded', () => {
    let cards = document.querySelectorAll('.card');

    if (cards.length > 0) {
        cards.forEach(card => {
            const botonClick = card.querySelector('button');
            const tituloProducto = card.querySelector('h3');
            const precioP = Array.from(card.querySelectorAll('p')).find(p => p.textContent.includes('Precio'));
            const precioProducto = precioP ? precioP.textContent.replace('Precio: $', '').trim() : '0';

            botonClick.addEventListener('click', () => {
                const productoExistente = carrito.find(item => item.titulo === tituloProducto.textContent);

                if (productoExistente) {
                    productoExistente.cantidad++;
                } else {
                    carrito.push({
                        titulo: tituloProducto.textContent,
                        precio: precioProducto,
                        cantidad: 1
                    });
                }

                const mensaje = document.getElementById('mensajeAgregado');
                if (mensaje) {
                    mensaje.textContent = `✅ Se agregó "${tituloProducto.textContent}" al carrito`;
                    mensaje.classList.add('mostrar');
                    setTimeout(() => {
                        mensaje.classList.remove('mostrar');
                    }, 2000);
                }

                guardarYActualizar();
            });
        });
    };

/*
    cards.forEach(card => {
        let botonClick = card.querySelector('button');

        const tituloProducto = card.querySelector('h3');

        const precioP = Array.from(card.querySelectorAll('p')).find(p => p.textContent.includes('Precio'));
        const precioProducto = precioP ? precioP.textContent.replace('Precio: $', '').trim() : '0'; 

        botonClick.addEventListener('click', () => {
            const productoExistente = carrito.find(item => item.titulo === tituloProducto.textContent);

            if(productoExistente){
                productoExistente.cantidad++;
            } else {
                carrito.push({
                    titulo: tituloProducto.textContent,
                    precio: precioProducto,
                    cantidad: 1
                });
            }
            
            precioTotal = carrito.reduce((acc, item) => acc + parseFloat(item.precio) * item.cantidad, 0);

            const mensaje = document.getElementById('mensajeAgregado');
            mensaje.textContent = `✅ Se agregó "${tituloProducto.textContent}" al carrito`;
            mensaje.classList.add('mostrar');
            setTimeout(() => {
                mensaje.classList.remove('mostrar');
            }, 2000);

            //precioTotal += parseFloat(precioProducto);

            localStorage.setItem('productos', JSON.stringify(carrito));
            localStorage.setItem('precioTotal', precioTotaltoFixed(2));

            actualizarContador();
            actualizarCarritoUI();
            /*
            const listaCarrito = document.getElementById('listaCarrito');
            if (listaCarrito) {
                listaCarrito.innerHTML = '';
                carrito.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = `${item.titulo} x${item.cantidad} - $${item.precio}`;
                    listaCarrito.appendChild(li);
                });
            }

            if (countElement) {
                countElement.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
            }
                
        });
    });
});*/
/*
function vaciarCarrito() {
    carrito = [];
    precioTotal = 0;
    localStorage.removeItem('productos');
    localStorage.removeItem('precioTotal');
    actualizarContador();
    actualizarCarritoUI();
}*/
/*
window.vaciarCarrito = function () {
        carrito = [];
        precioTotal = 0;
        localStorage.removeItem('productos');
        localStorage.removeItem('precioTotal');
        guardarYActualizar();
    };
*/
});