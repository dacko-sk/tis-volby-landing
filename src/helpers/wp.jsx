import parse, { attributesToProps, domToReact } from 'html-react-parser';

import { decodeHTMLEntities } from './helpers';

export const categories = {
    news22: 858,
    news23: 877,
    newsGlobal: 875,
    bannerNews: 960,
    bannerNewsEn: 961,
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
        if (
            name === 'div' &&
            attribs &&
            (attribs.class || '').includes('wp-block-image')
        ) {
            // remove "wp-block-image" wrappers, keep just children
            return domToReact(children, parserOptions);
        }
        if (
            name === 'p' &&
            attribs &&
            (attribs.class || '').includes('has-text-align-')
        ) {
            // replace paragraph alignment classes from WP with BS5 classes
            return (
                <p
                    className={attribs.class.replace(
                        /\bhas-text-align-(\w+)\b/g,
                        'text-$1'
                    )}
                >
                    {domToReact(children, parserOptions)}
                </p>
            );
        }
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
            if (
                children.length &&
                children[0].type === 'text' &&
                children[0].data.startsWith('Continue reading')
            ) {
                // remove "continue reading" links to WP domain
                return <></>;
            }
            if (attribs) {
                if (attribs.rel?.startsWith('lightbox')) {
                    // remove lightbox links
                    // will recursively run parser on children
                    return domToReact(children, parserOptions);
                }
                if (attribs.href?.startsWith('http://')) {
                    const props = {
                        ...attributesToProps(attribs),
                        // force http links to https
                        href: attribs.href.replace('http://', 'https://'),
                    };
                    return (
                        <a {...props}>{domToReact(children, parserOptions)}</a>
                    );
                }
            }
        }
        if (name === 'figure') {
            // add bootstrap 5 classes to figures, remove "wp-block-image" class
            return (
                <figure
                    className={`figure text-center w-100 ${(attribs.class || '')
                        .replace('wp-block-image', '')
                        .trim()}`}
                >
                    {domToReact(children, parserOptions)}
                </figure>
            );
        }
        if (name === 'figcaption') {
            // add bootstrap 5 classes to figcaptions
            return (
                <figcaption className="figure-caption col-11 col-md-10 col-lg-8 col-xl-6 mx-auto">
                    {domToReact(children, parserOptions)}
                </figcaption>
            );
        }
        // otherwise no replacement
        return null;
    },
};

export const parseWpHtml = (html) => parse(html, parserOptions);

export const processArticles = (data) =>
    data.map((article) => ({
        ...article,
        title: {
            ...article.title,
            // fix titles
            rendered: decodeHTMLEntities(article.title.rendered),
        },
    }));
