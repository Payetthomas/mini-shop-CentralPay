import i18n from "i18next"; 
import { initReactI18next } from "react-i18next";
import fr from "./fr.json";
import eng from "./en.json";


const getSaved = () => {

    try {
        return localStorage.getItem('lang') || 'fr'
    } catch {
        return 'fr'
    }
};

i18n.use(initReactI18next).init({

    resources: {
        fr : { translation : fr },
        eng : { translation : eng }
    },

    lng: getSaved(),
    fallbackLng: 'fr',
    interpolation: { escapeValue: false }
});

export function setLanguage (lng: 'fr' | 'eng') {
    i18n.changeLanguage(lng)
    try {
        localStorage.setItem('lang' ,lng)
    } catch {
        
    }
};

export default i18n;