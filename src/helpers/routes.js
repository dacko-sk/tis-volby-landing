import { useParams } from 'react-router-dom';

import { sortAlphabetically } from './helpers';
import { getCurrentLanguage, languages } from './languages';

import siteConfig from '../../package.json';

export const homepage = siteConfig.homepage ?? '/';

export const separators = {
    array: ';',
    parts: '_',
    newline: '\n',
    numbers: '-',
    space: '.',
    url: '/',
    value: '~',
};

export const segments = {
    ACCOUNT: 'ACCOUNT',
    ACCOUNTS: 'ACCOUNTS',
    CHARTS: 'CHARTS',
    DONOR: 'DONOR',
    DONATIONS: 'DONATIONS',
    FUNDING: 'FUNDING',
    GOVERNMENT: 'GOVERNMENT',
    NEWS: 'NEWS',
    PARTIES: 'PARTIES',
    SEARCH: 'SEARCH',
};

export const localSegments = {
    [languages.sk]: {
        [segments.ACCOUNT]: 'ucet',
        [segments.ACCOUNTS]: 'ucty',
        [segments.CHARTS]: 'grafy',
        [segments.DONOR]: 'darca',
        [segments.DONATIONS]: 'darcovia',
        [segments.FUNDING]: 'financovanie',
        [segments.GOVERNMENT]: 'statne-prispevky',
        [segments.NEWS]: 'aktuality',
        [segments.PARTIES]: 'strany',
        [segments.SEARCH]: 'vyhladavanie',
    },
    [languages.en]: {
        [segments.ACCOUNT]: 'account',
        [segments.ACCOUNTS]: 'accounts',
        [segments.CHARTS]: 'charts',
        [segments.DONOR]: 'donor',
        [segments.DONATIONS]: 'donations',
        [segments.FUNDING]: 'funding',
        [segments.GOVERNMENT]: 'government',
        [segments.NEWS]: 'news',
        [segments.PARTIES]: 'parties',
        [segments.SEARCH]: 'search',
    },
};

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

export const buildUrlQuery = (options) => {
    const filters = [];
    Object.entries(options).forEach(([param, value]) => {
        filters.push(param + separators.value + value);
    });
    return filters.join(separators.parts);
};

export const queries = {
    searchAndFilter: (query) =>
        query ? separators.url + (query === true ? ':query' : query) : '',
};

export const routes = {
    account: (slug, lang) =>
        languageRoot(lang) +
        urlSegment(segments.FUNDING, lang) +
        separators.url +
        urlSegment(segments.ACCOUNT, lang) +
        separators.url +
        (slug === true
            ? ':slug'
            : encodeURIComponent(slug.replaceAll(' ', separators.space))),
    accounts: (lang) =>
        languageRoot(lang) +
        urlSegment(segments.FUNDING, lang) +
        separators.url +
        urlSegment(segments.ACCOUNTS, lang),
    article: (slug, lang) =>
        languageRoot(lang) +
        (slug
            ? urlSegment(segments.NEWS, lang) +
              separators.url +
              (slug === true ? ':slug' : slug)
            : ''),
    charts: (lang) =>
        languageRoot(lang) +
        urlSegment(segments.FUNDING, lang) +
        separators.url +
        urlSegment(segments.CHARTS, lang),
    donor: (id, lang) =>
        languageRoot(lang) +
        urlSegment(segments.FUNDING, lang) +
        separators.url +
        urlSegment(segments.DONATIONS, lang) +
        (id
            ? separators.url +
              urlSegment(segments.DONOR, lang) +
              separators.url +
              (id === true ? ':id' : encodeURIComponent(id))
            : ''),
    donations: (lang) =>
        languageRoot(lang) +
        urlSegment(segments.FUNDING, lang) +
        separators.url +
        urlSegment(segments.DONATIONS, lang),
    funding: (lang) => languageRoot(lang) + urlSegment(segments.FUNDING, lang),
    government: (lang) =>
        languageRoot(lang) +
        urlSegment(segments.FUNDING, lang) +
        separators.url +
        urlSegment(segments.GOVERNMENT, lang),
    home: (lang) => languageRoot(lang),
    news: (lang) => languageRoot(lang) + urlSegment(segments.NEWS, lang),
    parties: (lang) => languageRoot(lang) + urlSegment(segments.PARTIES, lang),
    party: (slug, subpage, lang) =>
        languageRoot(lang) +
        urlSegment(segments.PARTIES, lang) +
        separators.url +
        (slug === true
            ? ':slug'
            : encodeURIComponent(slug.replaceAll(' ', separators.space))) +
        (subpage ? separators.url + urlSegment(subpage, lang) : ''),
    search: (query, lang) =>
        languageRoot(lang) +
        (query
            ? urlSegment(segments.SEARCH, lang) +
              separators.url +
              (query === true ? ':query' : encodeURIComponent(query))
            : ''),
};

export const rwq = {
    searchAndFilter: (route, queryOptions) =>
        route + queries.searchAndFilter(buildUrlQuery(queryOptions)),
};

export const parseQueryOptions = (allowedParams) => {
    const params = useParams();
    const options = {};
    if ((params.query ?? false) && params.query.length) {
        params.query.split(separators.parts).forEach((pair) => {
            const [filter, value] = pair.split(separators.value);
            if (allowedParams.includes(filter)) {
                options[filter] = value;
            }
        });
    }
    return options;
};

export const buildApiQuery = (apiParams, options) => {
    return Object.entries(options)
        .flatMap(([param, value]) =>
            apiParams.includes(param) ? [`${param}=${value}`] : []
        )
        .sort(sortAlphabetically())
        .join('&');
};
