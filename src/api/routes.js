import has from 'has';
import siteConfig from '../../package.json';

export const separators = {
    parts: '~',
    space: '.',
    url: '/',
    value: '_',
};

export const segments = {
    ROOT:
        has(siteConfig, 'homepage') && siteConfig.homepage
            ? siteConfig.homepage
            : '/',
    ELECTIONS: 'volby',
    DONOR: 'donor',
    FUNDING: 'financovanie',
    NEWS: 'aktuality',
    SEARCH: 'vyhladavanie',
};

export const routes = {
    article: (page, slug) =>
        segments.ROOT + (page && slug ? page + separators.url + slug : ''),
    articles: (page) => segments.ROOT + (page || ''),
    elections: segments.ROOT + segments.ELECTIONS,
    donor: (id) =>
        segments.ROOT +
        segments.FUNDING +
        (id
            ? separators.url +
              segments.DONOR +
              separators.url +
              encodeURIComponent(id)
            : ''),
    donations: (query) =>
        segments.ROOT +
        segments.FUNDING +
        (query
            ? `${separators.url}q${separators.value}${encodeURIComponent(
                  query
              )}`
            : ''),
    home: segments.ROOT,
    news: segments.ROOT + segments.NEWS,
    search: (query) =>
        segments.ROOT +
        (query
            ? segments.SEARCH + separators.url + encodeURIComponent(query)
            : ''),
};
