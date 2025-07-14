document.addEventListener('DOMContentLoaded', () => {
    const botonArriba = document.getElementById('botonArriba');

    window.addEventListener('scroll', () => {
        botonArriba.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    botonArriba.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});