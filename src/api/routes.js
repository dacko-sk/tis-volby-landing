export const separators = {
    newline: '\n',
    parts: '~',
    space: '.',
    url: '/',
};

export const segments = {
    ROOT: '/',
    ELECTIONS: 'volby',
    FUNDING: 'financovanie',
    NEWS: 'aktuality',
    SEARCH: 'vyhladavanie',
};

export const routes = {
    article: (page, slug) =>
        segments.ROOT + (page && slug ? page + separators.url + slug : ''),
    articles: (page) => segments.ROOT + (page || ''),
    elections: segments.ROOT + segments.ELECTIONS,
    funding: segments.ROOT + segments.FUNDING,
    home: segments.ROOT,
    news: segments.ROOT + segments.NEWS,
    search: (query) =>
        segments.ROOT + (query ? segments.SEARCH + separators.url + query : ''),
};
