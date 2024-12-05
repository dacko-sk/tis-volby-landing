import siteConfig from '../../package.json';

const rootLen = (siteConfig.homepage ?? '/').length;

export const languages = {
    sk: 'sk',
    en: 'en',
};

export const defaultLanguage = Object.values(languages)[0];

export const locales = {
    [languages.sk]: 'sk-SK',
    [languages.en]: 'en-US',
};

export const getCurrentLanguage = () =>
    document.location.pathname.substring(rootLen, rootLen + 2) === languages.en
        ? languages.en
        : languages.sk;

export const getCurrentLocale = () => locales[getCurrentLanguage()];
