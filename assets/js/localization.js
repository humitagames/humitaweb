class Localization{

    // Idiomas validos
    static validLanguage = [ "en", "es", "ja" ];
    static allowedCompoundLanguage = [];

    // Main
    static Main(){

        return {

            en: {
                pageTitle: "Humita Games - Sabor a Chile",
                pageDescription: "Video game development studio",
                sectionGamesTitle: "Video games",
                sectionShopTitle: "Shop",
                chile: "Chile",
            },

            es: {
                pageTitle: "Humita Games - Sabor a Chile",
                pageDescription: "Estudio de desarrollo de videojuegos",
                sectionGamesTitle: "Juegos",
                sectionShopTitle: "Tienda",
                chile: "Chile",
            },

            ja: {
                pageTitle: "Humita Games - チリの味わい",
                pageDescription: "ビデオゲーム開発スタジオ",
                sectionGamesTitle: "ビデオゲーム",
                sectionShopTitle: "グッズショップ",
                chile: "チリ",
            }

        }

    }

    // Solicitar un texto para incluir
    static GetTranslate( page, key, values, element, attributeTarget ){
        
        let language = Localization.GetSelectedLanguage();
        if(!Localization.Main()[language]) language = 'en';
        let string = "";
        values = values? (Array.isArray(values)? values : values.split(",")) : [];
        const withArguments = values.length > 0;

        switch(page){

            case "main":
                string = Localization.Main()[language][ key ];
                break;
        }

        // Contiene argumentos para reemplazar
        if(withArguments){

            for(let i = 0; i < values.length; i++){
                string = string.replace(`{${i}}`, values[i]);
            }

        }
        
        if(string){
            if(element){
                if(attributeTarget) element.setAttribute( attributeTarget, string);
                else element.innerHTML = string;
            }   
        }

        return string? string : ''; 
    }

    // Idioma seleccionado
    static GetSelectedLanguage(){
        let language = navigator.language.toLowerCase();

        // Permitiremos ciertos lenguajes con su codigo completo
        if( Localization.allowedCompoundLanguage.indexOf(language) == -1 ) language = language.split("-")[0];
        if( Localization.validLanguage.indexOf(language) == -1 ) language = Localization.validLanguage[0]; 

        return language;
    }

}

// Procesar todas los textos que necesiten localizacion
const needLocalization = Array.from( document.querySelectorAll( "[data-localization-key]" ) );
for( const e of needLocalization ){
    Localization.GetTranslate(e.dataset.localizationPage, e.dataset.localizationKey, e.dataset.localizationArguments, e, e.dataset.localizationAttribute);
}