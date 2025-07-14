document.addEventListener('DOMContentLoaded', () => {
    let carrito = JSON.parse(localStorage.getItem('productos')) || [];
    let precioTotal = parseFloat(localStorage.getItem('precioTotal')) || 0;

    let cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        let botonClick = card.querySelector('button');

        const tituloProducto = card.querySelector('h3');

        const precioP = Array.from(card.querySelectorAll('p')).find(p => p.textContent.includes('Precio'));
        const precioProducto = precioP ? precioP.textContent.replace('Precio: $', '').trim() : '0';
        
        console.log('Precio crudo:', precioP ? precioP.textContent : 'No hay precio');
        console.log('Precio procesado:', precioProducto);   

        botonClick.addEventListener('click', () => {
            const producto = {
                titulo: tituloProducto.textContent,
                precio: precioProducto,
                cantidad: 1
            };

            carrito.push(producto);
            precioTotal += parseFloat(producto.precio);

            localStorage.setItem('productos', JSON.stringify(carrito));
            localStorage.setItem('precioTotal', precioTotal);

            document.querySelector('.count').innerText = carrito;
        });
    });
});


