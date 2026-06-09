export const languages = {
    sk: 'sk',
    en: 'en',
};

export const defaultLanguage = Object.values(languages)[0];

export const locales = {
    [languages.sk]: 'sk-SK',
    [languages.en]: 'en-US',
};

let subsiteOverride = null;

export const setSubsiteOverride = (subsite) => {
    subsiteOverride = subsite;
};

export const getActiveSubsite = (pathname = document.location.pathname) => {
    if (subsiteOverride === 'landing') return null;
    if (subsiteOverride) return subsiteOverride;
    if (pathname === '/euro2024' || pathname.startsWith('/euro2024/'))
        return 'euro2024';
    if (pathname === '/prezident2024' || pathname.startsWith('/prezident2024/'))
        return 'prezident2024';
    if (pathname === '/parlament2023' || pathname.startsWith('/parlament2023/'))
        return 'parlament2023';
    if (pathname === '/samosprava2026' || pathname.startsWith('/samosprava2026/'))
        return 'samosprava2026';
    if (
        pathname === '/samosprava2022' ||
        pathname.startsWith('/samosprava2022/')
    )
        return 'samosprava2022';
    return null; // Landing page
};

export const getSubsitePrefix = (subsite) => {
    if (subsite === 'euro2024') return '/euro2024/';
    if (subsite === 'prezident2024') return '/prezident2024/';
    if (subsite === 'parlament2023') return '/parlament2023/';
    if (subsite === 'samosprava2026') return '/samosprava2026/';
    if (subsite === 'samosprava2022') return '/samosprava2022/';
    return '/'; // Landing page
};

export const getCurrentLanguage = () => {
    const pathname = document.location.pathname;
    const subsite = getActiveSubsite(pathname);
    if (subsite === 'samosprava2022') return languages.sk; // Samosprava 2022 is SK-only
    const prefix = getSubsitePrefix(subsite);
    const start = prefix.length;
    return pathname.substring(start, start + 2) === languages.en
        ? languages.en
        : languages.sk;
};

export const getCurrentLocale = () => locales[getCurrentLanguage()];
