import siteConfig from '../../package.json';

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
    ELECTIONS: 'ELECTIONS',
    DONOR: 'DONOR',
    FUNDING: 'FUNDING',
    NEWS: 'NEWS',
    SEARCH: 'SEARCH',
};

export const localSegments = {
    [languages.sk]: {
        [segments.ELECTIONS]: 'volby',
        [segments.DONOR]: 'donor',
        [segments.FUNDING]: 'financovanie',
        [segments.NEWS]: 'aktuality',
        [segments.SEARCH]: 'vyhladavanie',
    },
    [languages.en]: {
        [segments.ELECTIONS]: 'elections',
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
        (slug ? urlSegment(segments.NEWS, lang) + separators.url + slug : ''),
    elections: (lang) => languageRoot() + urlSegment(segments.ELECTIONS, lang),
    donor: (id, lang) =>
        languageRoot(lang) +
        urlSegment(segments.FUNDING, lang) +
        (id
            ? separators.url +
              urlSegment(segments.DONOR, lang) +
              separators.url +
              encodeURIComponent(id)
            : ''),
    donations: (query, lang) =>
        languageRoot(lang) +
        urlSegment(segments.FUNDING, lang) +
        (query ? `${separators.url}${query}` : ''),
    home: (lang) => languageRoot(lang),
    news: (lang) => languageRoot(lang) + urlSegment(segments.NEWS, lang),
    search: (query, lang) =>
        languageRoot(lang) +
        (query
            ? urlSegment(segments.SEARCH, lang) +
              separators.url +
              encodeURIComponent(query)
            : ''),
};
