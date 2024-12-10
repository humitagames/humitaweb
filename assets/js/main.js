( _ => {
    const lazyLoad = new LazyLoad();

    // Trabajar las imagenes a cargar
    const filter = Array.from( document.querySelectorAll( "[data-lazy]" ) );
    for( const f of filter ){
        lazyLoad.observe( f.dataset.url, f, f.dataset.lazy_type, Fade );
    }

    // Funcion para mostrar con fade las imagenes
    function Fade(event){
        event.target.classList.add('fade-in');
    }

    // Agregar el anho actual al footer
    ( _ => {
        const humitaYear = document.querySelector(".humita-year");
        if(humitaYear) humitaYear.dataset.year =  "- " + new Date().getFullYear();
    })();

    // Vantas
    VANTA.WAVES({
        el: document.body,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xce8d2d
    });

    /** Botones */
    const buttons = document.querySelectorAll("a");
    for(const button of buttons){
        tippy(button, {
            content: button.attributes['aria-label'].value
        });
    }

    /** Clickable objects */
    const clickables = document.querySelectorAll(".clickable");
    for(const clickable of clickables){
        clickable.addEventListener("click", _ => {window.open(clickable.getAttribute("href"),"_blank")});
    }

    // PWA
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", async () => {
            const registration = await navigator.serviceWorker.register("/sw.js");
        });
    };
})();