document.addEventListener('DOMContentLoaded', () => {
    
    const botonHamburguesa = document.getElementById('hamburguesa');
    const navPrincipal = document.getElementById('nav-principal');

    if (botonHamburguesa && navPrincipal) {
        const toggleMenu = () => {
            const abierto = navPrincipal.classList.toggle('is-open');
            botonHamburguesa.classList.toggle('is-open', abierto);
            botonHamburguesa.setAttribute('aria-expanded', abierto ? 'true' : 'false');
            document.body.style.overflow = abierto ? 'hidden' : '';
        };

        botonHamburguesa.addEventListener('click', toggleMenu);

        navPrincipal.addEventListener('click', (e) => {
            if (e.target && e.target.tagName === 'A' && navPrincipal.classList.contains('is-open')) {
                toggleMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navPrincipal.classList.contains('is-open')) {
                toggleMenu();
            }
        });

        document.addEventListener('click', (e) => {
            const clicFueraNav = !navPrincipal.contains(e.target);
            const clicFueraBoton = !botonHamburguesa.contains(e.target);
            if (navPrincipal.classList.contains('is-open') && clicFueraNav && clicFueraBoton) {
                toggleMenu();
            }
        });
    }
});