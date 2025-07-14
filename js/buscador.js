document.addEventListener('DOMContentLoaded', () => {
    const inputBusqueda = document.querySelector('input[type="text"]');
    const botonBusqueda = document.querySelector('button');
    const cards = document.querySelectorAll('.card');

    if (!inputBusqueda || cards.length === 0) return;

    const mensajeSinResultados = document.createElement('p');
    mensajeSinResultados.id = 'sinResultados';
    mensajeSinResultados.textContent = '😕 No se encontraron productos.';
    inputBusqueda.closest('form').insertAdjacentElement('afterend', mensajeSinResultados);

    const filtrarProductos = () => {
        const texto = inputBusqueda.value.toLowerCase().trim();
        let hayCoincidencias = false;

        cards.forEach(card => {
            const titulo = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const descripcion = card.querySelector('p')?.textContent.toLowerCase() || '';

            if (titulo.includes(texto) || descripcion.includes(texto)) {
                card.style.display = 'block';
                hayCoincidencias = true;
            } else {
                card.style.display = 'none';
            }
        });

        mensajeSinResultados.style.display = hayCoincidencias ? 'none' : 'block';
    };

    inputBusqueda.addEventListener('input', filtrarProductos);

    botonBusqueda?.addEventListener('click', (e) => {
        e.preventDefault();
        filtrarProductos();
    });
});