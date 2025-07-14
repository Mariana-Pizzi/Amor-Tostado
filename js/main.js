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
});