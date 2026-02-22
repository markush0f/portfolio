import { ui, defaultLang } from './ui';

export type Lang = keyof typeof ui;

export function getTranslation(lang: Lang, key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
}

export function setLanguage(lang: Lang) {
    localStorage.setItem('preferred-lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);

    // Dispatch custom event for React components to listen to
    window.dispatchEvent(new CustomEvent('languagechange', { detail: lang }));

    // Update all static elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n') as keyof typeof ui[typeof defaultLang];
        if (key && ui[lang][key]) {
            el.textContent = ui[lang][key];
        }
    });
}

export function getCurrentLanguage(): Lang {
    if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('preferred-lang') as Lang;
        if (saved && ui[saved]) return saved;
    }
    return defaultLang;
}
