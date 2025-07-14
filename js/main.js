document.addEventListener('DOMContentLoaded', () => {
    let carrito = JSON.parse(localStorage.getItem('productos')) || [];
    let precioTotal = parseFloat(localStorage.getItem('precioTotal')) || 0;

    const countElement = document.querySelector('.count');
    if (countElement) {
        countElement.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    }

    let cards = document.querySelectorAll('.card');

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
            
            const mensaje = document.getElementById('mensajeAgregado');
            mensaje.textContent = `✅ Se agregó "${tituloProducto.textContent}" al carrito`;
            mensaje.classList.add('mostrar');
            setTimeout(() => {
                mensaje.classList.remove('mostrar');
            }, 2000);

            precioTotal += parseFloat(precioProducto);

            localStorage.setItem('productos', JSON.stringify(carrito));
            localStorage.setItem('precioTotal', precioTotal);

            if (countElement) {
                countElement.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
            }
        });
    });
});


