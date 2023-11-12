import siteConfig from '../../package.json';

import { isMobile } from './browser';

export const separators = {
    parts: '_',
    space: '-',
    url: '/',
    value: '~',
};

export const languages = {
    sk: 'sk',
    en: 'en',
};

export const defaultLanguage = Object.values(languages)[0];

export const segments = {
    DONOR: 'DONOR',
    FUNDING: 'FUNDING',
    NEWS: 'NEWS',
    SEARCH: 'SEARCH',
};

export const localSegments = {
    [languages.sk]: {
        [segments.DONOR]: 'donor',
        [segments.FUNDING]: 'financovanie',
        [segments.NEWS]: 'aktuality',
        [segments.SEARCH]: 'vyhladavanie',
    },
    [languages.en]: {
        [segments.DONOR]: 'donor',
        [segments.FUNDING]: 'funding',
        [segments.NEWS]: 'news',
        [segments.SEARCH]: 'search',
    },
};

export const homepage = siteConfig.homepage ?? '/';

export const getCurrentLanguage = () =>
    document.location.pathname.substring(
        homepage.length,
        homepage.length + 2
    ) === languages.en
        ? languages.en
        : languages.sk;

export const languageRoot = (language) =>
    homepage +
    ((language || getCurrentLanguage()) === languages.en
        ? languages.en + separators.url
        : '');

export const localizePath = (lang, path) => {
    const cp = path ?? document.location.pathname;
    const cl = getCurrentLanguage();
    if (cl === lang) {
        return cp;
    }
    const cr = languageRoot();
    const cs = cp.substring(cr.length).split(separators.url);
    const as = Object.entries(localSegments[cl]);
    const ts = cs.map((segment) => {
        let tk = null;
        as.some(([key, translation]) => {
            if (segment === translation) {
                tk = key;
                return true;
            }
            return false;
        });
        return tk ? localSegments[lang][tk] : segment;
    });
    return languageRoot(lang) + ts.join(separators.url);
};

export const urlSegment = (segment, lang) => {
    return localSegments[lang || getCurrentLanguage()][segment] ?? '';
};

export const routes = {
    article: (slug, lang) =>
        languageRoot(lang) +
        (slug
            ? urlSegment(segments.NEWS, lang) +
              separators.url +
              (slug === true ? ':slug' : slug)
            : ''),
    donor: (id, lang) =>
        languageRoot(lang) +
        urlSegment(segments.FUNDING, lang) +
        (id
            ? separators.url +
              urlSegment(segments.DONOR, lang) +
              separators.url +
              (id === true ? ':id' : encodeURIComponent(id))
            : ''),
    donations: (query, lang) => {
        if (!query && query !== false && isMobile) {
            query = `b${separators.value}10`;
        }
        return (
            languageRoot(lang) +
            urlSegment(segments.FUNDING, lang) +
            (query ? separators.url + (query === true ? ':query' : query) : '')
        );
    },
    home: (lang) => languageRoot(lang),
    news: (lang) => languageRoot(lang) + urlSegment(segments.NEWS, lang),
    search: (query, lang) =>
        languageRoot(lang) +
        (query
            ? urlSegment(segments.SEARCH, lang) +
              separators.url +
              (query === true ? ':query' : encodeURIComponent(query))
            : ''),
};