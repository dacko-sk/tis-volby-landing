import parse, { attributesToProps, domToReact } from 'html-react-parser';

import { decodeHTMLEntities } from './helpers';

export const categories = {
    news22: 858,
    news23: 877,
    newsGlobal: 875,
};

export const newsCategories = [
    categories.news22,
    categories.news23,
    categories.newsGlobal,
];

const proxyHttpImages = (html) => {
    const regex = /(http:\/\/cms.transparency.sk\/[^",]+.(png|jpe?g|gif|svg))/i;
    return html.replace(regex, 'https://images.weserv.nl/?url=$1');
};

const parserOptions = {
    replace: ({ name, attribs, children }) => {
        if (name === 'img' && attribs && attribs.src) {
            const props = {
                ...attributesToProps(attribs),
                // proxy image to force https
                src: proxyHttpImages(attribs.src),
                // add bootstrap 5 classes to images
                className: 'figure-img img-fluid',
            };
            return <img {...props} />;
        }
        if (name === 'a') {
            if (attribs && attribs.rel && attribs.rel.startsWith('lightbox')) {
                // remove lightbox links
                // will recursively run parser on children
                return domToReact(children, parserOptions);
            }
            if (
                children.length &&
                children[0].type === 'text' &&
                children[0].data.startsWith('Continue reading')
            ) {
                // remove "continue reading" links to WP domain
                return <></>;
            }
        }
        if (name === 'figure') {
            // add bootstrap 5 classes to figures
            return (
                <figure className={`figure ${attribs.class || ''}`}>
                    {domToReact(children, parserOptions)}
                </figure>
            );
        }
        if (name === 'figcaption') {
            // add bootstrap 5 classes to figcaptions
            return (
                <figcaption className="figure-caption text-center">
                    {domToReact(children, parserOptions)}
                </figcaption>
            );
        }
        // otherwise no replacement
        return null;
    },
};

export const parseWpHtml = (html) => parse(html, parserOptions);

export const processArticles = (data) => {
    const articles = [];
    data.forEach((article) => {
        articles.push({
            ...article,
            title: {
                ...article.title,
                // fix titles
                rendered: decodeHTMLEntities(article.title.rendered),
            },
        });
    });
    return articles;
};
